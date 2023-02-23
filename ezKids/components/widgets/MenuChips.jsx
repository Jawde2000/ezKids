import React from 'react';
import { useEffect } from 'react';
import { ScrollView, View, Dimensions, ToastAndroid } from 'react-native';
import { Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Logout } from '../../redux/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import { LOGOUT_RESET } from '../../redux/constants/userConstants';

const chipStyle = {
  marginHorizontal: 10,
  marginBottom: 20,
  backgroundColor: '#FFFFFF',
  elevation: 3,
};

const textStyle = {
  color: '#333333',
  fontSize: 14,
  fontWeight: 'bold',
};

const MenuChips = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = useSelector(state => state.logout)
  const {loading: logoutLoading, error: errorlogout, success: logoutsuccess} = logout

  useEffect(() => {
    if(logoutsuccess) {
      dispatch({type: LOGOUT_RESET})
      navigation.navigate("Login")
    }
  }, [logoutsuccess])

  function logoutnow() {
    dispatch(Logout())
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{padding: 10, maxWidth: 400}}>
        <View style={{flexDirection: "row", justifyContent: 'space-around', marginBottom: 10}}>
          <Chip style={{marginRight: 10, width: '45%'}} mode='outlined' icon='google-classroom' onPress={() => navigation.navigate('Class')}>Classes</Chip>
          <Chip style={{marginRight: 10, width: '45%'}} mode='outlined' icon='qrcode-scan' onPress={() => navigation.navigate("QRscanner")}>Scan</Chip>
        </View> 
        <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
          <Chip style={{marginRight: 10, width: '45%'}} mode='outlined' icon='account-settings' onPress={() => navigation.navigate('Profile')}>Settings</Chip>
          <Chip style={{marginRight: 10, width: '45%'}} mode='outlined' icon='logout' onPress={logoutnow}>Logout</Chip>
        </View>
      </ScrollView>
    </View>

  );
};

export default MenuChips;
