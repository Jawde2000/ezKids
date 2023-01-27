import {React, useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Grid } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { ChildrenGender } from '../../actions/userActions';
import { CHILDREN_DEMOGRAPHIC_GENDER_REQUEST, CHILDREN_DEMOGRAPHIC_GENDER_SUCCESS, 
  CHILDREN_DEMOGRAPHIC_GENDER_FAIL, CHILDREN_DEMOGRAPHIC_GENDER_RESET } from '../../constants/userConstants';

const COLORS = ['#0088FE', '#FF0000', '#FFBB28', '#FF8042'];

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
      console.log(childrenDemo[0]);

      const total = childrenDemo[0] + childrenDemo[1];
      console.log(total)
      getMale(childrenDemo[0])
      getFemale(childrenDemo[1])
    }
    // getFemale(childrenDemo[0]);
    // getMale(childrenDemo.male);
    console.log(male);
  }, [userInfo, success])

  const data = [
    { name: 'Girl', value: female },
    { name: 'Boy', value: male },
  ];

  return (
    <Grid item>
      <Typography variant="h5" align="center" gutterBottom>
        Children Demographic
      </Typography>
      <PieChart width={400} height={360}>
        <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
            {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
        </Pie>
        <Legend verticalAlign="top" height={36}/>
      </PieChart>
    </Grid>
  );
}