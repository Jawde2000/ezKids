import React from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



const MenuChips = (props) => {
  const navigation = useNavigation();

  
  return (
    <ScrollView horizontal>
        {props.isTeacher? 
          <View style={{flexDirection: "row", flex: 1, justifyContent: 'space-around', width: Dimensions.get('window').width}}>
            <Chip mode='outlined' icon='google-classroom' onPress={() => navigation.navigate('Class')}>My Classes</Chip>
            <Chip mode='outlined' icon='qrcode-scan' onPress={() => console.log("QR Scan Pressed")}>Scan</Chip>
            <Chip mode='outlined' icon='account-settings' onPress={() => navigation.navigate('Profile')}>Settings</Chip>
          </View> 
        : 
          <View style={{flexDirection: "row", flex: 1, justifyContent: 'space-around', width: Dimensions.get('window').width}}>
            <Chip mode='outlined' icon='account-child' onPress={() => console.log("My Children Pressed")}>My Children</Chip>
            <Chip mode='outlined' icon='account-settings' onPress={() => console.log("Settings Pressed")}>Settings</Chip>
          </View> 
        }
    </ScrollView>
  );
};

export default MenuChips;
