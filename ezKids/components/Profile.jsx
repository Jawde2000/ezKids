import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Text, View, Image, ScrollView, ToastAndroid, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../redux/constants/userConstants'

// import { DevSettings } from 'react-native';

function Profile() {

    const [userData, setUserData] = React.useState({})


    const {control, setFocus, handleSubmit, setValue} = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
            bankAccountHolder: '',
            bankAccountName: '',
            bankAccount: '',
            teacherID: '',
        }
    })

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading, error,data , success} = userUpdate

    const dispatch = useDispatch()

    const [bankNames, setBankNames] = useState([]);
    const [bankName, setBankName] = useState("");

    //for fetching class list
    const fetchData = () => {
        async function fetchBankName() {
            const response = await fetch("http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/bankname/");
            const data = await response.json();
            console.log(data)
            return setBankNames(data);
        }
        fetchBankName();
    }
    
    useEffect(() => {
        fetchData();
    },[])

    const handleUpdate = (data) => {
        console.log(data);


        const toUpdate = ({
            'teacherID': userData[0].teacherID,
            'created_by': userData.userID,
            'teacherFirstName': data.firstName,
            'teacherLastName': data.lastName,
            'teacherEmail': data.email,
            'teacherContactphone': data.contactNumber,
            'bankAccountHolder': data.bankAccountHolder,
            'teacherBankName' : data.bankAccountName,
            'teacherBankAcc': data.bankAccount
        })

        console.log(toUpdate);

        dispatch(update(toUpdate));
    }

    useEffect(() => {
        console.log(userUpdate)
        async function replace() {
            if(success){
                console.log(data)
                console.log("hello")
                ToastAndroid.showWithGravity(
                    'Profile update success',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                
                const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));

                // Accessing the first item in the userInfo object
                const toUpdate = {
                'teacherID': userInfo[0].teacherID,
                'created_by': userData.userID,
                'teacherFirstName': data.teacherFirstName,
                'teacherLastName': data.teacherLastName,
                'teacherEmail': data.teacherEmail,
                'teacherContactphone': data.teacherContactphone,
                'bankAccountHolder': data.bankAccountHolder,
                'teacherBankName' : data.teacherBankName,
                'teacherBankAcc': data.teacherBankAcc
                };

                // Updating the first item in the userInfo object
                userInfo[0] = toUpdate;
                console.log(userInfo)

                // Storing the updated object in AsyncStorage
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                dispatch({type: USER_UPDATE_RESET})
            } else if (error){
                ToastAndroid.showWithGravity(
                    'Profile update fail',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
            }
        }
        replace();
        
    }, [success])

    useEffect(() => {
        async function getUserInfo() {
            const userDatas = await AsyncStorage.getItem('userInfo');
            const de_userDatas =  JSON.parse(userDatas);
            setUserData(de_userDatas);
            console.log(userDatas)
            console.log("110")

            setValue('firstName', de_userDatas[0].teacherFirstName);
            setValue('lastName', de_userDatas[0].teacherLastName);
            setValue('email', de_userDatas[0].teacherEmail);
            setValue('contactNumber', de_userDatas[0].teacherContactphone);
            setValue('bankAccountHolder', de_userDatas[0].bankAccountHolder);
            setValue('bankAccountName', de_userDatas[0].teacherBankName);
            setValue('bankAccount', de_userDatas[0].teacherBankAcc);
            setValue('teacherID', de_userDatas[0].teacherID);
            setBankName(de_userDatas[0].teacherBankName)
        }
        getUserInfo();
    }, [])

    const handleBankNameChange = (value) => {
        setBankName(value);
    }

    return (
        <ScrollView>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2'}}>
            <View style={{marginTop: 30, alignSelf: 'center'}}>
                <Image source={require('../assets/profileIcon.png')} style={{resizeMode: "center", width: 250, height: 100}} />
            </View>
            <View style={{marginTop: 30, alignSelf: 'center'}}>

            </View>
                <FormBuilder 
                    control={control} 
                    setFocus={setFocus}
                    formConfigArray={[
                        {
                            type: 'text',
                            name: 'teacherID',
                            textInputProps: {
                              label: 'Teacher ID',
                              style: { width: 300 },
                              editable: false,
                            }
                        },
                        {
                            type: 'text',
                            name: 'firstName',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter your first name'
                                }
                            },
                            textInputProps: {
                                label: 'First Name',
                                style: { width: 300 }
                            }
                        },
                        {
                            type: 'text',
                            name: 'lastName',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter your last name'
                                }
                            },
                            textInputProps: {
                                label: 'Last Name',
                                style: { width: 300 }
                            }
                        },
                        {
                            type: 'email',
                            name: 'email',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter your email'
                                }
                            },
                            textInputProps: {
                                label: 'Email',
                                style: { width: 300 }
                            }
                        },
                        {
                            type: 'text',
                            name: 'contactNumber',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter your contact number'
                                }
                            },
                            textInputProps: {
                                label: 'Contact Number',
                                style: { width: 300 }
                            }
                        },
                        {
                            type: 'select',
                            name: 'bankAccountName',

                            textInputProps: {
                                defaultValue: bankName?bankName:null,
                                onChangeText: (text) => handleBankNameChange(text),
                                style: { width: 300 }
                            },
                            options: 
                                bankNames?.map((bank) => {
                                    return {
                                        value: bank.bankName,
                                        label: bank.bankName
                                    };
                                })
                            ,
                        },
                        {
                            type: 'text',
                            name: 'bankAccountHolder',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter your bank account holder'
                                }
                            },
                            textInputProps: {
                                label: 'Bank Account Holder',
                                style: { width: 300 }
                            }
                        },
                        {
                            type: 'text',
                            name: 'bankAccount',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter the bank account number'
                                }
                            },
                            textInputProps: {
                                label: 'Bank Account Number',
                                style: { width: 300 }
                            }
                        },
                    ]} 
                    />
                    <TouchableOpacity 
                        onPress={handleSubmit((data) => {
                            console.log(data);
                            // logic here
                            handleUpdate(data);
                        })} style={styles.button}
                    >
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '70%',
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default Profile;