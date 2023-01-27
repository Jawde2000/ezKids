import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Paper, Typography, Grid, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2, 0),
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  type: {
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
  },
  message: {
    flexGrow: 1,
  },
  dismiss: {
    marginLeft: 'auto',
  },
}));

function Notification({ type, message, onDismiss }) {
  const classes = useStyles();

  let icon;
  switch (type) {
    case 'message':
      icon = <ChatIcon className={classes.icon} />;
      break;
    case 'alert':
      icon = <WarningIcon className={classes.icon} />;
      break;
    default:
      icon = <NotificationsIcon className={classes.icon} />;
  }

  return (
    <Paper className={classes.root} onClick={onDismiss}>
      {icon}
      <Box className={classes.message}>
        <Typography className={classes.type}>{type}</Typography>
        <Typography>{message}</Typography>
      </Box>
      <IconButton
        className={classes.dismiss}
        onClick={onDismiss}
        aria-label="dismiss"
      >
      </IconButton>
    </Paper>
  );
}

const notifications = [
  { type: 'message', message: 'Notification 1' },
  { type: 'alert', message: 'Notification 2' },
  { type: 'default', message: 'Notification 3' },
];

export default function NotificationBoard() {
  const [notificationList, setNotificationList] = useState(notifications);

  return (
    <Grid>
      <Typography variant="h5" align="center" gutterBottom>
        Notifications
      </Typography>
      <Grid direction="column">
        {notificationList.map((notification, index) => (
            <Grid item xs={12} key={index}>
                <Notification
                    type={notification.type}
                    message={notification.message}
                />
            </Grid>
        ))}
        </Grid>
    </Grid>
    );
}