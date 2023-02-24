import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { userLoginReducer, userForgetReducer, userRegisterReducer,userUpdateReducer, logoutReducer, newAttendanceReducer, } from './redux/reducers/userReducers'
import {AsyncStorage} from 'react-native';
import { announcementReducer } from './redux/reducers/announcementReducer';
import { classesReducer, classStudentReducer, classRankingntReducer, updateChildrenReducer, parentReducer, 
    subjectGradeReducer,    newGradeReducer, updateGradeReducer, deleteGradeReducer, individualChildReducer
 } from './redux/reducers/classReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userForget: userForgetReducer,
    userRegister: userRegisterReducer,
    announcementList: announcementReducer,
    userUpdate: userUpdateReducer,
    logout: logoutReducer,
    newAttendances: newAttendanceReducer, 
    classList: classesReducer,
    classStudent: classStudentReducer,
    classRanking: classRankingntReducer,
    updateChildren: updateChildrenReducer,
    getParent: parentReducer,
    getSubjectGrade: subjectGradeReducer,
    newGrade: newGradeReducer,
    updategrade: updateGradeReducer,
    deleteGrade: deleteGradeReducer,
    individualChild: individualChildReducer,
})

// const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const userInfoFromStorage = AsyncStorage.getItem('userInfo') ? AsyncStorage.getItem('userInfo') : null


const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
    // userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]
const store = createStore(reducer, initialState ,composeWithDevTools(applyMiddleware(...middleware)))

export default store