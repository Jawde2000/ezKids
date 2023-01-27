import React, {useState, useEffect, useReducer, useCallback} from 'react'
import { Grid, Container, Box, Tooltip, IconButton, TextField, Button, Input, Toolbar} from '@mui/material';
import {makeStyles} from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUser } from '../../actions/userActions';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { USER_UPDATE_RESET, USER_LOGIN_SUCCESS,USER_VENDOR_UPDATE_RESET, USER_DETAIL_RESET } from '../../constants/userConstants';
import { updateUser, updateVendor, deleteUsers, getIndividualTeacher } from '../../actions/userActions';
import moscow from '../globalAssets/moscow.jpg';
import S3 from 'react-aws-s3';
import defaultJpg from '../User/default.jpg'
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        minHeight: 700,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20
    },
    box: {
        backgroundColor: "#DADADA",
        marginBottom: 20,
        borderRadius: 5,
        minHeight: 450,
        marginTop: 15,
        margin: 'auto',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontSize:18
    },
    action: {
        minHeight: 50,
    },
    functionicon: {
        cursor: 'pointer',
    },
}));

const Teacher = ({props}) => {
    const [pass, setPass] = useState(false);

    const DialogPass = () => {
        const handleClose = () => {
          setPass(false);
          history.push(`/menu/teachermanagement/`);
        };
  
        return (
          <Toolbar>
            <Dialog
              open={pass}
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-title">
                {"Notification"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You must insert password before making a modification
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    const classes = useStyles();
    const { id } = useParams();

    const dispatch = useDispatch();
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    let history = useHistory()
    
    const userDetail = useSelector(state => state.userDetail)
    const {userD} = userDetail

    const usr = useSelector(state => state.userUpdate)
    const {success: successUser, error: errorUsr} = usr

    const ven = useSelector(state => state.vendorUpdate)
    const {success: successVendor, error: errorVen, loading} = ven

    const individualTeacher = useSelector(state => state.individualTeacher);
    const {success: successTeacher, data: dataTeacher, loading: loadingTeacher} = individualTeacher;

    const useForceUpdate = () => {
        const [, updateState] = useState();
        return useCallback(() => updateState({}), []);
    }
    
    const [user, setUser] = useState();
    const [uptUser, setUptUser] = useState();
    const [uptVendor, setUptVendor] = useState();
    const [uptCustomer, setUptCustomer] = useState();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState();
    const [role , setRole] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passStatus, setPassStatus] = useState(false);
    // teacher information declaration
    const [status, setStatus] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [registrationNo, setRegistrationNo] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAcc, setBankAcc] = useState("");
    const [phone, setPhone] = useState("");
    const [teacherID, setTeacherID] = useState("");

    //customer
    const [birthdate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState('');
    // const [user, setUser]
    const [vendor, setVendor] = useState();
    const [submit, setSubmit] = useState(false);
    const [editing,setEditing] = useState(false);
    const [found, setFound] = useState(true);
    const [picloading, setPloading] = useState(false);

    

    const handleSubmit = () => {

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( re.test(email) ) {
            
        }
        else {
            alert("Please enter correct email format. Failed to save.");
            return;
        }

        setUptUser(
            {
                username: username,
                email: email,
                password: password,
                is_active: isActive,
            }
        )

        if(vendor){
            setUptVendor({
                vendorContact_Number: contact,
                vendorStatus: status,
                vendorName: username,
                vendorBankName: bankName,
                vendorBankAcc: bankAcc,
                vendorRegistrationNo: registrationNo,
                vendorEmail: email,
            })
        }
    }

    useEffect(() =>{
        if(role==="Admin" && uptUser){
            dispatch(updateUser(uptUser, id));
        }
        else if(role === "Vendor" && uptVendor){
            dispatch(updateVendor(uptUser, uptVendor, id))
        }
    }, [uptUser, uptVendor])

    useEffect(() => {
        if(successUser){
            alert("Successfully Updated User");
            dispatch({type: USER_UPDATE_RESET});
            setEditing(!editing);
            history.push(`/menu/teachermanagement/teacher/${id}`);
            return;
        }
        else if(successVendor){
            alert("Successfully Updated User");
            dispatch({type: USER_VENDOR_UPDATE_RESET});
            setEditing(!editing);
            return;
        }
        else if(errorUsr || errorVen){
            setPass(true);
            <DialogPass />
            dispatch({type: USER_VENDOR_UPDATE_RESET});
            dispatch({type: USER_UPDATE_RESET});
        }
    }, [successUser, successVendor, errorUsr, errorVen])

    // useEffect(() => {
    //     dispatch(getIndividualTeacher(id));
    //     if(successTeacher) {
            
    //         console.log(dataTeacher)
    //     }
    // }, [successTeacher])


    useEffect(() => {
        if(!userD || userD.userID !== id){
            dispatch(getUser(id));
            dispatch(getIndividualTeacher(id));

            if (successTeacher) {
                console.log(dataTeacher)
                setTeacherID(dataTeacher.teacherID);
                console.log(teacherID)
            }
        }else{
            setUser(userD)
            setRole(userD.is_customer? "Customer" : userD.is_vendor? "Vendor" : userD.is_superuser? "Admin" : "");
            setUsername(userD.username);
            setEmail(userD.email);
            setIsActive(userD.is_active);
            if(userD.is_vendor && userD.vendorInfo){
                setVendor(
                    userD.vendorInfo.data
                )
            }
        }
    }, [userD, id, successTeacher])

    useEffect(() => {
        if(vendor){
            setContact(vendor.vendorContact_Number)
            setStatus(vendor.vendorStatus)
            setBusinessName(vendor.vendorName)
            setBankName(vendor.vendorBankName)
            setBankAcc(vendor.vendorBankAcc)
            setRegistrationNo(vendor.vendorRegistrationNo)
            setTeacherID(vendor.vendorID)
            setPhone(vendor.vendorContact_Number)
        }
    }, [vendor])

    const handleDelete = () => {

        if(id === userInfo.userID){
            alert("You can't delete The account that you are currently logged in!");
            return;
        }
        else{
            let dlt = window.confirm("All data related with this user will be deleted. Are you sure you want to delete?")
            if(dlt){
                dispatch(deleteUsers(id));
            }
            else {
                return;
            }
            
        }

        alert("Sucessfully Deleted");
        history.push("/menu/teachermanagement/");
    }

    const file = id + '.jpg'
    
    const config = {
        bucketName: 'etixbucket',
        dirName: 'etix', 
        region: 'ap-southeast-1',
        accessKeyId: 'AKIA4TYMPNP6EQNIB7HV',
        secretAccessKey: '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'
    }
    
    const AWS = require('aws-sdk')
    AWS.config.update({
        accessKeyId: "AKIA4TYMPNP6EQNIB7HV",
        secretAccessKey: "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",
        region: "ap-southeast-1",
    });

    const ReactS3Client = new S3(config);
    
    var s3 = new AWS.S3({ apiVersion: '2006-03-01', accessKeyId: 'AKIA4TYMPNP6EQNIB7HV', secretAccessKey: 'Vd8K2yLQrKZermLm4VxV1XJp9k73UPLLwQjfR', region: "ap-southeast-1"});
    
    useEffect(async () => {
        PicExist()
    })

    const [imgSrc, setImgSrc] = useState(("https://etixbucket.s3.amazonaws.com/etix/" + file));

    async function PicExist() {
        const url = "https://etixbucket.s3.amazonaws.com/etix/" + file
        await fetch(url).then((res) => {
            if (res.status == 404) {
                setFound(false)
                console.log("not found")
            } 
            else {
                console.log("found")
                setFound(true)
            }
        }).catch((err) => {
            setFound(false)
        });
    }

    
    const upload = (e) => {
        const image = URL.createObjectURL(e.target.files[0]);
        setPloading(true);
        setImgSrc(image);
        ReactS3Client.uploadFile(e.target.files[0], file)
        .then(data =>{
            setPloading(false);
            // window.setTimeout(function(){window.location.reload()},3000)
            console.log(data);
        })
        .catch(err => {
            console.error(err)
            setPloading(false);
        })
    }
    
    const handleChangeUserName = (event) => {
        setUsername(event.target.value);
    }

    const handleChangeUserEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangeUserPhone = (event) => {
        setContact(event.target.value);
    }

    const handleChangeBusinessName = (event) => {
        setBusinessName(event.target.value);
    }

    const handleChangeRegNo = (event) => {
        setRegistrationNo(event.target.value);
    }

    const handleChangebankName = (event) => {
        setBankName(event.target.value);
    }

    const handleChangebankAcc = (event) => {
        setBankAcc(event.target.value);
    }

    const hadleChangePassword = (event) => {
        setPassword(event.target.value);
    }
    
    const handleChangeConfirmPassword = (event) => {
        setConfirmPass(event.target.value);
    }

    const handleChangeBirthDate = (event) => {
        setBirthDate(event.target.value);
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    }

    const handleBack = () => {
        dispatch({type: USER_DETAIL_RESET});
        history.push('/menu/teachermanagement/');
    }

    const handleEditing = () => {
        if(editing){
            dispatch(getUser(id));
            setEditing(!editing);
            return;
        }
        setEditing(!editing);
    }

    return (
        <Container className={classes.root} maxWidth="Fixed">
        <Container >
            {loadingTeacher?<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <CircularProgress  style={{color: '#F5CB5C'}}/>
                </Backdrop>:null
            }
            {!user? 
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <CircularProgress  style={{color: '#F5CB5C'}}/>
                </Backdrop>:null
                }
                <>
                    <Grid container spacing={3} direction="column" style={{marginTop: 10, paddingBottom: 10}}>
                        <Grid item xs={12} className={classes.action} container>
                            <Grid item xs={1} textAlign="right">
                                <Tooltip title="Back">
                                    <IconButton onClick={handleBack}>
                                        <ArrowBackIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={9} textAlign="center" style={{fontSize:20}}>
                                Teacher ID: {teacherID}
                            </Grid>
                            <Grid item xs={2} >
                                <Tooltip title="Edit User">
                                    {/* Set onclick edit here  with props*/}
                                    <IconButton onClick={handleEditing}>
                                        <EditIcon className={classes.functionicon} fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete User">
                                    {/* Set onclick delete here, *create a delete function* */}
                                    <IconButton>
                                        <DeleteIcon onClick={handleDelete} className={classes.functionicon} fontSize="large" style={{color: 'red'}}/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{width:'90%'}} className={classes.box}>
                        <Grid container spacing={3} direction="column">
                            <Grid item xs={12} container>
                                
                                <Grid item xs={12} sm={4} container style={{textAlign:'center'}}>
                                    
                                    <Grid item xs={12} >
                                        Profile Picture
                                    </Grid>
                                    <Grid item xs={12} column > 
                                        <Grid style={{display:'flex', justifyContent:'center', alignItems:'center', paddingBottom:10}}>  
                                        <Avatar
                                        style={{ height: '150px', width: '150px' }}
                                            src={found? imgSrc
                                                 :
                                                 (defaultJpg)}
                                            alt="profile"        
                                        />
                                        </Grid>                             
                                        {!editing? "":
                                        (
                                        <div>
                                        <label htmlFor="contained-button-file">
                                        <input type="file"  accept="image/*" id="contained-button-file" onChange={upload}
                                        style={{justifyContent:'center', alignItems:'center', display: 'none'}}
                                        />
                                        {picloading? (<Box sx={{ display: 'flex' }}
                                        style={{justifyContent:'center', alignItems:'center'}}
                                        ><CircularProgress /></Box>):(<Button variant="contained" component="span" >Upload</Button>)}
                                        </label>                            
                                        </div>
                                        )}
                                    </Grid>           
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                </Grid>
                                <Grid item xs={12} sm={7} container>
                                    <Grid item xs={12} container>
                                        <Grid item xs={12} style={{fontWeight:'bold'}}>
                                            Basic Information
                                        </Grid>
                                        {/* username */}
                                        <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                            <Grid item xs={3} style={!editing ? ({fontWeight: 'bold',}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                User Name: 
                                            </Grid>
                                            {!editing ?
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        {username}
                                                    </Grid>
                                                )
                                                :
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="userName" 
                                                            variant="outlined"
                                                            onChange={handleChangeUserName}
                                                            defaultValue={username}
                                                            margin="dense"
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>   
                                                )
                                            }
                                            
                                        </Grid>
                                        <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                            <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                Email: 
                                            </Grid>
                                            {!editing ?
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        {email}
                                                    </Grid>
                                                )
                                                :
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="user_email" 
                                                            variant="outlined"
                                                            onChange={handleChangeUserEmail}
                                                            defaultValue={email}
                                                            margin="dense"
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>   
                                                )
                                            }
                                            
                                        </Grid>
                                        {vendor?
                                            (
                                                <>
                                                    <Grid item xs={12} style={{fontWeight:'bold', marginTop: 20}}>
                                                        Extra Information
                                                    </Grid>
                                                    <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                                    </Grid>
                                                    <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Contact-number: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {phone}
                                                                </Grid>
                                                            )
:
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="regNo" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeRegNo}
                                                                        defaultValue={phone}
                                                                        margin="dense"
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                                        }                                                            } 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Bank Name: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {bankName}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="bankName" 
                                                                        variant="outlined"
                                                                        onChange={handleChangebankName}
                                                                        defaultValue={bankName}
                                                                        margin="dense"
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container style={{marginLeft: 30, marginTop:10, marginBottom: 20}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Bank Account: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {bankAcc}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="bankAcc" 
                                                                        variant="outlined"
                                                                        onChange={handleChangebankAcc}
                                                                        defaultValue={bankAcc}
                                                                        margin="dense"
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                </>
                                            )
                                            :
                                            (
                                               null
                                            )
                                        }
                                        {editing?
                                            (
                                                <>
                                                <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                                    <Grid item xs={3} style={!editing ? ({fontWeight: 'bold',}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                        Password: 
                                                    </Grid>
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="password" 
                                                            variant="outlined"
                                                            onChange={hadleChangePassword}
                                                            defaultValue={password}
                                                            margin="dense"
                                                            type='password'
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                                    <Grid item xs={3} style={!editing ? ({fontWeight: 'bold',}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                        Confirm Password: 
                                                    </Grid>
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="confirmPass" 
                                                            variant="outlined"
                                                            onChange={handleChangeConfirmPassword}
                                                            defaultValue={confirmPass}
                                                            type='password'
                                                            margin="dense"
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} container>
                                                    <Grid item xs={12} style={{textAlign: 'right', paddingRight: 20}}>
                                                        {password!==confirmPass?
                                                            (
                                                                <Button 
                                                                    variant="outlined"
                                                                    startIcon={<AddIcon />}
                                                                    onClick={()=> alert("Password Not Match")}
                                                                    style={{cursor: 'pointer', backgroundColor: 'green', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                >
                                                                    Save
                                                                </Button>
                                                            )
                                                            :
                                                            (
                                                                <Button 
                                                                    variant="outlined"
                                                                    startIcon={<AddIcon />}
                                                                    style={{cursor: 'pointer', backgroundColor: 'green', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                    onClick={handleSubmit.bind(this)}
                                                                >
                                                                    Save
                                                                </Button>
                                                            )
                                                        }
                                                        
                                                    </Grid>
                                                </Grid>
                                                </>
                                            )
                                            :
                                            (
                                                null
                                            )
                                        }
                                    </Grid>    
                                </Grid>
                                <Grid item xs={12} sm={1} />
                            </Grid>
                        </Grid>
                    </Box>
                </>
        </Container>
        </Container>
            
    )
}

export default Teacher