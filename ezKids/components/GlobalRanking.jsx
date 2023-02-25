import React, {useContext, createContext, useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image, AsyncStorage} from 'react-native';
import { BottomNavigation, Text, Card, Portal, Modal, Button, useTheme, Avatar, ProgressBar } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useDispatch, useSelector } from 'react-redux';
import PercentageCircle from 'react-native-percentage-circle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KindergartenLoading from './widgets/KindergartenLoading';
import ResultTable from './ResultTable';
import { childrenGradeAction } from '../redux/actions/classActions';

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
      marginBottom: 10,
    },
    headerSubtitle1: {
      fontSize: 16,
      marginTop: 5,
      marginLeft: 20,
      marginRight: 25,
    },
    headerSubtitle2: {
      fontSize: 16,
      marginTop: 5,
      marginLeft: 0,
      marginRight: 20,
    },
    headerSubtitle3: {
      fontSize: 16,
      marginTop: 5,
      marginLeft: 55,
      marginRight: 5,
    },
    headerSubtitle4: {
      fontSize: 16,
      marginTop: 5,
      marginLeft: 65,
      marginRight: 30,
    },
    cardContent: {
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      padding: 18,
      marginBottom: 16,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    timestamp: {
      color: 'gray',
      fontStyle: 'italic',
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
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
    },
    divider: {
      height: 1,
      backgroundColor: "#E0E0E0",
      marginVertical: 16,
    },
    content: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 16,
    },
    info: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    infoText: {
      color: "#999",
      fontSize: 14,
    },
    close: {
      marginTop: 16,
      alignSelf: "center",
    },
    closeText: {
      color: "#999",
      fontSize: 14,
    },
});

const CircularChart = ({ percentage, color }) => {
  return (
    <View>
      <PercentageCircle radius={25} percent={percentage} color={color == null?"#3498db":color}></PercentageCircle>  
    </View>
  );
};

const GlobalRanking = () => {
    const theme = useTheme()
    const [results, setResults] = useState([]);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const getSubjectGrade = useSelector(state => state.getSubjectGrade);
    const {loading, data, success} = getSubjectGrade;

    const handleMove = (child) => {
      dispatch(childrenGradeAction(child.childID));
      setVisible(true);
    };

    useEffect(() => {
      if (getSubjectGrade) {
        setResults(data);
      } 
    }, [getSubjectGrade])

    const hideModal = () => setVisible(false);

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ flex: 1 }}>{item.subjectID}</Text>
            <Text style={{ flex: 2, paddingLeft: 40, }}>{item.subject}</Text>
            <Text style={{ flex: 1, paddingLeft: 10, }}>{item.grade}</Text>
        </View>
    );

    const [global, setGlobal] = useState([]);

    //for fetching class list
    const fetchData = () => {
        async function fetchGlobal() {
            const response = await fetch("http://ezkids-backend-dev.ap-southeast-1.elasticbeanstalk.com/api/global/ranking/");
            const data = await response.json();
            console.log(data)
            return setGlobal(data);
        }
        fetchGlobal();
    }
    
    useEffect(() => {
        fetchData();
    },[])

    return (
        <ScrollView>
            {
                global.length===0?<KindergartenLoading />:null
            }
        <View style={{marginHorizontal: 15}}>
            <Card style={{marginTop: 30}}>
                <Card.Cover source={require('../assets/globalRanking.jpg')} />
            </Card>
            <View>
                <Text style={styles.headerTitle}>Global Ranking Board</Text>
            </View>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerSubtitle1}>Rank</Text>
                <Text style={styles.headerSubtitle2}>Name</Text>
                <Text style={styles.headerSubtitle3}>Class</Text>  
                <Text style={styles.headerSubtitle4}>Score</Text>
            </View>
            <ScrollView style={{marginTop: 15}}>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal}>
                  {
                    !loading?<Card style={styles.card}>
                        <Card.Content>
                            <FlatList
                            data={results}
                            renderItem={renderItem}
                            ListHeaderComponent={
                              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1, fontWeight: 'bold' }}>Subject ID</Text>
                                <Text style={{ flex: 2, fontWeight: 'bold', paddingLeft: 40 }}>Subject Name</Text>
                                <Text style={{ flex: 1, fontWeight: 'bold', paddingLeft: 10 }}>Grade</Text>
                              </View>
                            }
                            keyExtractor={item => item.id}
                            />
                            <View style={styles.close}>
                                <Text style={styles.closeText}>Tap to dismiss</Text>
                            </View>
                        </Card.Content>
                    </Card>
                    :
                    null
                  }
              </Modal>
           </Portal>
            
            {global?
                global.map((child, index) => {
                    const borderColors =
                    index === 0
                        ? 'gold'
                        : index === 1
                        ? 'silver'
                        : index === 2
                        ? 'brown'
                        : '#999999';
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
                                    <Icon name="medal" size={25} color="#CD7F32" />
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
                                    <Text style={{color: 'black', fontSize: 14}}>{child.child_name}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{color: 'black', fontSize: 14}}>{child.class}</Text>
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

export default GlobalRanking;