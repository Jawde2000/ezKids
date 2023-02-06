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


import { USER_PARENT_UPDATE_REQUEST, USER_PARENT_UPDATE_RESET, USER_PARENT_UPDATE_SUCCESS, USER_PARENT_UPDATE_FAIL, USER_UPDATE_RESET, USER_DETAIL_RESET, CHILDREN_DETAILS_RESET, INDIVIDUAL_TEACHER_RESET, INDIVIDUAL_PARENT_RESET, CHILDREN_ADD_RESET } from '../../constants/userConstants';
import { updateParent, deleteUsers, getIndividualParent, updateUser, getChildrenDetailsByParent, createNewChild} from '../../actions/userActions';

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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

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

const Parent = ({props}) => {
    const [pass, setPass] = useState(false);

    const DialogPass = () => {
        const handleClose = () => {
          setPass(false);
          history.push(`/menu/parentmanagement/`);
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

    const userDelete = useSelector(state => state.userDelete)
    const {loading: loadingDelete} = userDelete;

    const prt = useSelector(state => state.updateParent)
    const {success: success_upt, error: error_upt, loading} = prt

    const userUpt = useSelector(state => state.userUpdate)
    const {success: successUser, error: errorUser} = userUpt

    const individualParentt = useSelector(state => state.individualParent)
    const {success: successParent, parentD: dataParent, loading: loadingParent} = individualParentt;

    const child = useSelector(state => state.getChildrenP)
    const {success: successChild, data: childData, loading: loadingChild} = child;

    const add_new_child = useSelector(state => state.childAdd)
    const {success: success_add, loading: loading_add} = add_new_child;

    const useForceUpdate = () => {
        const [, updateState] = useState();
        return useCallback(() => updateState({}), []);
    }
    
    const [user, setUser] = useState();
    const [uptUser, setUptUser] = useState();
    const [uptParent, setUptParent] = useState();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState();
    
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passStatus, setPassStatus] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    // parent information declaration
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [parentID, setParentID] = useState("");
    const [relation , setRelation] = useState("");
    const [SEmail, setSEmail] = useState("");
    const [address, setAddress] = useState("");

    // const [user, setUser]
    const [parent, setparent] = useState();
    const [submit, setSubmit] = useState(false);
    const [editing,setEditing] = useState(false);
    const [found, setFound] = useState(true);
    const [picloading, setPloading] = useState(false);

    const [loadingStatus, setLaodingStatus] = useState(true);


    const [childDetails, setChildDetails] = useState([]);

    const [addNewChild, setAddNewChild] = useState(false);

    //children info
    const [cFirstName, setCFirstName] = useState("");
    const [cLastName, setCLastName] = useState("");
    const [cGender, setCGender] = useState('');
    const [cClass, setCClass] = useState("");
    const [classList, setClassList] = useState([]);
    const [newChild, setNewChild] = useState([]);

    const DialogDelete = () => {
      
        const handleClose = () => {
          setOpenDelete(false);
        };
      
        const handleDelete = () => {
            dispatch(deleteUsers(id));
            setOpenDelete(false);
            history.push("/menu/parentmanagement/");
        }
      
        return (
          <Toolbar>
            <Dialog
              open={openDelete}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Parent " + firstName + " " + lastName}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    All data related with this user will be deleted. Are you sure you want to delete?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button style={{color: "red"}} onClick={handleDelete}>Yes</Button>
                <Button onClick={handleClose} autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
      }

    

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

        if(successParent){
            setUptParent({
                ...dataParent,
                created_by: dataParent.created_by,
                parentsType: dataParent.parentsType,
                parentsFirstName: dataParent.parentsFirstName,
                parentsLastName: dataParent.parentsLastName,
                parentsContactphone: dataParent.parentsContactphone,
                parentsEmail: dataParent.parentsEmail,
                secondParentEmail: dataParent.secondParentEmail,
                parentsAddress: dataParent.parentsAddress,
                parentsDOB: dataParent.parentsDOB,
            })
        }
    }

    //dispatch action call
    useEffect(() =>{
        if(uptUser || uptParent){
            dispatch(updateParent(uptUser, uptParent, id))
        }
    }, [uptUser, uptParent])


    //use effect for success updating user
    useEffect(() => {
        if(successUser){
            alert("Successfully Updated User");
            dispatch({type: USER_UPDATE_RESET});
            setEditing(!editing);
            history.push(`/menu/Parentmanagement/parent/${id}`);
            return;
        }
        else if(success_upt){
            alert("Successfully Updated User");
            dispatch({type: USER_PARENT_UPDATE_RESET});
            setEditing(!editing);
            return;
        }
        else if(errorUser || error_upt){
            setPass(true);
            <DialogPass />
            dispatch({type: USER_PARENT_UPDATE_RESET});
            dispatch({type: USER_UPDATE_RESET});
            history.push(`/menu/Parentmanagement/parent/${id}`);
        }
    }, [successUser, success_upt, errorUser, error_upt])



    useEffect(() => {
        if(!userD || userD.userID !== id){
            dispatch(getUser(id));
            dispatch(getIndividualParent(id));
            
                     

            if (successParent) {
                setParentID(dataParent.created_by);
                console.log(parentID)
            }  

            if (userD) {
                setUsername(userD.username);
            }
        } else{
            setUser(userD)
            setUsername(userD.username);
            setEmail(userD.email);
            setIsActive(userD.is_active);
        }
    }, [userD, id, successParent])

    useEffect(() => {
        if(dataParent){
            if(childData){

            } else {
                dispatch(getChildrenDetailsByParent(dataParent.parentsID));
            }
            
            setParentID(dataParent.parentsID)
            setRelation(dataParent.parentsType);
            setFirstName(dataParent.parentsFirstName);
            setLastName(dataParent.parentsLastName);
            setContact(dataParent.parentsContactphone);
            setEmail(dataParent.parentsEmail);
            setSEmail(dataParent.secondParentEmail);
            setAddress(dataParent.parentsAddress);
        }
    }, [dataParent])

    useEffect(() => {
        if(childData && childDetails){
            setChildDetails(childData[0]);
        }
        if(successChild){
            setLaodingStatus(false);
        }
        
    }, [childData])

    //for fetching class list
    const fetchData = () => {
        return fetch("http://127.0.0.1:8000/api/class/")
              .then((response) => response.json())
              .then((data) => setClassList(data));
    }
    
    useEffect(() => {
        fetchData();
    },[])

    useEffect(() => {
        if(success_add){
            setLaodingStatus(false);
            alert("Successfullt Added Children!");
            setEditing(!editing);
            setAddNewChild(false);
            dispatch({type: CHILDREN_ADD_RESET});
            dispatch(getChildrenDetailsByParent(dataParent.parentsID));
            history.push(`/menu/Parentmanagement/parent/${id}`);
        }
    }, [success_add])
    

    // const handleDelete = () => {

    //     if(id === userInfo.userID){
    //         alert("You can't delete The account that you are currently logged in!");
    //         return;
    //     }
    //     else{
    //         let dlt = window.confirm("All data related with this user will be deleted. Are you sure you want to delete?")
    //         if(dlt){
    //             dispatch(deleteUsers(id));
    //         }
    //         else {
    //             return;
    //         }
            
    //     }

    //     alert("Sucessfully Deleted");
    //     history.push("/menu/parentmanagement/");
    // }

    //awsssss picture
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

    const handleChangeLast = (event) => {
        setLastName(event.target.value);
    }

    const handleChangeFirst = (event) => {
        setFirstName(event.target.value);
    }

    const hadleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleChangeSEmail = (e) => {
        setSEmail(e.target.value);
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    }

    
    const handleChangeConfirmPassword = (event) => {
        setConfirmPass(event.target.value);
    }


    const handleBack = () => {
        dispatch({type: USER_DETAIL_RESET});
        dispatch({type: CHILDREN_DETAILS_RESET});
        dispatch({type: INDIVIDUAL_PARENT_RESET})
        history.push('/menu/parentmanagement/');
    }

    const handleEditing = () => {
        if(editing){
            dispatch(getUser(id));
            setEditing(!editing);
            return;
        }
        setEditing(!editing);
    }

    const handleOpenDeleteDialog = () => {
        setOpenDelete(!openDelete);
    }

    const handleOnClickAddNewChild = () => {
        setAddNewChild(!addNewChild);
    }

    const handleAddChildren = () => {
        //check if data is blank
        if(cFirstName == ""){
            alert("First Name Cannot be Blank");
            return;
        } 

        if(cLastName == "") {
            alert("Last Name Cannot be Blank");
            return;
        }

        if(cGender == ""){
            alert("Please choose a gender");
            return;
        }

        if(cClass == ""){
            alert("Please select a class");
            return;
        }

        setLaodingStatus(true);

        // after all data is entered, 
        setNewChild({
            ...newChild,
            childFirstName: cFirstName,
            childGender: cGender,
            childLastName: cLastName,
            childDOB: "2022-12-01",
            parent: parentID,
            class_belong: cClass
        })

    }

    //to add a new child
    useEffect(() => {
        if(newChild){
            dispatch(createNewChild(newChild));
            console.log(newChild);

        }
    }, [newChild])



    return (
        <Container className={classes.root} maxWidth="Fixed">
        <Container >
            <Grid>
                {
                    <DialogDelete />
                }
            </Grid>
            {loadingParent?
            <Backdrop style={{ zIndex: 9999, backgroundColor: '#36454F'}} 
             open={true}>
                <CircularProgress  style={{color: '#F5CB5C'}}/>
            </Backdrop>:null
            }
            {loadingDelete? 
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor: '#36454F'}} open={true}>
                <CircularProgress  style={{color: '#F5CB5C'}}/>
                </Backdrop>:null
                }
            {!user? 
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor: '#36454F' }} open={true}>
                <CircularProgress  style={{color: '#F5CB5C'}}/>
                </Backdrop>:null
                }
            {loadingStatus? 
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#36454F' }} open={true}>
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
                                Parent ID: {parentID}
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
                                        <DeleteIcon onClick={handleOpenDeleteDialog} className={classes.functionicon} fontSize="large" style={{color: 'red'}}/>
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
                                    <Grid item xs={12} container>
                                        <Grid item xs={12} style={{fontWeight:'bold'}}>
                                            Children Information
                                        </Grid>
                                        {/* username */}
                                        {childDetails ? 
                                            (
                                                <>
                                                    <Grid item xs = {12} container>
                                                    
                                                        <Grid item xs={5} style={!editing ? ({fontWeight: 'bold', paddingLeft: 5}) : ({fontWeight: 'bold'}) } textAlign="left">
                                                            Child Name: 
                                                        </Grid>
                                                        <Grid item xs={7} textAlign="left">
                                                            {childDetails.childFirstName + " " + childDetails.childLastName}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs = {12} container>
                                                    
                                                        <Grid item xs={5} style={!editing ? ({fontWeight: 'bold', paddingLeft: 5}) : ({fontWeight: 'bold'}) } textAlign="left">
                                                            Gender: 
                                                        </Grid>
                                                        <Grid item xs={7} textAlign="left">
                                                            {childDetails.childGender == 'M'? "Male": "Female"}
                                                        </Grid>
                                                    </Grid>
                                                    {
                                                        childData? 
                                                        <Grid item xs = {12} container >

                                                            {childData.length > 1 ?
                                                                <Grid item xs={12} textAlign='center'>
                                                                    {editing?
                                                                        <>
                                                                            
                                                                            <Button 
                                                                                    variant="outlined"
                                                                                    startIcon={<AddIcon />}
                                                                                    style={{cursor: 'pointer', backgroundColor: 'green', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                                    // onClick={handleSubmit.bind(this)} --> this must link to a table listing all children of this family
                                                                            >
                                                                                        View other {childData.length - 1} kids
                                                                            </Button>

                                                                            <Button 
                                                                            variant="outlined"
                                                                            startIcon={<AddIcon />}
                                                                            style={{cursor: 'pointer', backgroundColor: 'red', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                            onClick={handleOnClickAddNewChild}
                                                                            >
                                                                                        Add New Children
                                                                            </Button>
                                                                        </>
                                                                            :
                                                                        <>
                                                                            <Button 
                                                                                    variant="outlined"
                                                                                    startIcon={<AddIcon />}
                                                                                    style={{cursor: 'pointer', backgroundColor: 'green', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                                    // onClick={handleSubmit.bind(this)} --> this must link to a table listing all children of this family
                                                                            >
                                                                                        View other {childData.length - 1} kids
                                                                            </Button>
                                                                        </>
                                                                    }
                                                                    
                                                                </Grid>
                                                                :
                                                                <Button 
                                                                        variant="outlined"
                                                                        startIcon={<AddIcon />}
                                                                        style={{cursor: 'pointer', backgroundColor: 'green', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                        // onClick={handleSubmit.bind(this)} --> this must list to a single child details
                                                                >
                                                                            View More Details
                                                                </Button>
                                                            }
                                                        
                                                        </Grid>
                                                        :
                                                        null
                                                    }

                                                    
                                                </>
                                            )
                                            :
                                            <Grid item xs={12}  style={{paddingLeft:10}}>
                                                No Children Record Found.
                                            </Grid>
                                        }
                                    </Grid> 
                                    {addNewChild? 
                                        <Grid item xs={12} container>
                                            <Grid item xs={12} style={{fontWeight:'bold'}}>
                                                New Children Information
                                            </Grid>

                                            <Grid item xs={12} container>
                                                <Grid item xs={4} style={{fontWeight:'bold', marginTop: 12}}>
                                                    FirstName
                                                </Grid>
                                                <Grid item xs={8} textAlign="left">
                                                            <TextField 
                                                                id="c_firstname" 
                                                                variant="outlined"
                                                                onChange={(e) => setCFirstName(e.target.value)}
                                                                defaultValue={cFirstName}
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
                                                <Grid item xs={4} style={{fontWeight:'bold', marginTop: 12}}>
                                                    LastName
                                                </Grid>
                                                <Grid item xs={8} textAlign="left">
                                                            <TextField 
                                                                id="c_lastName" 
                                                                variant="outlined"
                                                                onChange={(e) => setCLastName(e.target.value)}
                                                                defaultValue={cLastName}
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
                                                
                                                <Grid item xs={4} style={{fontWeight:'bold', marginTop: 12}}>
                                                    Gender
                                                </Grid>
                                                <Grid item xs={8} textAlign="left">
                                                    <RadioGroup aria-label="relation" name="relation1" value={cGender} onChange={(e) => setCGender(e.target.value)} row={true}>
                                                        <FormControlLabel value="F" control={<Radio />} label="Female" />
                                                        <FormControlLabel value="M" control={<Radio />} label="Male" />
                                                    </RadioGroup> 
                                                </Grid>   
                                            </Grid>
                                            <Grid item xs={12} container>
                                                
                                                <Grid item xs={4} style={{fontWeight:'bold', marginTop: 12}}>
                                                    Class
                                                </Grid>
                                                <Grid item xs={8} textAlign="left">
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Name</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={cClass}
                                                        label="class"
                                                        onChange={(e) => setCClass(e.target.value)}
                                                        >
                                                        {
                                                            classList? 
                                                                classList.map((classs) => (
                                                                        <MenuItem value={classs.classID}> {classs.className}</MenuItem>
                                                                    ))
                                                                
                                                                :
                                                            null
                                                            
                                                        }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>   
                                            </Grid>
                                            <Grid item xs={12} container>
                                                <Grid item xs={12} textAlign='right'>
                                                    <Button 
                                                                            variant="outlined"
                                                                            startIcon={<AddIcon />}
                                                                            style={{cursor: 'pointer', backgroundColor: 'green', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                            onClick={handleAddChildren}
                                                                    >
                                                                                Add Children
                                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        
                                        </Grid> 
                                        :
                                        null
                                    }         
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
                                        {dataParent?
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
                                                                    {contact}
                                                                </Grid>
                                                            )
:
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="regNo" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeUserPhone}
                                                                        defaultValue={contact}
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
                                                            Alt Email: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {SEmail}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="semail" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeSEmail}
                                                                        defaultValue={SEmail}
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
                                                            Address: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {address}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="adddress" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeAddress}
                                                                        defaultValue={address}
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
                                                            Relation: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <RadioGroup aria-label="relation" name="relation1" value={relation} disabled = {true}>
                                                                    <FormControlLabel value="F" control={<Radio />} label="Father" />
                                                                    <FormControlLabel value="M" control={<Radio />} label="Mother" />
                                                                    <FormControlLabel value="G" control={<Radio />} label="Guardian" />
                                                                </RadioGroup> 
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <RadioGroup aria-label="relation" name="relation1" value={relation} onChange = {(e) => setRelation(e.target.value)} >
                                                                        <FormControlLabel value="F" control={<Radio />} label="Father" />
                                                                        <FormControlLabel value="M" control={<Radio />} label="Mother" />
                                                                        <FormControlLabel value="G" control={<Radio />} label="Guardian" />
                                                                    </RadioGroup>
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} container style={{marginLeft: 30, marginTop:10, marginBottom: 20}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            First Name: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {firstName}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="bankAcc" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeFirst}
                                                                        defaultValue={firstName}
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
                                                            Last Name: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {lastName}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="bankAcc" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeLast}
                                                                        defaultValue={lastName}
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

export default Parent