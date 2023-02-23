import React from 'react';
import { ScrollView, View, Dimensions, Image } from 'react-native';
import { useTheme, Chip, Text } from 'react-native-paper';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AsyncStorage } from 'react-native';

import MenuChips from './widgets/MenuChips';
import Announcements from './widgets/Announcements';
import { logout } from '../redux/actions/userActions';
import { useNavigation } from '@react-navigation/native';


const MainMenu = ({navigation}) => {
    const theme = useTheme();

    const [name, setName] = React.useState("...")

    const [userData, setUserData] = React.useState({})
    const navigate = useNavigation();

    useEffect(() => {
        async function getUserInfo() {
            const userDatas = await AsyncStorage.getItem('userInfo');
            const de_userDatas =  JSON.parse(userDatas);
            setUserData(de_userDatas);
            setName(de_userDatas[0].teacherFirstName + " " + de_userDatas[0].teacherLastName)
            
        }
        getUserInfo();
    }, [])

    useEffect(() => {
        if (!Object.keys(userData).length === 0) {
            navigate.navigate("Login")
        }
    }, [userData])

    return (
        <View style={{backgroundColor: theme.colors.background, flexDirection: "column", alignItems: "center", height: '100%'}}>
            <View style={{marginTop: 30}}>
                <Image source={require('../assets/logo.png')} style={{resizeMode: "center", width: 250, height: 100}} />
            </View>
            <View>
                <Text style={{fontSize: 20, color: theme.colors.secondary}}>Welcome, {name}</Text>
            </View>
            <View style={{marginTop: 15, height: 105}}>
                {/* REMEMBER TO SET isTeacher */}
                <MenuChips isTeacher={userData? userData.is_teacher: false} />
            </View>
            <View style={{marginTop: 35}}>
                <Announcements />
            </View>
        </View>
    );
};

export default MainMenu;
