// Packages:
import React from 'react';
import { Provider } from "react-redux";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Typescript:
import { RootStackParamList } from './src/router/ts/types';


// Imports:
import store from "./src/redux/store";


// Constants:
import ROUTES from './src/router/routes';


// Components:
import PIN from './src/views/PIN';
import Login from './src/views/Login';
import SignUp from './src/views/SignUp';
import Home from './src/views/Home';
import Search from './src/views/Search';
import FolderView from './src/views/FolderView';
import AddAsset from './src/views/AddAsset';
import FileViewer from './src/views/FileViewer';


// Functions:
const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootStack.Navigator
          initialRouteName={ ROUTES.HOME }
          screenOptions={{
            gestureEnabled: true,
            headerShown: false
          }}
        >
          <RootStack.Screen name={ ROUTES.PIN } component={ PIN } />
          <RootStack.Screen name={ ROUTES.LOGIN } component={ Login } />
          <RootStack.Screen name={ ROUTES.SIGNUP } component={ SignUp } />
          <RootStack.Screen name={ ROUTES.HOME } component={ Home } initialParams={{
            fileUploadStatus: null
          }} />
          <RootStack.Screen name={ ROUTES.SEARCH } component={ Search } />
          <RootStack.Screen name={ ROUTES.FOLDER_VIEW } component={ FolderView } />
          <RootStack.Screen name={ ROUTES.ADD_ASSET } component={ AddAsset } />
          <RootStack.Screen name={ ROUTES.FILE_VIEWER } component={ FileViewer } />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


// Exports:
export default App;
