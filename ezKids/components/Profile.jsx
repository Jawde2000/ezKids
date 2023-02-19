import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, DevSettings, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { update } from '../redux/actions/userActions';

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
        }
    })

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading, error,data , e} = userUpdate

    const dispatch = useDispatch()

    const handleUpdate = (data) => {
        console.log(data);


        const toUpdate = {
            'teacherID': userData[0].teacherID,
            'created_by': userData.userID,
            'teacherFirstName': data.firstName,
            'teacherLastName': data.lastName,
            'teacherEmail': data.email,
            'teacherContactphone': data.contactNumber,
            'bankAccountHolder': data.bankAccountHolder,
            'teacherBankName' : data.bankAccountName,
            'teacherBankAcc': data.bankAccount
        }

        console.log(toUpdate);

        dispatch(update(toUpdate));
    }

    useEffect(() => {
        console.log(userUpdate)
        if(data){
           

            Alert.alert("Successfully Updated! Please Re Log In!");
            
            DevSettings.reload();

        } else if (error){
            Alert.alert("Fail to update"); 
        }
        
        
    }, [loading])

    


    useEffect(() => {
        async function getUserInfo() {
            const userDatas = await AsyncStorage.getItem('userInfo');
            const de_userDatas =  JSON.parse(userDatas);
            setUserData(de_userDatas);

            setValue('firstName', de_userDatas[0].teacherFirstName);
            setValue('lastName', de_userDatas[0].teacherLastName);
            setValue('email', de_userDatas[0].teacherEmail);
            setValue('contactNumber', de_userDatas[0].teacherContactphone);
            setValue('bankAccountHolder', de_userDatas[0].bankAccountHolder);
            setValue('bankAccountName', de_userDatas[0].teacherBankName);
            setValue('bankAccount', de_userDatas[0].teacherBankAcc);
        }
        getUserInfo();
    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View style={{marginTop: 30, alignSelf: 'center'}}>
                <Image source={require('../assets/logo.png')} style={{resizeMode: "center", width: 250, height: 100}} />
            </View>
            <ScrollView>
                <FormBuilder 
                    control={control} 
                    setFocus={setFocus}
                    formConfigArray={[
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
                                label: 'First Name'
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
                                label: 'Last Name'
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
                                label: 'Email'
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
                                label: 'Contact Number'
                            }
                        },
                        {
                            type: 'select',
                            name: 'bankAccountName',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter the bank account name'
                                }
                            },
                            textInputProps: {
                                label: 'Bank'
                            },
                            options: [
                                {
                                    value: 'maybank',
                                    label: 'Maybank'
                                },
                                {
                                    value: 'cimb',
                                    label: 'CIMB'
                                },
                                {
                                    value: 'public',
                                    label: 'Public Bank'
                                },
                                {
                                    value: 'rhb',
                                    label: 'RHB Bank'
                                },
                                {
                                    value: 'bsn',
                                    label: 'Bank Simpanan Nasional'
                                }
                            ]
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
                                label: 'Bank Account Holder'
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
                                label: 'Bank Account Number'
                            }
                        },
                    ]} 
                    />
                    <Button
                        mode={'contained'}
                        onPress={handleSubmit((data) => {
                            console.log(data);
                            // logic here
                            handleUpdate(data);
                    })}>
                        Submit
                    </Button>
                </ScrollView>
        </View>
    )
}

export default Profile;