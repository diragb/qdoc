// Packages:
import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Image,
} from 'react-native';
import { AppLoading } from 'expo';
import styled from 'styled-components';
import {
  useFonts,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

// Typescript:
import { DotProps } from './types';

// Imports:
import BACKSPACE from '../../../assets/backspace.png';
import USERLOCK from '../../../assets/userlock-compressed.png';

// Constants:
import COLORS from '../../styles/colors';
import ROUTES from '../../router/routes';
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "BACKSPACE"];

// Styles:
const Wrapper = styled(View)`
  width: 100%;
  background-color: ${ COLORS.WHITE };
`;

const FlexBox = styled(View)`
  position: absolute;
  top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const UserLock = styled(Image)`
  width: ${ 266 / 2 }px;
  height: ${ 200 / 2 }px;
  margin-bottom: 30px;
`;

const Header = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Text)`
  font-family: 'Inter_600SemiBold';
  font-size: 30px;
  color: ${ COLORS.BLACK };
`;

const Subtitle = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 12px;
  color: ${ COLORS.SPANISH_GREY };
`;

const Dots = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
`;

const Dot = styled(View)`
  width: 10px;
  height: 10px;
  margin: 0px ${ 80 / 12 }%;
  border: 2px solid ${ COLORS.BLACK };
  border-radius: ${ 10 / 2 }px;
  background-color: ${ (props: DotProps) => props.isFilled ? COLORS.BLACK : "transparent" };
`;

const Keypad = styled(View)`
  position: absolute;
  bottom: 20px;
  width: 100%;
`;

const KeyRow = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Key = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${ 100 / 3 }%;
  height: 60px;
  background-color: ${ COLORS.WHITE };
`;

const KeyText = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 20px;
  color: ${ COLORS.BLACK };
`;

const BackspaceIcon = styled(Image)`
  width: ${ 200 / 15 }px;
  height: ${ 200 / 15 }px;
`;


// Functions:
const verifyPIN = () => {

};

const PIN = () => {
  // State:
  const window = useWindowDimensions();
  const [ pinArray, setPinArray ] = useState<(number)[]>([]);
  const [ pin, setPin ] = useState<string>('');
  // const [ pinIndex, setPinIndex ] = useState<number>(0);
  const [ pinInputTries, setPinInputTries ] = useState<number>(0);
  const [ fontsLoaded ] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Functions:
  const SubmitPIN = () => {};

  const handleKeyPress = (key: (string | number)) => {
    setPinInputTries(pinInputTries + 1);
    let newPinArray = pinArray;

    if (typeof key === "string") {
      if (key === "BACKSPACE") {
        newPinArray.pop();
      }
    } else if (newPinArray.length < 4) {
      newPinArray.push(key);
    }

    setPinArray(newPinArray);
    if (newPinArray.length > 0) {
      setPin(newPinArray.join(''));
    } else {
      setPin('');
    }
  };

  // Return:
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior={ Platform.OS == "ios" ? "padding" : "height" }
        >
          <TouchableWithoutFeedback
            onPress={ Keyboard.dismiss }
          >
            <Wrapper
              style={{ height: window.height }}
            >
              <StatusBar backgroundColor={ COLORS.WHITE } />
              <FlexBox>
                <UserLock source={ USERLOCK } />
                <Header>
                  <Title>Enter PIN</Title>
                  <Subtitle>Access your qdoc files.</Subtitle>
  {/* <Subtitle>{ pinInputTries + " | " }{ pinArray[0] }{ pinArray[1] }{ pinArray[2] }{ pinArray[3] }{ " | " + pin }</Subtitle> */}
                </Header>
              </FlexBox>
              <Keypad>
                <Dots>
                  <Dot key={ 0 } isFilled={ typeof pinArray[0] !== 'undefined' ? true : false } />
                  <Dot key={ 1 } isFilled={ typeof pinArray[1] !== 'undefined' ? true : false } />
                  <Dot key={ 2 } isFilled={ typeof pinArray[2] !== 'undefined' ? true : false } />
                  <Dot key={ 3 } isFilled={ typeof pinArray[3] !== 'undefined' ? true : false } />
                </Dots>
                {
                  [0, 1, 2, 3].map((rowValue) => {
                    return (
                      <KeyRow key={ "R" + rowValue }>
                        {
                          digits.slice(rowValue * 3, (rowValue * 3) + 3).map((value, index) => {
                            let finalValue;

                            if (value === "BACKSPACE") {
                              finalValue = <BackspaceIcon source={ BACKSPACE } />;
                            } else {
                              finalValue = value;
                            }

                            return (
                              <Key key={ "K" + (index + 1) } onPress={
                                () => {
                                  Vibration.vibrate(50);
                                  handleKeyPress(value);
                                }
                              }>
                                <KeyText key={ "KT" + (index + 1) }>{ finalValue }</KeyText>
                              </Key>
                            );
                          })
                        }
                      </KeyRow>
                    );
                  })
                }
              </Keypad>
            </Wrapper>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
  );
};

// Exports:
export default PIN;
