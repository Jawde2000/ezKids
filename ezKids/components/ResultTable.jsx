import React, { useEffect, useState} from 'react';
import { FlatList, View, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { childrenGradeAction } from '../redux/actions/classActions';
import { Portal, Card, Text, Modal } from 'react-native-paper';

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

const ResultTable = ({props}) => {
    const { child } = props.props;
    const dispatch = useDispatch();
    const [results, setResults] = useState([]);
    const [visible, setVisible] = useState(false);
    const getSubjectGrade = useSelector(state => state.getSubjectGrade);
    const {loading, data, success} = getSubjectGrade;

    useEffect(() => {
      if (getSubjectGrade) {
        setResults(data);
      } else {
        console.log(85)
        console.log(child.childID)
        dispatch(childrenGradeAction(child.childID));
      }
    }, [getSubjectGrade])

    const hideModal = () => setVisible(false);

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ flex: 1 }}>{item.subjectID}</Text>
            <Text style={{ flex: 2 }}>{item.subject}</Text>
            <Text style={{ flex: 1 }}>{item.grade}</Text>
        </View>
    );

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal}>
                <Card style={styles.card}>
                    <Card.Content>
                        <FlatList
                        data={results}
                        renderItem={renderItem}
                        ListHeaderComponent={
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={{ flex: 1, fontWeight: 'bold' }}>Subject ID</Text>
                            <Text style={{ flex: 2, fontWeight: 'bold' }}>Subject Name</Text>
                            <Text style={{ flex: 1, fontWeight: 'bold' }}>Grade</Text>
                            </View>
                        }
                        keyExtractor={item => item.id}
                        />
                        <View style={styles.close}>
                            <Text style={styles.closeText}>Tap to dismiss</Text>
                        </View>
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    );
};

export default ResultTable;
