import React from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { Chip } from 'react-native-paper';

const MenuChips = (isTeacher) => {
  return (
    <ScrollView horizontal>
        {isTeacher? 
          <View style={{flexDirection: "row", flex: 1, justifyContent: 'space-around', width: Dimensions.get('window').width}}>
            <Chip mode='outlined' icon='google-classroom' onPress={() => console.log("My Classes Pressed")}>My Classes</Chip>
            <Chip mode='outlined' icon='qrcode-scan' onPress={() => console.log("QR Scan Pressed")}>Scan</Chip>
            <Chip mode='outlined' icon='account-settings' onPress={() => console.log("Settings Pressed")}>Scan</Chip>
          </View> 
        : 
          <View style={{flexDirection: "row", flex: 1, justifyContent: 'space-around', width: Dimensions.get('window').width}}>
            <Chip mode='outlined' icon='account-child' onPress={() => console.log("My Children Pressed")}>My Children</Chip>
            <Chip mode='outlined' icon='account-settings' onPress={() => console.log("Settings Pressed")}>Scan</Chip>
          </View> 
        }
    </ScrollView>
  );
};

export default MenuChips;