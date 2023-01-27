from django.contrib.auth import get_user_model
from django.shortcuts import render
from .models import Teacher, Children, Class, Parent, ToDoList, ToDoItem, Announcement, Subject, Homework, SubjectGrade, Attendance, Principal
from .serializers import UserSerializer, UserSerializerWithToken, ParentSerializer, TeacherSerializer, ChildrenSerializer, ClassSerializer, PrincipalSerializer, AnnouncementSerializer, TodoListSerializer, ToDoItemSerializer, SubjectSerializer, HomeworkSerializer, SubjectGradeSerializer, AttendanceSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status
from EZkidsBackend.settings import EMAIL_HOST_USER
from django.core.mail import send_mail

from django.utils.crypto import get_random_string


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


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

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
def getUserByID(request, pk):
    try:
        user = User.objects.get(userID=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'No record Found with given email'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# reset user password


def get_random_pass():

    pwd = get_random_string(length=10)

    return str(pwd)


@api_view(['GET'])
def resetPassword(request, pk):
    try:
        user = User.objects.get(email=pk)
        serializer = UserSerializer(user, many=False)
        pwd = get_random_pass()
        user.password = make_password(pwd)
        user.save()

        subject = 'Reset Password'
        message = 'Dear customer, your password had been reseted to ' + pwd + \
            '. Please login to your account and edit your password as soon as posible.'
        recepient = str(pk)
        send_mail(subject, message, EMAIL_HOST_USER,
                  [recepient], fail_silently=False)

        return Response(serializer.data)
    except:
        message = {'detail': 'Fail to reset Password'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def getUserById(request, pk):
#     user = User.objects.get(userID=pk)
#     serializer = UserSerializer(user, many=False)
#     return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
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
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def getRoutes(request):
#     data = request.data

#     try:
#         locationone = Location.objects.get(locationName=data['locationFrom'])
#         serializerone = LocationSerializerIDonly(locationone, many=False)

#         locationtwo = Location.objects.get(locationName=data['locationTo'])
#         serializertwo = LocationSerializerIDonly(locationtwo, many=False)

#         services = Services.objects.all().filter(locationFrom=serializerone.data['locationID']).filter(
#             locationTo=serializertwo.data['locationID'])
#         serializer = ServicesSerializer(services, many=True)

#         return Response(serializer.data)
#     except:
#         message = {'detail': 'No routes exist'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def getLocationByID(request):
#     data = request.data

#     try:
#         loc = Location.objects.all().filter(locationID=data['locationID'])
#         serializer = LocationSerializer(loc, many=True)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'ID not found'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def getAllVendors(reqeust):
#     vendors = Vendor.objects.all()
#     serializer = VendorSerializerStripped(vendors, many=True)
#     return Response(serializer.data)


# @api_view(['GET'])
# def getAllVendorDetails(request):
#     users = User.objects.all().filter(is_vendor=True)
#     serializer = UserSerializer(users, many=True)
#     return Response(serializer.data)


# @api_view(['POST'])
# def getVendorName(request):
#     data = request.data

#     try:
#         vendor = Vendor.objects.get(vendorID=data['vendorID'])
#         serializer = VendorSerializer(vendor, many=False)

#         return Response(serializer.data)
#     except:
#         message = {'detail': 'No vendors exist'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def paymentProcess(request, pk):
#     data = request.data
#     try:
#         cart = Cart.objects.get(cartID=data['cartID'])
#         cartobj = CartItems.objects.filter(cart=cart)
#         user = User.objects.get(userID=pk)
#         em = user.email

#         payment = Payment.objects.create(
#             cart=cart,
#             paymentStatus='CP'
#         )
#         payment.save()

#         for obj in cartobj:
#             ticket = Ticket.objects.create(
#                 service=obj.service,
#                 ownBy=user,
#                 vendor=obj.service.vendor,
#                 payment=payment,
#                 cart=cart
#             )

#             if (obj.seat_Type == "F"):
#                 obj.service.seat.firstQuantity = obj.service.seat.firstQuantity - 1
#             elif (obj.seat_Type == "B"):
#                 obj.service.seat.businessQuantity = obj.service.seat.businessQuantity - 1
#             elif (obj.seat_Type == "E"):
#                 obj.service.seat.economyQuantity = obj.service.seat.economyQuantity - 1

#             obj.service.seat.save()

#             ticket.save()
#             subject = 'Thank you for your purchase from ' + obj.service.vendor.vendorName
#             message = 'Dear ' + user.username + ', your payment for a bus ticket from ' + obj.service.vendor.vendorName + ' has been completed!\n\n' + \
#                 'Please login in to view your ticket or click this link;\nhttp://localhost:3000/ticket/' + \
#                 ticket.ticketID + '\n\n From the friendly folks at eTix and ' + \
#                 obj.service.vendor.vendorName
#             recepient = str(em)
#             send_mail(subject, message, EMAIL_HOST_USER,
#                       [recepient], fail_silently=False)

#         serializer = PaymentSerializer(payment, many=False)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'Unsuccessful'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def removeCartItem(request, pk):
#     try:
#         cartItem = CartItems.objects.get(cartItemsID=pk).delete()

#         message = {'detail': 'Successful'}
#         return Response(message)
#     except:
#         message = {'detail': 'Unsuccessful'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# # update user profile


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateUserProfile(request):
#     user = request.user
#     serializer = UserSerializerWithToken(user, many=False)

#     data = request.data
#     user.username = data['username']
#     user.email = data['email']
#     user.is_active = data['is_active']

#     if data['password'] != '':
#         user.password = make_password(data['password'])

#     user.save()

#     return Response(serializer.data)


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateUser(request, pk):
#     user = User.objects.get(userID=pk)

#     data = request.data

#     user.username = data['username']
#     user.email = data['email']
#     user.is_active = data['is_active']

#     if data['password'] != '':
#         user.password = make_password(data['password'])

#     user.save()

#     serializer = UserSerializer(user, many=False)

#     return Response(serializer.data)

# update customer by userid


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateCustomer(request, pk):
#     customer = Customer.objects.get(created_by=pk)

#     data = request.data
#     customer.customerFirstName = data['customerFirstName']
#     customer.customerLastName = data['customerLastName']
#     customer.customerContact_Number = data['customerContact_Number']
#     customer.customerAddress = data['customerAddress']
#     customer.customerBirthday = data['customerBirthday']
#     customer.customerGender = data['customerGender']

#     customer.save()

#     serializer = CustomerSerializer(customer, many=False)

#     return Response(serializer.data)
# update vendor by userid


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTeacher(request, pk):
    
    try:
        teacher = Teacher.objects.get(created_by=pk)

        data = request.data
        teacher.teacherContactphone = data['teacherContactphone']
        teacher.teacherFirstName = data['teacherFirstName']
        teacher.teacherLastName = data['teacherLastName']
        teacher.teacherEmail = data['teacherEmail']
        teacher.bankAccountHolder = data['bankAccountHolder']
        teacher.teacherBankName = data['teacherBankName']
        teacher.teacherBankAcc = data['teacherBankAcc']

        teacher.save()
        serializer = TeacherSerializer(teacher, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Teacher failed to update'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def createHelpDesk(request, pk):

#     data = request.data

#     userreq = User.objects.get(userID=data['userID'])

#     if (pk == 'admin'):
#         helpreq = HelpDesk.objects.create(
#             helpdeskTitle=data['title'],
#             helpdeskMessage=data['message'],
#             user=userreq,
#             to_admin=True,
#             helpdeskStatus='OP'
#         )
#     else:
#         vendor = Vendor.objects.get(vendorID=pk)

#         helpreq = HelpDesk.objects.create(
#             helpdeskTitle=data['title'],
#             helpdeskMessage=data['message'],
#             user=userreq,
#             receiver=vendor,
#             to_vendor=True,
#             helpdeskStatus='OP'
#         )

#     helpreq.save()

#     serializer = HelpDeskSerializer(helpreq, many=False)

#     return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getItemsbyCart(request, pk):
#     cartitems = CartItems.objects.filter(cart=pk)
#     serializer = CartItemsSerializer(cartitems, many=True)

#     return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def listHelpDeskbyUser(request, pk):
#     helpreq = HelpDesk.objects.filter(user=pk)
#     serializer = HelpDeskSerializer(helpreq, many=True)

#     return Response(serializer.data)


# @api_view(['GET'])
# def getReceiverHelpByID(request, pk):
#     try:
#         helps = HelpDesk.objects.all().filter(receiver=pk)
#         serializer = HelpDeskSerializer(helps, many=True)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'receiver helplist is empty'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


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
@permission_classes([IsAdminUser])
def getTeacher(reqeust):
    try:
        teachers = Teacher.objects.all()
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Teacher Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getIndividualTeacher(reqeust, pk):
   
    teachers = Teacher.objects.filter(created_by_id=pk)
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)
 
        # message = {'detail': 'Teacher Information failed to fetched'}
        # return Response(message, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getParent(request):
    try:
        parents = Parent.objects.all()
        serializer = ParentSerializer(parents, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Parent Information failed to fetched'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

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
@permission_classes([IsAdminUser])
def getChildren(request):
    try:
        children = Children.objects.all()
        serializer = ChildrenSerializer(children, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Children Information failed to fetched'}
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
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getChildrenGender(request):
    try:
        male_children = Children.objects.filter(childGender="M").count()
        female_children = Children.objects.filter(childGender="F").count()
        data = {'male': male_children, 'female': female_children}
        return Response(data)
    except:
        message = {'details': 'Couldnt fetch children demographic'}
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
def newParent(request):
    data = request.data
    try:
        created_by = User.objects.get(username=data["created_by"])
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
        
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def principalPost(request):
    data = request.data
    try:
        announcement = Announcement.objects.create(
            announcement=data["announcement"],
            announcementSchedule=data["announcementSchedule"],
        )
        
        serializer = AnnouncementSerializer(announcement, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'announcement already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def uploadHomework(request):
    data = request.data
    try:
        homework = Homework.objects.create(
            homeworkTitle=data["homeworkTitle"],
            homeworkDesc=data["homeworkDesc"],
            teacher=data["teacher"],
            subject=data["subject"],
            children=data["children"],
        )
        
        serializer = HomeworkSerializer(homework, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'homework fail to post'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def getServiceByVendorID(request, pk):
#     try:
#         services = Services.objects.all().filter(vendor=pk)
#         serializer = ServicesSerializer(services, many=True)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'service not exist'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def getServicebyID(pk):
#     try:
#         services = Services.objects.get(serviceID=pk)
#         serializer = ServicesSerializer(services, many=false)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'serviceID invalid'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def getVendorHelpByID(request, pk):
#     try:
#         helps = HelpDesk.objects.all().filter(user=pk)
#         serializer = HelpDeskSerializer(helps, many=True)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'vendor helplist is empty'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def getVendorDByVID(request, pk):
#     try:
#         vendor = Vendor.objects.get(vendorID=pk)
#         serializer = VendorSerializer(vendor, many=False)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'vendor not found'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def getCartitemByCID(request, pk):
#     try:
#         cartItem = CartItems.objects.filter(cart=pk)
#         serializer = CartItemsSerializer(cartItem, many=True)
#         return Response(serializer.data)
#     except:
#         message = {'detail': 'cart items not found'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)

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


# class TicketViewSet(viewsets.ModelViewSet):
#     queryset = Ticket.objects.all()
#     serializer_class = TicketSerializer
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = (TokenAuthentication, )


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getHelpResponseByHelpID(reqeust, pk):
#     helpresponse = HelpResponse.objects.get(helpdesk=pk)
#     serializer = HelpResponseSerializer(helpresponse, many=False)
#     return Response(serializer.data)


# class HelpDeskViewSet(viewsets.ModelViewSet):
#     queryset = HelpDesk.objects.all()
#     serializer_class = HelpDeskSerializer
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = (TokenAuthentication, )


# class HelpResponseViewSet(viewsets.ModelViewSet):
#     queryset = HelpResponse.objects.all()
#     serializer_class = HelpResponseSerializer
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = (TokenAuthentication, )


# class CartViewSet(viewsets.ModelViewSet):
#     queryset = Cart.objects.all()
#     serializer_class = CartSerializer
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = (TokenAuthentication, )


# class CartItemsViewSet(viewsets.ModelViewSet):
#     queryset = CartItems.objects.all()
#     serializer_class = CartItemsSerializer
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = (TokenAuthentication, )


# class PaymentViewSet(viewsets.ModelViewSet):
#     queryset = Payment.objects.all()
#     serializer_class = PaymentSerializer
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = (TokenAuthentication, )


# class ServicesViewSet(viewsets.ModelViewSet):
#     queryset = Services.objects.all()
#     serializer_class = ServicesSerializer
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = (TokenAuthentication, )


# @api_view(['GET'])
# def getSeatByID(reqeust, pk):
#     seat = Seat.objects.get(seatID=pk)
#     serializer = SeatSerializer(seat, many=False)
#     return Response(serializer.data)


# class SeatViewSet(viewsets.ModelViewSet):
#     queryset = Seat.objects.all()
#     serializer_class = SeatSerializer
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = (TokenAuthentication, )


# class LocationViewSet(viewsets.ModelViewSet):
#     queryset = Location.objects.all()
#     serializer_class = LocationSerializer
