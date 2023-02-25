import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput, AsyncStorage, ToastAndroid } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { childrenGradeAction, updateChildrenAction, newGradeAction, updateGradeAction, deleteGradeAction } from '../redux/actions/classActions';
import { Text, Card, Portal, Modal, Button } from 'react-native-paper';
import { SUBJECT_GRADE_REQUEST, SUBJECT_GRADE_RESET } from '../redux/constants/classConstants';
import KindergartenLoading from './widgets/KindergartenLoading';

const GradeScreen = () => {
    const [selectedIds, setSelectedIds] = useState([]);
    const route = useRoute();
    const child = route.params.data;
    const dispatch = useDispatch();

    const getSubjectGrade = useSelector(state => state.getSubjectGrade);
    const {loading, data, success} = getSubjectGrade;
    const [grades, setGrades] = useState({});
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [buttonDismiss, setButtonDismiss] = useState(true);
    const [gradeList, setGradeList] = useState({});
    const [subjectList, setSubjectList] = useState([]);
    const [IDList, setIDList] = useState([]);
    const [newGrades, setNewGrades] = useState([]);
    const [updateGrades, setUpdateGrades] = useState([]);
    const [filter, setFilter] = useState([]);

    const deleteGrades = useSelector(state => state.deleteGrade);
    const {loading: loadDeleteGrade, success: loadedDeleteGrade} = deleteGrades;


    const hideModalAdd = () => setVisibleAdd(false);

    const handleMoveAdd = () => {
        setVisibleAdd(true);
    };

    const handleMoveUpdate = () => {
        setVisibleUpdate(true);
    };

    const hideModalUpdate = () => setVisibleUpdate(false)

    const [userData, setUserData] = useState([])
    const newGrade = useSelector(state => state.newGrade)
    const {loading: loadingNewGrade, success: loadedNewGrade} = newGrade;

    const updateGrade = useSelector(state => state.updategrade)
    const {loading: loadingUpdateGrade, success: loadedUpdateGrade} = updateGrade;

    useEffect(() => {
        if (loadedNewGrade) {
            ToastAndroid.showWithGravity(
                'Grade add success',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            
            dispatch(childrenGradeAction(child.childID))
            setVisibleAdd(false)
        }
    },[loadedNewGrade])

    useEffect(() => {
        if (loadedUpdateGrade) {
            ToastAndroid.showWithGravity(
                'Grade edit success',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            
            dispatch(childrenGradeAction(child.childID))
            setVisibleUpdate(false)
        }
    },[loadedUpdateGrade])

    useEffect(() => {
        if (loadedDeleteGrade) {
            ToastAndroid.showWithGravity(
                'Grade delete success',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            
            dispatch(childrenGradeAction(child.childID))
        }
    },[loadedDeleteGrade])

    const handleDelete = () => {
        if (selectedIds.length !== 0) {
            selectedIds?.map((id) => {
                dispatch(deleteGradeAction(id))
            })
        }
    }

    const handleNewAddGrade = () => {
        console.log(userData)

        newGrades?.map((grade) => {
            if (grade.grade) {
                const aaaa = {
                    children: child.childID,
                    parent: child.parent,
                    teacher: userData[0].teacherID,
                    subject: grade.subjectID,
                    grade: String(grade.grade)
                }
                console.log(aaaa)
                dispatch(newGradeAction(aaaa))
            }
        })
    }

    const handleNewEditGrade = () => {
        console.log(userData)

        console.log(updateGrades)

        updateGrades?.map((grade) => {
            if (grade.grade) {
                const aaaa = {
                    children: child.childID,
                    parent: child.parent,
                    teacher: userData[0].teacherID,
                    subject: grade.subjectID,
                    grade: String(grade.grade)
                }
                console.log(grade)
                dispatch(updateGradeAction(aaaa, grade.gradeID))
            }
        })
    }

    const [subjectNames, setSubjectNames] = useState([]);

    //for fetching class list
    const fetchData = () => {
        async function fetchSubjects() {
            dispatch({type: SUBJECT_GRADE_RESET});
            dispatch(childrenGradeAction(child.childID));
            const response = await fetch("http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/subjects/");
            const data = await response.json();
            console.log(data)
            setSubjectNames(data);
        }
        fetchSubjects();
    }
    
    useEffect(() => {
        fetchData();
    },[])



    useEffect(() => {
        console.log(138)
        console.log(selectedIds);
    }, [selectedIds]);

    useEffect(() => {
        if (subjectNames && grades) {
            console.log(53)
            console.log(subjectNames);
            console.log(grades);
            const filteredSubjects = subjectNames.filter((subject) => {
                return !grades.some(grade => grade.subjectID === subject.subjectID);
            });
            console.log(59)
            console.log(grades);
            if (grades.length === 0) {
                setFilter(subjectNames)
            } else {
                console.log(64)
                setFilter(filteredSubjects);
            }
            console.log(filter)
        }
    }, [subjectNames, grades])

    useEffect(() => {
      if (getSubjectGrade) {
        setGrades(data);
        console.log(grades);
      } else {
        console.log(49);
        console.log(child.childID);
        dispatch(childrenGradeAction(child.childID));
      }
    }, [getSubjectGrade])

    useEffect(() => {
        async function getUserInfo() {
            const userDatas = await AsyncStorage.getItem('userInfo');
            const de_userDatas =  JSON.parse(userDatas);
            setUserData(de_userDatas);
            console.log(userDatas)
            console.log("67")
        }
        getUserInfo();
    }, [])

    const handleGradeChange = (nG) => {
        // setGradeList(newGrades);
        let isValid = true;
        nG.forEach((grade) => {
            if (parseFloat(grade.grade) < 0 || parseFloat(grade.grade) > 100) {
                isValid = false;
            }
        });

        setNewGrades(nG)
        setButtonDismiss(isValid);
    }

    const handleUpdateGradeChange = (nG) => {
        // setGradeList(newGrades);
        let isValid = true;
        nG.forEach((grade) => {
            if (parseFloat(grade.grade) < 0 || parseFloat(grade.grade) > 100) {
                isValid = false;
            }
        });

        setUpdateGrades(nG)
        setButtonDismiss(isValid);
    }

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ flex: 1 }}>{item.subjectID}</Text>
            <Text style={{ flex: 2, paddingLeft: 40 }}>{item.subject}</Text>
            <TextInput
                style={{ flex: 1, paddingLeft: 10 }}
                keyboardType='numeric'
                maxLength={5}
                onChangeText={(newGrade) => {
                    const newGrades = filter
                    const index = newGrades.findIndex(subject => subject['subjectID'] === item.subjectID);

                    newGrades[index] = {
                        ...item,
                        grade: parseFloat(newGrade)
                    }

                    console.log(newGrades)
                    // console.log(filter)
                    // console.log(item)
                    // newGrades[item.subjectID] = newGrade;
                    handleGradeChange(newGrades);
                }}
            />
        </View>

    );

    const renderItem2 = ({ item }) => (
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ flex: 1 }}>{item.subjectID}</Text>
            <Text style={{ flex: 2, paddingLeft: 40 }}>{item.subject}</Text>
            <TextInput
                style={{ flex: 1, paddingLeft: 10 }}
                keyboardType='numeric'
                maxLength={5}
                defaultValue={item.grade}
                onChangeText={(newGrade) => {
                    const newGrades = grades
                    const index = newGrades.findIndex(subject => subject['subjectID'] === item.subjectID);

                    // console.log(item)

                    newGrades[index] = {
                        ...item,
                        grade: parseFloat(newGrade)
                    }

                    console.log(newGrades)
                    // console.log(item)
                    // newGrades[item.subjectID] = newGrade;
                    handleUpdateGradeChange(newGrades);
                }}
            />
        </View>

    );

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
        setSelectedIds([...selectedIds, id]);
        }
    };

    return (
        <View style={styles.container}>
        <Portal>
              <Modal visible={visibleAdd} onDismiss={hideModalAdd}>
                  {
                    filter.length !== 0?
                    (<Card style={styles.card}>
                        <Card.Content>
                            <FlatList
                            data={filter}
                            renderItem={renderItem}
                            ListHeaderComponent={
                              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1, fontWeight: 'bold' }}>Subject ID</Text>
                                <Text style={{ flex: 2, fontWeight: 'bold', paddingLeft: 40 }}>Subject Name</Text>
                                <Text style={{ flex: 1, fontWeight: 'bold', paddingLeft: 10, alignItems: 'center' }}>Grade</Text>
                              </View>
                            }
                            keyExtractor={item => item.id}
                            />
                            {buttonDismiss?<TouchableOpacity style={styles.button1} onPress={handleNewAddGrade}>
                                <Text style={styles.buttonText1}>Add Grade</Text>
                            </TouchableOpacity>:null}
                            <View style={styles.close} onPress={() => setGradeList({})}>
                                <Text style={styles.closeText}>Tap to dismiss</Text>
                            </View>
                        </Card.Content>
                    </Card>)
                    :
                    (
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.close}>
                                    <Text style={styles.closeText}>Nothing to add here</Text>
                                </View>
                                <View style={styles.close}>
                                    <Text style={styles.closeText}>Tap to dismiss</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    )
                  }
              </Modal>
              <Modal visible={visibleUpdate} onDismiss={hideModalUpdate}>
                  {
                    grades?.length !== 0?
                    (<Card style={styles.card}>
                        <Card.Content>
                            <FlatList
                            data={grades}
                            renderItem={renderItem2}
                            ListHeaderComponent={
                              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1, fontWeight: 'bold' }}>Subject ID</Text>
                                <Text style={{ flex: 2, fontWeight: 'bold', paddingLeft: 40 }}>Subject Name</Text>
                                <Text style={{ flex: 1, fontWeight: 'bold', paddingLeft: 10, alignItems: 'center' }}>Grade</Text>
                              </View>
                            }
                            keyExtractor={item => item.id}
                            />
                            {buttonDismiss?<TouchableOpacity style={styles.button2} onPress={handleNewEditGrade}>
                                <Text style={styles.buttonText2}>Edit Grade</Text>
                            </TouchableOpacity>:null}
                            <View style={styles.close} onPress={() => setGradeList({})}>
                                <Text style={styles.closeText}>Tap to dismiss</Text>
                            </View>
                        </Card.Content>
                    </Card>)
                    :
                    (
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.close}>
                                    <Text style={styles.closeText}>Nothing to update here</Text>
                                </View>
                                <View style={styles.close}>
                                    <Text style={styles.closeText}>Tap to dismiss</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    )
                  }
              </Modal>
        </Portal>
        <View style={styles.header}>
        {loading || loadDeleteGrade || loadingNewGrade || loadingUpdateGrade?
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <KindergartenLoading />
            </View>:null}
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Student Name:</Text>
            <Text style={styles.titleText}>{child.childFirstName} {child.childLastName}</Text>
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Child ID:</Text>
            <Text style={styles.titleText}>{child.childID}</Text>
        </View>
        </View>
        <View style={styles.tableHeader}>
            <View style={[styles.columnHeader, {flex: 0.28}]}><Text style={styles.headerText}>subjectID</Text></View>
            <View style={[styles.columnHeader, {flex: 0.4}]}><Text style={styles.headerText}>Subject</Text></View>
            <View style={[styles.columnHeader, {flex: 0.2}]}><Text style={styles.headerText}>Grade</Text></View>
            <View style={[styles.columnHeader, {flex: 0.2}]}><Text style={styles.headerText}>Select</Text></View>
            </View>
            <FlatList
            data={grades}
            keyExtractor={(item) => item.subjectID}
            renderItem={({ item }) => (
                <View style={styles.tableRow}>
                <View style={[styles.column, {flex: 0.25}]}><Text style={[styles.cellText, {paddingHorizontal: 5}]}>{item.subjectID}</Text></View>
                <View style={[styles.column, {flex: 0.4}]}><Text style={[styles.cellText, {paddingHorizontal: 10}]}>{item.subject}</Text></View>
                <View style={[styles.column, {flex: 0.21}]}><Text style={[styles.cellText, {paddingHorizontal: 5}]}>{item.grade}</Text></View>
                <View style={[styles.column, {flex: 0.2}]}>
                    <TouchableOpacity onPress={() => toggleSelect(item.gradeID)}>
                        <Checkbox
                            status={selectedIds.includes(item.gradeID) ? 'checked' : 'unchecked'}
                            onPress={() => toggleSelect(item.gradeID)}
                            color={'#007AFF'}
                        />
                    </TouchableOpacity>
                </View>
                </View>
            )}
            />
        <View style={styles.footer}>
            <TouchableOpacity style={styles.button1} onPress={() => {handleMoveAdd()}}>
                <Text style={styles.buttonText1}>Add Grade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => {handleMoveUpdate()}}>
                <Text style={styles.buttonText2}>Edit Grade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3} onPress={() => {handleDelete()}}>
                <Text style={styles.buttonText3}>Delete Grade</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10},
        buttonText: {
            color: '#FFF',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#E3F2FF',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    tableHeaderText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#CCC',
    },
    tableRowText: {
        flex: 1,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 5,
    },
    checkboxText: {
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    button1: {
        backgroundColor: '#FFBD44',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        alignItems: 'center',
    },
    button2: {
        backgroundColor: '#ED8936',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        alignItems: 'center',
    },
    button3: {
        backgroundColor: '#E53E3E',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        alignItems: 'center',
    },
    buttonText1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    },
    buttonText2: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    },
    buttonText3: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    },
    header: {
        backgroundColor: '#F8F8F8',
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#707070',
    },
    close: {
      marginTop: 16,
      alignSelf: "center",
    },
    closeText: {
      color: "#999",
      fontSize: 14,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        margin: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default GradeScreen;