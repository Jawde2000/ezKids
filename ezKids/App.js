import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, MD3DarkTheme } from 'react-native-paper';

// debug imports
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import LogIn from './components/LogIn';
import StudentAmend from './components/StudentAmend';
import DEBUGWidget from './components/DEBUG';
import MyClasses from './components/MyClasses';
import Announcements from './components/widgets/Announcements';
import MenuChips from './components/widgets/MenuChips';
import MyChildren from './components/MyChildren';
import ClassDetail from './components/detail/Class';
import HomeworkAmend from './components/HomeworkAmend';

const theme = {
  ...MD3DarkTheme
}

export default function App() {
  return (
    <Provider theme={theme}>
      {/* <ClassDetail class={{ classID: "k1", className: "Kindergarten A" }} /> */}
      <MyClasses />
    </Provider>
  );
}