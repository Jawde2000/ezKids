import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { userLoginReducer, userForgetReducer, userRegisterReducer,userUpdateReducer } from './redux/reducers/userReducers'
import {AsyncStorage} from 'react-native';
import { announcementReducer } from './redux/reducers/announcementReducer';




const reducer = combineReducers({
    userLogin: userLoginReducer,
    userForget: userForgetReducer,
    userRegister: userRegisterReducer,
    announcementList: announcementReducer,
    userUpdate: userUpdateReducer
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