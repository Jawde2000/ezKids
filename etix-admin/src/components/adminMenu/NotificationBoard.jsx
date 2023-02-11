import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import { IconButton, Paper, Typography, Grid, Box } from '@material-ui/core';
import { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import {useDispatch, useSelector} from 'react-redux'
import { getNotification } from '../../actions/userActions';
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Divider } from '@mui/material';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius
  },
  message: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  type: {
    fontWeight: 'bold'
  },
  dismiss: {
    padding: 0
  },
  icon: {
    fontSize: '2rem'
  }
}));

function Notification({ title, message, onDismiss, index, schedule }) {
  const classes = useStyles();

  const convertTime = convert => {
    var timeString = convert;
    var timeString2 = timeString.replace('T', ' ');
    var arr = timeString2.split(':');
    var suffix = arr[0] >= 12 ? ' PM' : ' AM';
    var t = arr[0] + ':' + arr[1] + suffix;
    return t;
  };

  let icon = <NotificationsIcon className={classes.icon} />;

  return (
    <Paper
      className={classes.root}
      onClick={onDismiss}
      style={index % 2 === 0 ? { backgroundColor: 'white' } : { backgroundColor: 'lightgrey' }}
    >
      <Box>
        {icon}
        <Box className={classes.message}>
          <Typography className={classes.type}>{title}</Typography>
          <Typography>{convertTime(schedule)}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default function NotificationBoard() {
  const classes = useStyles();
  const [notificationList, setNotificationList] = useState([]);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  const {data: notiList, success: successNoti, loading: loadingNoti} = notification;
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState([]);

  const notifications = [
    { type: 'message', message: 'Notification 1' },
    { type: 'alert', message: 'Notification 2' },
    { type: 'default', message: 'Notification 3' },
  ];

  useEffect(() => {
    dispatch(getNotification());
    if (successNoti) {
      setNotificationList(notiList);
    }
  }, []);

  useEffect(() => {
    if (successNoti) {
      setNotificationList(notiList);
    }
    const intervalId = setInterval(() => {
      dispatch(getNotification());
    }, 180 * 1000); // 3 minutes in milliseconds
    
    return () => {
      setInterval(intervalId);
    };
  }, [notiList, dispatch]);

  const handleClose = () => {
    setOpen(false);
  };
    
  const handleClickOpen = (notification) => {
    setOpen(true);
    let convertedTime = convertTime(notification.announcementSchedule);
    let updatedNotification = { ...notification, announcementSchedule: convertedTime };
    setSelectedNotification(updatedNotification);
  };

  const convertTime = (message) => {
    var timeString = message // input string
    var timeString2 = timeString.replace("T", " "); 
    var arr = timeString2.split(":"); // splitting the string by colon
    var suffix = arr[0] >= 12 ? " PM":" AM"
    var t = arr[0] + ":" + arr[1] + suffix
    return t;
  }

  return (
    <Grid>
      <Typography variant="h5" align="left" gutterBottom style={{marginLeft: '20px', fontFamily: ['rubik', 'impact'].join(','),}}>
        Notifications
      </Typography>
      <Divider></Divider>
      <Grid direction="column">
      {successNoti?
      <Grid>
      {notificationList.slice(0, 8).map((notification, index) => (
          <Grid item xs={12} key={index} onClick={() => handleClickOpen(notification)}>
              <Notification
                  title={notification.announcementTitle}
                  message={notification.announcementTime}  
                  schedule={notification.announcementSchedule}
                  index={index}
              />
          </Grid>
      ))}
      <Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
      <Grid container direction="column" justify="space-between">
      <Grid item>
        {selectedNotification?.announcementTitle}
      </Grid>
      <Grid item>
        <Typography variant="caption">{selectedNotification?.announcementSchedule}</Typography>
      </Grid>
      </Grid>
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {selectedNotification?.announcementDesc}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        </DialogActions>
      </Dialog>
      </Grid>
      </Grid>
      :
      <Paper className={classes.root}>
      <Box>
      <Skeleton />
      <Box className={classes.message}>
        <Typography className={classes.type}><Skeleton /></Typography>
        <Typography><Skeleton /></Typography>
      </Box>
      <IconButton
        className={classes.dismiss}
        aria-label="dismiss"
      >
        <Skeleton />
      </IconButton>
      <Skeleton />
      <Box className={classes.message} sx={{ width: 400 }}>
        <Typography className={classes.type}><Skeleton animation="wave" /></Typography>
        <Typography><Skeleton /></Typography>
      </Box>
      <IconButton
        className={classes.dismiss}
      >
        <Skeleton animation="wave" />
      </IconButton>
      </Box>
      </Paper>
      }
      </Grid>
    </Grid>
    );
}