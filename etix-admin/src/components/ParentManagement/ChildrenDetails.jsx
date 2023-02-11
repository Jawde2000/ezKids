import { AppBar, Grid, Box, Container, IconButton, Typography, Button, Icon, Paper, TextField, Tooltip, Toolbar} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect, props, useState} from 'react';
import moscow from '../globalAssets/moscow.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { getChildrenDetailsByParent, deleteChilds, getIndividualChild, getIndividualParent, getIndividualChildResult, updateChildren } from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarColumnsButton} from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { CHILDREN_DELETE_RESET, CHILDREN_DETAILS_REQUEST, CHILDREN_DETAILS_RESET } from '../../constants/userConstants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from 'react-router';
import Backdrop from '@mui/material/Backdrop';
import { Link, useParams } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#36454F",
        backgroundBlendMode: "lighten",
        minHeight: 700,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20
    },
    box: {
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 2,
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

function ChildrenDetails({props}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const updateChild = useSelector(state => state.updateChild)
    const {success: successUpdateChild, loading: loadingUpdateChild} = updateChild;
    const individualChild = useSelector(state => state.individualChild)
    const {success: successChild, data: dataChild, loading: loadingChild} = individualChild;
    const individualChildResult = useSelector(state => state.individualChildResult)
    const {success: successChildResult, data: dataChildResult, loading: loadingChildResult} = individualChildResult;
    const individualParentt = useSelector(state => state.individualParent)
    const {success: successParent, parentD: dataParent, loading: loadingParent} = individualParentt;
    const [child, setChild] = useState({});
    const dispatch = useDispatch();
    const { id } = useParams();
    const [openDelete, setOpenDelete] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState();
    const [cClass, setCClass] = useState("");
    const [parent, setParent] = useState();
    const [classList, setClassList] = useState([]);
    const [parentFirst, setParentFirst] = useState("");
    const [parentLast, setParentLast] = useState("");
    const [childResult, setChildResult] = useState([]);
    const [children, setChildren] = useState({});

    const handleSubmit = () => {
        console.log(dataChild.parent)
        setChildren(
            {
                childFirstName: firstName,
                childLastName: lastName,
                childGender: gender,
                class_belong: cClass,
                parent: dataChild.parent,
                childDOB: dataChild.childDOB
            }
        )

        dispatch(updateChildren(children, id))

        if(successUpdateChild){
            setFirstName(children.childFirstName);
            setlastName(children.childLastName);
            setGender(children.childGender);
            setCClass(children.class_belong);
            dispatch(getIndividualParent(dataChild.parent)); 
            setParentFirst(dataParent.data.parentsFirstName);
            setParentLast(dataParent.data.parentsLastName);
        }

        // history.push(`/menu/Parentmanagement/children${dataChild.parent}`);
    }



    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleChangeClass = (event) => {
        setCClass(event.target.value);
    };
    
    useEffect(() => {
        if(dataChild) {
            console.log("successChild")
            setChild(dataChild);
            setFirstName(dataChild.childFirstName);
            setlastName(dataChild.childLastName);
            setGender(dataChild.childGender);
            setCClass(dataChild.class_belong);
            if (dataChildResult) {
                setChildResult(dataChildResult);
            } else {
                dispatch(getIndividualChildResult(id));
            }
            if (dataParent) {
                setParent(dataParent.data);
                setParentFirst(dataParent.data.parentsFirstName);
                setParentLast(dataParent.data.parentsLastName);
            } else {
                dispatch(getIndividualParent(dataChild.parent)); 
            }
            console.log(child)
        } else {
            dispatch(getIndividualChild(id)); 
            
        }
        console.log(id); 
        console.log(classList)    
    }, [dataChild, dataParent])

    //for fetching class list
    const fetchData = () => {
        return fetch("http://127.0.0.1:8000/api/class/")
            .then((response) => response.json())
            .then((data) => setClassList(data));
    }
        
    useEffect(() => {
        fetchData();
    },[])

    const DialogDelete = () => {
      
        const handleClose = () => {
          setOpenDelete(false);
        };
      
        const handleDelete = () => {
            dispatch(deleteChilds(id));
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
                {"Delete Child " + child.childFirstName + " " + child.childLastName}
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDeleteDialog = () => {
        setOpenDelete(!openDelete);
    }

    const handleBack = () => {
        dispatch({type: CHILDREN_DETAILS_RESET});
        history.push(`/menu/Parentmanagement/children/${child.parent}`);
    }

    return (
        <Container className={classes.root} maxWidth="Fixed">
        <Container>
        <Grid>
            {
                <DialogDelete />
            }
        </Grid>
        {loadingChild || loadingParent || loadingUpdateChild?
            <Backdrop style={{ zIndex: 9999, backgroundColor: '#36454F'}} 
             open={true}>
                <CircularProgress  style={{color: '#F5CB5C'}}/>
            </Backdrop>:null
        }
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
                                
                            </Grid>
                            <Grid item xs={2} style={{paddingLeft:60}}>
                                <Tooltip title="Delete Child">
                                    {/* Set onclick delete here, *create a delete function* */}
                                    <IconButton>
                                        <DeleteIcon onClick={handleOpenDeleteDialog} className={classes.functionicon} fontSize="large" style={{color: 'red'}}/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
            <Box sx={{width:'90%'}} className={classes.box}>
    <DialogTitle id="form-dialog-title">Edit Child Information</DialogTitle>
    <DialogContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
    <Grid container spacing={3}>
      <Grid item xs={12} spacing={3}>
      <TextField
        required
        id="childID"
        value={child.childID}
        fullWidth
        variant="filled"
        color="primary"
        size="small"
        disabled 
        InputProps={
            {
        startAdornment: (
        <InputAdornment position="start">
            <AccountCircle />
        </InputAdornment>
        )}}
        />
      </Grid>
      <Grid container>
        <Grid item xs={6} style={{margin: "20px 0", paddingLeft: 20}}>
        <Grid item xs={4} style={{marginTop: 12}}>
            <Typography fontSize={14}>First Name</Typography>
        </Grid>
            <Grid item xs={12} textAlign="left">
                <TextField 
                    id="firstname" 
                    variant="outlined"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    margin="dense"
                    fullWidth
                    size="small"
                    InputProps={{
                        style: {
                            fontFamily: ['rubik', 'sans-serif'].join(','),
                            padding: 5,
                        }
                    }} 
                />
            </Grid>   
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4} style={{margin: "20px 0"}}>
        <Grid item xs={4} style={{marginTop: 12}}>
            <Typography fontSize={14}>Last Name</Typography>
        </Grid>
            <Grid item xs={12} textAlign="left">
                <TextField 
                    id="lastName" 
                    variant="outlined"
                    onChange={(e) => setlastName(e.target.value)}
                    value={lastName}
                    margin="dense"
                    fullWidth
                    size="small"
                    InputProps={{
                        style: {
                            fontFamily: ['rubik', 'sans-serif'].join(','),
                            padding: 5,
                        }
                    }} 
                />
            </Grid>   
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="childrenFullName"
          label="Full Name"
          value={firstName + " " + lastName}
          fullWidth
          disabled
          variant="outlined"
          rows={3}
          InputProps={{
            style: {
               fontFamily: ['rubik', 'sans-serif'].join(','),
               padding: 5,
            }
         }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl style={{width: 300}}>
          <InputLabel id="childGender-label">Gender</InputLabel>
          <Select
            labelId="childGender-label"
            id="childGender"
            onChange={handleChangeGender}
            value={gender}
            maxWidth
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="parent"
          label="Parent"
          value={parentFirst + " " + parentLast}
          disabled
          fullWidth
          InputProps={{
            readOnly: true,
            style: {
                fontFamily: ['rubik', 'sans-serif'].join(','),
                padding: 5,
            },
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl style={{width: 300}}>
          <InputLabel id="childClass-label">Class</InputLabel>
          <Select
            labelId="childClass-label"
            id="childClass"
            value={cClass}
            onChange={handleChangeClass}
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Subject Grade ID</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell>Grade</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {childResult.map((child) => {
            return(
                <TableRow>
                <TableCell>{child.subjectID}</TableCell>
                <TableCell>{child.subject}</TableCell>
                <TableCell>{child.grade}</TableCell>
                </TableRow>
            )
        })}
      </TableBody>
    </Table>
    </DialogContent>
    <DialogActions style={{backgroundColor: "#FDB813", color: "#fff", display: "flex", justifyContent: "space-between", padding: "20px"}}>
    <Button onClick={history.push(`/menu/Parentmanagement/children/${child.parent}`)} style={{color: "#fff"}}>Cancel</Button>
    <Button onClick={handleSubmit} variant="contained" style={{backgroundColor: "#fff", color: "#FDB813"}}>
      SAVE
    </Button>
    </DialogActions>
    </Box>
    </Container>
    </Container>
    );
}

export default ChildrenDetails;