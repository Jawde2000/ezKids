import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

function Register() {
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            email: '',
        }
    })


    const handleForgot = (data) => {

    }

    return (
        <View>
            <FormBuilder 
                control={control} 
                setFocus={setFocus}
                formConfigArray={[
                    {
                        type: 'email',
                        name: 'email',

                        rules: {
                            required: {
                                value: true,
                                message: 'Please enter a email'
                            },
                            pattern: {value:/^\S+@\S+$/i, message: 'please enter a valid email'},
                        },
                        textInputProps: {
                            label: 'email'
                        }
                    }
                ]} 
                />
                <Button
                    mode={'contained'}
                    onPress={handleSubmit((data) => {
                        console.log("Submit Button Pressed");
                        console.log(data);
                        handleForgot(data);
                })}>
                    Submit
                </Button>
        </View>
    )
}

export default Register;