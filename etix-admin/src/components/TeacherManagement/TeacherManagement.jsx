import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Icon, Paper, TextField, Tooltip, Toolbar} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect, props, useState} from 'react';
import moscow from '../globalAssets/moscow.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { listUsers, deleteUsers } from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarColumnsButton} from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { USER_LIST_SUCCESS, USER_LIST_RESET, USER_LIST_REQUEST } from '../../constants/userConstants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from 'react-router';
import Backdrop from '@mui/material/Backdrop';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${moscow})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: 700
    },
}));

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function CustomToolbar() {
    return (
      <GridToolbarContainer>   
        <GridToolbarColumnsButton />  
        <GridToolbarExport /> 
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />     
      </GridToolbarContainer>
    );
}

function TeacherManagement() {
    const defaultStyle = useStyles();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const dispatch = useDispatch();
    let history = useHistory();

    const userList = useSelector(state => state.userList);
    const {loading, error, users} = userList

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete, loading: loadingDelete} = userDelete

    const [search, setSearch] = useState('');
    const [select, setSelection] = useState([]);
    const [row, setRow] = useState([]);
    const [rows, setRows] = useState([]);
    const [openDel, setOpenDel] = useState(false);
    // const serviceList = useSelector(state => state.serviceList)
    // const {services} = serviceList

    const DialogDelete2 = () => {
      const [open, setOpen] = useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleDelete = () => {
        select.map((ids) => {
          console.log(ids.userID)
          dispatch(deleteUsers(ids.userID));
        })
        
        setOpen(false);
        setSelection([]);
      }
    
      return (
        <Toolbar>
          <Tooltip onClick={handleClickOpen} title="delete">
              {select.length <= 0?
                <IconButton disabled={true}>
                  <DeleteIcon style={{fontSize: 40}}/>
                </IconButton>
                :
                <IconButton >
                {select.length < 2? (<DeleteIcon style={{fontSize: 40, color: "black"}}/>):(<DeleteIcon style={{fontSize: 40, color: "red"}}/>)}
                </IconButton>            
              }
          </Tooltip>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete Teacher(s)"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the Teacher(s)?
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


    const columns = [
      { field: 'id', headerName: 'Teacher ID', width: 200 },
      {
        field: 'username',
        headerName: 'Name',
        headerAlign: 'center',
        width: 350,
        editable: false,
      },
      {
        field: 'email',
        headerName: 'Email',
        headerAlign: 'center',
        type: 'email',
        width: 250,
        editable: false,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        headerAlign: 'center',
        width: 250,
        editable: false,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
          console.log(params);
          return (
            <Container >
              <Grid xs={12} display="flex">
                <Grid xs={6} item>
                  <Toolbar>
                  <Tooltip title="Edit">
                  <IconButton href={`/menu/teachermanagement/teacher/${params.row.userID}`}>
                    <EditIcon />
                  </IconButton>
                  </Tooltip>
                  </Toolbar>
                </Grid>
                <Grid xs={6} item>
                  {select.length >= 2? null:<DialogDelete ids={params.row.userID}/>}
                </Grid>
              </Grid>
            </Container>
          );
       },
      }
    ];   

    useEffect(() => {
      if(userInfo) { 
        dispatch(listUsers())
      } else{
        history.push('/')
      }
    }, [dispatch, successDelete]);

    useEffect(() => {
      if(successDelete){
        setOpenDel(true);
      }
    }, [successDelete])

    useEffect(() => {
      console.log(users)
      if (users) {
          const userS = users?.map(user => {
        //   var s = servicel.serviceStatus === "O"? "Active":"Inactive"
        //   var timeString = servicel.serviceTime // input string
        //   var arr = timeString.split(":"); // splitting the string by colon
        //   var suffix = arr[0] >= 12 ? " PM":" AM"
        //   var t = arr[0] + ":" + arr[1] + suffix

          return {
            id: user.teacherID,
            username: user.teacherFirstName+ " " + user.teacherLastName,
            email: user.teacherEmail,
            userID: user.created_by
          }
        })
        // console.log(serviceLoad)
        setRow(userS);
      }
    }, [users])

    useEffect(()=> {
      if(row){
        search  === ""? setRows(row):setRows(rows);
      }
    })

    const requestSearch = (searchValue) => {
      setSearch(searchValue)
      const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
      const filteredRows = rows.filter((roww) => {
        return Object.keys(roww).some((field) => {
          return searchRegex.test(roww[field].toString());
        });
      });
      setRows(filteredRows);
    };

    const DialogDelete = (ids) => {
      const [open, setOpen] = useState(false);
      console.log(ids.ids);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        ids = null;
        setOpen(false);
      };
    
      const handleDelete = () => {
        dispatch(deleteUsers(ids.ids));
        ids = null;
        setSelection([]);
      }
    
      return (
        <Toolbar>
          <Tooltip title="Delete" onClick={handleClickOpen}>
              <IconButton >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete Teacher(s)"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the Teacher(s)?
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

    const DialogDel = () => {
      const handleClose = () => {
        dispatch({type: USER_LIST_RESET});
        setOpenDel(false);
        dispatch({type: USER_LIST_REQUEST});
        history.push(`/menu/teachermanagement`);
      };

      return (
        <Toolbar>
          <Dialog
            open={openDel}
            onClose={handleClose}
          >
            <DialogTitle id="alert-dialog-title">
              {"Notification"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                The Teacher(s) is deleted
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

    return (
        
        <Box className={defaultStyle.whole}>
            <Container>
            <Grid xs={12} direction="column" spacing={20}>
                <Grid xs={12} padding={5} display="flex" container>
                <Grid xs={4} item  justify="center"  alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                  <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 230 }}>
                    <InputBase 
                    placeholder="Search..." value={search} onChange={(e) => requestSearch(e.target.value)}
                    inputProps={{ 'aria-label': 'search users',}}
                    />               
                    <IconButton
                    title="Clear"
                    aria-label="Clear"
                    size="small"
                    style={{ visibility: search ? 'visible' : 'hidden' }}
                    onClick={e => requestSearch('')}
                    >
                    <ClearIcon fontSize="small" />
                    </IconButton>
                    <SearchIcon fontSize="small" c/>
                  </Paper>
                  </Grid>
                    <Grid xs={4} item display="flex" justify="center"  alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                        <Box >
                        </Box>
                    </Grid>
                    <Grid xs={4} alignItems="flex-end" alignContent="flex-end" flexWrap="wrap" justifyContent="flex-end" container spacing={0.5}>
                    <Grid xs={12} item display="flex" alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                          <Grid xs={6} item md={1} paddingRight={15}>
                          <DialogDelete2 />
                          </Grid>
                          <Grid xs={6} item md={1}>
                          <Tooltip title="Add new teacher">          
                          <IconButton href="/menu/teachermanagement/addTeacher">
                          <AddCircleIcon style={{fontSize: 40, color: "black", }}/>
                          </IconButton> 
                          </Tooltip> 
                          </Grid>
                      </Grid>             
                    </Grid>
                </Grid>
                <Paper>
                <Grid xs={12}>             
                    <Grid style={{ height: 450, width: '100%' }} >
                        <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        onSelectionModelChange={(ids) => {
                          const selectedIDs = new Set(ids);
                          const selectedRowData = row.filter((row) =>
                            selectedIDs.has(row.id.toString())
                          )
                          // console.log(selectedRowData);
                          setSelection(selectedRowData);
                        }}
                        components={{
                            Toolbar: CustomToolbar
                        }}
                        />
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
            <Grid>
              {loading?
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
              <CircularProgress  style={{color: '#F5CB5C'}}/>
              </Backdrop>:null
              }
            </Grid>
            <Grid>
              {loadingDelete?
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
              <CircularProgress  style={{color: '#F5CB5C'}}/>
              </Backdrop>:null
              }
            </Grid>
            <Grid>
                {openDel? <DialogDel />:null}
              </Grid>
            </Container>
        </Box>
        
    );
}

export default TeacherManagement;