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


// Imports:
import BACK_ICON from '../../../assets/back.png';


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
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  background-color: ${ COLORS.WHITE };
`;

const ResultsView = styled(View)`
  width: 100%;
  padding: 20px;
`;

const ResultsTitle = styled(Text)`
  margin-left: 6px;
  margin-bottom: 10px;
  font-family: 'Inter_500Medium';
  font-size: 15px;
  color: ${ COLORS.SPANISH_GREY };
`;

const Results = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const SearchBox = styled(View)`
  position: absolute;
  top: ${ Constants.statusBarHeight }px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${ COLORS.WHITE };
  border-bottom-width: 1px;
  border-bottom-color: ${ COLORS.MEDIUM_GREY };
`;

const BackIconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 50px;
`;

const BackIcon = styled(Image)`
  width: 16px;
  height: 16px;
`;

const SearchInputWrapper = styled(View)`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 33px;
  background-color: ${ COLORS.LIGHT_GREY };
  border-radius: 2px;
`;

const SearchInput = styled(TextInput)`
  width: 100%;
  height: 50px;
  padding: 0px 10px;
  font-family: 'Inter_500Medium';
  color: ${ COLORS.BLACK };
`;


// Functions:
const Search = (props: any) => {
  // State:
  const window = useWindowDimensions();
  const [ search, setSearch ] = useState<string>("");
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
      <ScrollView style={{ backgroundColor: COLORS.WHITE, marginTop: Constants.statusBarHeight }} >
        <TouchableWithoutFeedback
          onPress={ Keyboard.dismiss }
        >
          <Wrapper>
            <ResultsView>
              <ResultsTitle>Results</ResultsTitle>
              <Results>
              </Results>
            </ResultsView>
          </Wrapper>
        </TouchableWithoutFeedback>
      </ScrollView>
    <SearchBox>
      <TouchableWithoutFeedback
        onPress={
          () => {
            Vibration.vibrate(50);
            props.navigation.goBack();
          }
        }
      >
        <BackIconWrapper>
          <BackIcon source={ BACK_ICON } />
        </BackIconWrapper>
      </TouchableWithoutFeedback>
      <SearchInputWrapper>
        <SearchInput
          value={ search }
          onChangeText={ text => setSearch(text) }
          autoCompleteType="off"
          autoCorrect
          autoFocus
          blurOnSubmit
          placeholder="Search for documents"
          placeholderTextColor={ COLORS.GREY }
          textContentType="none"
        />
      </SearchInputWrapper>
    </SearchBox>
    </>
  );
};


// Exports:
export default Search;
