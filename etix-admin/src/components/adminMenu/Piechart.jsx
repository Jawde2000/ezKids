import {React, useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Box,} from '@mui/material';
import { Typography } from '@material-ui/core';
import { Grid } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { ChildrenGender } from '../../actions/userActions';
import { CHILDREN_DEMOGRAPHIC_GENDER_REQUEST, CHILDREN_DEMOGRAPHIC_GENDER_SUCCESS, 
  CHILDREN_DEMOGRAPHIC_GENDER_FAIL, CHILDREN_DEMOGRAPHIC_GENDER_RESET } from '../../constants/userConstants';

const COLORS = ['#FF0000','#0088FE','#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function Piechart() {
  const dispatch = useDispatch();
  const getChildrenGender = useSelector(state => state.getChildrenGender);
  const {data: childrenDemo, success: success} = getChildrenGender;
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;
  const [female, getFemale] = useState();
  const [male, getMale] = useState();

  useEffect(() => {
    dispatch(ChildrenGender());
    if (success) {
      console.log(childrenDemo)
      getMale(childrenDemo[0])
      getFemale(childrenDemo[1])
    }
  }, [])

  const data = [
    { name: 'Girl', value:female},
    { name: 'Boy', value: male },
  ];
 
  return (
    <Grid item>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h5" gutterBottom style={{color: "#3f51b5"}}>
        Children Demographic
      </Typography>
    </Box>
      <PieChart width={400} height={343}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ fontWeight: "bold", fontSize: "1.2rem", color: "#3f51b5" }}
        />
      </PieChart>
  </Grid>
  );
}
