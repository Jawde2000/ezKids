import { Grid, Container, IconButton,  Typography, Button, Box, Paper, TextField, Divider, Tooltip, Toolbar} from '@mui/material';
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
import { user_Total, newNotificationPost } from '../../actions/userActions';
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
import Skeleton from '@mui/material/Skeleton';
import { CHILDREN_DEMOGRAPHIC_GENDER_REQUEST, GLOBAL_RANKING_REQUEST, NOTICATION_REQUEST, CLASS_COMPARISION_RESET} from '../../constants/userConstants';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
import Datetime from "react-datetime";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { NEW_NOTICATION_RESET } from '../../constants/userConstants';

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
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: '300px',
    maxHeight: '200px',
    minWidth: '150px', 
    minHeight: '100px'
  }));

function EZDashboard() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
  
    const teacher = useSelector(state => state.teacherTotal);
    const {success: successT, loading: Loading, data: teacherT} = teacher;

    const newNotification = useSelector(state => state.newNotification);
    const {success: successNotification, loading: LoadingNotification, data: notification, error: errorNotification} = newNotification;

    const teacherR = useSelector(state => state.newTeacher)
    const {success: teacherSuccess, error: teacherError, loading: teacherLoading} = teacherR

    const classComparison = useSelector(state => state.classComparison);
    const {success: successComparison} = classComparison;

    const [user_total, setUserTotal] = useState([]);
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [value, setValue] = useState(new Date());
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [stopRealTime, setStopRealTime] = useState(false);
    const [post, setPost] = useState(false);
    const [newPost, setNewPost] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    const ContentDialog = () => {
        const [opens, setOpens] = useState(true);
    
        const handleCloses = () => {
            dispatch({type: NEW_NOTICATION_RESET});
            setOpens(false);
        };
          
        return (
          <Toolbar>
            <Dialog
                open={opens}
                onClose={handleCloses}
                aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                NOTIFICATION
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                You have Successfully add an new announcement
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button style={{color: successNotification? "green":"red",}} onClick={handleCloses}>OK</Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    useEffect(() => {
        if (!stopRealTime) {
            const intervalId = setInterval(() => {
                setValue(new Date());
            }, 1000);
    
            return () => clearInterval(intervalId);
        }
    }, [stopRealTime]);

    useEffect(() => {
        if(post){
            dispatch(newNotificationPost(newPost))
            setPost(false);
        }
    }, [post])

    const handlePost = () => {
        if (!title || !content || !value) {
            alert("Please enter all the required fields");
            return;
        }

        if(title && content && value) {
            const newFormat = value.toISOString().split('.')[0]+"Z";
            console.log(newFormat);

            const valueNow = new Date();
            const newFormatNow = valueNow.toISOString().split('.')[0]+"Z";
            console.log(valueNow)
            setNewPost({
                announcementTitle: title,
                announcementDesc: content,
                announcementSchedule: newFormat,
                announcementTime: newFormatNow,
            });
            setOpen(false);
            setPost(true);
            return;
        } 
    }

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    useEffect(() => {
        dispatch(user_Total());
    }, []);
    
    useEffect(() => {
        if (successT) {
            setUserTotal(teacherT);
        }
    
        let intervalId = setInterval(() => {
            dispatch(user_Total());
        }, 180 * 1000);
    
        return () => {
            clearInterval(intervalId);
        };
    }, [teacherT, dispatch]);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleContent = (e) => {
        setContent(e.target.value);
    }


    return (
        <Box>
        <Grid bgcolor="#36454F" sx={{ flexGrow: 2 , p: 5, m: 5}} xs={12} direction="column" container justify="center" alignItems="center" alignContent="center" spacing={2}>
        <Grid p={7} xs={12} container direction="row" display="flex" spacing={5}>
            <Grid item xs={3}>
                <Grid to="/menu/teachermanagement" component={Link} style={{ textDecorationLine: 'none'}}>
                <Item >
                    <Grid p={5}>
                    <TeacherIcon style={{fontSize: 35, color:"black"}}/>
                    <Divider/>
                    <Typography style={{fontFamily: ['Rubik', 'impact'].join(','), fontSize: 15 , color: "#D3D3D3"}}>
                        Teacher
                    </Typography>
                    <Typography style={{fontFamily: ['Rubik', 'sans-serif'].join(','), fontSize: 15 , color: "black"}}>
                        {successT?user_total[0]:<Skeleton variant="rounded"/>}
                        {/* {user_total[0]} */}
                    </Typography>
                    </Grid>
                </Item>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Grid to="/menu/parentmanagement" component={Link} style={{ textDecorationLine: 'none'}}>
                <Item>
                    <Grid p={5}>
                    <ParentIcon style={{fontSize: 35, color: "#ADD8E6"}}/>
                    <Divider />
                    <Typography style={{fontFamily: ['rubik', 'impact'].join(','), fontSize: 15 , color: "#D3D3D3"}}>
                        Guardians
                    </Typography>
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 15 , color: "black"}}>
                        {successT?user_total[1]:<Skeleton variant="rounded"/>}
                        {/* {user_total[1]} */}
                    </Typography>
                    </Grid>
                </Item>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    <Grid p={5}>
                    <ChildrenIcon style={{fontSize: 35, color: "#98FB98"}}/>
                    <Divider />
                    <Typography style={{fontFamily: ['rubik', 'impact'].join(','), fontSize: 15 , color: "#D3D3D3"}}>
                        Children
                    </Typography>
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 15 , color: "black"}}>
                        {successT?user_total[2]:<Skeleton variant="rounded"/>}
                        {/* {user_total[2]} */}
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
                    <Typography style={{fontFamily: ['rubik', 'impact'].join(','), fontSize: 15 , color: "#D3D3D3"}}>
                        Classes
                    </Typography>
                    <Typography style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontSize: 15 , color: "black"}}>
                        {successT?user_total[3]:<Skeleton variant="rounded"/>}
                        {/* {user_total[3]} */}
                    </Typography>
                    </Grid>
                </Item>
            </Grid>
        </Grid>
        <Grid p={3} xs={12} container direction="row" spacing={4}>
            <Grid item xs={4}>
                <Paper>
                    <Piechart />
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper>
                    <ResultChart />
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <RankingBoard />
            </Grid>
        </Grid>
        <Grid p={3} xs={12} container direction="row" spacing={5}>
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
        {/* <Grid>
              {Loading?
              <Backdrop style={{ zIndex: 9999, backgroundColor: '#36454F'}}  open={true}>
              <CircularProgress  style={{color: '#F5CB5C'}}/>
              </Backdrop>:null
              }
        </Grid> */}
<Dialog open={open} onClose={handleClose}>
  <DialogTitle style={{backgroundColor: "#FDB813", color: "#fff", textAlign: "center", padding: "20px"}}>
    <Typography variant="h5" color={"black"}>Create Announcement</Typography>
  </DialogTitle>
  <DialogContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
    <DialogContentText style={{margin: "10px 0", textAlign: "center"}}>
      Share your thoughts and ideas with the community, {userInfo.username}
    </DialogContentText>
    <TextField 
        placeholder="What's your title"
        fullWidth={true}
        value={title}
        onChange={handleTitle}
        style={{margin: "20px 0"}}
        variant="outlined"
    />
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
      variant="outlined"
      placeholder="What's on your mind?"
      value={content}
      onChange={handleContent}
      style={{margin: "20px 0"}}
    />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={4}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={8}>
        <DateTimePicker
            value={value}
            onChange={(date) => {
                setValue(date);
                setStopRealTime(true);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={stopRealTime}
                onChange={() => setStopRealTime(!stopRealTime)}
                color="primary"
                inputProps={{
                  "aria-label": "primary checkbox"
                }}
              />
            }
            label="Schedule Time"
            labelPlacement="start"
          />
        </Grid>
      </Grid>
      </Stack>
    </LocalizationProvider>
      </Grid>
    </MuiPickersUtilsProvider>
  </DialogContent>
  <DialogActions style={{backgroundColor: "#FDB813", color: "#fff", display: "flex", justifyContent: "space-between", padding: "20px"}}>
    <Button onClick={handleClose} style={{color: "#fff"}}>Cancel</Button>
    <Button onClick={handlePost} variant="contained" style={{backgroundColor: "#fff", color: "#FDB813"}}>
      Post
    </Button>
  </DialogActions>
</Dialog>
<Grid>
    {LoadingNotification?
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress  style={{color: '#F5CB5C'}}/>
        </Backdrop>:null
    }
</Grid>
</Box>
    );
}

export default EZDashboard;
