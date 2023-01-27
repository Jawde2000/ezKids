import React, {useState} from 'react'
import {makeStyles} from '@mui/styles';
import { Container, Grid, Box, Tooltip, TextField, Button, Toolbar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import moscow from '../globalAssets/moscow.jpg';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router';
import { customerRegisterUsers, adminRegisterUsers, vendorRegisterUsers, teacherRegister } from '../../actions/userActions';
import { useEffect } from 'react';
import { USER_CUSTOMER_REGISTER_RESET, USER_REGISTER_RESET, NEW_TEACHER_RESET, NEW_TEACHER_FAIL
, NEW_TEACHER_REQUEST, NEW_TEACHER_SUCCESS } from '../../constants/userConstants';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import "../Font/fonts.css"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        // backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#DADADA",
        backgroundBlendMode: "lighten",
        minHeight: 750,
        padding: 20,
    },
    box: {
        backgroundColor: "white",
        borderRadius: 1,
        margin: 'auto',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20
    },
    action: {
        minHeight: 50,
    },
    functionicon: {
        cursor: 'pointer',
    },
    title: {
        fontWeight: 'bold',
        paddingTop:15,
    },
    subtitle: {
        paddingLeft:30,
    },
}));


const AddUser = ({props}) => {

    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cus = useSelector(state => state.customerRegister)
    const {success: successCustomer, error: errorCus} = cus

    const admin = useSelector(state => state.adminRegister)
    const {success: successAdmin, error: errorAdmin} = admin

    const teacherR = useSelector(state => state.newTeacher)
    const {success: teacherSuccess, error: teacherError, loading: teacherLoading} = teacherR

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Vendor");
    const [isActive, setIsActive] = useState(false);
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passStatus, setPassStatus] = useState(false);
    const [bankName, setBankName] = useState("");
    const [bankAcc, setBankAcc] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [holder, setHolder] = useState('');
    const [user, setUser] = useState({});
    const [teacher, setTeacher]= useState({});
    const [vendor, setVendor] = useState({});
    const [submit, setSubmit] = useState(false);
    const [openDialog, setopenDialog] = useState(false);

    const ContentDialog = ({title, content}) => {
        const [open, setOpen] = useState(true);

        const handleClose = () => {
          setOpen(false);
        };

        const backtoManagement = () => {
            dispatch({type: NEW_TEACHER_RESET});
            history.push('/menu/teachermanagement/');
        }
      
        return (
          <Toolbar>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {content}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button style={{color: teacherSuccess? "green":"red",}} onClick={backtoManagement}>OK</Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
      }

    const handleSubmit = () =>{
        if(username && email && contact && password && passStatus){

            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if ( re.test(email) ) {
                
            }
            else {
                alert("Please enter correct email format. Failed to save.");
                return;
            }
            console.log("teacher in")
            if(bankName && bankAcc){
                setTeacher({
                    ...teacher,
                    "username": username,
                    "email": email,
                    "is_teacher": "True",
                    "is_staff": "True",
                    "is_superuser": false,
                    "is_active": isActive,
                    "password": password,
                    "teacherContactphone" : contact,
                    "teacherEmail": email,
                    "teacherFirstName" : first,
                    "teacherLastName": last,
                    "teacherBankAcc": bankAcc,
                    "teacherBankName": bankName,
                    "bankAccountHolder": holder,
                })
                setSubmit(true);
                return;
            }
            setSubmit(false);
            return
        }

        if(!username || !email || !contact || !password || !passStatus){
            alert("Fill in all the empty field!");
            setSubmit(false)
            return;
        }
        
        if(!passStatus){
            alert("Password and confirm password must match!");
            setSubmit(false)
            return;
        }
    }

    useEffect(() => {
        if(submit){
            dispatch(teacherRegister(teacher));
        }
    },[user, teacher])

    useEffect(() => {
        if(submit){
            setTitle("Notification");
            console.log(teacherSuccess)
            if(teacherSuccess){
                console.log("register success")
                setContent("Successfully Register User")
                setopenDialog(true);
            }else{
                console.log("register fail")
                setContent("Failed to Register User")
                setopenDialog(true);           
            }    
        }
        
    }, [dispatch, teacherError, teacherSuccess])

    const handlePassword = (event) => {
        setConfirmPass(event.target.value);
        if(password === event.target.value){
            setPassStatus(true);
            return;
        }
        setPassStatus(false);
    }
    
    return (
        <Container className={classes.root} maxWidth="Fixed">
            <Container>         
            <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                <Grid item xs={12} className={classes.action} container>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            <Link to="/menu/teachermanagement/">
                                <IconButton>
                                    <ArrowBackIcon fontSize="large" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                        Add User
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{width: '80%'}} className={classes.box}>
                    <Grid xs={12} container>
                        <Grid item xs={12}>
                            <Grid item xs={12} container>
                                <Grid item xs={12} style={{fontWeight: 'bold'}}>
                                    Basic Information
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid container xs={12} sm={3} className={classes.title}>
                                    Username: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="username" 
                                        variant="outlined"
                                        onChange={(e) => setUsername(e.target.value)}
                                        defaultValue={username}
                                        margin="dense"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={12} sm={3} className={classes.title}>
                                    email: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="email" 
                                        variant="outlined"
                                        onChange={(e) => setEmail(e.target.value)}
                                        defaultValue={email}
                                        margin="dense"
                                        required
                                        type="email"
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={12} sm={3} className={classes.title}>
                                    Phone Number: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="contact" 
                                        variant="outlined"
                                        onChange={(e) => setContact(e.target.value)}
                                        defaultValue={contact}
                                        margin="dense"
                                        required
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={12} sm={3} className={classes.title}>
                                    Password: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="password" 
                                        variant="outlined"
                                        onChange={(e) => setPassword(e.target.value)}
                                        defaultValue={password}
                                        type="password"
                                        margin="dense"
                                        required
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={12} sm={3} className={classes.title} color={passStatus? "black" : "red"}>
                                    Confirm Password: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="confirmpass" 
                                        variant="outlined"
                                        onChange={(e) => handlePassword(e)}
                                        defaultValue={confirmPass}
                                        type="password"
                                        margin="dense"
                                        required
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                                    <>
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} container>
                                        <Grid item xs={12} className={classes.title}>
                                            Extra Information
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container className={classes.subtitle}>
                                        <Grid item xs={12} sm={3} className={classes.title}>
                                            First Name: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="FirstName" 
                                                variant="outlined"
                                                onChange={(e) => setFirst(e.target.value)}
                                                defaultValue={bankName}
                                                margin="dense"
                                                fullWidth
                                                required
                                                size="small"
                                                InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                }} 
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container className={classes.subtitle}>
                                        <Grid item xs={12} sm={3} className={classes.title}>
                                            Last Name: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="LastName" 
                                                variant="outlined"
                                                onChange={(e) => setLast(e.target.value)}
                                                defaultValue={bankName}
                                                margin="dense"
                                                fullWidth
                                                required
                                                size="small"
                                                InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                }} 
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container className={classes.subtitle}>
                                        <Grid item xs={12} sm={3} className={classes.title}>
                                            Bank Acc Holder: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="BankHolder" 
                                                variant="outlined"
                                                onChange={(e) => setHolder(e.target.value)}
                                                defaultValue={bankName}
                                                margin="dense"
                                                fullWidth
                                                required
                                                size="small"
                                                InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                }} 
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container className={classes.subtitle}>
                                        <Grid item xs={12} sm={3} className={classes.title}>
                                            Bank Name: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="BankName" 
                                                variant="outlined"
                                                onChange={(e) => setBankName(e.target.value)}
                                                defaultValue={bankName}
                                                margin="dense"
                                                fullWidth
                                                required
                                                size="small"
                                                InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                }} 
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container className={classes.subtitle}>
                                        <Grid item xs={12} sm={3} className={classes.title}>
                                            Bank Acc: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="BankAcc" 
                                                variant="outlined"
                                                onChange={(e) => setBankAcc(e.target.value)}
                                                defaultValue={bankAcc}
                                                margin="dense"
                                                fullWidth
                                                required
                                                size="small"
                                                InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                }} 
                                            />
                                        </Grid>
                                    </Grid>
                                    
                                    </>
                            <Grid item xs={12} container>
                                <Grid item xs={12} style={{textAlign: 'right', paddingRight: 20}}>
                                    <Button 
                                        variant="outlined"
                                        startIcon={<AddIcon />} 
                                        style={{cursor: 'pointer', backgroundColor: '#08f26e', color: 'white', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20}}
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                    </Grid>
            <Grid>
              {teacherLoading?
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
              <CircularProgress  style={{color: '#F5CB5C'}}/>
              </Backdrop>:null
              }
            </Grid>
            </Grid>
            </Box>
            </Container>
            <Grid>
            {
                openDialog? <ContentDialog content={content} title={title}/>:null
            }   
            </Grid>
        </Container>
    )
}

export default AddUser