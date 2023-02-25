import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SUBJECT_GRADE_RESET, UPDATE_CHILDREN_RESET, GET_PARENT_RESET, INDIVIDUAL_CHILDREN_RESET, NEW_SUBJECT_GRADE_RESET, UPDATE_SUBJECT_GRADE_RESET, DELETE_SUBJECT_GRADE_RESET } from '../redux/constants/classConstants';

const MenuList = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const child = route.params.child;
    const dispatch = useDispatch();

    const handleChildren = (data) => {
        console.log(12)
        console.log(child)
        dispatch({type: UPDATE_CHILDREN_RESET});
        dispatch({type: INDIVIDUAL_CHILDREN_RESET})
        
        navigation.navigate("StudentAmend", {data});
    };

    const handleParent = (data) => {
        dispatch({type: GET_PARENT_RESET})
        navigation.navigate("ParentInfo", {data});
    };

    const handleGrade = (data) => {
        dispatch({type: NEW_SUBJECT_GRADE_RESET})
        dispatch({type: SUBJECT_GRADE_RESET})
        dispatch({type: UPDATE_SUBJECT_GRADE_RESET})
        dispatch({type: DELETE_SUBJECT_GRADE_RESET})
        navigation.navigate("Grade", {data});
    };

    const renderSeparator = () => <View style={styles.separator} />;

    const renderTab = ({ icon, label, onPress }) => (
      <TouchableOpacity style={styles.tab} onPress={onPress}>
        <MaterialIcons name={icon} size={24} color="#444"/>
        <Text style={styles.tabText}>{label}</Text>
      </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
        {renderTab({
          icon: 'people',
          label: 'Children Details',
          onPress: () => handleChildren(child),
        })}
        {renderSeparator()}
        {renderTab({
          icon: 'person',
          label: 'Parent Details',
          onPress: () => handleParent(child),
        })}
        {renderSeparator()}
        {renderTab({
          icon: 'star',
          label: 'Grade Details',
          onPress: () => handleGrade(child),
        })}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  separator: {
    backgroundColor: '#eee',
    height: 1,
    marginHorizontal: 10,
  },
  tab: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 20,
  },
  tabText: {
    color: '#444',
    fontSize: 16,
    marginLeft: 20,
  },
});

export default MenuList;