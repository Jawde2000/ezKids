import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

function Register() {
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
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
                        console.log("Login Button Pressed");
                        console.log(data);
                })}>
                    Submit
                </Button>
                <Button
                    mode={'contained'}
                    onPress={() => {
                        console.log("Forgot Password Button Pressed");
                }}>
                    Forgot Password
                </Button>
        </View>
    )
}

export default Register;