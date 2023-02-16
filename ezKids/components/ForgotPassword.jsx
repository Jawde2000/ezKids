import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

function Register() {
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            userName: '',
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
                    }
                ]} 
                />
                <Button
                    mode={'contained'}
                    onPress={handleSubmit((data) => {
                        console.log("Submit Button Pressed");
                        console.log(data);
                })}>
                    Submit
                </Button>
        </View>
    )
}

export default Register;