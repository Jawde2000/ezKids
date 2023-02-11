from django.contrib import admin
from .models import User, Teacher, Children, Class, Parent, ToDoList, ToDoItem, Announcement, Subject, Homework, SubjectGrade, Attendance, Principal
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserAdminCreationForm, UserAdminChangeForm

User = get_user_model()

# Remove Group Model from admin. We're not using it.
admin.site.unregister(Group)


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ['userID', 'email', 'username',
                    'is_superuser', 'is_parent', 'is_teacher']
    list_filter = ['is_superuser', 'is_parent', 'is_teacher']
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ()}),
        ('Permissions', {'fields': ('is_superuser',
                                    'is_active', 'is_parent', 'is_teacher')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password', 'password_2', 'is_superuser', 'is_active', 'is_parent', 'is_teacher')}
         ),
    )
    search_fields = ['email', 'username']
    ordering = ['email']
    filter_horizontal = ()


admin.site.register(User, UserAdmin)

@admin.register(Teacher)
class TeacherModel(admin.ModelAdmin):
    list_filter = ('teacherID', 'teacherContactphone')
    list_display = ('teacherID', 'teacherContactphone', 'bankAccountHolder',
                    'teacherBankName', 'teacherBankAcc')


@admin.register(Children)
class ChildrenModel(admin.ModelAdmin):
    list_filter = ('childID', 'class_belong')
    list_display = ('childID', 'class_belong')


@admin.register(Class)
class ClassModel(admin.ModelAdmin):
    list_filter = ('classID', 'className')
    list_display = ('classID', 'className')


@admin.register(Parent)
class ParentModel(admin.ModelAdmin):
    list_filter = ('parentsID', 'parentsType')
    list_display = ('parentsID', 'parentsType',
                    'parentsContactphone', 'parentsEmail')


@admin.register(Announcement)
class AnnouncementModel(admin.ModelAdmin):
    list_filter = ('announcementID', 'announcementTime')
    list_display = ('announcementID', 'announcementTime', 'announcementSchedule')


@admin.register(ToDoList)
class TodoListModel(admin.ModelAdmin):
    list_filter = ('title',)
    list_display = ('title',)


@admin.register(ToDoItem)
class TodoItemModel(admin.ModelAdmin):
    list_filter = ('todoID', 'title')
    list_display = ('todoID', 'title')


@admin.register(Subject)
class SubjectModel(admin.ModelAdmin):
    list_filter = ('subjectID', 'subject')
    list_display = ('subjectID', 'subject')


@admin.register(Homework)
class HomeworkModel(admin.ModelAdmin):
    list_filter = ('homeworkID',)
    list_display = ('homeworkID',)


@admin.register(SubjectGrade)
class SubjectGradeModel(admin.ModelAdmin):
    list_filter = ('subject_gradeID', 'grade')
    list_display = ('subject_gradeID', 'grade')


@admin.register(Attendance)
class AttendanceModel(admin.ModelAdmin):
    list_filter = ('attendanceID', 'attendance')
    list_display = ('attendanceID', 'attendance', "created_date_only")
    
@admin.register(Principal)
class PrincipalModel(admin.ModelAdmin):
    list_filter = ('principalID',)
    list_display = ('principalID',)
