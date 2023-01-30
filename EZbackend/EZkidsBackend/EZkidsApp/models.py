from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import random
from django.utils.crypto import get_random_string
from django.utils import timezone
from django.urls import reverse
import uuid

def one_week_hence():
    return timezone.now() + timezone.timedelta(days=7)

# Create your models here.
class ToDoList(models.Model):
    title = models.CharField(max_length=100, unique=True)

    def get_absolute_url(self):
        return reverse("list", args=[self.id])

    def __str__(self):
        return self.title

class ToDoItem(models.Model):
    def generate_todo_id():
        while True:
            code = "T" + str(random.randint(100000, 999999)) + "D"
            if ToDoItem.objects.filter(todoID=code).count() == 0:
                break
        return code
    todoID = models.TextField(
        default=generate_todo_id, primary_key=True, unique=True, editable=False, max_length=8)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(default=one_week_hence)
    todo_list = models.ForeignKey(ToDoList, on_delete=models.CASCADE)

    def get_absolute_url(self):
        return reverse(
            "item-update", args=[str(self.todo_list.id), str(self.id)]
        )

    def __str__(self):
        return f"{self.title}: due {self.due_date}"

    class Meta:
        ordering = ["due_date"]

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **other_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username, **other_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password, **other_fields):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            username=username,
            password=password, **other_fields
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    def generate_user_id():
        while True:
            code = "U" + str(random.randint(1000000, 9999999))
            if User.objects.filter(userID=code).count() == 0:
                break
        return code

    userID = models.CharField(
        default=generate_user_id, primary_key=True, unique=True, editable=False, max_length=8)
    username = models.CharField(max_length=100, blank=True, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    Last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_active = models.BooleanField(default=True)  # can login #vendor status
    is_principal = models.BooleanField(default=False)
    is_parent = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    # staff user but not superuser
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  # superuser

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        # "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        # "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
    
class Teacher(models.Model):
    def generate_teacher_id():
        while True:
            # E represent eTix & T represent ticket same goes to the above function
            code = "T" + str(random.randint(100000, 999999)) + "T"
            if Teacher.objects.filter(teacherID=code).count() == 0:
                break
        return code
    
    teacherID = models.CharField(
        default=generate_teacher_id, primary_key=True, unique=True, editable=False, max_length=8)
    created_by = models.OneToOneField(
        User, related_name="teacher", on_delete=models.CASCADE)
    teacherFirstName = models.CharField(max_length=128, blank=True)
    teacherLastName = models.CharField(max_length=128, blank=True)
    teacherEmail = models.EmailField(max_length=320, unique=True)
    teacherContactphone = models.TextField(max_length=16, blank=True)
    bankAccountHolder = models.CharField(max_length=100)
    teacherBankName = models.CharField(max_length=100)
    teacherBankAcc = models.CharField(max_length=16)
    
    class Meta:
        ordering = ['teacherID']

    def __str__(self):
        return self.teacherID
    
class Principal(models.Model):
    principalID = models.CharField(
        default=1, primary_key=True, unique=True, editable=False, max_length=8)
    
    class Meta:
        ordering = ['principalID']

    def __str__(self):
        return self.principalID
    
class Parent(models.Model):
    def generate_parent_id():
        while True:
            code = "P" + str(random.randint(1000000, 7999999))
            if Parent.objects.filter(parentsID=code).count() == 0:
                break
        return code
    parentsID = models.CharField(
        default=generate_parent_id, primary_key=True, unique=True, editable=False, max_length=8)
    created_by = models.OneToOneField(
        User, related_name="parent", on_delete=models.CASCADE)
    parentChoices = [
        ('M', 'Mother'),
        ('F', 'Father'),
        ('G', 'Guardian'),
    ]
    created_at = models.DateTimeField(auto_now_add=True)
    parentsType = models.CharField(
        max_length=1, blank=True, choices=parentChoices)
    parentsFirstName = models.CharField(max_length=128, blank=True)
    parentsLastName = models.CharField(max_length=128, blank=True)
    parentsContactphone = models.TextField(max_length=16, blank=True)
    parentsEmail = models.EmailField(max_length=320, unique=True)
    secondParentEmail = models.EmailField(max_length=320, unique=True)
    parentsAddress = models.TextField(max_length=200, blank=True)
    parentsDOB = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['parentsID']

    def __str__(self):
        return self.parentsID
    
class Class(models.Model):
    def generate_class_id():
        while True:
            code = "CL" + str(random.randint(800000, 999999))
            if Class.objects.filter(classID=code).count() == 0:
                break
        return code
    
    classID = models.CharField(
        default=generate_class_id, primary_key=True, unique=True, editable=False, max_length=8)
    className = models.CharField(max_length=16, blank=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    
class Children(models.Model):
    def generate_child_id():
        while True:
            code = "C" + str(random.randint(100000, 999999)) + "N"
            if Children.objects.filter(childID=code).count() == 0:
                break
        return code
    
    childFirstName = models.CharField(max_length=128, blank=True)
    childLastName = models.CharField(max_length=128, blank=True)
    childGenderChoices = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    childGender = models.CharField(
        max_length=1, blank=True, choices=childGenderChoices)
    childID = models.CharField(
        default=generate_child_id, primary_key=True, unique=True, editable=False, max_length=8)
    childDOB = models.DateField(blank=True, null=True)
    parent = models.ForeignKey(Parent, on_delete=models.SET_NULL, null=True,)
    class_belong = models.ForeignKey(Class, on_delete=models.SET_NULL, null=True)
    
class Announcement(models.Model):
    def generate_announcement_id():
        while True:
            code = "A" + str(random.randint(100000, 999999)) + "S"
            if Announcement.objects.filter(announcementID=code).count() == 0:
                break
        return code
    
    announcementID = models.CharField(
        default=generate_announcement_id, primary_key=True, unique=True, editable=False, max_length=8)
    announcementTitle = models.CharField(max_length=2500, blank=True)
    announcementDesc = models.CharField(max_length=5500, blank=True)
    announcementTime = models.DateTimeField(auto_now_add=True)
    announcementSchedule = models.DateTimeField(max_length=2500, blank=True)
    
class Subject(models.Model):
    def generate_subject_id():
        while True:
            code = "S" + str(random.randint(10000, 99999)) + "JJ"
            if Subject.objects.filter(subjectID=code).count() == 0:
                break
        return code

    subjectID = models.CharField(
        default=generate_subject_id, primary_key=True, unique=True, editable=False, max_length=8) 
    subject = models.CharField(max_length=128, blank=True)   

class Homework(models.Model):
    def generate_homework_id():
        while True:
            code = "H" + str(random.randint(10000, 99999)) + "HW"
            if Homework.objects.filter(homeworkID=code).count() == 0:
                break
        return code
    homeworkID = models.CharField(
        default=generate_homework_id, primary_key=True, unique=True, editable=False, max_length=8)
    homeworkTitle = models.CharField(max_length=55, blank=True)
    homeworkDesc = models.CharField(max_length=550, blank=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True)
    children = models.ForeignKey(Children, on_delete=models.SET_NULL, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    
class SubjectGrade(models.Model):
    def generate_grade_id():
        while True:
            code = "S" + str(random.randint(100000, 999999)) + "G"
            if SubjectGrade.objects.filter(subject_gradeID=code).count() == 0:
                break
        return code

    subject_gradeID = models.CharField(
        default=generate_grade_id, primary_key=True, unique=True, editable=False, max_length=8)
    children = models.ForeignKey(Children, on_delete=models.SET_NULL, null=True)
    grade = models.CharField(max_length=5, blank=True)
    parent = models.ForeignKey(Parent, on_delete=models.SET_NULL, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    subject = models.ForeignKey(Subject,  on_delete=models.SET_NULL, null=True)
    
class Attendance(models.Model):
    def generate_attendance_id():
        while True:
            code = "A" + str(random.randint(100000, 999999)) + "D"
            if Attendance.objects.filter(attendanceID=code).count() == 0:
                break
        return code
    
    attendanceID = models.CharField(
        default=generate_attendance_id, primary_key=True, unique=True, editable=False, max_length=8)
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True)
    children = models.ForeignKey(Children, on_delete=models.SET_NULL, null=True)
    attendance = models.BooleanField(default=False)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    class_Belong = models.ForeignKey(Class, on_delete=models.SET_NULL, null=True)
    parent = models.ForeignKey(Parent, on_delete=models.SET_NULL, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    
    
    