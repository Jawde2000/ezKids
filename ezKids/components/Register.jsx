import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

function Register() {
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
            type: '',
            dobYear: '',
            dobMonth: '',
            dobDay: '',
            userName: '',
            userPassword: ''
        }
    })

    return (
        <View>
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
                        name: 'Email',

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
                        name: 'type',

                        rules: {
                            required: {
                                value: true,
                                message: 'Please enter the guardian type'
                            }
                        },
                        textInputProps: {
                            label: 'Guardian Type'
                        },
                        options: [
                            {
                                value: 'mother',
                                label: 'Mother'
                            },
                            {
                                value: 'father',
                                label: 'Father'
                            },
                            {
                                value: 'guardian',
                                label: 'Guardian'
                            },
                        ]
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
                })}>
                    Submit
                </Button>
        </View>
    )
}

export default Register;