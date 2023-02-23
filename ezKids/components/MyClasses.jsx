import React, {useState, useEffect} from 'react';
import { View, Image, AsyncStorage, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Text, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { classAction } from '../redux/actions/classActions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: '#808080',
    },
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
});

const MyClasses = ({navigation}) => {
    // Jamond ask to do that ranking thing here also, something about sort by good class etc
    // this component only using these variables, but treat as if everything there
    const [classes, setClasses] = useState([])
    const classColors = ['#6200EE', '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'
                            , '#FFC6FF', '#B0B8B3', '#B2B2B2', '#808080'];

    const classList = useSelector(state => state.classList);
    const {data, loading, success} = classList;

    const dispatch = useDispatch();
    const navigate = useNavigation();
    const [teacherID, setTeacherID] = useState("");

    useEffect(() => {
        async function getUserInfo() {
            const userDatas = await AsyncStorage.getItem('userInfo');
            const de_userDatas =  JSON.parse(userDatas);
            setTeacherID(de_userDatas[0].teacherID)
            console.log(userDatas)
        }
        getUserInfo();
    }, [])

    useEffect(() => {
        console.log(35)
        if(teacherID) {
            console.log(teacherID);
            dispatch(classAction(teacherID));
        }
    }, [teacherID])

    useEffect(() => {
        if(data) {
            setClasses(data);
        }
    }, [data])

    const handleMove = (session) => {
        // handle move here
        navigation.navigate('ClassDetails', {
            session: session,
          })
    }

    function navigateGlobal() {
        navigate.navigate("GlobalRanking");
    }

    function navigateClass() {
        navigate.navigate("ClassRanking");
    }

    return (
        <View>
            <View>
            </View>
            <View>
                <Card style={{marginTop: 35, marginBottom: 15, marginLeft: 15, marginRight: 15}}>
                <Card.Cover source={require('../assets/children.jpg')} />
                </Card>
            </View>
            <ScrollView style={{marginHorizontal: 15}}>
                <Card style={styles.container} onPress={navigateGlobal}>
                    <View flexDirection="row">
                    <Avatar.Icon size={40} icon="earth" style={{ backgroundColor: "#0000A5", marginRight: 15}} />
                    <Title style={styles.title}>Global Ranking</Title>
                    </View>
                </Card>
                <Card style={styles.container} onPress={navigateClass}>
                    <View flexDirection="row">
                    <Avatar.Icon size={40} icon="google-classroom" style={{ backgroundColor: "gold", marginRight: 15}} />
                    <Title style={styles.title}>Class Ranking</Title>
                    </View>
                </Card>
            {classes?
                classes.map((classItem, index) => (
                    <Card key={classItem.classID} onPress={() => handleMove(classItem)} style={styles.container}>
                      <View flexDirection="row">
                        <Avatar.Icon size={40} icon="school" style={{ backgroundColor: classColors[index % classColors.length], marginRight: 15}} />
                        <Title style={styles.title}>Class: {classItem.className}</Title>
                      </View>
                      <View style={{ margin: 10 }}>
                        <Text style={styles.subtitle}>Class ID: {classItem.classID}</Text>
                      </View>
                    </Card>
                ))
                :
                <View style={{marginBottom: 15}}>
                    <Card onPress={() => {handleMove(classItem)}} key={classItem.classID}>
                        <Card.Content>
                            <Image source={require('../assets/silver-medal.png')} style={{height: 25, width: 25}} />
                            <Text variant="titleLarge">{"There is no class"}</Text>
                        </Card.Content>
                    </Card>
                </View>
            }
            </ScrollView>
        </View>

    ) 
}

export default MyClasses;
