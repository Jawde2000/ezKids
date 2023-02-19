import React from 'react';
import { ScrollView, View, Dimensions, Image } from 'react-native';
import { useTheme, Chip, Text } from 'react-native-paper';

import MenuChips from './widgets/MenuChips';
import Announcements from './widgets/Announcements';


const MainMenu = () => {
    const theme = useTheme();

    const [name, setName] = React.useState("Name")

    return (
        <View style={{backgroundColor: theme.colors.background, flexDirection: "column", alignItems: "center", height: '100%'}}>
            <View style={{marginTop: 30}}>
                <Image source={require('../assets/logo.png')} style={{resizeMode: "center", width: 250, height: 100}} />
            </View>
            <View>
                <Text style={{fontSize: 20, color: theme.colors.secondary}}>Welcome, {name}</Text>
            </View>
            <View style={{marginTop: 15, height: 35}}>
                {/* REMEMBER TO SET isTeacher */}
                <MenuChips isTeacher={false} />
            </View>
            <View style={{marginTop: 15}}>
                {/* <Announcements /> */}
            </View>
        </View>
    );
};

export default MainMenu;
