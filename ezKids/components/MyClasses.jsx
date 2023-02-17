import React from 'react';
import { View, Image } from 'react-native';
import { Chip, Card, Text } from 'react-native-paper';

const MyClasses = (teacherID) => {
    // Jamond ask to do that ranking thing here also, something about sort by good class etc
    // this component only using these variables, but treat as if everything there
    const [classes, setClasses] = React.useState([
        { classID: "k1", className: "Kindergarten A" },
        { classID: "k2", className: "Kindergarten B" },
        { classID: "k3", className: "Kindergarten C" },
        { classID: "k4", className: "Kindergarten D" },
        { classID: "k5", className: "Kindergarten E" }
    ])

    const handleMove = (session) => {
        // handle move here
        console.log(session)
    }

    return classes.length > 3? (
        <View style={{marginHorizontal: 15}}>
            <View style={{marginBottom: 15}}>
                <Card onPress={() => {handleMove(classes[0])}} key={classes[0].classID}>
                    <Card.Content>
                    <Image source={require('../assets/gold-medal.png')} style={{height: 50, width: 50}} />
                        <Text variant="titleLarge">{classes[0].className}</Text>
                    </Card.Content>
                </Card>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 15}}>
                <Card onPress={() => {handleMove(classes[1])}} key={classes[1].classID}>
                    <Card.Content>
                    <Image source={require('../assets/silver-medal.png')} style={{height: 25, width: 25}} />
                        <Text variant="titleLarge">{classes[1].className}</Text>
                    </Card.Content>
                </Card>
                <Card onPress={() => {handleMove(classes[2])}} key={classes[2].classID}>
                    <Card.Content>
                    <Image source={require('../assets/bronze-medal.png')} style={{height: 25, width: 25}} />
                        <Text variant="titleLarge">{classes[2].className}</Text>
                    </Card.Content>
                </Card>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                {classes.slice(3).map((session) => {
                    return (
                        <Card onPress={() => {handleMove(session)}} style={{marginBottom: 15}} key={session.classID}>
                            <Card.Content>
                                <Text variant="titleLarge">{session.className}</Text>
                            </Card.Content>
                        </Card>
                    )
                })}
            </View>
        </View>
    ) : (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
            {classes.map((session) => {
                return (
                    <Card onPress={() => {handleMove(session)}} style={{marginBottom: 15}} key={session.classID}>
                        <Card.Content>
                            <Text variant="titleLarge">{session.className}</Text>
                        </Card.Content>
                    </Card>
                )
            })}
        </View>
    )

}

export default MyClasses;
