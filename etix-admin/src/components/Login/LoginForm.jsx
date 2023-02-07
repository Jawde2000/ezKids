import { Grid, Container, IconButton,  Typography, Button,} from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import { LinearProgress } from '@material-ui/core';
import Fade from '@mui/material/Fade';
import { makeStyles} from '@mui/styles';
import React, {useState, useEffect} from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useHistory} from 'react-router-dom';
import { login } from '../../actions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { createStyles  } from '@material-ui/core/styles';
import { USER_LOGOUT  } from '../../constants/userConstants';

const theme = createStyles({
  palette: {
    primary: {
      main: '#36454F',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  inputbackground: {
    backgroundColor: 'white',
    borderRadius: 10,
    textUnderline: "none",
    '& label.Mui-focused': {
      color: '#F5CB5C',
      border: 'bold',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#F5CB5C',
      border: 'bold',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        border: 'bold',
      },
      '&:hover fieldset': {
        borderColor: '#F5CB5C',
        border: 'bold',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F5CB5C',
        border: 'bold',
      },
    },
  },
  loginButton: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    backgroundColor: '#FDB813',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    fontFamily: ['Rubik', 'impact'].join(','),
    fontSize: 20,
    color: 'black',
    margin: theme.spacing(1),
  },
  startIcon: {
    fontSize: 25,
    color: 'black',
  },
  errorMessage: {
    marginTop: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  slideIn: {
    animation: `$slideIn 0.5s ease-out`,
  },
  '@keyframes slideIn': {
    '0%': {
      transform: 'translateY(-100%)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
}));

function LoginForm() {
  const defaultStyle = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const [hovered, setHovered] = useState(false);

  const userLogin = useSelector(state => state.userLogin)
  const userRegister = useSelector(state => state.userRegister)
  const {loading, error,  userInfo} = userLogin
  const dispatch = useDispatch()


  let history = useHistory()

  useEffect(() => {
    if(userInfo) {
        history.push('/ezdashboard')
    }
  },[userInfo])

  useEffect(() => {
    if (error) {
      setOpen(false);
      dispatch({type: USER_LOGOUT})
    }
  }, [userInfo])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
      <Container>
        {error && open &&(
        <Grid direction="column" xs={12} className={defaultStyle.errorMessage}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              className={defaultStyle.closeButton}
              onClick={open}
            >
              <CloseIcon />
            </IconButton>
          }
        >
          No active account found with the given credentials.
        </Alert>
        </Grid>
        )}
        <Grid xs={12} direction="column">   
        <Grid item>
          <TextField sx={{ m: 1, width: '40ch' }} className={defaultStyle.inputbackground} type="email"
            label={'Email'} variant="filled" InputProps={{ disableUnderline: true }}
            value={email} onChange={handleChangeEmail}
          ></TextField>
        </Grid>
        <Grid item>     
        <FormControl sx={{ m: 1, width: '40ch' }} variant="filled" className={defaultStyle.inputbackground}>
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FilledInput         
          disableUnderline="true"
          variant="filled"
          id="filled-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {values.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
         }
        />
        </FormControl>
        </Grid>
        <Grid item xs={12} className={defaultStyle.loginButton}>
        <Button
          variant="contained"
          className={defaultStyle.button}
          onClick={handleLogin}
          startIcon={<ArrowForwardIosIcon 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              color: hovered ? "white" : "black"
            }}
            className={defaultStyle.startIcon} />}
        >
          <Typography 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
             color: hovered ? "white" : "black"
          }}
          >Login</Typography>
        </Button>
        </Grid>
        </Grid>
        <Grid>
              {loading?
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
              <CircularProgress  style={{color: '#F5CB5C'}}/>
              </Backdrop>:null
              }
            </Grid>
      </Container>
  );

}

export default LoginForm;
