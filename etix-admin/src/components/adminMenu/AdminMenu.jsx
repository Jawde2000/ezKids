import {  Grid, Typography, Button} from '@mui/material';
import {Link, useHistory} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import React, {useEffect, useState} from 'react';
import kindergarten from '../globalAssets/kindergarten.jpg';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import GroupIcon from '@mui/icons-material/Group';
import TelegramIcon from '@mui/icons-material/Telegram';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {useDispatch, useSelector} from 'react-redux'
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TeacherIcon from '@mui/icons-material/Badge';
import ParentIcon from '@mui/icons-material/EscalatorWarning';
import ChildrenIcon from '@mui/icons-material/ChildCare';
import ClassIcon from '@mui/icons-material/School';
import PrincipalInfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logout } from '../../actions/userActions';
import Dashboard from '../adminMenu/Dashboard';
import { USER_LIST_RESET } from '../../constants/userConstants';

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${kindergarten})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
      backgroundBlendMode: "lighten",
      minHeight: 700
    },
    welcome: {
      padding: 60,
      color: 'white',
      fontFamily: ['rubik', 'sans-serif'].join(','),
    },
    urlVerification: {
      borderRadius: 20,
      backgroundColor: '#F5CB5C',
      padding: 20,
      opacity: 0.7,
      paddingLeft: 150,
      paddingRight: 150,
    }, 
    lockcustom: {
      alignItems:"center",
      justifyContent:"center",
      display:"flex",
      paddingBottom: 5,
      color: "#32CD32",
    },
    urlText: {
      fontSize: 17,
      opacity: 1,
      textDecorationLine: "none",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
        color: "#32CD32",
      }
    },
    lime: {
      color: "#32CD32"
    }
}));


function AdminMenu() {
  const dispatch = useDispatch();
  let history = useHistory();

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userList = useSelector(state => state.userList);
  const {loading, error, users} = userList
  const parentList = useSelector(state => state.parentList)
  const {data: listParents, loading: loadingParent, success: successParent} = parentList;

  useEffect(() => {
    if(!userInfo) {
        history.push('/')
    }
  },[userInfo])

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [dashboard, setdashboard] = useState(true);
  const [teacherManagement, setteacherManagement] = useState(false);
  const [parentManagement, setparentManagement] = useState(false);

  useEffect(() => {
    if (loading || loadingParent) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [loading, loadingParent])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleLogOut() {
    dispatch(logout())
    history.push("/"); // whichever component you want it to route to
  }

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar color="inherit" position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AnnouncementIcon />
            </ListItemIcon>
            <ListItemText primary={"Announcements"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to={"/menu/teachermanagement"} style={{ textDecorationLine: 'none', display: "flex", color: "black"}}>
          <ListItemButton >
            <ListItemIcon>
              <TeacherIcon />
            </ListItemIcon>
            <ListItemText primary={"Teachers"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to={"/menu/parentmanagement"} style={{ textDecorationLine: 'none', display: "flex", color: "black"}}>
          <ListItemButton>
            <ListItemIcon>
              <ParentIcon />
            </ListItemIcon>
            <ListItemText primary={"Guardians"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChildrenIcon />
            </ListItemIcon>
            <ListItemText primary={"Children"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary={"Classes"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                  <PrincipalInfoIcon />
                </ListItemIcon>
              <ListItemText primary={"Principal Info"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogOut.bind(this)}>
                <ListItemIcon >
                  <ExitToAppIcon />
                </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
    </Drawer>
    <Main open={open}>
    </Main>
  </Box>
  );

}

export default AdminMenu;