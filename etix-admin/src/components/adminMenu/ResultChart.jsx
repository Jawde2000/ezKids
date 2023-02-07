import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '350px',
  },
}));

const data = [
  { name: 'Student 1', score: 90 },
  { name: 'Student 2', score: 85 },
  { name: 'Student 3', score: 80 },
  { name: 'Student 4', score: 75 },
  { name: 'Student 5', score: 70 },
];

export default function ResultChart() {
  const classes = useStyles();

  return (
    <Grid>
      <BarChart
        width={550}
        height={383}
        data={data}
        margin={{ top: 5, right: 150, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Score (out of 100)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    </Grid>
  );
}
