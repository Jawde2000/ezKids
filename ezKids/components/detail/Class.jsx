import React from 'react';
import { View, ScrollView } from 'react-native';
import { BottomNavigation, Text, Card, Portal, Modal, Button, FAB, useTheme } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { FormBuilder } from 'react-native-paper-form-builder';

const StudentRoute = () => 
<View>
    <StudentRenderer />
</View>;

const SubjectRoute = () => 
<View>
    <SubjectRenderer />
</View>;

const HomeworkRoute = () => 
<View>
    <HomeworkRenderer />
</View>;

const ResultsRoute = () => 
<View>
    <ResultRenderer />
</View>

// session is Class
const ClassDetail = (session) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'student', title: 'Student', focusedIcon: 'account-child-circle', unfocusedIcon: 'account-child'},
      { key: 'subject', title: 'Subject', focusedIcon: 'book-settings', unfocusedIcon: 'book-settings-outline' },
      { key: 'homework', title: 'Homework', focusedIcon: 'star-circle', unfocusedIcon: 'star' },
      { key: 'results', title: 'Results', focusedIcon: 'medal', unfocusedIcon: 'medal-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        student: StudentRoute,
        subject: SubjectRoute,
        homework: HomeworkRoute,
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

const StudentRenderer = () => {
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
        <View style={{marginHorizontal: 15}}>
            <Card style={{marginTop: 30}}>
                <Card.Cover source={require('../../assets/children.jpg')} />
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

    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            subjectName: '',
        }
    })

    const [addVisible, setAddVisible] = React.useState(false);
    const [editVisible, setEditVisible] = React.useState(false);

    const showAddModal = () => {
        setAddVisible(true)
    };
    const showEditModal = () => {
        setEditVisible(true)
    };
    const hideAddModal = () => setAddVisible(false);
    const hideEditModal = () => setEditVisible(false);

    return (
        <View style={{marginHorizontal: 15}}>
            <Portal>
                <Modal visible={addVisible} onDismiss={hideAddModal}>
                    <Card>
                        <Card.Content>
                            <Text variant="titleLarge" style={{marginBottom: 15}}>Add new subject</Text>
                            <FormBuilder 
                                control={control} 
                                setFocus={setFocus}
                                formConfigArray={[
                                    {
                                        type: 'text',
                                        name: 'subjectName',

                                        rules: {
                                            required: {
                                                value: true,
                                                message: 'Please enter a subject name'
                                            }
                                        },
                                        textInputProps: {
                                            label: 'Subject Name'
                                        }
                                    },
                                ]} 
                            />
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={hideAddModal}>Cancel</Button>
                            <Button onPress={handleSubmit((data) => {
                                // handle add here
                                console.log(data);
                            })}>Add</Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
            <Portal>
                <Modal visible={editVisible} onDismiss={hideEditModal}>
                    <Card>
                        <Card.Content>
                            <Text variant="titleLarge" style={{marginBottom: 15}}>Edit subject</Text>
                            <FormBuilder 
                                control={control} 
                                setFocus={setFocus}
                                formConfigArray={[
                                    {
                                        type: 'text',
                                        name: 'subjectName',

                                        rules: {
                                            required: {
                                                value: true,
                                                message: 'Please enter a subject name'
                                            }
                                        },
                                        textInputProps: {
                                            label: 'Subject Name'
                                        }
                                    },
                                ]} 
                            />
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={hideEditModal}>Cancel</Button>
                            <Button onPress={handleSubmit((data) => {
                                // handle edit here
                                console.log(data);
                            })}>Edit</Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </Portal>
            <Card style={{marginTop: 30}}>
                <Card.Cover source={require('../../assets/subject.png')} />
            </Card>
            <ScrollView style={{marginTop: 15}}>
                {subject.map((subject) => {
                        return (
                            <View style={{marginBottom: 15}} key={subject.subjectID}>
                                <Card mode='contained' style={{backgroundColor: theme.colors.primaryContainer}} onPress={() => {showEditModal(subject)}}>
                                    <Card.Content>
                                        <Text variant="titleLarge">{subject.subjectName}</Text>
                                        <Text variant="labelMedium">ID: {subject.subjectID}</Text>
                                    </Card.Content>
                                </Card>
                            </View>
                        )
                })}
                <View style={{marginBottom: 15}}>
                    <Card style={{backgroundColor: theme.colors.primaryContainer}} onPress={showAddModal}>
                        <Card.Content>
                            <Text variant="titleMedium">Add new subject</Text>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </View>
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
    )
}

