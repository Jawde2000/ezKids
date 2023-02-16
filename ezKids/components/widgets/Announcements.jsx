import React from 'react';
import { ScrollView } from 'react-native';
import { View, Card, Text, Modal } from 'react-native-paper';

const announcements = [
    {
      id: "announcement_1",
      title: "Parent-Teacher Conference",
      content: "Our first parent-teacher conference of the year will be held on Friday, March 4th. Please check your email for more information and sign up for a time slot as soon as possible.",
      datetime: "2023-03-04 09:00:00"
    },
    {
      id: "announcement_2",
      title: "Field Trip to the Zoo",
      content: "We're excited to announce that our class will be going on a field trip to the zoo next Wednesday! Please ensure that your child has appropriate clothing and footwear for the weather.",
      datetime: "2023-03-08 10:30:00"
    },
    {
      id: "announcement_3",
      title: "Classroom Supplies",
      content: "We're running low on tissue boxes and baby wipes in the classroom. If you're able to donate any, we would greatly appreciate it!",
      datetime: "2023-03-10 14:00:00"
    },
    {
      id: "announcement_4",
      title: "Reading Challenge",
      content: "Our class is participating in a reading challenge this month! Encourage your child to read as many books as they can, and help them keep track of their progress on the reading log we sent home last week.",
      datetime: "2023-03-15 13:00:00"
    },
    {
      id: "announcement_5",
      title: "Show and Tell",
      content: "This Friday, we'll be having show and tell in class. Your child is encouraged to bring in an item that is special to them to share with the class.",
      datetime: "2023-03-18 10:00:00"
    },
    {
      id: "announcement_6",
      title: "Spirit Week",
      content: "Next week is spirit week! Monday is pajama day, Tuesday is crazy hair day, Wednesday is favorite color day, Thursday is hat day, and Friday is school spirit day. We can't wait to see everyone's fun outfits!",
      datetime: "2023-03-21 08:30:00"
    },
    {
      id: "announcement_7",
      title: "Easter Egg Hunt",
      content: "We'll be having an Easter egg hunt on the school playground on Thursday, April 6th. Your child is welcome to bring their own basket, but we will have some extras on hand as well.",
      datetime: "2023-04-06 11:00:00"
    },
    {
      id: "announcement_8",
      title: "Teacher Appreciation Week",
      content: "May 2nd through May 6th is Teacher Appreciation Week! We would love for students to bring in a small token of appreciation for their teacher during this time.",
      datetime: "2023-05-02 09:00:00"
    }
  ];
  

const Announcements = () => {
    const [visible, setVisible] = React.useState(false);

    // for individual announcements (modal)
    const [id, setID] = React.useState("ID");
    const [title, setTitle] = React.useState("Title");
    const [content, setContent] = React.useState("Content");
    const [datetime, setDatetime] = React.useState("Date/Time");

    const showModal = (id, title, content, datetime) => {
        setID(id)
        setTitle(title)
        setContent(content)
        setDatetime(datetime)
        setVisible(true)
    };
    const hideModal = () => setVisible(false);

    return (
        <ScrollView>
            {announcements.map((announcement) => {
                return (
                    <Card style={{marginBottom: 10}} onPress={() => {
                        showModal(announcement.id, announcement.title, announcement.content, announcement.datetime)
                    }}>
                        <Card.Content>
                            <Text variant="titleLarge" >{announcement.title}</Text>
                            <Text variant="labelMedium" >{announcement.datetime}</Text>
                        </Card.Content>
                    </Card>
                )
            })}
            <Modal visible={visible} onDismiss={hideModal}>
                <Card>
                    <Card.Content>
                        <Text variant="titleLarge" style={{marginBottom: 15}}>{title}</Text>
                        <Text variant="bodyLarge" style={{marginBottom: 10}}>{content}</Text>
                        <Text variant="labelMedium" >ID: {id} | Posted: {datetime}</Text>
                        <Text variant="labelMedium" >Tap on the shadowed area to dismiss</Text>
                    </Card.Content>
                </Card>
            </Modal>
        </ScrollView>
    );
};

export default Announcements;
