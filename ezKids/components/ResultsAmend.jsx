import React from 'react';
import { ScrollView, View, Dimensions, Image, ToastAndroid } from 'react-native';
import { useTheme, Card, Text, Portal, Modal, Button } from 'react-native-paper';

const ResultAmend = (props) => {
    const theme = useTheme()

    const [subject, setSubject] = React.useState([
        { subjectID: "s1", subjectName: "Alphabets", existingResult: "70.2" },
        { subjectID: "s2", subjectName: "Science", existingResult: "69.99" },
        { subjectID: "s3", subjectName: "Writing", existingResult: "N/A" },
        { subjectID: "s4", subjectName: "Numbers", existingResult: "N/A" },
        { subjectID: "s5", subjectName: "Discrete Structures", existingResult: "100" }
    ])

    const [focusedSubject, setFocusedSubject] = React.useState()

    const showModal = (subject) => {
        setFocusedSubject({
            subjectID: subject.subjectID,
            subjectName: subject.subjectName
        })
        setVisible(true)
    };
    const hideModal = () => setVisible(false);

    const handleChangeResult = (result) => {
        setFocusedSubject({
            subjectID: subject.subjectID,
            subjectName: subject.subjectName,
            subjectGrade: result
        })
        // set grade here, handle the refresh also
        ToastAndroid.show("Grade set!", ToastAndroid.SHORT)
        setVisible(false)
    }

    const [visible, setVisible] = React.useState(false);

    return (
        <View>
            {focusedSubject?
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal}>
                        <Card>
                            <Card.Content>
                                <Text variant="titleLarge" style={{marginBottom: 15}}>{focusedSubject.subjectName}</Text>
                                <Text variant="labelMedium">Set grade for student</Text>
                            </Card.Content>
                            <Card.Actions>
                                <ScrollView horizontal>
                                    <Button onPress={() => {handleChangeResult('A')}}>A</Button>
                                    <Button onPress={() => {handleChangeResult('B')}}>B</Button>
                                    <Button onPress={() => {handleChangeResult('C')}}>C</Button>
                                    <Button onPress={() => {handleChangeResult('D')}}>D</Button>
                                    <Button onPress={() => {handleChangeResult('E')}}>E</Button>
                                    <Button onPress={() => {handleChangeResult('F')}}>F</Button>
                                    <Button onPress={hideModal}>Cancel</Button>
                                </ScrollView>
                            </Card.Actions>
                        </Card>
                    </Modal>
                </Portal>
            :
                null
            }
            <View style={{marginTop: 30, marginBottom: 15}}>
                <Card style={{backgroundColor: theme.colors.primaryContainer}} onPress={() => {console.log("add")}}>
                    <Card.Content>
                        <Text variant="headlineSmall" style={{fontWeight: "bold"}}>Results</Text>
                        <Text variant="headlineLarge">{props.student.studentLastName}, {props.student.studentFirstName}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text variant="titleMedium">ID: {props.student.studentID}</Text>
                            <Text variant="titleMedium"> | </Text>
                            <Text variant="titleMedium">Gender: {props.student.studentGender}</Text>
                            <Text variant="titleMedium"> | </Text>
                            <Text variant="titleMedium">DOB: {props.student.studentDOB}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </View>
            <ScrollView>
                {subject.map((subject) => {
                        return (
                            <View style={{marginBottom: 15}} key={subject.subjectID}>
                                <Card mode='contained' style={{backgroundColor: theme.colors.primaryContainer}} onPress={() => {showModal(subject)}}>
                                    <Card.Content>
                                        <Text variant="titleLarge">{subject.subjectName}</Text>
                                        <Text variant="labelLarge">Grade: {subject.existingResult}</Text>
                                        <Text variant="labelMedium">ID: {subject.subjectID}</Text>
                                    </Card.Content>
                                </Card>
                            </View>
                        )
                })}
            </ScrollView>
        </View>
    )
}

export default ResultAmend