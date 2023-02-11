import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
} from 'recharts';
import {useDispatch, useSelector} from 'react-redux'
import { getClassComparison } from '../../actions/userActions';
import {useEffect, useState} from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';

const COLORS = ['#87CEEB','#1E90FF','#191970', '#FF8042'];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '350px',
  },
}));

export default function ResultChart() {
  const dispatch = useDispatch();
  const classComparison = useSelector(state => state.classComparison);
  const {data: comparisonList, success: successComparison, loading: loadingComparison} = classComparison;
  const [classComparisonList, getClassComparisonList] = useState([]);

  useEffect(() => {
    dispatch(getClassComparison());
  }, []);

  useEffect(() => {
    if (successComparison) {
      getClassComparisonList(comparisonList);
    }
    const intervalId = setInterval(() => {
      dispatch(getClassComparisonList());
    }, 180 * 1000); // 3 minutes in milliseconds
    
    return () => {
      setInterval(intervalId);
    };
  }, [comparisonList, dispatch]);

  const data = [
    { name: 'Loading', score: 90 },
    { name: 'Loading', score: 85 },
    { name: 'Loading', score: 80 },
  ];

  return (
    <Grid>
      {
      <BarChart
        width={550}
        height={383}
        data={classComparisonList}
        margin={{ top: 5, right: 150, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="Class" />
        <YAxis style={{fontFamily: ['rubik', 'impact'].join(','),}} label={{ value: 'Class Score Average', angle: -90, position: 'insideLeft', }}/>
        <Tooltip />
        <Legend />
        <Bar dataKey={"Average"}>
        {classComparisonList.map((data, index) => (         
            <Cell key={index} fill={COLORS[index % COLORS.length]}/>
        ))}
        </Bar>
      </BarChart>
      }

    </Grid>
  );
}
