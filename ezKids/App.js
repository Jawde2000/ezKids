import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, MD3LightTheme } from 'react-native-paper';

// debug imports
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import LogIn from './components/LogIn';
import StudentAmend from './components/StudentAmend';
import MyClasses from './components/MyClasses';
import Announcements from './components/widgets/Announcements';
import MenuChips from './components/widgets/MenuChips';
import MyChildren from './components/MyChildren';
import ClassDetail from './components/detail/Class';
import HomeworkAmend from './components/HomeworkAmend';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './components/MainMenu';
import ResultAmend from './components/ResultsAmend';
import Profile from './components/Profile';
import QRScanner from './components/QRScanner';
import GlobalRanking from './components/GlobalRanking';
import ClassRanking from './components/ClassRanking';
import MenuList from './components/MenuList';
import ParentInfo from './components/ParentInfo';
import GradeScreen from './components/GradeScreen';

const theme = {
  ...MD3LightTheme,
  colors: {
    primary: "rgb(133, 84, 0)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 221, 183)",
    onPrimaryContainer: "rgb(42, 23, 0)",
    secondary: "rgb(112, 91, 65)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(252, 222, 188)",
    onSecondaryContainer: "rgb(40, 24, 5)",
    tertiary: "rgb(83, 100, 62)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(214, 233, 185)",
    onTertiaryContainer: "rgb(18, 31, 3)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(31, 27, 22)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(31, 27, 22)",
    surfaceVariant: "rgb(240, 224, 208)",
    onSurfaceVariant: "rgb(80, 69, 57)",
    outline: "rgb(130, 117, 104)",
    outlineVariant: "rgb(212, 196, 181)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(53, 47, 42)",
    inverseOnSurface: "rgb(249, 239, 231)",
    inversePrimary: "rgb(255, 185, 92)",
    elevation: {
      level0: "transparent",
      level1: "rgb(249, 243, 242)",
      level2: "rgb(245, 238, 235)",
      level3: "rgb(242, 233, 227)",
      level4: "rgb(240, 231, 224)",
      level5: "rgb(238, 228, 219)"
    },
    surfaceDisabled: "rgba(31, 27, 22, 0.12)",
    onSurfaceDisabled: "rgba(31, 27, 22, 0.38)",
    backdrop: "rgba(56, 47, 36, 0.4)"
  }
}


const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={LogIn} /> 
          <Stack.Screen options={{headerShown: false}} name="Menu" component={MainMenu} />
          <Stack.Screen name="Forget" component={ForgotPassword} />
          <Stack.Screen name="Class" component={MyClasses} /> 
          <Stack.Screen name="Profile" component={Profile} /> 
          <Stack.Screen name="ClassDetails" component={ClassDetail} /> 
          <Stack.Screen name="QRscanner" component={QRScanner} />
          <Stack.Screen name="StudentAmend" component={StudentAmend} />
          <Stack.Screen name="GlobalRanking" component={GlobalRanking} />
          <Stack.Screen name="ClassRanking" component={ClassRanking} />
          <Stack.Screen name="MenuList" component={MenuList} />
          <Stack.Screen name="ParentInfo" component={ParentInfo} />
          <Stack.Screen name="Grade" component={GradeScreen} />
          {/* <Stack.Screen name='MenuChip' component={MenuChips} />  */}
        </Stack.Navigator>

      </NavigationContainer>
      {/* <HomeworkAmend /> */}
      {/* <ClassDetail class={{ classID: "k1", className: "Kindergarten A" }} /> */}
      {/* <LogIn /> */}
      {/* <ResultAmend student={{ studentID: "s1", studentFirstName: "Zhi Peng", studentLastName: "Chew", studentDOB: "2020-09-14", studentGender: "Male"}} /> */}
    </Provider>
  );
}





export default App;