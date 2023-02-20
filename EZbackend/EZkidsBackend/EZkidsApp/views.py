from django.contrib.auth import get_user_model
from django.shortcuts import render
from .models import Teacher, Children, BankName, Class, Parent, ToDoList, ToDoItem, Announcement, Subject, Homework, SubjectGrade, Attendance, Principal
from .serializers import UserSerializer, UserSerializerWithToken, ParentSerializer, BankNameSerializer, TeacherSerializer, ChildrenSerializer, ClassSerializer, PrincipalSerializer, AnnouncementSerializer, TodoListSerializer, ToDoItemSerializer, SubjectSerializer, HomeworkSerializer, SubjectGradeSerializer, AttendanceSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json
from django.contrib.auth.hashers import make_password
from rest_framework import status
from EZkidsBackend.settings import EMAIL_HOST_USER
from django.core.mail import send_mail

from django.utils.crypto import get_random_string
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache

import pytz
from datetime import datetime
from django.utils import timezone
from django.db.models import Q


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.
User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

# only admin user can get the lists of users


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# checking if user is exist with email. For forget password.
@api_view(['GET'])
def getUserByEmail(request, pk):
    # try:
        user = User.objects.get(email=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    # except:
    #     message = {'detail': 'No record Found with given email'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)

# reset user password


def get_random_pass():

    pwd = get_random_string(length=10)

    return str(pwd)


@api_view(['GET'])
def resetPassword(request, pk):
    # try:
        user = User.objects.get(email=pk)
        serializer = UserSerializer(user, many=False)
        pwd = get_random_pass()
        user.password = make_password(pwd)
        user.save()

        subject = 'Reset Password'
        message = 'Dear customer, your password had been reseted to ' + pwd + \
            '. You can login to your account now'
        recepient = str(pk)
        send_mail(subject, message, EMAIL_HOST_USER,
                  [recepient], fail_silently=False)

        return Response(serializer.data)
    # except:
    #     message = {'detail': 'Fail to reset Password'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def registerUser(request):
    data = request.data

    # try:
    user = User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password']),
    )

    serializer = UserSerializerWithToken(user, many=False)
    user.is_staff = data['is_staff']
    user.is_superuser = data['is_superuser']
    user.is_active = data['is_active']
    user.is_teacher = data['is_teacher']
    user.is_parent = data['is_parent']

    user.save()

    if data['is_teacher'] == "True":
        teacher = Teacher.objects.create(
            teacherFirstName=data["teacherFirstName"],
            teacherLastName=data["teacherLastName"],
            teacherEmail=data["teacherEmail"],
            created_by=user,
            teacherContactphone=data["teacherContactphone"],
            bankAccountHolder=data["bankAccountHolder"],
            teacherBankName=data["teacherBankName"],
            teacherBankAcc=data["teacherBankAcc"],
        )
        serializer = TeacherSerializer(teacher, many=False)

    return Response(serializer.data)
    # except:
    #     message = {'detail': 'User with this email already exist'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userToDelete = User.objects.get(userID=pk)
    userToDelete.delete()
    return Response('User was deleted')


@api_view(['GET'])
def getCustomerByUserID(request, pk):
    customer = Customer.objects.get(created_by=pk)
    serializer = CustomerSerializer(customer, many=False)
    return Response(serializer.data)


# class CustomerViewSet(viewsets.ModelViewSet):
#     queryset = Customer.objects.all()
#     serializer_class = CustomerSerializer
#     # permission_classes = [IsAuthenticated]
#     # authentication_classes = (TokenAuthentication, )


@api_view(['GET'])
def getTeacherTotal(reqeust):
    try:
        teacher = Teacher.objects.all().count()
        return Response(teacher)
    except:
        message = {'detail': 'Teacher total failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getParentTotal(reqeust):
    try:
        parent = Parent.objects.all().count()
        return Response(parent)
    except:
        message = {'detail': 'Parent total failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getChildrenTotal(reqeust):
    try:
        children = Children.objects.all().count()
        return Response(children)
    except:
        message = {'detail': 'Children total failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getClassesTotal(reqeust):
    try:
        classes = Class.objects.all().count()
        return Response(classes)
    except:
        message = {'detail': 'Class total failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getTeacher(reqeust):
    try:
        teachers = Teacher.objects.all()
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Teacher Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getIndividualTeacher(reqeust, pk):

    teachers = Teacher.objects.filter(created_by_id=pk)
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)

    # message = {'detail': 'Teacher Information failed to fetched'}
    # return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getParent(request):
    try:
        parents = Parent.objects.all()
        serializer = ParentSerializer(parents, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Parent Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getIndividualTeacher(reqeust, pk):

    teachers = Teacher.objects.filter(created_by_id=pk)
    serializer = TeacherSerializer(teachers, many=True)

    return Response(serializer.data)

    # message = {'detail': 'Teacher Information failed to fetched'}
    # return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getIndividualParentID(reqeust, pk):
    parent = Parent.objects.get(parentsID=pk)
    serializer = ParentSerializer(parent, many=False)
    return Response(serializer.data)

    # message = {'detail': 'Teacher Information failed to fetched'}
    # return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getHomework(request):
    try:
        homework = Homework.objects.all()
        serializer = HomeworkSerializer(homework, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Homework Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getClass(reqeust):
    try:
        classes = Class.objects.all()
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Class Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getClassName(reqeust, pk):
    try:
        classes = Class.objects.get(classID=pk)
        return Response({"className": classes.className})
    except:
        message = {'detail': 'Class Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getClassByID(reqeust, pk):
    try:
        classe = Class.objects.get(classID=pk)
        serializer = ClassSerializer(classe, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Class Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getChildren(request):
    try:
        children = Children.objects.all()
        serializer = ChildrenSerializer(children, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Children Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def getAnnouncement(request):
#     try:
#         announcements = Announcement.objects.all().order_by('-announcementTime')
#         serializer = AnnouncementSerializer(announcements, many=True)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'Announcement Information failed to fetched'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getChildrenByParentID(request, pk):
    try:
        parent = Parent.objects.get(parentsID=pk)
        children = Children.objects.filter(parent=parent)
        serializer = ChildrenSerializer(children, many=True)
        return Response(serializer.data)
    except Parent.DoesNotExist:
        message = {
            'detail': 'Parent with ID {} does not exist'.format(pk)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Failed to retrieve children information'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getIndividualChildren(request, pk):
    try:
        children = Children.objects.filter(childID=pk)
        serializer = ChildrenSerializer(children, many=True)
        return Response(serializer.data)
    except Parent.DoesNotExist:
        message = {
            'detail': 'Parent with ID {} does not exist'.format(pk)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Failed to retrieve children information'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getChildrenByClassID(request, pk):
    try:
        class_ = Class.objects.get(classID=pk)
        children = Children.objects.filter(class_belong=class_)
        serializer = ChildrenSerializer(children, many=True)
        return Response(serializer.data)
    except Class.DoesNotExist:
        message = {
            'detail': 'Class with ID {} does not exist'.format(class_id)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Failed to retrieve children information'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getClassByTeacherID(request, pk):
    try:
        teacher = Teacher.objects.get(teacherID=pk)
        class_ = Class.objects.filter(teacher=teacher)
        serializer = ClassSerializer(class_, many=True)
        return Response(serializer.data)
    except Teacher.DoesNotExist:
        message = {'detail': 'Teacher with ID {} does not exist'.format(pk)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Failed to retrieve class information'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getSubjectGradeByChildID(request, pk):
    try:
        children = Children.objects.get(childID=pk)
        subject_grades = SubjectGrade.objects.filter(children=children)
        subject_data = []
        for subject_grade in subject_grades:
            subject = Subject.objects.get(
                subjectID=subject_grade.subject.subjectID)
            subject_data.append({
                "subjectID": subject.subjectID,
                "subject": subject.subject,
                "grade": subject_grade.grade
            })
        return Response(subject_data)
    except Children.DoesNotExist:
        message = {'detail': 'Child with ID {} does not exist'.format(pk)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Failed to retrieve subject grade information'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getAttendanceList(request):
    try:
        data = request.data
        teacher = Teacher.objects.get(teacherID=data["teacher"])
        class_ = Class.objects.filter(teacher=teacher)
        subject = Subject.objects.get(subjectID=data["subject"])
        attendance = Attendance.objects.filter(class_Belong=class_)
        attendance = Attendance.objects.filter(subject=subject)
        attendance = Attendance.objects.filter(teacher=teacher)
        attendance = Attendance.objects.filter(
            created_date_only=data["created_date"])  # YYYY-MM-DD format
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)
    except Teacher.DoesNotExist:
        message = {'detail': 'Attendance with ID {} does not exist'.format(pk)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Failed to retrieve Attendance information'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getSubject(request):
    try:
        subject = Subject.objects.all()
        serializer = SubjectSerializer(subject, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Children Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def createAttendanceList(request):
    try:
        data = request.data
        attendance_list = []
        subject = Subject.objects.get(subjectID=data["subject"])
        children = Children.objects.filter(class_belong=data["class_belong"])
        teacher = Teacher.objects.get(teacherID=data["teacher"])
        for child in children:
            attendance = Attendance.objects.create(
                subject=subject,
                children=child,
                attendance=False,
                teacher=teacher,
                class_Belong=child.class_belong,
                parent=child.parent
            )

        return Response({'detail': 'Attendance list for ' + " " + subject.subjectID + "-" + subject.subject + " has been created"}, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'attendance  failed to created'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getAnnouncement(request):
    try:
        # Get the current date and time
        current_time = timezone.now()
        announcement_announcement = []
        # Filter the announcements to exclude future announcements
        announcements = Announcement.objects.filter(
            announcementSchedule__lte=current_time).order_by('-announcementSchedule')

        for announcement in announcements:
            if announcement.announcementSchedule < current_time:
                announcement_announcement.append({
                    "announcementID": announcement.announcementID,
                    "announcementTitle": announcement.announcementTitle,
                    "announcementDesc": announcement.announcementDesc,
                    "announcementTime": announcement.announcementTime,
                    "announcementSchedule": announcement.announcementSchedule,
                })

        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Announcement Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getClassAverageComparison(request):
    # try:
    classes = Class.objects.all()
    subject_grades = SubjectGrade.objects.all()
    class_average = []

    for c in classes:
        subjectTotal = 0
        children = Children.objects.filter(class_belong=c)
        grade_sum = 0
        child_count = children.count()
        if child_count > 0:
            for child in children:
                subjectChild = subject_grades.filter(children=child)
                if subjectChild.count() > 0:
                    for subject_grade in subjectChild:
                        grade_sum += float(subject_grade.grade)
                subjectTotal += subjectChild.count()
            class_average.append({
                'Class': c.className,
                'class_id': c.classID,
                'Average': round(grade_sum / subjectTotal, 2),
                'subjectChild': subjectTotal,
            })
    class_average = sorted(
        class_average, key=lambda x: x['Average'], reverse=True)
    return Response(class_average)
    # except:
    #     message = {
    #         'detail': 'Class Average Comparison Information failed to fetched'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getRanking(request):
    # try:
    children = Children.objects.all()
    subject_grades = SubjectGrade.objects.all()
    ranking = []
    child_ids = []
    for child in children:
        subjectChild = subject_grades.filter(children=child)
        grade_sum = 0
        if subjectChild.count() > 1:
            if child.childID not in child_ids:
                child_ids.append(child.childID)
                for subject_grade in subjectChild:
                    grade_sum += float(subject_grade.grade)

                grade_average = round(
                    (grade_sum / subjectChild.count()), 2)

                ranking.append({
                    'child_name': child.childFirstName + " " + child.childLastName,
                    'class': child.class_belong.className,
                    'subject_avg': grade_average,
                    'childID': child.childID,
                })

    ranking = sorted(ranking, key=lambda x: x['subject_avg'], reverse=True)
    return Response(ranking)
    # except:
    #     message = {'detail': 'Global Ranking Information failed to fetched'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getClassRanking(request, pk):
    try:
        children = Children.objects.filter(class_belong=pk)
        subject_grades = SubjectGrade.objects.all()
        ranking = []
        child_ids = []
        for child in children:
            subjectChild = subject_grades.filter(children=child)
            grade_sum = 0
            if subjectChild.count() > 1:
                if child.childID not in child_ids:
                    child_ids.append(child.childID)
                    for subject_grade in subjectChild:
                        grade_sum += float(subject_grade.grade)
                        grade_average = round(
                            (grade_sum / subjectChild.count()), 2)
                    classBelong = Class.objects.get(classID=child.class_belong)
                    if child is not None and child.class_belong is not None:
                        ranking.append({
                            'child_name': child.childFirstName + " " + child.childLastName,
                            'class': classBelong.className,
                            'subject_avg': grade_average,
                            'childID': child.childID,
                        })
                    else:
                        ranking.append({
                            'child_name': child.childFirstName + " " + child.childLastName,
                            'class': "-",
                            'subject_avg': grade_average,
                            'childID': child.childID,
                        })

        ranking = sorted(ranking, key=lambda x: x['subject_avg'], reverse=True)
        return Response(ranking)
    except:
        message = {'detail': 'Class Ranking Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@receiver(post_save, sender=Children)
def update_children_gender_count(sender, **kwargs):
    male_children = Children.objects.filter(childGender="M").count()
    female_children = Children.objects.filter(childGender="F").count()
    cache.set("male", male_children)
    cache.set("female", female_children)


@receiver(post_delete, sender=Children)
def update_children_gender_count_on_delete(sender, **kwargs):
    male_children = Children.objects.filter(childGender="M").count()
    female_children = Children.objects.filter(childGender="F").count()
    cache.set("male", male_children)
    cache.set("female", female_children)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getChildrenGender(request):
    try:
        male_children = Children.objects.filter(childGender="M").count()
        female_children = Children.objects.filter(childGender="F").count()
        data = {'male': male_children, 'female': female_children}
        return Response(data)
    except:
        message = {'detail': 'demographic Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def newBankName(request):
    data = request.data
    try:
        bank = BankName.objects.create(
            bankName=data["bankName"],
        )

        serializer = BankNameSerializer(bank, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'failed to create a new bank'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteBank(request):
    try:
        bank = BankName.objects.get(
            bankName="['Maybank', 'CIMB Bank', 'Public Bank', 'RHB Bank', 'Hong Leong Bank', 'AmBank', 'Bank Rakyat', 'OCBC Bank', 'HSBC Bank', 'Standard Chartered Bank', 'Alliance Bank', 'UOB Bank', 'Affin Bank', 'Bank Islam', 'Citibank', 'MBSB Bank']")
        bank.delete()
        return Response({"message": "bank with ID {} successfully deleted".format(pk)})
    except:
        message = {'detail': 'bank fail to delete'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getBankName(request):
    data = request.data
    try:
        bankname = BankName.objects.all()
        serializer = BankNameSerializer(bankname, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'failed to get bank list'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getAttendance(request):
    try:
        attendance = Attendance.objects.all()
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Attendance Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def newTeacher(request):
    data = request.data
    try:
        Created_by = User.objects.get(userID=data["userID"])
        teacher = Teacher.objects.create(
            teacherFirstName=data["teacherFirstName"],
            teacherLastName=data["teacherLastName"],
            teacherEmail=data["teacherEmail"],
            created_by=Created_by,
            teacherContactphone=data["teacherContactphone"],
            bankAccountHolder=data["bankAccountHolder"],
            teacherBankName=data["teacherBankName"],
            teacherBankAcc=data["teacherBankAcc"],
        )
    except:
        message = {'detail': 'failed to create a new teacher'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateTeacher(request, pk):
    try:
        data = request.data
        teacher = Teacher.objects.get(teacherID=pk)
        created_by = User.objects.get(userID=data['created_by'])
        teacher.created_by = created_by
        teacher.teacherFirstName = data['teacherFirstName']
        teacher.teacherLastName = data['teacherLastName']
        teacher.teacherEmail = data['teacherEmail']
        teacher.teacherContactphone = data['teacherContactphone']
        teacher.bankAccountHolder = data['bankAccountHolder']
        teacher.teacherBankName = data['teacherBankName']
        teacher.teacherBankAcc = data['teacherBankAcc']
        teacher.save()
        serializer = TeacherSerializer(teacher, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Teacher fail to update'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request, pk):
    # try:
    user = User.objects.get(userID=pk)
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.username = data['username']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)
    # except:
    #     message = {'detail': 'update user fail'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def newParent(request):
    data = request.data
    try:
        created_by = User.objects.get(userID=data["created_by"])
        parent = Parent.objects.create(
            created_by=created_by,
            parentsType=data['parentsType'],
            parentsFirstName=data['parentsFirstName'],
            parentsLastName=data['parentsLastName'],
            parentsContactphone=data['parentsContactphone'],
            parentsEmail=data['parentsEmail'],
            secondParentEmail=data['secondParentEmail'],
            parentsAddress=data['parentsAddress'],
            parentsDOB=data['parentsDOB'],
        )

        serializer = ParentSerializer(parent, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'New Parent fail to do so'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateParent(request, pk):
    try:
        data = request.data
        parent = Parent.objects.get(parentsID=pk)
        created_by = User.objects.get(userID=data['created_by'])
        parent.created_by = created_by
        parent.parentsType = data['parentsType']
        parent.parentsFirstName = data['parentsFirstName']
        parent.parentsLastName = data['parentsLastName']
        parent.parentsContactphone = data['parentsContactphone']
        parent.parentsEmail = data['parentsEmail']
        parent.secondParentEmail = data['secondParentEmail']
        parent.parentsAddress = data['parentsAddress']
        parent.parentsDOB = data['parentsDOB']
        parent.save()

        serializer = ParentSerializer(parent, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Parent fail to update'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteParent(request, pk):
    try:
        parent = Parent.objects.get(parentsID=pk)
        parent.delete()
        return Response({"message": "Parent with ID {} successfully deleted".format(pk)})
    except:
        message = {'detail': 'parent fail to delete'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def newChildren(request):
    data = request.data
    try:
        parent = Parent.objects.get(parentsID=data["parent"])
        class_belong = Class.objects.get(classID=data["class_belong"])
        children = Children.objects.create(
            childFirstName=data["childFirstName"],
            childLastName=data["childLastName"],
            childGender=data["childGender"],
            childDOB=data["childDOB"],
            parent=parent,
            class_belong=class_belong,
        )

        serializer = ChildrenSerializer(children, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'New children fail to do so'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateChildren(request, pk):

    data = request.data
    children = Children.objects.get(childID=pk)
    class_belong = Class.objects.get(classID=data["class_belong"])
    children.childFirstName = data["childFirstName"]
    children.childLastName = data["childLastName"]
    children.childGender = data["childGender"]
    children.childDOB = data["childDOB"]
    children.class_belong = class_belong
    children.save()
    serializer = ChildrenSerializer(children, many=False)
    return Response(serializer.data)

# delete subject


@api_view(['DELETE'])
def deleteChildren(request, pk):
    try:
        children = Children.objects.get(childID=pk)
        children.delete()
        return Response({"message": "Children with ID {} successfully deleted".format(pk)})
    except Subject.DoesNotExist:
        message = {'detail': 'subject not found'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def newAttendance(request):
    data = request.data
    try:
        subject = Subject.objects.get(subjectID=data["subject"])
        children = Children.objects.get(childID=data["children"])
        teacher = Teacher.objects.get(teacherID=data["teacher"])
        parent = Parent.objects.get(parentsID=data["parent"])
        Class_Belong = Class.objects.get(classID=data["class_Belong"])
        attendance = Attendance.objects.create(
            subject=subject,
            children=children,
            teacher=teacher,
            parent=parent,
            class_Belong=Class_Belong,
            attendance=data['attendance'],
        )

        serializer = AttendanceSerializer(attendance, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'New attendance fail to do so'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# create new subject


@api_view(['PUT'])
def newSubject(request):
    data = request.data
    try:
        subject = Subject.objects.create(
            subject=data["subject"],
        )

        serializer = SubjectSerializer(subject, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Children Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# delete subject


@api_view(['DELETE'])
def deleteSubject(request, pk):
    try:
        subject = Subject.objects.get(subjectID=pk)
        subject.delete()
        return Response({"message": "Subject with ID {} successfully deleted".format(pk)})
    except Subject.DoesNotExist:
        message = {'detail': 'subject not found'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

# create new annoucement


@api_view(['PUT'])
def newAnnouncement(request):
    data = request.data
    try:
        announcement = Announcement.objects.create(
            announcementTitle=data["announcementTitle"],
            announcementDesc=data["announcementDesc"],
            announcementSchedule=data["announcementSchedule"],
            announcementTime=data["announcementTime"],
        )

        serializer = AnnouncementSerializer(announcement, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'announcement fail to create'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteAnnouncement(request, pk):
    try:
        announcement = Announcement.objects.get(announcementID=pk)
        announcement.delete()
        return Response({"message": "Announcement with ID {} successfully deleted".format(pk)})
    except Announcement.DoesNotExist:
        message = {'detail': 'announcement not found'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def getGrades(request):
    try:
        grades = SubjectGrade.objects.all()
        serializer = SubjectGradeSerializer(grades, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Grades Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def newSubjectGrade(request):
    data = request.data
    try:
        children = Children.objects.get(childID=data["children"])
        teacher = Teacher.objects.get(teacherID=data["teacher"])
        parent = Parent.objects.get(parentsID=data["parent"])
        subject = Subject.objects.get(subjectID=data["subject"])
        subject_grade = SubjectGrade.objects.create(
            children=children,
            grade=data["grade"],
            parent=parent,
            teacher=teacher,
            subject=subject
        )
        serializer = SubjectSerializer(subject_grade, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'subject grade failed to create'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateSubjectGrade(request, pk):
    try:
        data = request.data
        subject_grade = SubjectGrade.objects.get(subject_gradeID=pk)
        children = Children.objects.get(childID=data["children"])
        teacher = Teacher.objects.get(teacherID=data["teacher"])
        parent = Parent.objects.get(parentsID=data["parent"])
        subject = Subject.objects.get(subjectID=data["subject"])
        subject_grade.children = children
        subject_grade.grade = data["grade"]
        subject_grade.parent = parent
        subject_grade.teacher = teacher
        subject_grade.subject = subject
        subject_grade.save()
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': 'subject fail to update'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteSubjectGrade(request, pk):
    try:
        subject_grade = SubjectGrade.objects.get(subject_gradeID=pk)
        subject_grade.delete()
        return Response({"message": "subjectGrade with ID {} successfully deleted".format(pk)})
    except:
        message = {'detail': 'subject grade fail to delete'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def newHomework(request):
    try:
        data = request.data

        teacher = Teacher.objects.get(teacherID=data["teacher"])
        subject = Subject.objects.get(subjectID=data["subject"])
        children = Children.objects.get(childID=data["children"])
        homework = Homework.objects.create(
            homeworkTitle=data['homeworkTitle'],
            homeworkDesc=data['homeworkDesc'],
            teacher=teacher,
            subject=subject,
            children=children,
        )
        serializer = HomeworkSerializer(homework, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'New homework fail to do so'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateHomework(request, pk):

    try:
        data = request.data

        homework = Homework.objects.get(homeworkID=pk)
        teacher = Teacher.objects.get(teacherID=data["teacher"])
        subject = Subject.objects.get(subjectID=data["subject"])
        children = Children.objects.get(childID=data["children"])
        homework.homeworkTitle = data['homeworkTitle']
        homework.homeworkDesc = data['homeworkDesc']
        homework.teacher = teacher
        homework.subject = subject
        homework.children = children
        homework.save()
        serializer = HomeworkSerializer(homework, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'homework update fail to do so'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteHomework(request, pk):
    try:
        homework = Homework.objects.get(homeworkID=pk)
        homework.delete()
        return Response({"message": "Homework with ID {} successfully deleted".format(pk)})
    except Homework.DoesNotExist:
        return Response({"error": "Homework with ID {} not found".format(pk)}, status=status.HTTP_404_NOT_FOUND)
    except:
        return Response({"error": "Failed to delete homework with ID {}".format(pk)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def newClass(request):
    data = request.data
    try:
        teacher = Teacher.objects.get(teacherID=data["teacher"])
        new_class = Class.objects.create(
            className=data['className'],
            teacher=teacher,
        )
        serializer = ClassSerializer(new_class, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'New Class fail to do so'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateClass(request, pk):
    try:
        data = request.data
        the_class = Class.objects.get(classID=pk)
        teacher = Teacher.objects.get(teacherID=data["teacher"])
        the_class.className = data["className"]
        the_class.teacher = teacher
        the_class.save()
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': 'class fail to update'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteClass(request, pk):
    try:
        class_obj = Class.objects.get(classID=pk)
        class_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except:
        message = {'detail': 'Class does not exist'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)
    
    
@api_view(['GET'])
def getChildAttendance(request, childID):
    try:
        # Get the child object based on the provided ID
        child = Children.objects.get(childID=childID)

        # Get the total number of classes for the child
        total_classes = Attendance.objects.filter(children=child).count()

        # Get the number of classes attended by the child
        attended_classes = Attendance.objects.filter(
            children=child, attendance=True).count()

        # Calculate the attendance percentage
        attendance_percentage = (attended_classes / total_classes) * 100

        # Format the attendance as a string in the format of 'x/y' where x is the number of attended classes and y is the total number of classes
        attendance_number = str(attended_classes) + '/' + str(total_classes)

        # Return the attendance percentage and number as a JSON response
        return Response({'attendance_percentage': attendance_percentage, 'attendance_number': attendance_number}, status=status.HTTP_200_OK)

    except Children.DoesNotExist:
        message = {'detail': 'Child not found'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

    except ZeroDivisionError:
        message = {'detail': 'This child has not attended any classes yet'}
        return Response(message, status=status.HTTP_200_OK) 

@apiview(['GET'])
def getAttendanceList(request):
    try:
        data = request.data
        teacher = Teacher.objects.get(teacherID=data["teacher"])
        classs = Class.objects.filter(teacher=teacher)
        subject = Subject.objects.get(subjectID=data["subject"])
        attendance = Attendance.objects.filter(classBelong=classs)
        attendance = Attendance.objects.filter(subject=subject)
        attendance = Attendance.objects.filter(teacher=teacher)
        attendance = Attendance.objects.filter(
            created_date_only=data["created_date"])  # YYYY-MM-DD format
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)
    except Teacher.DoesNotExist:
        message = {'detail': 'Attendance with ID {} does not exist'.format(pk)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Failed to retrieve Attendance information'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer


class TeacherViewset(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class TeacherViewset(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class ChildrenViewSet(viewsets.ModelViewSet):
    queryset = Children.objects.all()
    serializer_class = ChildrenSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer


class PrincipalViewSet(viewsets.ModelViewSet):
    queryset = Principal.objects.all()
    serializer_class = PrincipalSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )


class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer


class TodoListViewSet(viewsets.ModelViewSet):
    queryset = ToDoList.objects.all()
    serializer_class = TodoListSerializer


class ToDoItemViewSet(viewsets.ModelViewSet):
    queryset = ToDoItem.objects.all()
    serializer_class = ToDoItemSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class HomeworkViewSet(viewsets.ModelViewSet):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer


class SubjectGradeViewSet(viewsets.ModelViewSet):
    queryset = SubjectGrade.objects.all()
    serializer_class = SubjectGradeSerializer


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
