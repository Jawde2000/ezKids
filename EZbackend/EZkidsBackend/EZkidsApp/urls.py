from django.urls import path, include
from EZkidsApp.views import ParentViewSet, TeacherViewset, ChildrenViewSet, ClassViewSet, PrincipalViewSet, AnnouncementViewSet, TodoListViewSet, ToDoItemViewSet, SubjectViewSet, HomeworkViewSet, SubjectGradeViewSet, AttendanceViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from . import views
user = settings.AUTH_USER_MODEL

router = DefaultRouter()
# router.register('users', UserViewSet, basename='users')
router.register('parent', ParentViewSet, basename='parent')
router.register('teacher', TeacherViewset, basename='teacher')
router.register('children', ChildrenViewSet, basename='children')
router.register('class', ClassViewSet, basename='class')
router.register('principal', PrincipalViewSet, basename='principal')
router.register('announcement', AnnouncementViewSet, basename='announcement')
router.register('todolist', TodoListViewSet, basename='todolist')
router.register('todoitem', ToDoItemViewSet, basename='todoitem')
router.register('subject', SubjectViewSet, basename='subject')
router.register('homework', HomeworkViewSet, basename='homework')
router.register('subjectgrade', SubjectGradeViewSet, basename='subjectgrade')
router.register('attendance', AttendanceViewSet, basename='attendance')


urlpatterns = [
    path('api/', include(router.urls)),

    # api path for login, method post
    path('api/users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    # api path for register new user, method post
    path('api/users/register/', views.registerUser, name='register'),

    # api path for get all users, method get (only admin can access)
    path('api/users/', views.getUsers, name="users-profile"),
    # api path to get user profile (must be logged in first)
    path('api/users/profile/', views.getUserProfile, name="user-profile"),
    
     # update user by id
    path('api/user/update/<str:pk>/', views.updateUserProfile,
         name="user-update"),

    # get teacher total number
    path('api/user/teacher/',
         views.getTeacherTotal, name='teacher-userid'),
    
    # get parent total number
    path('api/user/parent/',
         views.getParentTotal, name='parent-userid'),
    
    # get children total number
    path('api/user/children/',
         views.getChildrenTotal, name='parent-userid'),
    
    # get children total number
    path('api/user/classes/',
         views.getClassesTotal, name='class-userid'),
    
    # get all teacher
    path('api/teachers/',
         views.getTeacher, name='teacher-teacherlist'),
    
    path('api/kids/', 
         views.getChildren, name='children-childrenlist'),
    
    # get class information list
    path('api/classes/', 
         views.getClass, name='class-classlist'),
    
    # new class 
    path('api/new/class/', 
         views.newClass, name='class-newClass'),
    
    # update class 
    path('api/update/class/<str:pk>/', 
         views.updateClass, name='class-updateClass'),
    
    # delete class 
    path('api/delete/class/<str:pk>/', 
         views.deleteClass, name='class-deleteClass'),
    
    # get homework information list
    path('api/homework/', 
         views.getHomework, name='homework-homeworkList'),
    
    # create homework 
    path('api/new/homework/', 
         views.newHomework, name='homework-newHomework'),
    
    # create homework 
    path('api/update/homework/<str:pk>/', 
         views.updateHomework, name='homework-updateHomework'),
    
    # delete homework 
    path('api/delete/homework/<str:pk>/', 
         views.deleteHomework, name='homework-deleteHomework'),
    
    # get subject information list
    path('api/subjects/', 
         views.getSubject, name='subject-subjectlist'),
    
     #get children gender demographic
     path('api/childrengenderdemo/', 
         views.getChildrenGender, name='children-genderdemographic'),
    
    # create new subject
    path('api/new/subjects/', 
         views.newSubject, name='subject-newSubject'),
    
    # delete subject
    path('api/delete/subjects/<str:pk>/', 
         views.deleteSubject, name='subject-deleteSubject'),
    
    # get attendance information list
    path('api/attendance/', 
         views.getAttendance, name='attendance-attendancelist'),
    
    # create new attendance
    path('api/new/attendance/', 
         views.newAttendance, name='attendance-newAttendance'),
    
    # create new subject grade
    path('api/new/grade/', 
         views.newSubjectGrade, name='grade-newGrade'),
    
    # update subject grade
    path('api/update/grade/<str:pk>/', 
         views.updateSubjectGrade, name='grade-updateGrade'),
    
    # delete subject grade
    path('api/delete/grade/<str:pk>/', 
         views.deleteSubjectGrade, name='grade-deleteGrade'),
    
    # create new annoucement
    path('api/new/announcement/', 
         views.newAnnouncement, name='announcement-newAnnouncement'),
    
     # delete annoucement
    path('api/delete/announcement/<str:pk>/', 
         views.deleteAnnouncement, name='announcement-deleteAnnouncement'),
    
    #create new teacher
    path('api/new/teacher/', 
         views.newTeacher, name='teacher-newTeacher'),
    
    #update teacher
    path('api/update/teacher/<str:pk>/',
         views.updateTeacher, name="teacher-updateTeacher"),
    
    #create new children
    path('api/new/children/',
         views.newChildren, name='children-newChildren'),
    
    #create new children
    path('api/update/children/<str:pk>/',
         views.updateChildren, name='children-updateChildren'),
    
    #get children by parentID
    path('api/parent/children/<str:pk>/',
         views.getChildrenByParentID, name='children|parent-getChildrenByParentsID'),
    
    #get children by classID
    path('api/class/children/<str:pk>/',
         views.getChildrenByClassID, name='children|parent-getChildrenByParentsID'),
    
    #delete children
    path('api/delete/children/<str:pk>/',
         views.deleteChildren, name='children-deleteChildren'),
    
    #get parent list
     path('api/parents/', 
     views.getParent, name='parent-parentlist'),
        
    #create new parents
    path('api/new/parents/',
         views.newParent, name='parent-newParent'),
    
    #update parents
    path('api/update/parents/<str:pk>/',
         views.updateParent, name='parent-updateParent'),
    
    #delete parents
    path('api/delete/parents/<str:pk>/',
         views.deleteParent, name='parent-deleteParent'),
    
    #get individual teacher
    path('api/individualteacher/<str:pk>/', 
         views.getIndividualTeacher, name='teacher-individualTeacher'),


    # update teacher by userid
    path('api/user/teacher/update/<str:pk>/',
         views.updateTeacher, name="teacher-update"),

    # api path to delete users
    path('api/user/delete/<str:pk>/', views.deleteUser, name='user-delete'),

    # api path to check user exist or not with email
    path('api/user/<str:pk>/',
         views.getUserByID, name='user-detail-email'),

#     # api path to reset password and send email to user
#     path('api/user/resetpass/<str:pk>/',
#          views.resetPassword, name='user-reset-pass'),


]
