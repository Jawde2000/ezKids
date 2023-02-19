import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Card, Modal, Portal } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';

const HomeworkAmend = (props) => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    // If add, homeworkID is undefined
    // If edit, homeworkID has data
    const [editorID, setEditorID] = React.useState(props.eID)
    const [homeworkID, setHomeworkID] = React.useState(props.hID)
    const [classes, setClasses] = React.useState([
        { value: "k1", label: "Kindergarten A" },
        { value: "k2", label: "Kindergarten B" },
        { value: "k3", label: "Kindergarten C" },
        { value: "k4", label: "Kindergarten D" },
        { value: "k5", label: "Kindergarten E" }
    ])
    const [subject, setSubject] = React.useState([
        { value: "s1", label: "Alphabets" },
        { value: "s2", label: "Science" },
        { value: "s3", label: "Writing" },
        { value: "s4", label: "Numbers" },
        { value: "s5", label: "Discrete Structures" }
    ])

    // If homeworkID exists, it means that the user is editing/deleting
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            title: homeworkID? 'something is in here' : '',
            desc: homeworkID? 'is': '',
            subject: homeworkID? '': '',
            class: homeworkID? '': '',
        }
    })

    return (
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Card style={{marginTop: 30, marginBottom: 15}}>
                <Card.Cover source={require('../assets/homework.jpg')} />
            </Card>
            <FormBuilder 
                control={control} 
                setFocus={setFocus}
                formConfigArray={[
                    {
                        type: 'text',
                        name: 'title',

                        rules: {
                            required: {
                                value: true,
                                message: "Please enter the homework title"
                            }
                        },
                        textInputProps: {
                            label: 'Title'
                        }
                    },
                    {
                        type: 'text',
                        name: 'desc',

                        rules: {
                            required: {
                                value: true,
                                message: "Please enter the homework description"
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
                                message: "Please enter the homework's subject"
                            }
                        },
                        textInputProps: {
                            label: 'Subject'
                        },
                        options: subject
                    },
                    {
                        type: 'select',
                        name: 'class',

                        rules: {
                            required: {
                                value: true,
                                message: "Please enter the homework's class"
                            }
                        },
                        textInputProps: {
                            label: 'Class'
                        },
                        options: classes
                    },
                ]} 
            />
            {homeworkID?
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
                        <Card.Title title="Are you sure you want to delete this homework?" subtitle="This action is irreversible" />
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

export default HomeworkAmend;