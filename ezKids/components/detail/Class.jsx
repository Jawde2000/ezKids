import React from 'react';
import { View, ScrollView } from 'react-native';
import { BottomNavigation, Text, Card, Portal, Modal, Button, FAB } from 'react-native-paper';

const StudentRoute = () => 
<View>
    <StudentRenderer />
</View>;

const HomeworkRoute = () => 
<View>
    <HomeworkRenderer />
</View>;

const ClassDetail = (session) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'student', title: 'Student', focusedIcon: 'account-child-circle', unfocusedIcon: 'account-child'},
      { key: 'homework', title: 'Homework', focusedIcon: 'star-circle', unfocusedIcon: 'star' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
        student: StudentRoute,
        homework: HomeworkRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

const StudentRenderer = () => {
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
        <View style={{marginHorizontal: 15}}>
            <Card>
                <Card.Cover source={require('../../assets/children.jpg')} />
            </Card>
            <ScrollView>
                {children.map((child) => {
                        return (
                            <View style={{marginBottom: 15}} key={child.childID}>
                                <Card onPress={() => {handleMove(child)}}>
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
    )
}

const HomeworkRenderer = () => {
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
        console.log(homework)

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
            <Portal>
                <FAB
                    icon="plus"
                    style={{
                        position: 'absolute',
                        right: 16,
                        bottom: 96,
                    }}
                    onPress={() => console.log('Pressed')}
                />
            </Portal>
            <Card>
                <Card.Cover source={require('../../assets/homework.jpg')} />
            </Card>
            <ScrollView>
                {homeworkList.map((homework) => {
                    return (
                        <View style={{marginBottom: 15}} key={homework.homeworkID}>
                            <Card onPress={() => {showModal(homework)}}>
                                <Card.Content>
                                    <Text variant="titleLarge">{homework.homeworkTitle}</Text>
                                    <Text variant="labelMedium">Posted: {homework.homeworkDate}</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    )
                })}
            </ScrollView>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal}>
                    <Card>
                        <Card.Content>
                            <Text variant="titleLarge" style={{marginBottom: 15}}>{title}</Text>
                            <Text variant="bodyLarge" style={{marginBottom: 10}}>{content}</Text>
                            <Text variant="labelMedium" >ID: {id}</Text>
                            <Text variant="labelMedium" >Tap on the shadowed area to dismiss</Text>
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

export default ClassDetail;
