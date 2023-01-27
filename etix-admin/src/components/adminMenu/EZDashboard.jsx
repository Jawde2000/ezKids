import { Grid, Container, IconButton,  Typography, Button, Box, Paper, TextField, Divider,} from '@mui/material';
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
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
import NotificationBoard from './NotificationBoard';
import Piechart from './Piechart';
import ResultChart from './ResultChart';
import RankingBoard from './RankingBoard';

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
    TextFieldInputProps:{
        paddingTop: '5px'
    },
    dialog: {
        position: 'absolute',
        left: 10,
        top: 50
    },
    background: {
        backgroundColor: "F5F5F5",
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: '300px',
    maxHeight: '350px',
    minWidth: '200px', 
    minHeight: '200px'
  }));

function EZDashboard() {
    const styles = useStyles();
    const [value, onChange] = useState(new Date());
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
  
    const teacher = useSelector(state => state.teacherTotal);
    const {success: successT, loading: Loading, data: teacherT} = teacher;

    const [user_total, setUserTotal] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(user_Total());
        if (successT) {
            setUserTotal(teacherT);
        }
    }, [])

    return (
        <Box bgcolor="#DADADA" borderBottom="1px solid black" borderTop="1px solid black" sx={{ flexGrow: 1 , p: 5, m: 5, }}>
        <Grid xs={12} direction="column" container justify="center" alignItems="center" alignContent="center" spacing={2}>
        <Grid p={2} xs={12} container direction="row" display="flex" spacing={5}>
            <Grid item xs={3}>
                <Item>
                    <Grid p={5}>
                    <TeacherIcon style={{fontSize: 35, color: ""}}/>
                    <Divider />
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 20 , color: "#D3D3D3"}}>
                        Teacher
                    </Typography>
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 20 , color: "black"}}>
                        {user_total[0]}
                    </Typography>
                    </Grid>
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    <Grid p={5}>
                    <ParentIcon style={{fontSize: 35, color: "#ADD8E6"}}/>
                    <Divider />
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 20 , color: "#D3D3D3"}}>
                        Guardians
                    </Typography>
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 20 , color: "black"}}>
                        {user_total[1]}
                    </Typography>
                    </Grid>
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    <Grid p={5}>
                    <ChildrenIcon style={{fontSize: 35, color: "#98FB98"}}/>
                    <Divider />
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 20 , color: "#D3D3D3"}}>
                        Children
                    </Typography>
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 20 , color: "black"}}>
                        {user_total[2]}
                    </Typography>
                    </Grid>
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    <Paper style={{ backgroundColor: '#ffc107'}}></Paper>
                    <Grid p={5}>
                    <ClassIcon style={{fontSize: 35, color: "#00008B"}}/>
                    <Divider />
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 20 , color: "#D3D3D3"}}>
                        Classes
                    </Typography>
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 20 , color: "black"}}>
                        {user_total[3]}
                    </Typography>
                    </Grid>
                </Item>
            </Grid>
        </Grid>
        <Grid p={2} xs={12} container direction="row" display="flex" spacing={2}>
            <Grid item xs={4}>
                <Paper>
                    <Piechart />
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <Paper>
                    <ResultChart />
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper>
                    <RankingBoard />
                </Paper>
            </Grid>
        </Grid>
        <Grid p={2} xs={12} container direction="row" spacing={2}>
            <Grid item xs={8}>
            <Card sx={{ display: 'flex' }}>
            <Box align="center" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent align="center" sx={{ flex: '1 0 auto' }}>
                    <Grid container justify='center' alignItems='center'>
                    <Grid item>
                    <Button style={{ width: '850px', height: '50px', borderRadius: "50px", display: "flex"}} variant="outlined" onClick={handleClickOpen} align="center">
                    What's on your mind? {userInfo.username}
                    </Button>
                    <Divider style={{width:"90%", height: "3px", margin: '20px auto',}}/>
                    <Grid container direction="row">
                        <Grid item xs={4}>
                            <AttachFileIcon />
                        </Grid>
                        <Grid item xs={4}>
                            <AddAPhotoIcon />
                        </Grid>
                        <Grid item xs={4}>
                            <LocalActivityTwoToneIcon />
                        </Grid>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid>
                    </Grid>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    </Box>
            </Box>
            {/* <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="/static/images/cards/live-from-space.jpg"
                alt="Live from space album cover"
            /> */}
            </Card>
            </Grid>
            <Grid item xs={4}>
                <Paper>
                <NotificationBoard type={"message"} message={"Notification"} onDismiss={"hello"}/>
                </Paper>
            </Grid>
        </Grid>
        </Grid>
        <Grid>
              {Loading?
              <Backdrop style={{ zIndex: 9999, backgroundColor: '#36454F'}}  open={true}>
              <CircularProgress  style={{color: '#F5CB5C'}}/>
              </Backdrop>:null
              }
        </Grid>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Announcement</DialogTitle>
        
        <DialogContent justifyContent='center' alignItems={"center"}>
          <DialogContentText  margin="0 auto" textAlign={"center"}>
            Create any announcement on your mind, {userInfo.username}
          </DialogContentText>
          <TextField
            InputProps={{
            classes: {
               input: styles.TextFieldInputProps
            }
            }}
            margin="dense"
            id="post"
            multiline={true}
            rows={10}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Post</Button>
        </DialogActions>
        </Dialog>
        </Box>
    );
}

export default EZDashboard;