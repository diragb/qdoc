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
  TextInput,
  TouchableOpacity,
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
import passwordStrength from 'check-password-strength';

// Typescript:
import { PasswordStrengthDotProps } from './types';

// Imports:
import CLOUD_ONE from '../../../assets/CLOUD_1.png';
import CLOUD_TWO from '../../../assets/CLOUD_2.png';
import RED_BALLOON from '../../../assets/BALLOON.png';
import SOFA from '../../../assets/SOFA.png';
import GUY from '../../../assets/GUY.png';

// Constants:
import COLORS from '../../styles/colors';
import { PASSWORD_STRENGTH_COLOR } from '../../styles/styles';

// Styles:
const Wrapper = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${ COLORS.WHITE };
`;

const CloudOne = styled(Image)`
  position: absolute;
  top: 100px;
  left: 60px;
  width: ${ 100 / 2 }px;
  height: ${ 50 /2 }px;
`;

const CloudTwo = styled(Image)`
  position: absolute;
  top: 50px;
  right: 70px;
  width: ${ 100 / 2 }px;
  height:${ 50 /2 }px;
`;

const RedBalloon = styled(Image)`
  position: absolute;
  top: 80px;
  width: ${ 50 /2 }px;
  height: ${ 100 / 2 }px;
`;

const Header = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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

const Inputs = styled(View)`
  width: 80%;
  margin-bottom: 10px;
`;

const InputWrapper = styled(View)`
  margin: 10px 0px;
  background-color: ${ COLORS.LIGHT_GREY };
  border-radius: 5px;
`;

const UserInputWrapper = styled(InputWrapper)``;

const PasswordInputWrapper = styled(InputWrapper)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 5px;
`;

const Input = styled(TextInput)`
  height: 40px;
  padding: 0px 10px;
  font-family: 'Inter_500Medium';
  color: ${ COLORS.BLACK };
`;

const UsernameInput = styled(Input)``;

const PasswordInput = styled(Input)`
  width: 90%;
`;

const PasswordStrengthDotWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 40px;
`;

const PasswordStrengthDot = styled(View)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${ (props: PasswordStrengthDotProps) => PASSWORD_STRENGTH_COLOR[props.strength] };
`;

const Forgot = styled(Text)`
  margin-bottom: 5px;
  margin-left: 5px;
  font-family: 'Inter_700Bold';
  font-size: 10px;
  color: ${ COLORS.BLACK };
`;

const Button = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 40px;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: ${ COLORS.BLACK };
  border-radius: 5px;
`;

const SignUpButton = styled(Button)``;

const LoginButton = styled(Button)`
  background-color: ${ COLORS.LIGHT_GREY };
`;

const ButtonText = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 15px;
  color: ${ COLORS.WHITE };
`;

const SignUpButtonText = styled(ButtonText)``;

const LoginButtonText = styled(ButtonText)`
  color: ${ COLORS.BLACK };
`;

const Or = styled(Text)`
  margin-top: 10px;
  font-family: 'Inter_700Bold';
  font-size: 12px;
  color: ${ COLORS.GREY };
`;

const IllustrationGuy = styled(Image)`
  position: absolute;
  left: 50px;
  bottom: 10px;
  width: ${ 235 / 4 }px;
  height: ${ 400 / 4 }px;
`;

const IllustrationSofa = styled(Image)`
  position: absolute;
  right: 50px;
  bottom: 10px;
  width: ${ 400 / 2 }px;
  height: ${ 235 / 2 }px;
`;


// Functions:
const SubmitSignUp = () => {};

const SignUp = (props: any) => {
  // State:
  const window = useWindowDimensions();
  const [ email, setEmail ] = useState<string>("");
  const [ newPassword, setNewPassword ] = useState<string>("");
  const [ newPasswordStrength, setNewPasswordStrength ] = useState<0 | 1 | 2 | 3>(3);
  const [ fontsLoaded ] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Return:
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
              <CloudOne source={ CLOUD_ONE } />
              <CloudTwo source={ CLOUD_TWO } />
              <RedBalloon source={ RED_BALLOON } />
              <Header>
                <Title>Sign Up</Title>
                <Subtitle>Create a qdoc account.</Subtitle>
              </Header>
              <Inputs>
                <UserInputWrapper>
                  <UsernameInput
                    value={ email }
                    onChangeText={ text => setEmail(text) }
                    autoCompleteType="email"
                    autoCorrect={ false }
                    blurOnSubmit
                    placeholder="Email Address"
                    placeholderTextColor="#aaa"
                    textContentType="emailAddress"
                  />
                </UserInputWrapper>
                <PasswordInputWrapper>
                  <PasswordInput
                    value={ newPassword }
                    onChangeText={
                      text => {
                        setNewPassword(text);
                        setNewPasswordStrength(text.length > 0 ? passwordStrength(text).id : 3);
                      }
                    }
                    autoCompleteType="password"
                    autoCorrect={ false }
                    blurOnSubmit
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry={ true }
                    textContentType="newPassword"
                    passwordRules="required: lower; required: upper; required: digit; required: [-]; minlength: 6;"
                  />
                  <PasswordStrengthDotWrapper>
                    <PasswordStrengthDot strength={ newPasswordStrength } />
                  </PasswordStrengthDotWrapper>
                </PasswordInputWrapper>
              </Inputs>
              <SignUpButton
                onPress={ SubmitSignUp }
                accessibilityLabel="Sign up to qdoc."
              >
                <SignUpButtonText>Sign Up</SignUpButtonText>
              </SignUpButton>
              <Or>OR</Or>
              <LoginButton
                accessibilityLabel="Login to access your qdoc account."
                onPress={ () => props.navigation.goBack() }
              >
                <LoginButtonText>Login</LoginButtonText>
              </LoginButton>
              <IllustrationSofa source={ SOFA } />
              <IllustrationGuy source={ GUY } />
            </Wrapper>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
  );
};

// Exports:
export default SignUp;
