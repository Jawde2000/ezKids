import './App.css';
import React from 'react';   
import {Route, BrowserRouter, useHistory, Switch} from 'react-router-dom';
import AdminMenu from './components/adminMenu/AdminMenu';
import {useCookies} from 'react-cookie'
import Topbar from './components/NavBar/Topbar'
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer'
import UserManagement from './components/userManagement/UserManagement';
import Helpdesk from './components/Helpdesk/HelpdeskDetail';
import Sales from './components/Sales/Sales'
import Service from './components/Service/Service';
import ServiceMan from './components/ServiceMan/Services'
import Teacher from './components/TeacherManagement/Teacher'
import DataGenerationService from './components/DataGeneration/DataGenerationService';
import {CookiesProvider} from 'react-cookie'
import Help from './components/HelpMan/Help';
import AddUser from './components/User/AddUser';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddService from './components/ServiceMan/AddService';
import Dashboard from './components/adminMenu/Dashboard';
import TeacherManagement from './components/TeacherManagement/TeacherManagement';
import ParentManagement from './components/ParentManagement/ParentManagement';
import AddTeacher from './components/TeacherManagement/addTeacher';
import EZDashboard from './components/adminMenu/EZDashboard';
import {useSelector} from 'react-redux'
import {  Grid } from '@mui/material';
import AddParent from './components/ParentManagement/AddParent';
import Parent from './components/ParentManagement/Parent';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#1c183f'
        },
        secondary: {
          main: '#f5cb5c'
        },
    },
    typography: {
        fontFamily: 'Rubik'
    }
})

function App() {
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  let history = useHistory()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  return (
    <div> 
      <div>
      <ThemeProvider theme={theme}>
          <CookiesProvider>
            <BrowserRouter>
            <Grid xs={12}>
              {userInfo? <AdminMenu />: null}
            </Grid>
              
              <Topbar />
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/menu" component={AdminMenu}  />
                  <Route exact path="/sales/datageneration" component={DataGenerationService} />
                  <Route exact path="/menu/sales" component={Sales} />
                  <Route exact path="/menu/servicemanagement" component={ServiceMan} />
                  <Route exact path="/service/:id" component={Service} />
                  <Route exact path="/menu/users" component={UserManagement} />
                  <Route exact path="/menu/helpdesk" component={Help} /> 
                  <Route exact path="/addUser" component={AddUser} />
                  <Route exact path="/help/:id" component={Helpdesk} />
                  <Route exact path="/newService" component={AddService}/>
                  <Route exact path="/dashboard" component={Dashboard}/>
                  <Route exact path="/ezdashboard" component={EZDashboard}/>
                  <Route exact path="/menu/teachermanagement" component={TeacherManagement}/>
                  <Route exact path="/menu/parentmanagement" component={ParentManagement}/>
                  <Route exact path="/menu/parentmanagement/addParent" component={AddParent} />
                  <Route exact path="/menu/teachermanagement/teacher/:id" component={Teacher}/>
                  <Route exact path="/menu/teachermanagement/addTeacher" component={AddTeacher}/>
                  <Route exact path="/menu/Parentmanagement/parent/:id" component={Parent}/>

                </Switch>
              <Footer />    
            </BrowserRouter>
        </CookiesProvider>
      </ThemeProvider>
      </div>
    </div>
  );
}

export default App;

