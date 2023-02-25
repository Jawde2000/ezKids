import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet, Text, ToastAndroid} from 'react-native';
import { Button, Card, Modal, Portal, } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useRoute } from '@react-navigation/native';
import { individualChildAction, updateChildrenAction } from '../redux/actions/classActions';
import { useSelector, useDispatch } from 'react-redux';
import { GET_CHILDREN_RESET, INDIVIDUAL_CHILDREN_RESET } from '../redux/constants/classConstants';
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

const StudentAmend = () => {
    const [visible, setVisible] = useState(false);
    const route = useRoute();
    const dispatch = useDispatch();
    const child = route.params.data;

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    // aID and cID is parent/teacher and child consequtively (Since both can edit)
    // If adding (parent), cID/childID is undefined
    // If editing (parent & teacher), childID has data
    const individualChild = useSelector(state => state.individualChild);
    const {loading:childrenLoading , data: childrenData, error: childrenError, success: childrenSuccess} = individualChild;
    const [children, setChildren] = useState({});
    const updateChildren = useSelector(state => state.updateChildren);
    const {loading:updateLoading , success: updateSuccess} = updateChildren;
    const [gender, setGender] = useState("");

    // If childID exists, it means that the user is editing/deleting
    const {control, setFocus, handleSubmit, setValue} = useForm({
        defaultValues: {
            childID: child.childID,
            firstName: '',
            lastName: '',
            gender: '',
            class: '',
        }
    })

    const handleUpdate = (data) => {
        console.log(62)
        console.log(data)
        console.log(child)
        console.log(child.class_belong)
        console.log(child.childDOB)
        console.log(data.gender)
        const blabla = {
            class_belong: child.class_belong,
            childFirstName: data.firstName,
            childLastName: data.lastName,
            childGender: data.gender,
            childDOB: child.childDOB
        }
        console.log(71)
        console.log(blabla);
        console.log(child.childID);
        dispatch(updateChildrenAction(blabla, child.childID));
    }
    

    //for fetching class list
    const fetchData = () => {
        dispatch({type: INDIVIDUAL_CHILDREN_RESET})
        setChildren({})

        async function fetchClassName() {
            const response = await fetch(`http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/classname/${child.class_belong}/`);
            const data = await response.json();
            console.log(44)
            console.log(data)
            console.log(46)
            setValue('class', data.className);
        }
        fetchClassName();
    }
    
    useEffect(() => {
        fetchData();
    },[])


    useEffect(() => {
        if (childrenData) {
            setChildren(childrenData); // set to the first child object in the array
            
            setValue('firstName', children[0]?.childFirstName);
            setValue('lastName', children[0]?.childLastName);
            setValue('gender', children[0]?.childGender);

        } else {    
            dispatch(individualChildAction(child.childID));
        }
    }, [childrenData, children]);

    useEffect(() => {
        if (updateSuccess) {
            setChildren({});
            ToastAndroid.showWithGravity(
                'Children Info update success',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            dispatch(individualChildAction(child.childID));
            setValue('firstName', children[0]?.childFirstName);
            setValue('lastName', children[0]?.childLastName);
            setValue('gender', children[0]?.childGender);
        } 
    }, [updateSuccess])

    const handleGenderChange = (g) => {
        console.log(g)
        setGender(g);
    }    

    return (
        <ScrollView>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
            {childrenLoading?<KindergartenLoading />:null}
            <View style={{marginTop: 30, alignSelf: 'center'}}>
                <Image source={child.childGender === "M"?require('../assets/boy.png'):require('../assets/girl.png')} style={{resizeMode: "center", width: 250, height: 100}} />
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2'}}> 
            <FormBuilder 
                control={control} 
                setFocus={setFocus}
                formConfigArray={[
                    {
                        type: 'text',
                        name: 'childID',
                        textInputProps: {
                            label: 'childID',
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
                                message: "Please enter the child's first name"
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
                                message: "Please enter the child's last name"
                            }
                        },
                        textInputProps: {
                            label: 'Last Name',
                            style: { width: 300 },
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
                            label: 'Gender',
                            style: { width: 300 },
                            onChangeText: (text) => handleGenderChange(text),
                            defaultValue: gender,
                        },
                        options: [
                            {
                                value: 'M',
                                label: 'Male'
                            },
                            {
                                value: 'F',
                                label: 'Female'
                            },
                        ]
                    },
                    {
                        type: 'text',
                        name: 'class',

                        rules: {
                            required: {
                                value: true,
                            }
                        },
                        textInputProps: {
                            label: 'Class',
                            style: { width: 300 },
                            editable: false,
                        },
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
        </View>
        </ScrollView>
    )
}

export default StudentAmend;