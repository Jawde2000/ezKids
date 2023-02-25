import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet, Text, ToastAndroid} from 'react-native';
import { Button, Card, Modal, Portal, } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useRoute } from '@react-navigation/native';
import { individualChildAction, updateChildrenAction } from '../redux/actions/classActions';
import { useSelector, useDispatch } from 'react-redux';
import KindergartenLoading from './widgets/KindergartenLoading';

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

const ParentInfo = () => {
    const [visible, setVisible] = useState(false);
    const route = useRoute();
    const child = route.params.data;

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    // aID and cID is parent/teacher and child consequtively (Since both can edit)
    // If adding (parent), cID/childID is undefined
    // If editing (parent & teacher), childID has data
    const individualChild = useSelector(state => state.individualChild);
    const {loading:childrenLoading , data: childrenData, error: childrenError, success: childrenSuccess} = individualChild;
    const [children, setChildren] = useState({});
    const [Parent, setParent] = useState({});
    const updateChildren = useSelector(state => state.updateChildren);
    const {loading:updateLoading , success: updateSuccess} = updateChildren;
    const [gender, setGender] = useState("");

    // If childID exists, it means that the user is editing/deleting
    const {control, setFocus, setValue} = useForm({
        defaultValues: {
            parentsID: '',
            firstName: '',
            lastName: '',
            contact: '',
            email: '',
            secondParentEmail: '',
            address: '',
            dob: '',
            type: '',
        }
    })
    

    //for fetching class list
    const fetchData = () => {
        async function fetchParent() {
            const response = await fetch(`http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/individualParentID/${child.parent}/`);
            const parent = await response.json();
            console.log(44)
            console.log(46)
            setParent(parent);
            setValue("parentsID", parent.parentsID);
            setValue("firstName", parent.parentsFirstName);
            setValue("lastName", parent.parentsLastName);
            setValue("contact", parent.parentsContactphone);
            setValue("email", parent.parentsEmail);
            setValue("secondParentEmail", parent.secondParentEmail);
            setValue("address", parent.parentsAddress);
            setValue("dob", parent.parentsDOB);
            setValue("type", parent.parentsType);
        }
        fetchParent();
    }
    
    useEffect(() => {
        fetchData();
    },[])

    return (
        <ScrollView>
        <View pointerEvents="none" style={{flex: 1, justifyContent: 'flex-start'}}>
            <View style={{marginTop: 30, alignSelf: 'center'}}>
                <Image 
                    source={Parent.parentsType === "M"?require('../assets/mother.png'):Parent.parentsType === "F"?require('../assets/father.png'):require('../assets/guardian.png')} 
                    style={{resizeMode: "center", width: 250, height: 100}} 
                />
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2'}}> 
            <FormBuilder 
                control={control} 
                setFocus={setFocus}
                formConfigArray={[
                    {
                        type: 'text',
                        name: 'parentsID',
                        textInputProps: {
                            label: 'ParentsID',
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
                            }
                        },
                        textInputProps: {
                            label: 'First Name',
                            style: { width: 300 },
                        }
                    },
                    {
                        type: 'text',
                        name: 'lastName',

                        rules: {
                            required: {
                                value: true,
                            }
                        },
                        textInputProps: {
                            label: 'Last Name',
                            style: { width: 300 },
                            editable: false,
                        }
                    },
                    {
                        type: 'select',
                        name: 'type',
                    
                        rules: {
                            required: {
                                value: true,
                            }
                        },
                        textInputProps: {
                            label: 'Parent Type',
                            style: { width: 300 },
                            editable: false,
                        },
                        options: [
                            {
                                value: 'M',
                                label: 'Mother'
                            },
                            {
                                value: 'F',
                                label: 'Father'
                            },
                            {
                                value: 'G',
                                label: 'Guardian'
                            },
                        ]
                    },
                    {
                        type: 'text',
                        name: 'contact',

                        rules: {
                            required: {
                                value: true,
                            }
                        },
                        textInputProps: {
                            label: 'Contact Number',
                            style: { width: 300 },
                            editable: false,
                        },
                    },
                    {
                        type: 'text',
                        name: 'email',

                        rules: {
                            required: {
                                value: true,
                            }
                        },
                        textInputProps: {
                            label: 'Email',
                            style: { width: 300 },
                            editable: false,
                        },
                    },
                    {
                        type: 'text',
                        name: 'secondParentEmail',

                        rules: {
                            required: {
                                value: true,
                            }
                        },
                        textInputProps: {
                            label: 'Second Parent Email',
                            style: { width: 300 },
                            editable: false,
                        },
                    },
                    {
                        type: 'text',
                        name: 'dob',

                        rules: {
                            required: {
                                value: true,
                            }
                        },
                        textInputProps: {
                            label: 'Date of Birth',
                            style: { width: 300 },
                            editable: false,
                        },
                    },
                ]} 
            />
            </View>
        </View>
        </ScrollView>
    )
}

export default ParentInfo;