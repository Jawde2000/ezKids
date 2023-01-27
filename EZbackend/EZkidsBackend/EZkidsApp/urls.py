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

#     # api path for getting cart items by cartID
#     path('api/cart/retrieve/<str:pk>/',
#          views.getItemsbyCart, name='cart-items-by-id'),

    # api path for deleting cartitems
#     path('api/cart/item/delete/<str:pk>/',
#          views.removeCartItem, name='cart-items-remove'),

    # api path for register new user, method post
    path('api/users/register/', views.registerUser, name='register'),

    # payment processing api
#     path('api/payment/success/<str:pk>/',
#          views.paymentProcess, name='payment-process'),

    # api path for get all users, method get (only admin can access)
    path('api/users/', views.getUsers, name="users-profile"),
    # api path to get user profile (must be logged in first)
    path('api/users/profile/', views.getUserProfile, name="user-profile"),

    # get single user by id
    # path('api/user/<str:pk>/', views.getUserById, name='user'),

    # get customer by userID
#     path('api/user/customer/<str:pk>/',
#          views.getCustomerByUserID, name='customer-userid'),

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
    
    path('api/parents/', 
         views.getParent, name='parent-parentlist'),
    
    path('api/kids/', 
         views.getChildren, name='children-childrenlist'),
    
    # principal post the announcement
    path('api/post_announcement/', 
         views.principalPost, name='principal-Post'),
    
    # get class information list
    path('api/classes/', 
         views.getClass, name='class-classlist'),
    
    # get homework information list
    path('api/homework/', 
         views.getHomework, name='homework-homeworkList'),
    
    # create homework 
    path('api/new/homework/', 
         views.uploadHomework, name='homework-newHomework'),
    
    # get subject information list
    path('api/subjects/', 
         views.getSubject, name='subject-subjectlist'),
    
     #get children gender demographic
     path('api/childrengenderdemo/', 
         views.getChildrenGender, name='children-genderdemographic'),
    
    # create new subject
    path('api/new/subjects/', 
         views.newSubject, name='subject-newSubject'),
    
    # get attendance information list
    path('api/attendance/', 
         views.getAttendance, name='attendance-attendancelist'),
    
    # create new attendance
    path('api/new/attendance/', 
         views.newAttendance, name='attendance-newAttendance'),
    
    #create new teacher
    path('api/new/teacher/', 
         views.newTeacher, name='attendance-newTeacher'),
    
    #create new children
    path('api/new/children/',
         views.newChildren, name='children-newChildren'),
    
    #create new children
    path('api/new/parents/',
         views.newParent, name='parent-newParent'),
    
    #get individual teacher
    path('api/individualteacher/<str:pk>/', 
         views.getIndividualTeacher, name='teacher-individualTeacher'),

#     # get service by vendorID
#     path('api/user/service/<str:pk>/',
#          views.getServiceByVendorID, name='service-vendorid'),

#     path('api/service/<str:pk>/',
#          views.getServicebyID, name='service-serviceid'),

#     # get vendor helplist by vendorID
#     path('api/user/vendorhelp/<str:pk>/',
#          views.getVendorHelpByID, name='help-vendorid'),

#     # get vendor helplist by vendorID
#     path('api/user/cartitems/<str:pk>/',
#          views.getCartitemByCID, name='cartItem-cartid'),

#     # get list of services by location
#     path('api/service/routes', views.getRoutes, name='route-query'),

#     # get vendor name by vendor ID
#     path('api/vendor', views.getVendorName, name='vendor-query'),

#     # api path to update logged in user profile
#     path('api/user/profile/update/', views.updateUserProfile,
#          name="user-profile-update"),

#     # get location by locationID
#     path('api/location', views.getLocationByID,
#          name="location-query"),

#     # update user by id
#     path('api/user/update/<str:pk>/', views.updateUser,
#          name="user-update"),

#     path('api/vendor/list', views.getAllVendors,
#          name="vendor-list"),

#     # update customer by userid
#     path('api/user/customer/update/<str:pk>/',
#          views.updateCustomer, name="customer-update"),

    # update teacher by userid
    path('api/user/teacher/update/<str:pk>/',
         views.updateTeacher, name="teacher-update"),

#     # get helpdesk response by help id
#     path('api/help/response/<str:pk>/',
#          views.getHelpResponseByHelpID, name="help-detail"),

#     # get vendor as receiver by vendorID
#     path('api/user/vendorreceiver/<str:pk>/',
#          views.getReceiverHelpByID, name='receive-vendorid'),

#     # create helpdesk request
#     path('api/help/request/create/<str:pk>/',
#          views.createHelpDesk, name="help-create"),

#     # list help requests by user
#     path('api/help/request/list/<str:pk>/',
#          views.listHelpDeskbyUser, name="help-list-user"),

#     # get seat details by id for customer,
#     path('api/seat/detail/<str:pk>/', views.getSeatByID, name="seat-detail"),

#     # get vendor details by vendor id,
#     path('api/vendorD/<str:pk>/', views.getVendorDByVID, name="vDetail"),

    # api path to delete users
    path('api/user/delete/<str:pk>/', views.deleteUser, name='user-delete'),

    # api path to check user exist or not with email
    path('api/user/<str:pk>/',
         views.getUserByID, name='user-detail-email'),

#     # api path to reset password and send email to user
#     path('api/user/resetpass/<str:pk>/',
#          views.resetPassword, name='user-reset-pass'),

#     # api path to get all user vendor details
#     path('api/user/vendordetails',
#          views.getAllVendorDetails, name='get-all-vendorss'),

]
