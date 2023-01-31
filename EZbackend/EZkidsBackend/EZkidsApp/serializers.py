from rest_framework import serializers
from .models import User, Teacher, Children, Class, Parent, ToDoList, ToDoItem, Announcement, Subject, Homework, SubjectGrade, Attendance, Principal
from django.contrib.auth import get_user_model
from rest_framework.authtoken.views import Token
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userID', 'username', 'email',
                  'is_parent', 'is_staff', 'is_superuser', 'is_active']

        extra_kwargs = {'password': {
            'write_only': True,
            'required': True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['userID', 'username', 'email',
                  'is_parent', 'is_staff', 'is_superuser', 'is_teacher','is_active', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = ['parentsID', 'created_by', 'created_at', 'parentsType', 'parentsFirstName', 'parentsLastName', 
                  'parentsContactphone', 'parentsEmail', 'secondParentEmail', 'parentsAddress', 'parentsDOB']
        


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['teacherID', 'created_by', 'teacherFirstName', 'teacherLastName', 
                  'teacherEmail', 'teacherContactphone', 'bankAccountHolder', 'teacherBankName', 'teacherBankAcc']


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Children
        fields = ['childID', 'childDOB', 'childFirstName', 'childLastName', 'childGender', 'parent', 'class_belong']


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['classID', 'className', 'teacher']
        
class PrincipalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Principal
        fields = ['__all__']
        
    def create(self, validated_data):
        admin = Admin.objects.create_user(**validated_data)
        Token.objects.create(admin=admin)
        return admin

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['announcementID', 'announcementTitle', 'announcementDesc','announcementTime', 'announcementSchedule']


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoList
        fields = '__all__'


class ToDoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoItem
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__' 


class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ['homeworkID', 'homeworkTitle', 'homeworkDesc', 'teacher', 'subject', 'children', 'created_date']


class SubjectGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectGrade
        fields = ['subject_gradeID', 'subject', "grade", "parent", "teacher", "children"]

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['attendanceID', 'subject', 'children', 'attendance', 'parent', 'teacher', 'class_Belong', 'created_date', "created_date_only"]
