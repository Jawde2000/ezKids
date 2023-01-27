import { Grid, Container, IconButton,  Typography, Button, Box, Paper,} from '@mui/material';
import { makeStyles} from '@mui/styles';
import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import TeacherIcon from '@mui/icons-material/Badge';
import ParentIcon from '@mui/icons-material/EscalatorWarning';
import ChildrenIcon from '@mui/icons-material/ChildCare';
import ClassIcon from '@mui/icons-material/School';
import { shadows } from '@mui/system';
import { styled } from '@mui/material/styles';
import { user_Total } from '../../actions/userActions';
import Calendar from "react-beautiful-calendar";

const useStyles = makeStyles((theme) => ({
    // Box: {
    //     boxShadow: 3,
    //     width: '8rem',
    //     height: '5rem',
    //     bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
    //     color: (theme) =>
    //       theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
    //     p: 1,
    //     m: 1,
    //     borderRadius: 2,
    //     textAlign: 'center',
    //     fontSize: '0.875rem',
    //     fontWeight: '700',
    // },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Dashboard() {
    const styles = useStyles();
    const [value, onChange] = useState(new Date());
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
  
    const teacher = useSelector(state => state.teacherTotal);
    const {success: teacherT} = teacher;

    const [teacher_total, setTeacherTotal] = useState([]);

    useEffect(() => {
        dispatch(user_Total());
    }, [])

    useEffect(() => {
        if (teacherT) {
            setTeacherTotal(teacherT);
        }
    },)


    return (
        
        <Grid xs={12} direction="column" container justify="center" alignItems="center" alignContent="center" spacing={2}>
            <Grid container xs={8} item direction="row" display="flex" spacing={2}>
                <Grid item xs={3} md={3}>
                    <Item>
                        <Button disabled style={{maxWidth: '300px', maxHeight: '300px', minWidth: '300px', minHeight: '300px' , color: "black"}}>
                            <Grid xs={12}>
                                <Grid xs={12}>
                                    <TeacherIcon style={{fontSize: 50,}}/>
                                </Grid>
                            <Grid xs={12}>
                                <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: "bold", fontSize: 25 , color: "black"}}>
                                    Teacher
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 25 , color: "black"}}>
                                    {3}
                                </Typography>
                            </Grid>
                            </Grid>
                        </Button>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <Button disabled style={{maxWidth: '300px', maxHeight: '300px', minWidth: '300px', minHeight: '300px' , color: "black"}}>
                            <Grid xs={12}>
                                <Grid xs={12}>
                                    <ParentIcon style={{fontSize: 50,}}/>
                                </Grid>
                            <Grid xs={12}>
                                <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: "bold", fontSize: 25 , color: "black"}}>
                                    Guardians
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 25 , color: "black"}}>
                                    {4}
                                </Typography>
                            </Grid>
                            </Grid>
                        </Button>
                        </Item>
                </Grid>
                <Grid item xs={3}>
                        <Item>
                        <Button disabled style={{maxWidth: '300', maxHeight: '300px', minWidth: '300px', minHeight: '300px' , color: "black"}}>
                            <Grid xs={12}>
                                <Grid xs={12}>
                                    <ChildrenIcon style={{fontSize: 50,}}/>
                                </Grid>
                            <Grid xs={12}>
                                <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: "bold", fontSize: 25 , color: "black"}}>
                                    Children
                                </Typography>
                            </Grid>
                            </Grid>
                        </Button>
                        </Item>
                </Grid>
                <Grid item xs={3}>
                    <Calendar/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Dashboard;