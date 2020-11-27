// Packages:
import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  useWindowDimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AppLoading } from 'expo';
import styled from 'styled-components';
import {
  useFonts,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

// Imports:
import WAIMAKARIRI from '../../../assets/WAIMAKARIRI.png';

// Constants:
import COLORS from '../../styles/colors';
import ROUTES from '../../router/routes';

// Styles:
const Wrapper = styled(ImageBackground)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${ COLORS.WHITE };
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
`;

const InputWrapper = styled(View)`
  margin: 10px 0px;
  background-color: ${ COLORS.LIGHT_GREY };
  border-radius: 5px;
`;

const UserInputWrapper = styled(InputWrapper)``;

const PasswordInputWrapper = styled(InputWrapper)`
  margin-bottom: 5px;
`;

const Input = styled(TextInput)`
  height: 40px;
  padding: 0px 10px;
  font-family: 'Inter_500Medium';
  color: ${ COLORS.BLACK };
`;

const UsernameInput = styled(Input)``;

const PasswordInput = styled(Input)``;

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
  background-color: ${ COLORS.BLACK };
  border-radius: 5px;
`;

const LoginButton = styled(Button)``;

const SignUpButton = styled(Button)`
  background-color: ${ COLORS.LIGHT_GREY };
`;

const ButtonText = styled(Text)`
  font-family: 'Inter_500Medium';
  font-size: 15px;
  color: ${ COLORS.WHITE };
`;

const LoginButtonText = styled(ButtonText)``;

const SignUpButtonText = styled(ButtonText)`
  color: ${ COLORS.BLACK };
`;

const Or = styled(Text)`
  margin-top: 10px;
  font-family: 'Inter_700Bold';
  font-size: 12px;
  color: ${ COLORS.GREY };
`;

// Functions:
const SubmitLogin = () => {};

const Login = (props: any) => {
  // State:
  const window = useWindowDimensions();
  const [ username, setUsername ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
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
              source={ WAIMAKARIRI }
              style={{ height: window.height }}
            >
              <StatusBar backgroundColor={ COLORS.WHITE } />
              <Header>
                <Title>Login</Title>
                <Subtitle>Access your qdoc account.</Subtitle>
              </Header>
              <Inputs>
                <UserInputWrapper>
                  <UsernameInput
                    value={ username }
                    onChangeText={ text => setUsername(text) }
                    autoCompleteType="username"
                    autoCorrect={ false }
                    blurOnSubmit
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    textContentType="username"
                  />
                </UserInputWrapper>
                <PasswordInputWrapper>
                  <PasswordInput
                    value={ password }
                    onChangeText={ text => setPassword(text) }
                    autoCompleteType="password"
                    autoCorrect={ false }
                    blurOnSubmit
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry={ true }
                    textContentType="password"
                  />
                </PasswordInputWrapper>
                <Forgot>Forgot Password?</Forgot>
              </Inputs>
              <LoginButton
                onPress={ SubmitLogin }
                accessibilityLabel="Login to access your qdoc account."
              >
                <LoginButtonText>Login</LoginButtonText>
              </LoginButton>
              <Or>OR</Or>
              <SignUpButton
                accessibilityLabel="Sign up to qdoc."
                onPress={ () => props.navigation.navigate(ROUTES.SIGNUP) }
              >
                <SignUpButtonText>Sign Up</SignUpButtonText>
              </SignUpButton>
            </Wrapper>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
  );
};

// Exports:
export default Login;
