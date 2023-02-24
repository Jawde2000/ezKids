import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ToastAndroid, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from 'react-native-paper';
import { newAttendance } from '../redux/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import { NEW_ATTENDANCE_RESET } from '../redux/constants/userConstants';
import { ANNOUNCEMENT_REQUEST, ANNOUNCEMENT_RESET } from '../redux/constants/announcementConstants';

const QRScanner = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [childID, setChildID] = useState("");
  const dispatch = useDispatch()
  const [info, setInfo] = useState({});
  const [teacherID, setTeacherID] = useState("");

  const newAttendances = useSelector(state => state.newAttendances)
  const {loading: newAttendancesLoad, success: newAttendanceSuccess, error: newAttendanceError, data: newAttendanceData} = newAttendances

  useEffect(() => {
    async function getUserInfo() {
        const userDatas = await AsyncStorage.getItem('userInfo');
        const de_userDatas =  JSON.parse(userDatas);
        setTeacherID(de_userDatas[0].teacherID);
        dispatch({type: ANNOUNCEMENT_RESET});
        dispatch({type: ANNOUNCEMENT_REQUEST});
        console.log(teacherID);
        console.log(childID)
      }
      getUserInfo();
    }, [])

  useEffect(() => {
    console.log(newAttendanceData);
    console.log(newAttendanceSuccess);
    if (newAttendanceSuccess || newAttendanceError) {
      if(newAttendanceSuccess) {
        ToastAndroid.showWithGravity(
          newAttendanceData,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        ToastAndroid.showWithGravity(
          newAttendanceError,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }

      setInfo({});
      setChildID("");
      setScanned(false);
      dispatch({type: NEW_ATTENDANCE_RESET});
    }
  }, [newAttendanceSuccess, newAttendanceError, scanned])

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setChildID(data);
    if (teacherID) {
      const info = {
        childID: data,
        teacher: teacherID,
      };
      dispatch(newAttendance(info));
    }
  };

  if (hasPermission === null) {
    return <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>No access to camera</Text>;
  }

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={[StyleSheet.absoluteFillObject, { transform: [{ rotate: '270deg' }] }]}
      ratio={'4:3'} // or '3:4'
    />
    {scanned && newAttendanceSuccess &&
      <Button
        mode="contained"
        onPress={() => setScanned(false)}
        style={{width: 250, alignSelf: "center"}}
      >
        Scan Again
      </Button>
    }
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  result: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
});

export default QRScanner;
