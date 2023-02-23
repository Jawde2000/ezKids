import React, {useContext, createContext, useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image, AsyncStorage} from 'react-native';
import { BottomNavigation, Text, Card, Portal, Modal, Button, useTheme, Avatar, ProgressBar } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useDispatch, useSelector } from 'react-redux';
import { classStudentAction, classRankingAction } from '../../redux/actions/classActions';
import PercentageCircle from 'react-native-percentage-circle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KindergartenLoading from '../widgets/KindergartenLoading';

const StudentRoute = ({session}) => {
    return <StudentRenderer session={session} />;
}
  

const SubjectRoute = ({session}) => {
    return <SubjectRenderer session={session} />;
}

// const HomeworkRoute = () => 
// <View>
//     <HomeworkRenderer />
// </View>;

const ResultRoute = ({session}) => {
    return <ResultRenderer session={session} />;
}

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
    subjectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
      },
      subjectIdContainer: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
      },
      subjectIdText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
      },
      subjectDetailsContainer: {
        flex: 1,
        paddingVertical: 20,
      },
      subjectName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
      },
      subjectId: {
        fontSize: 14,
        color: 'white',
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
      },
      headerImage: {
        height: 50,
        width: 50,
        marginRight: 10,
      },
      headerTextContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerSubtitle1: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 40,
        marginRight: 20,
      },
      headerSubtitle2: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 0,
        marginRight: 45,
      },
      headerSubtitle3: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 105,
        marginRight: 20,
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
      { key: 'results', title: 'Ranking', focusedIcon: 'medal', unfocusedIcon: 'medal-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        student: () => <StudentRoute session={session} />,
        subject: () => <SubjectRoute session={session} />,
//         homework: HomeworkRoute,
        results: () => <ResultRoute session={session} />,
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
    const [userData, setUserData] = useState([]);
    const [Tfirst, setTfirst] = useState("");
    const [Tlast, setTlast] = useState("");
    const [TID, setTID] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(35);
        if (session) {
          console.log(session.classID);
          dispatch(classStudentAction(session.classID));
          AsyncStorage.getItem('userInfo')
            .then((userDatas) => {
              const de_userDatas = JSON.parse(userDatas);
              setTfirst(de_userDatas[0].teacherFirstName);
              setTlast(de_userDatas[0].teacherLastName);
              setTID(de_userDatas[0].teacherID)
            })
            .catch((error) => {
              console.error('Error getting user data:', error);
            });
        }
    }, [session]);
      

    useEffect(() => {
        if(data) {
            setStudentList(data);
        }
    }, [data])

    useEffect(() => {
        async function getUserInfo() {
            
        }
        getUserInfo();
    }, [])

    const handleMove = (child) => {
        // handle move here
        console.log(child)
    }

    return (
        <ScrollView>
        {
            loading?<KindergartenLoading />:null
        }
        <View style={{marginHorizontal: 15}}>
            <Card style={{marginTop: 30}}>
                <Card.Cover source={require('../../assets/children.jpg')} />
            </Card>
            <ScrollView style={{marginTop: 15}}>
                {TID && Tfirst && Tlast?<View style={{marginBottom: 15}} >
                    <TouchableOpacity style={styles.cardContainer} borderColor="black" borderBottomWidth={2}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.nameText}>Head Teacher:</Text>
                        </View>
                        <View style={styles.attendanceContainer}>
                            <Text style={styles.nameText}>{TID} {Tfirst} {Tlast}</Text>
                        </View>
                    </TouchableOpacity>
                </View>:null}
                {studentList?
                    studentList.map((child) => {
                        return (
                            <View style={{marginBottom: 15}} key={child.childID}>
                                <TouchableOpacity style={styles.cardContainer} onPress={() => {handleMove(child)}}>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.idText}>{child.childID}</Text>
                                        <Text style={styles.nameText}>{child.childFirstName} {child.childLastName}</Text>
                                    </View>
                                    <View style={styles.attendanceContainer}>
                                        <Text style={{fontSize: 16, color: '#999999', paddingLeft: 30,}}>{child.attendanceData.detail !== "This child has not attended any classes yet"?"Attendance Taken " + child.attendanceData.attendance_number: "No attendance yet"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                    :
                    <View style={{marginBottom: 15}} key={child.childID}>
                        <TouchableOpacity style={styles.cardContainer} onPress={() => {handleMove(child)}}>
                            <View style={styles.attendanceContainer}>
                                <Text style={styles.attendanceText}>There is no children in this class...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        </View>
        </ScrollView>
    )
}

const SubjectRenderer = () => {
    const theme = useTheme()

    const subjectColors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'
                            , '#FFC6FF', '#B0B8B3', '#B2B2B2', '#808080'];

    const [subjectNames, setSubjectNames] = useState([]);

    //for fetching class list
    const fetchData = () => {
        async function fetchBankName() {
            const response = await fetch("http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/subjects/");
            const data = await response.json();
            console.log(data)
            return setSubjectNames(data);
        }
        fetchBankName();
    }
    
    useEffect(() => {
        fetchData();
    },[])

    return (
        <ScrollView contentContainerStyle={{padding: 15}}>
            {
                subjectNames.length===0?<KindergartenLoading />:null
            }
            <Image source={require('../../assets/subject.png')} style={{width: '100%', height: 200, marginBottom: 15}}/>
            {subjectNames.map((subject, index) => {
                return (
                    // <TouchableOpacity style={styles.subjectContainer} key={subject.subjectID} backgroundColor={subjectColors[index % subjectColors.length]}>
                    //     <View style={{ backgroundColor: '#FFDAB9', borderRadius: 20, padding: 5 }}>
                    //         <Text variant="labelMedium" style={{ color: 'black' }}>ID: {subject.subjectID}</Text>
                    //     </View>
                    //     <View style={styles.subjectDetailsContainer}>
                    //         <Text style={styles.subjectName}>{subject.subject}</Text>
                    //         <Text style={styles.subjectId}>{subject.subjectID}</Text>
                    //     </View>
                    // </TouchableOpacity>
                    <TouchableOpacity style={{ marginBottom: 15 }} key={subject.subjectID}>
                        <Card mode='contained' style={{ backgroundColor: subjectColors[index % subjectColors.length]}}>
                            <Card.Content>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text variant="titleLarge">{subject.subject}</Text>
                                </View>
                                <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 5 }}>
                                    <Text variant="labelMedium" style={{ color: 'black' }}>ID: {subject.subjectID}</Text>
                                </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )
            })}
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

const CircularChart = ({ percentage, color }) => {
    return (
      <View>
        <PercentageCircle radius={25} percent={percentage} color={color == null?"#3498db":color}></PercentageCircle>  
      </View>
    );
  };

const ResultRenderer = ({session}) => {
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

    const [ranking, setRanking] = useState([]);
    const classRanking = useSelector(state => state.classRanking);
    const {data, loading, success} = classRanking;

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(330)
        if(session) {
            console.log(session.classID);
            dispatch(classRankingAction(session.classID));
        }
    }, [session])

    useEffect(() => {
        if(data) {
            setRanking(data);
        }
    }, [data])

    return (
        <ScrollView>
        {
           !data?<KindergartenLoading />:null
        }
        <View style={{marginHorizontal: 15}}>
            <Card style={{marginTop: 30}}>
                <Card.Cover source={require('../../assets/results.jpg')} />
            </Card>
            <View>
                <Text style={styles.headerTitle}>Children's Ranking Board</Text>
            </View>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerSubtitle1}>Rank</Text>
                <Text style={styles.headerSubtitle2}>Name</Text>
                <Text style={styles.headerSubtitle3}>Average Score</Text>      
            </View>
            <ScrollView style={{marginTop: 15}}>
            {ranking?
                ranking.map((child, index) => {
                    const backgroundColors = index % 2 === 0 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)';
                    const borderColors =
                    index === 0
                        ? 'gold'
                        : index === 1
                        ? 'silver'
                        : index === 2
                        ? 'brown'
                        : 'transparent';
                    const borderRadius = index < 3 ? 20 : 0;
                    let icon = null;

                    const specialIcon = (i) => {
                        if (index === 0) {
                            return (
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name="crown" size={25} color="#FFD700" />
                                    <Text style={{color: '#999999', fontSize: 15, fontWeight: 'bold'}}>{index + 1}</Text>
                                </View>
                            );
                        } else if (index === 1) {
                            return (
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name="silverware-variant" size={25} color="#C0C0C0"/>
                                    <Text style={{color: '#999999', fontSize: 15, fontWeight: 'bold'}}>{index + 1}</Text>
                                </View>
                            )
                        } else if (index === 2) {
                            return (
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name="bronze-medal" size={25} color="#CD7F32" />
                                    <Text style={{color: '#999999', fontSize: 15, fontWeight: 'bold'}}>{index + 1}</Text>
                                </View>
                            )
                        }
                        return <Text style={{color: '#999999', fontSize: 25, fontWeight: 'bold'}}>{index + 1}</Text>;
                    }
    
                    return (
                        <TouchableOpacity 
                            style={{padding: 20, borderBottomWidth: 2, 
                                    backgroundColor: index % 2 === 0 ? '255, 255, 255, 0.1' : '255, 255, 255, 0.05', borderColor: borderColors, borderRadius: borderRadius}} 
                            key={child.childID} onPress={() => {handleMove(child)}}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', marginRight: 10, justifyContent: 'center', alignItems: 'center'}}>
                                    {specialIcon(index)}
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{color: 'black', fontSize: 16}}>{child.child_name}</Text>
                                </View>
                                <View>
                                    <CircularChart percentage={child.subject_avg} color={borderColors}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
                :
                (<View style={{marginBottom: 15}} key={child.childID}>
                    <Card mode='contained' style={{backgroundColor: theme.colors.primaryContainer}} onPress={() => {handleMove(child)}}>
                        <Card.Content>
                            <Text variant="titleLarge">Children is not grade yet...</Text>
                        </Card.Content>
                    </Card>
                </View>)
            }
            </ScrollView>
        </View>
        </ScrollView>
    )
}

export default ClassDetail;
