import React, {useState} from 'react'
import {makeStyles} from '@mui/styles';
import { Container, Grid, Box, Tooltip, TextField, Button, Toolbar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import { parentRegister } from '../../actions/userActions';
import { NEW_PARENT_RESET } from '../../constants/userConstants';



//importing constant



//styling
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


const AddParent = ({props}) => {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    // //useSelector
    const parentR = useSelector(state => state.addParent)
    const {success: parentSuccess, error: parentError, loading: parentLoading} = parentR
    
    //Attributes
        //Basic Information 
        const[username, setUsername] = useState("");
        
        const [email, setEmail] = useState("");
        const [emailStatus, setEmailStatus] = useState(false);
        const [emailEmpty, setEmailEmpty] = useState(true);

        const[contact, setContact] = useState("");
        const[relation, setRelation] = useState("");

        const[password, setPassword] = useState("");
        const[confirmPass, setConfirmPass] = useState("");
        const[passStatus, setPassStatus] = useState(true);

        //Additional Information
        const[firstName, setFirstName] = useState("");
        const[lastName, setLastName] = useState("");
        
        const[sEmail, setsEmail] = useState("");
        const[sEmailStatus, setsEmailStatus] = useState(false);
        const[sEmailEmpty, setSEmailEmpty] = useState(true);

        const[address, setAdress] = useState("");

        //hidden information        
        const [user, setUser] = useState([]);
        const [parent, setParent] = useState({});
        
        const [submit, setSubmit] = useState(false);
        const [openDialog, setopenDialog] = useState(false);
        const [content, setContent] = useState("");
        const [title, setTitle] = useState("");

    
        const ContentDialog = ({title, content}) => {
            const [open, setOpen] = useState(true);
        
            const handleClose = () => {
              setOpen(false);
            };
        
            const backtoManagement = () => {
                dispatch({type: NEW_PARENT_RESET});
                history.push('/menu/parentmanagement/');
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
                    <Button style={{color: parentSuccess? "green":"red",}} onClick={backtoManagement}>OK</Button>
                  </DialogActions>
                </Dialog>
              </Toolbar>
            );
        }


    //handle on change event
        // on change Relation radio button
        const handleChangeRelation = e => {
            setRelation(e.target.value);
        }

        //on change confirmation password
        const handlePassword = (e) => {
            setConfirmPass(e.target.value);
        }

        //on change email
        const handleEmailChange = e => {
            
            setEmail(e.target.value);

            if(e.target.value === ""){
                setEmailEmpty(true);
            } else {
                setEmailEmpty(false);
            }
            
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if ( re.test(e.target.value) ) {
               setEmailStatus(true);
               
           }
           else {
               setEmailStatus(false);
           }
        }

        //on change second email
        const handleSEmailChange = e => {
            
            setsEmail(e.target.value);

            if(e.target.value === ""){
                setSEmailEmpty(true);
            } else {
                setSEmailEmpty(false);
            }
            
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if ( re.test(e.target.value) ) {
               setsEmailStatus(true);
               
           }
           else {
               setsEmailStatus(false);
           }
        }



    //useEffect event
       

        //useEffect on state of confirmPass
            useEffect(() => {
                password == confirmPass? setPassStatus(true) : setPassStatus(false)
            }, [confirmPass])
            
        //useEffect on state change on submit status
            useEffect(() => {
                if(submit) {
                    //dispatch parent register function
                    dispatch(parentRegister(user, parent));
                }
            }, [user, parent])
            
            useEffect(() => {
                if(submit){
                    setTitle("Notification");
                    if(parentSuccess){
                        console.log("register success")
                        setContent("Successfully Register User")
                        setopenDialog(true);
                    }else{
                        console.log("register fail")
                        setContent("Failed to Register User")
                        setopenDialog(true);           
                    }    
                }
                
            }, [dispatch, parentError, parentSuccess])
    //Custom Function

        
    

        //handle Submit
        const handleSubmit = () =>{
            if(username && email && contact && password){

                

                if ( !emailStatus ) {
                    alert("Please enter correct email format. Failed to save.");
                    return;
                }

                if(password === "") {
                    alert("Please Enter a password!");
                    return;
                } else if(!passStatus){
                    alert("Password and confirmation does not match");
                    return;
                }

                if(!sEmailStatus){
                    alert("Please enter correct email format for second email address. Failed to save.");
                    return;
                }

                if(relation && firstName && lastName && address ){
                    
                    setUser({
                        ...user,
                        "username": username,
                        "email": email,
                        "password": password,
                        "is_parent" : true,
                        "is_staff" : false,
                        "is_active" : true,
                        "is_teacher" : false,
                        "is_superuser": false,
                    })
                    
                    
                    setParent({
                        ...parent,
                        "parentsContactphone" : contact,
                        "parentsEmail": email,
                        "parentsFirstName" : firstName,
                        "parentsLastName": lastName,
                        "secondParentEmail": sEmail,
                        "parentsType": relation,
                        "parentsAddress": address,
                        "parentsDOB" : "2022-12-11"
                    })
                    setSubmit(true);
                    return;
                }
                setSubmit(false);
                return;
            }

            if(!username || !email || !contact || !password || !passStatus || !relation){
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

    
  return(
    <Container className={classes.root} maxWidth="Fixed">
            <Container>         
            <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                <Grid item xs={12} className={classes.action} container>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            <Link to="/menu/parentmanagement/">
                                <IconButton>
                                    <ArrowBackIcon fontSize="large" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                        Add Guardian
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
                                <Grid item xs={12} sm={3} className={classes.title} color={emailEmpty? "black" : emailStatus?"black" : "red" }>
                                    email: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}} >
                                    <TextField 
                                        id="email" 
                                        variant="outlined"
                                        onChange={(e) => handleEmailChange(e)}
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
                                    Relation: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <RadioGroup aria-label="relation" name="relation1" relation={relation} onChange={handleChangeRelation}>
                                        <FormControlLabel value="F" control={<Radio />} label="Father" />
                                        <FormControlLabel value="M" control={<Radio />} label="Mother" />
                                        <FormControlLabel value="G" control={<Radio />} label="Guardian" />
                                    </RadioGroup>
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
                                            Additional Information
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
                                                onChange={(e) => setFirstName(e.target.value)}
                                                defaultValue={firstName}
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
                                                onChange={(e) => setLastName(e.target.value)}
                                                defaultValue={lastName}
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
                                        <Grid item xs={12} sm={3} className={classes.title} color={sEmailEmpty? "black" : sEmailStatus?"black" : "red" }> 
                                            Second Email address: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}} >
                                            <TextField 
                                                id="secondEmail" 
                                                variant="outlined"
                                                onChange={(e) => handleSEmailChange(e)}
                                                defaultValue={sEmail}
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
                                            Address: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="address" 
                                                variant="outlined"
                                                onChange={(e) => setAdress(e.target.value)}
                                                defaultValue={address}
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
                                        style={{cursor: 'pointer', backgroundColor: '#08f26e', color: 'white', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius:10}}
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                    </Grid>
            <Grid>
              {parentLoading?
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

export default AddParent