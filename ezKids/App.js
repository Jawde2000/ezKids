import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import Register from './components/Register';
import LogIn from './components/LogIn';

export default function App() {
  return (
    <Provider>
      <LogIn />
    </Provider>
  );
}