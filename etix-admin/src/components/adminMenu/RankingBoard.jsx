import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import { Typography, } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import {useDispatch, useSelector} from 'react-redux'
import { getGlobalRanking } from '../../actions/userActions';
import {useEffect, useState} from 'react';
import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: "100%",
    overflowX: 'auto',
  },
  table: {
    minWidth: 150,
    minHeight: 200,
  },
}));

export default function RankingBoard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const GlobalRanking = useSelector(state => state.globalRanking);
  const {data: rankingList, success: successRanking, loading: loadingRanking} = GlobalRanking;
  const [childrenRanking, getChildrenRanking] = useState([]);

  useEffect(() => {
    dispatch(getGlobalRanking());
  }, []);

  useEffect(() => {
    if (successRanking) {
      getChildrenRanking(rankingList);
    }
    const intervalId = setInterval(() => {
      dispatch(getGlobalRanking());
    }, 180 * 1000); // 3 minutes in milliseconds
    
    return () => {
      setInterval(intervalId);
    };
  }, [rankingList, dispatch]);

  return (
    <Paper className={classes.root}>
        {successRanking?
        <Table>
        <TableHead style={{ position: "sticky", top: 0 }}>
          <TableRow  display="flex">
            <TableCell align="center" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Typography variant="h6" style={{fontFamily: ['rubik', 'impact'].join(','),}}>Rank</Typography> {<MilitaryTechIcon style={{ fontSize: '25px', color: 'gold'}}/>}
            </TableCell>
            <TableCell>
              <Typography variant="h6" style={{fontFamily: ['rubik', 'impact'].join(','),}}>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" style={{fontFamily: ['rubik', 'impact'].join(','),}}>Class</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" style={{fontFamily: ['rubik', 'impact'].join(','),}}>Score</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {childrenRanking.slice(0, 6).map((row, index) => (
            <TableRow key={row.rank} style={index % 2 === 0 ? { backgroundColor: 'lightgrey' } : { backgroundColor: 'white' }}>
              <TableCell style={{fontFamily: ['rubik', 'impact'].join(','),}} align="center">{index + 1}</TableCell>
              <TableCell>{row.child_name}</TableCell>
              <TableCell>{row.class}</TableCell>
              <TableCell>{row.subject_avg.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      :
      <Table>
        <TableHead style={{ position: "sticky", top: 0 }}>
          <TableRow  display="flex">
          <TableCell align="center" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Typography variant="h6" style={{fontFamily: ['rubik', 'impact'].join(','),}}>Rank</Typography> {<MilitaryTechIcon style={{ fontSize: '25px', color: 'gold'}}/>}
            </TableCell>
            <TableCell>
              <Typography variant="h6" style={{fontFamily: ['rubik', 'impact'].join(','),}}>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" style={{fontFamily: ['rubik', 'impact'].join(','),}}>Class</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" style={{fontFamily: ['rubik', 'impact'].join(','),}}>Score</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
        </TableRow>
        <TableRow>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
        </TableRow>
        <TableRow>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
        </TableRow>
        <TableRow>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
        </TableRow>
        <TableRow>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
        </TableRow>
        <TableRow>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
              <TableCell><Skeleton variant="rounded"/></TableCell>
        </TableRow>
        </TableBody>
      </Table>
      }
    </Paper>
  );
}
