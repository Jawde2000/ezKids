import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Portal, Card, Text, Modal } from 'react-native-paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { announcementAction } from '../../redux/actions/announcementAction';
import PushNotification from 'react-native-push-notification';
import KindergartenLoading from './KindergartenLoading';
import { ANNOUNCEMENT_REQUEST, ANNOUNCEMENT_RESET } from '../../redux/constants/announcementConstants';


const styles = StyleSheet.create({
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
  
  

const Announcements = () => {
    const [visible, setVisible] = React.useState(false);

    // for individual announcements (modal)
    const [id, setID] = React.useState("ID");
    const [title, setTitle] = React.useState("Title");
    const [content, setContent] = React.useState("Content");
    const [datetime, setDatetime] = React.useState("Date/Time");
    const [announcements, setAnnouncements] = React.useState([]);
    const [schedule, setSchedule] = React.useState("Date/Time");

    const announcementList = useSelector(state => state.announcementList);
    const {loading, data:announcementss, error, e} = announcementList;

    const dispatch = useDispatch();

    useEffect(() => {
      if (!announcements) {
        dispatch(announcementAction());
      } else {
        setAnnouncements(announcementss)
      }
    }, [announcements]);
    // useEffect(() => {
    //   console.log(announcements);
    // }, [announcements])

    const convertTime = (message) => {
        var timeString = message // input string
        var timeString2 = timeString.replace("T", " "); 
        var arr = timeString2.split(":"); // splitting the string by colon
        var suffix = parseInt(arr[0]) >= 12 ? " PM":" AM"
        var t = arr[0] + ":" + arr[1] + suffix
        return t;
    }

    const showModal = (id, title, content, datetime, schedule) => {
        setID(id)
        setTitle(title)
        setContent(content)
        setDatetime(datetime)
        setSchedule(schedule)
        setVisible(true)
    };
    const hideModal = () => setVisible(false);

    return (
        <ScrollView>
            {
              announcementss? 
                announcementss.map((announcement) => {
                  return (
                      <Card style={{marginBottom: 10}} onPress={() => {
                          showModal(announcement.announcementID, announcement.announcementTitle, 
                            announcement.announcementDesc, announcement.announcementTime, announcement.announcementSchedule)
                      }}>
                        <Card.Content style={styles.cardContent}>
                            <Text style={styles.title}>{announcement.announcementTitle}</Text>
                            <Text style={styles.timestamp}>{convertTime(announcement.announcementSchedule)}</Text>
                        </Card.Content>
                      </Card>
                  )
              })
              :
              <Card style={{marginBottom: 10}}>
                <Card.Content style={styles.cardContent}>
                    <Text style={styles.title}>There is no announcement yet</Text>
                </Card.Content>
              </Card>
            }
            {
              loading?<KindergartenLoading />:null
            }
            <Portal>
                <Modal visible={visible} onDismiss={hideModal}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.content}>{content}</Text>
                        <View style={styles.info}>
                        <Text style={styles.infoText}>ID: {id}</Text>
                        <Text style={styles.infoText}>Posted on: {convertTime(schedule)}</Text>
                        </View>
                        <View style={styles.close}>
                        <Text style={styles.closeText}>Tap to dismiss</Text>
                        </View>
                    </Card.Content>
                </Card>
                </Modal>
            </Portal>
        </ScrollView>
    );
};

export default Announcements;
