import React from 'react';
import { useEffect } from 'react';
import { ScrollView, View, Dimensions, ToastAndroid, Text, TouchableOpacity, StyleSheet} from 'react-native';
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

const ChipButton = ({ onPress, icon, text, backgroundColor }) => {
  return (
    <TouchableOpacity style={[styles.chip, { backgroundColor }]} onPress={onPress}>
      <Icon name={icon} size={20} color='#fff' style={{ marginRight: 10 }} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
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
    <View style={styles.container}>
        <View style={styles.row}>
        <ChipButton
            onPress={() => navigation.navigate('Class')}
            icon='google-classroom'
            text='Classes'
            backgroundColor='#FFA500'
          />
          <ChipButton
            onPress={() => navigation.navigate('QRscanner')}
            icon='qrcode-scan'
            text='Attendance'
            backgroundColor='#FFBD44'
          />
        </View>
        <View style={styles.row}>
          <ChipButton
            onPress={() => navigation.navigate('Profile')}
            icon='account-settings'
            text='Settings'
            backgroundColor='#B6D5F0'
          />
          <ChipButton
            onPress={logoutnow}
            icon='logout'
            text='Logout'
            backgroundColor='#578ACB'
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollView: {
      padding: 10,
      maxWidth: 400,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 30,
      width: "45%",
      borderRadius: 20,
      elevation: 5,
    },
    text: {
      color: '#fff',
      fontSize: 16,
    },
});

export default MenuChips;
