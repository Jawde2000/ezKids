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

    path('api/class/<str:pk>/',
         views.getClassByID, name='class-classDetails'),

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

    # get children gender demographic
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

    # create attendance information list
    path('api/attendancelist/attendance/',
         views.createAttendanceList, name='attendance-createAttendancelist'),

    # get attendance information list
    path('api/attendancelist/',
         views.getAttendanceList, name='attendance-getAttendancelist'),

    # create new attendance
    path('api/new/attendance/',
         views.newAttendance, name='attendance-newAttendance'),

    # create new subject grade
    path('api/new/grade/',
         views.newSubjectGrade, name='grade-newGrade'),

    # update subject grade
    path('api/update/grade/<str:pk>/',
         views.updateSubjectGrade, name='grade-updateGrade'),

    # get subject grade
    path('api/grades/',
         views.getGrades, name='grade-getGrade'),

    # delete subject grade
    path('api/delete/grade/<str:pk>/',
         views.deleteSubjectGrade, name='grade-deleteGrade'),

    # create new annoucement
    path('api/new/announcement/',
         views.newAnnouncement, name='announcement-newAnnouncement'),

    # create new annoucement
    path('api/announcement/',
         views.getAnnouncement, name='announcement-getAnnouncement'),

    # delete annoucement
    path('api/delete/announcement/<str:pk>/',
         views.deleteAnnouncement, name='announcement-deleteAnnouncement'),

    # create new teacher
    path('api/new/teacher/',
         views.newTeacher, name='teacher-newTeacher'),

    # update teacher
    path('api/update/teacher/<str:pk>/',
         views.updateTeacher, name="teacher-updateTeacher"),

    # create new children
    path('api/new/children/',
         views.newChildren, name='children-newChildren'),

    # update children
    path('api/update/children/<str:pk>/',
         views.updateChildren, name='children-updateChildren'),

    # get children grade by childID
    path('api/grade/children/<str:pk>/',
         views.getSubjectGradeByChildID, name='children|grade -getSubjectGradeByChildID'),

    # get children by parentID
    path('api/parent/children/<str:pk>/',
         views.getChildrenByParentID, name='children|parent-getChildrenByParentsID'),

    # get children by classID
    path('api/class/children/<str:pk>/',
         views.getChildrenByClassID, name='children|classes-getChildrenByclassID'),

    # get class by teacherID
    path('api/class/teacher/<str:pk>/',
         views.getClassByTeacherID, name='class|teacher-getClassByTeacherID'),

    # get children ranking
    path('api/global/ranking/',
         views.getRanking, name='globalAll|children|ranking-getRanking'),

    # get class average ranking
    path('api/classaverage/ranking/',
         views.getClassAverageComparison, name='globalAll|children|ranking-getRanking'),

    # get children in same class ranking
    path('api/class/ranking/<str:pk>/',
         views.getClassRanking, name='class|children|ranking-getRanking'),

    # get bank name
    path('api/bankname/',
         views.getBankName, name='bankname|bank-getbankname'),

    # create bank name
    path('api/new/bankname/',
         views.newBankName, name='bankname|bank-newbankname'),

    # delete children
    path('api/delete/children/<str:pk>/',
         views.deleteChildren, name='children-deleteChildren'),

    # get parent list
    path('api/parents/',
         views.getParent, name='parent-parentlist'),

    # create new parents
    path('api/new/parents/',
         views.newParent, name='parent-newParent'),

    # update parents
    path('api/update/parents/<str:pk>/',
         views.updateParent, name='parent-updateParent'),

    # delete parents
    path('api/delete/parents/<str:pk>/',
         views.deleteParent, name='parent-deleteParent'),

    # get individual teacher
    path('api/individualteacher/<str:pk>/',
         views.getIndividualTeacher, name='teacher-individualTeacher'),

    # get individual parent
    path('api/individualParent/<str:pk>/',
         views.getIndividualParent, name='parent-individualParent'),

    # get individual parent
    path('api/individualParentID/<str:pk>/',
         views.getIndividualParentID, name='parent-individualParentID'),

    # get individual children
    path('api/individualChildren/<str:pk>/',
         views.getIndividualChildren, name='children-individualChildren'),

    # update teacher by userid
    path('api/user/teacher/update/<str:pk>/',
         views.updateTeacher, name="teacher-update"),

    # update teacher by userid
    path('api/classname/<str:pk>/',
         views.getClassName, name="class-name"),

    # api path to delete users
    path('api/user/delete/<str:pk>/', views.deleteUser, name='user-delete'),

     # api path to check user exist or not with email
    path('api/user/validation/<str:pk>/',
         views.getUserByEmail, name='user-detail-email'),

    # api path to reset password and send email to user
    path('api/user/resetpass/<str:pk>/',
         views.resetPassword, name='user-reset-pass'),
    
    # get children attendance information list
    path('api/attendances/<str:childID>/',
         views.getChildAttendance, name='class-classlist'),

    # create attendance information list
    path('api/attendancelist/attendance/',
         views.createAttendanceList, name='attendance-createAttendancelist'),
]
