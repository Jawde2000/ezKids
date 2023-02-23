import React, {useContext, createContext, useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomNavigation, Text, Card, Portal, Modal, Button, useTheme, Avatar, ProgressBar  } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useDispatch, useSelector } from 'react-redux';
import { classStudentAction } from '../../redux/actions/classActions';

export const SessionContext = createContext(null);

const StudentRoute = ({session}) => {
    return <StudentRenderer session={session} />;
}
  

const SubjectRoute = () => 
<View>
    <SubjectRenderer />
</View>;

// const HomeworkRoute = () => 
// <View>
//     <HomeworkRenderer />
// </View>;

const ResultsRoute = () => 
<View>
    <ResultRenderer />
</View>

const styles = StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      elevation: 3,
      padding: 10,
      shadowColor: '#000000',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 5,
    },
    avatarContainer: {
      marginRight: 15,
    },
    infoContainer: {
      flexDirection: 'column',
    },
    attendanceContainer: {
        flexDirection: 'column',
        paddingLeft: 60,
    },
    nameText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    idText: {
      fontSize: 16,
      color: '#999999',
    },
    percentageText: {
        fontSize: 10,
        fontWeight: 'bold',
      },
    attendanceText: {
        fontSize: 16,
        color: '#999999',
    },
    progressBar: {
        width: '100%',
        height: 10,
        borderRadius: 10,
        backgroundColor: '#D8D8D8',
    },
});
  
// session is Class
const ClassDetail = ({route, navigation}) => {
    const { session } = route.params;

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'student', title: 'Student', focusedIcon: 'account-child-circle', unfocusedIcon: 'account-child'},
      { key: 'subject', title: 'Subject', focusedIcon: 'book-settings', unfocusedIcon: 'book-settings-outline' },
//       { key: 'homework', title: 'Homework', focusedIcon: 'star-circle', unfocusedIcon: 'star' },
      { key: 'results', title: 'Results', focusedIcon: 'medal', unfocusedIcon: 'medal-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        student: () => <StudentRoute session={session} />,
        subject: SubjectRoute,
//         homework: HomeworkRoute,
        results: ResultsRoute
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

const StudentRenderer = ({session}) => {
    const theme = useTheme()

    const [studentList, setStudentList] = useState([])

    const classStudent = useSelector(state => state.classStudent);
    const {data, loading, success} = classStudent;

    const dispatch = useDispatch();

    const [children, setChildren] = React.useState([
        { childID: "c1", childName: "Ali bin Abu" },
        { childID: "c2", childName: "Jamond Chew" },
        { childID: "c3", childName: "Ho Ko Ee" },
        { childID: "c4", childName: "Matthew John" },
        { childID: "c5", childName: "Sinclair Adams" }
    ])

    useEffect(() => {
        console.log(35)
        if(session) {
            console.log(session.classID);
            dispatch(classStudentAction(session.classID));
        }
    }, [session])

    useEffect(() => {
        if(data) {
            setStudentList(data);
        }
    }, [data])

    const handleMove = (child) => {
        // handle move here
        console.log(child)
    }

    return (
        <ScrollView>
        <View style={{marginHorizontal: 15}}>
            <Card style={{marginTop: 30}}>
                <Card.Cover source={require('../../assets/children.jpg')} />
            </Card>
            <ScrollView style={{marginTop: 15}}>
                {studentList.map((child) => {
                    return (
                        <View style={{marginBottom: 15}} key={child.childID}>
                            <TouchableOpacity style={styles.cardContainer} onPress={() => {handleMove(child)}}>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.idText}>{child.childID}</Text>
                                    <Text style={styles.nameText}>{child.childFirstName} {child.childLastName}</Text>
                                </View>
                                <View style={styles.attendanceContainer}>
                                    <Text style={styles.attendanceText}>Attendance Taken {child.attendanceData.attendance_number}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
        </ScrollView>
    )
}

const SubjectRenderer = () => {
    const theme = useTheme()

    const [subject, setSubject] = React.useState([
        { subjectID: "s1", subjectName: "Alphabets" },
        { subjectID: "s2", subjectName: "Science" },
        { subjectID: "s3", subjectName: "Writing" },
        { subjectID: "s4", subjectName: "Numbers" },
        { subjectID: "s5", subjectName: "Discrete Structures" }
    ])

    return (
        <ScrollView>
        <View style={{marginHorizontal: 15}}>
            <Card style={{marginTop: 30}}>
                <Card.Cover source={require('../../assets/subject.png')} />
            </Card>
            <ScrollView style={{marginTop: 15}}>
                {subject.map((subject) => {
                        return (
                            <View style={{marginBottom: 15}} key={subject.subjectID}>
                                <Card mode='contained' style={{backgroundColor: theme.colors.primaryContainer}}>
                                    <Card.Content>
                                        <Text variant="titleLarge">{subject.subjectName}</Text>
                                        <Text variant="labelMedium">ID: {subject.subjectID}</Text>
                                    </Card.Content>
                                </Card>
                            </View>
                        )
                })}
            </ScrollView>
        </View>
        </ScrollView>
    )
}

const HomeworkRenderer = () => {
    const theme = useTheme()

    const [homeworkList, setHomeworkList] = React.useState([
        { homeworkID: 'h1', homeworkContent: 'Complete this in one week', homeworkDate: "2018-09-04", homeworkTitle: "English 107" },
        { homeworkID: 'h2', homeworkContent: 'Complete this in one week', homeworkDate: "2020-03-04", homeworkTitle: "Spanish 312" },
        { homeworkID: 'h3', homeworkContent: 'Complete this in one week', homeworkDate: "2020-09-07", homeworkTitle: "Chinese 243" },
        { homeworkID: 'h4', homeworkContent: 'Complete this in one week', homeworkDate: "2020-02-04", homeworkTitle: "Maths 881" },
        { homeworkID: 'h5', homeworkContent: 'Complete this in one week', homeworkDate: "2019-07-01", homeworkTitle: "Science 123" }
    ])

    const [visible, setVisible] = React.useState(false);

    const [id, setID] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [date, setDate] = React.useState('');
    const [homeworkSelected, setHomeworkSelected] = React.useState('');

    const handleMove = () => {
        // handle move here
        console.log(homeworkSelected)
        setVisible(false)
    }

    const showModal = (homework) => {
        setID(homework.homeworkID)
        setTitle(homework.homeworkTitle)
        setContent(homework.homeworkContent)
        setDate(homework.homeworkDate)
        setHomeworkSelected(homework)
        setVisible(true)
    };
    const hideModal = () => setVisible(false);

    return (
        <View style={{marginHorizontal: 15}}>
            <Card style={{marginTop: 30}}>
                <Card.Cover source={require('../../assets/homework.jpg')} />
            </Card>
            <ScrollView style={{marginTop: 15}}>
                {homeworkList.map((homework) => {
                    return (
                        <View style={{marginBottom: 15}} key={homework.homeworkID}>
                            <Card mode='contained' style={{backgroundColor: theme.colors.primaryContainer}} onPress={() => {showModal(homework)}}>
                                <Card.Content>
                                    <Text variant="titleLarge">{homework.homeworkTitle}</Text>
                                    <Text variant="labelMedium">Posted: {homework.homeworkDate}</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    )
                })}
                <View style={{marginBottom: 15}}>
                    <Card style={{backgroundColor: theme.colors.primaryContainer}} onPress={() => {console.log("add")}}>
                        <Card.Content>
                            <Text variant="titleMedium">Add new homework</Text>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal}>
                    <Card>
                        <Card.Content>
                            <Text variant="titleLarge" style={{marginBottom: 15}}>{title}</Text>
                            <Text variant="bodyLarge" style={{marginBottom: 10}}>{content}</Text>
                            <Text variant="labelMedium" >ID: {id}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={hideModal}>Cancel</Button>
                            <Button onPress={handleMove}>Edit</Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
        </View>
    )
}

const ResultRenderer = () => {
    const theme = useTheme()

    const [children, setChildren] = React.useState([
        { childID: "c1", childDOB: "2018-09-04", childName: "Ali bin Abu" },
        { childID: "c2", childDOB: "2020-03-04", childName: "Jamond Chew" },
        { childID: "c3", childDOB: "2020-09-07", childName: "Ho Ko Ee" },
        { childID: "c4", childDOB: "2020-02-04", childName: "Matthew John" },
        { childID: "c5", childDOB: "2019-07-01", childName: "Sinclair Adams" }
    ])

    const handleMove = (child) => {
        // handle move here
        console.log(child)
    }

    return (
        <ScrollView>
        <View style={{marginHorizontal: 15}}>
            <Card style={{marginTop: 30}}>
                <Card.Cover source={require('../../assets/results.jpg')} />
            </Card>
            <ScrollView style={{marginTop: 15}}>
                {children.map((child) => {
                        return (
                            <View style={{marginBottom: 15}} key={child.childID}>
                                <Card mode='contained' style={{backgroundColor: theme.colors.primaryContainer}} onPress={() => {handleMove(child)}}>
                                    <Card.Content>
                                        <Text variant="titleLarge">{child.childName}</Text>
                                        <Text variant="labelMedium">DOB: {child.childDOB}</Text>
                                    </Card.Content>
                                </Card>
                            </View>
                        )
                })}
            </ScrollView>
        </View>
        </ScrollView>
    )
}

export default ClassDetail;
