import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SUBJECT_GRADE_RESET, UPDATE_CHILDREN_RESET } from '../redux/constants/classConstants';

const MenuList = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const child = route.params.child;
    const dispatch = useDispatch();

    dispatch({type: UPDATE_CHILDREN_RESET});
    dispatch({type: SUBJECT_GRADE_RESET});

    const handleChildren = (data) => {
        console.log(12)
        console.log(child)
        navigation.navigate("StudentAmend", {data});
    };

    const handleParent = (data) => {
        navigation.navigate("ParentInfo", {data});
    };

    const handleGrade = (data) => {
        navigation.navigate("Grade", {data});
    };

    return (
        <View>
        <TouchableOpacity
            style={[styles.tab]}
            onPress={() => handleChildren(child)}
        >
            <Ionicons name="ios-people" size={28} color={'#777'} />
            <Text style={[styles.tabText]}>Children Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.tab]}
            onPress={() => handleParent(child)}
        >
            <Ionicons name="ios-person" size={28} color={'#777'} />
            <Text style={[styles.tabText]}>Parent Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.tab]}
            onPress={() => handleGrade(child)}
        >
            <Ionicons name="ios-star" size={28} color={'#777'} />
            <Text style={[styles.tabText]}>Grade Details</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    margin: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  activeTab: {
    backgroundColor: '#007aff',
  },
  tabText: {
    marginLeft: 20,
    fontSize: 18,
    color: '#777',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default MenuList;
