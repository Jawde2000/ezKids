import React from 'react';
import { View, ScrollView } from 'react-native';
import { Chip, Card, Text } from 'react-native-paper';

const MyChildren = (parentID) => {
    // this component only using these variables, but treat as if everything there
    // also DOB make string pls thx
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
                <Card.Cover source={require('../assets/homework.jpg')} />
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

export default MyChildren;
