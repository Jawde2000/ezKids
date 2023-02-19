import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, DevSettings, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';


function Profile() {
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
            bankAccountHolder: '',
            bankAccountName: '',
            bankAccount: '',
            dobYear: '',
            dobMonth: '',
            dobDay: '',
            userName: '',
            userPassword: ''
        }
    })

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
                        {
                            type: 'text',
                            name: 'dobDay',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter the day of your birth'
                                }
                            },
                            textInputProps: {
                                label: 'Day'
                            }
                        },
                        {
                            type: 'select',
                            name: 'dobMonth',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter the month of your birth'
                                }
                            },
                            textInputProps: {
                                label: 'Month'
                            },
                            options: [
                                {
                                    value: 1,
                                    label: 'January'
                                },
                                {
                                    value: 2,
                                    label: 'February'
                                },
                                {
                                    value: 3,
                                    label: 'March'
                                },
                                {
                                    value: 4,
                                    label: 'April'
                                },
                                {
                                    value: 5,
                                    label: 'May'
                                },
                                {
                                    value: 6,
                                    label: 'June'
                                },
                                {
                                    value: 7,
                                    label: 'July'
                                },
                                {
                                    value: 8,
                                    label: 'August'
                                },
                                {
                                    value: 9,
                                    label: 'September'
                                },
                                {
                                    value: 10,
                                    label: 'October'
                                },
                                {
                                    value: 11,
                                    label: 'November'
                                },
                                {
                                    value: 12,
                                    label: 'December'
                                }
                            ]
                        },
                        {
                            type: 'text',
                            name: 'dobYear',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter the year of your birth'
                                }
                            },
                            textInputProps: {
                                label: 'Year'
                            }
                        },
                        {
                            type: 'text',
                            name: 'userName',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter a username'
                                }
                            },
                            textInputProps: {
                                label: 'Username'
                            }
                        },
                        {
                            type: 'password',
                            name: 'userPassword',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Please enter a strong password'
                                }
                            },
                            textInputProps: {
                                label: 'Password'
                            }
                        },
                    ]} 
                    />
                    <Button
                        mode={'contained'}
                        onPress={handleSubmit((data) => {
                            console.log(data);
                            // logic here
                    })}>
                        Submit
                    </Button>
                </ScrollView>
        </View>
    )
}

export default Profile;