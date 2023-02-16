import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Card, Modal, Portal } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

const StudentAmend = (props) => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    // aID and cID is parent/teacher and child consequtively (Since both can edit)
    // If adding (parent), cID/childID is undefined
    // If editing (parent & teacher), childID has data
    const [editorID, setEditorID] = React.useState(props.eID)
    const [childID, setChildID] = React.useState(props.cID)
    const [classes, setClasses] = React.useState([
        { value: "k1", label: "Kindergarten A" },
        { value: "k2", label: "Kindergarten B" },
        { value: "k3", label: "Kindergarten C" },
        { value: "k4", label: "Kindergarten D" },
        { value: "k5", label: "Kindergarten E" }
    ])

    // If childID exists, it means that the user is editing/deleting
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            firstName: childID? 'something is in here' : '',
            lastName: childID? 'is': '',
            gender: childID? '': '',
            class: childID? '': '',
            dobDay: childID? 'for logic': '',
            dobMonth: childID? '': '',
            dobYear: childID? 'please edit thx': ''
        }
    })

    return (
        <View style={{flex: 1}}>
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
                                message: "Please enter the child's first name"
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
                                message: "Please enter the child's last name"
                            }
                        },
                        textInputProps: {
                            label: 'Last Name'
                        }
                    },
                    {
                        type: 'select',
                        name: 'gender',

                        rules: {
                            required: {
                                value: true,
                                message: "Please enter child's gender"
                            }
                        },
                        textInputProps: {
                            label: 'Gender'
                        },
                        options: [
                            {
                                value: 'male',
                                label: 'Male'
                            },
                            {
                                value: 'female',
                                label: 'Female'
                            },
                        ]
                    },
                    {
                        type: 'select',
                        name: 'class',

                        rules: {
                            required: {
                                value: true,
                                message: "Please enter the child's class"
                            }
                        },
                        textInputProps: {
                            label: 'Class'
                        },
                        options: classes
                    },
                    {
                        type: 'text',
                        name: 'dobDay',

                        rules: {
                            required: {
                                value: true,
                                message: "Please enter the day of the child's birth"
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
                                message: "Please enter the month of the child's birth"
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
                                message: "Please enter the year of the child's birth"
                            }
                        },
                        textInputProps: {
                            label: 'Year'
                        }
                    },
                ]} 
            />
            {childID?
                <View>
                    <Button
                    mode={'contained'}
                    onPress={handleSubmit((data) => {
                        console.log("Edit Button Pushed");
                        console.log(data);
                    })}>
                        Edit
                    </Button>
                    <Button
                    mode={'contained'}
                    onPress={() => {
                        console.log("Delete Button Pushed");
                        showModal()
                    }}>
                        Delete
                    </Button>
                </View>
            
            :
                <Button
                    mode={'contained'}
                    onPress={handleSubmit((data) => {
                        console.log("Submit Button Pushed");
                        console.log(data);
                })}>
                    Submit
                </Button>
            }
            <Portal>
                <Modal visible={visible} onDismiss={hideModal}>
                    <Card>
                        <Card.Title title="Are you sure you want to delete this child?" subtitle="This action is irreversible" />
                        <Card.Actions>
                            <Button onPress={hideModal}>Cancel</Button>
                            <Button onPress={() => {
                                console.log("Confirm Delete!")
                            }}>Delete</Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
        </View>
    )
}

export default StudentAmend;