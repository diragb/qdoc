// Packages:
import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  useWindowDimensions,
  View,
  Text,
  TextInput,
  Vibration,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { AppLoading } from 'expo';
import Constants from 'expo-constants'
import styled from 'styled-components';
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import truncate from 'truncate';


// Imports:
import ADD_ICON from '../../../assets/PLUS_WHITE.png';


// Constants:
import COLORS from '../../styles/colors';
import ROUTES from '../../router/routes';


// Components:
import Folder from '../../components/views/Home/Folder';
import Document from '../../components/views/Home/Document';
import DebitCard from '../../components/views/Home/DebitCard';


// Styles:
const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: ${ Constants.statusBarHeight }px;
  background-color: ${ COLORS.WHITE };
`;

const Header = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 200px;
  padding: 20px;
`;

const TitleGroup = styled(View)`
  margin-top: auto;
`;

const Title = styled(Text)`
  font-family: 'Inter_300Light';
  font-size: 30px;
  color: ${ COLORS.BLACK };
`;

const Subtitle = styled(Text)`
  margin-left: 2px;
  font-family: 'Inter_500Medium';
  font-size: 12px;
  color: ${ COLORS.SPANISH_GREY };
`;

const AssetsView = styled(View)`
  width: 100%;
  padding: 20px;
`;

const Assets = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const AddIconTouchableWrapper = styled(View)`
  position: absolute;
  bottom: 50px;
  right: 0px;
  width: 70px;
  height: 40px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: ${ COLORS.JET };
  overflow: hidden;
`;

const AddIconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  width: 70px;
  height: 40px;
`;

const AddIcon = styled(Image)`
  width: 15px;
  height: 15px;
  margin-left: 15px;
`;


// Functions:
const FolderView = (props: any) => {
  // State:
  const [ fontsLoaded ] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Return:
  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.WHITE }} >
        <TouchableWithoutFeedback
          onPress={ Keyboard.dismiss }
        >
          <Wrapper>
            <StatusBar backgroundColor={ COLORS.WHITE } />
            <Header>
              <TitleGroup>
                <Title>{ truncate(props.route.params.name, 45) }</Title>
                <Subtitle>
                  {
                    props.route.params.routeArray.length > 3
                    ?
                    `${ truncate(props.route.params.routeArray[0], 15) } > ... > ${ truncate(props.route.params.routeArray[props.route.params.routeArray.length - 1], 15) }`
                    :
                    props.route.params.routeArray.map((route: string, index: number) => {
                      if (index !== props.route.params.routeArray.length - 1) {
                        return `${ truncate(route, 15) } >`;
                      } else {
                        return truncate(route, 15);
                      }
                    })
                  }
                </Subtitle>
              </TitleGroup>
            </Header>
            <AssetsView>
              <Assets>
                <Folder name={ 'Government Documents' } navigation={ props.navigation } routeArray={ props.route.params.routeArray.slice().push(props.route.params.name) } />
                <Folder name={ 'School Documents' } navigation={ props.navigation } routeArray={ props.route.params.routeArray.slice().push(props.route.params.name) } />
                <Document name={ 'Aadhar Card' } />
                <DebitCard name={ 'Federal Bank Debit Card' } />
                <DebitCard name={ 'Axis Bank Debit Card' } />
              </Assets>
            </AssetsView>
          </Wrapper>
        </TouchableWithoutFeedback>
      </ScrollView>
      <AddIconTouchableWrapper>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(COLORS.LIGHT_GREY, false)}
          useForeground={ true }
          onPress={ () => Vibration.vibrate(50) }
        >
          <AddIconWrapper>
            <AddIcon source={ ADD_ICON } />
          </AddIconWrapper>
        </TouchableNativeFeedback>
      </AddIconTouchableWrapper>
    </>
  );
};


// Exports:
export default FolderView;
