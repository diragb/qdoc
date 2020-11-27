// Packages:
import React, { useState, useEffect, useRef } from 'react';
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
import styled from 'styled-components';
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { BoxShadow } from 'react-native-shadow';
import * as Animatable from 'react-native-animatable';


// Typescript:
import { ISidebarIconProps, IWrapper } from './ts/interfaces';


// Imports:
import CERTIFICATE_ICON from '../../../../../assets/CERTIFICATE/CERTIFICATE_1.png';
import CREDIT_CARD_ICON from '../../../../../assets/BANK_CARD/BANK_CARD_7.png';
import DEBIT_CARD_ICON from '../../../../../assets/BANK_CARD/BANK_CARD_1.png';
import DOCUMENT_ICON from '../../../../../assets/DOCUMENT/DOCUMENT_1.png';
import FOLDER_ICON from '../../../../../assets/FOLDER/EMPTY_FOLDER.png';


// Constants:
import COLORS from '../../../../styles/colors';


// Styles:
const Wrapper = styled(View)`
  position: absolute;
  bottom: ${ (props: IWrapper) => (props.index * 55) + 50 }px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${ COLORS.BLACK };
  overflow: hidden;
`;

const IconWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const Icon = styled(Image)`
  width: 20px;
  height: 20px;
`;


// Functions:
export const CertificateSidebarIcon = (props: ISidebarIconProps) => {
  // State:
  const [ fontsLoaded ] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Ref:
  const animatableViewRef = useRef<any>(null);

  // Effects:
  useEffect(() => {
    if (animatableViewRef && animatableViewRef.current) {
      if (!props.isActive) {
        animatableViewRef.current.animate({
          from: {
            right: -70 - (20 * props.index),
          },
          to: {
            right: 0,
          }
        });
      } else {
        animatableViewRef.current.animate({
          from: {
            right: 0,
          },
          to: {
            right: -70 - (20 * props.index),
          }
        });
      }
    }
    
  }, [props.isActive]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Return:
  return (
    <Animatable.View
      duration={ 500 }
      delay={ 200 * props.index }
      direction={ "normal" }
      easing={ "ease-in-out-back" }
      ref={ animatableViewRef }
    >
      <Wrapper
        index={ props.index }
      >
        <TouchableNativeFeedback
          background={ TouchableNativeFeedback.Ripple(COLORS.URANIAN_BLUE, false) }
          useForeground={ true }
          onPress={ () => Vibration.vibrate(50) }
        >
          <IconWrapper>
            <Icon source={ CERTIFICATE_ICON } />
          </IconWrapper>
        </TouchableNativeFeedback>
      </Wrapper>
    </Animatable.View>
  );
};

export const CreditCardSidebarIcon = (props: ISidebarIconProps) => {
  // State:
  const [ fontsLoaded ] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Ref:
  const animatableViewRef = useRef<any>(null);

  // Effects:
  useEffect(() => {
    if (animatableViewRef && animatableViewRef.current) {
      if (!props.isActive) {
        animatableViewRef.current.animate({
          from: {
            right: -70 - (20 * props.index),
          },
          to: {
            right: 0,
          }
        });
      } else {
        animatableViewRef.current.animate({
          from: {
            right: 0,
          },
          to: {
            right: -70 - (20 * props.index),
          }
        });
      }
    }
  }, [props.isActive]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Return:
  return (
    <Animatable.View
      duration={ 500 }
      direction={ "normal" }
      easing={ "ease-in-out-back" }
      ref={ animatableViewRef }
    >
      <Wrapper
        index={ props.index }
      >
        <TouchableNativeFeedback
          background={ TouchableNativeFeedback.Ripple(COLORS.URANIAN_BLUE, false) }
          useForeground={ true }
          onPress={ () => Vibration.vibrate(50) }
        >
          <IconWrapper>
            <Icon source={ CREDIT_CARD_ICON } />
          </IconWrapper>
        </TouchableNativeFeedback>
      </Wrapper>
    </Animatable.View>
  );
};

export const DebitCardSidebarIcon = (props: ISidebarIconProps) => {
  // State:
  const [ fontsLoaded ] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Ref:
  const animatableViewRef = useRef<any>(null);

  // Effects:
  useEffect(() => {
    if (animatableViewRef && animatableViewRef.current) {
      if (!props.isActive) {
        animatableViewRef.current.animate({
          from: {
            right: -70 - (20 * props.index),
          },
          to: {
            right: 0,
          }
        });
      } else {
        animatableViewRef.current.animate({
          from: {
            right: 0,
          },
          to: {
            right: -70 - (20 * props.index),
          }
        });
      }
    }
  }, [props.isActive]);


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Return:
  return (
    <Animatable.View
      duration={ 500 }
      direction={ "normal" }
      easing={ "ease-in-out-back" }
      ref={ animatableViewRef }
    >
      <Wrapper
        index={ props.index }
      >
        <TouchableNativeFeedback
          background={ TouchableNativeFeedback.Ripple(COLORS.URANIAN_BLUE, false) }
          useForeground={ true }
          onPress={ () => Vibration.vibrate(50) }
        >
          <IconWrapper>
            <Icon source={ DEBIT_CARD_ICON } />
          </IconWrapper>
        </TouchableNativeFeedback>
      </Wrapper>
    </Animatable.View>
  );
};

export const DocumentSidebarIcon = (props: ISidebarIconProps) => {
  // State:
  const [ fontsLoaded ] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Ref:
  const animatableViewRef = useRef<any>(null);

  // Effects:
  useEffect(() => {
    if (animatableViewRef && animatableViewRef.current) {
      if (!props.isActive) {
        animatableViewRef.current.animate({
          from: {
            right: -70 - (20 * props.index),
          },
          to: {
            right: 0,
          }
        });
      } else {
        animatableViewRef.current.animate({
          from: {
            right: 0,
          },
          to: {
            right: -70 - (20 * props.index),
          }
        });
      }
    }
  }, [props.isActive]);


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Return:
  return (
    <Animatable.View
      duration={ 500 }
      direction={ "normal" }
      easing={ "ease-in-out-back" }
      ref={ animatableViewRef }
    >
      <Wrapper
        index={ props.index }
      >
        <TouchableNativeFeedback
          background={ TouchableNativeFeedback.Ripple(COLORS.URANIAN_BLUE, false) }
          useForeground={ true }
          onPress={ () => Vibration.vibrate(50) }
        >
          <IconWrapper>
            <Icon source={ DOCUMENT_ICON } />
          </IconWrapper>
        </TouchableNativeFeedback>
      </Wrapper>
    </Animatable.View>
  );
};

export const FolderSidebarIcon = (props: ISidebarIconProps) => {
  // State:
  const [ fontsLoaded ] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Ref:
  const animatableViewRef = useRef<any>(null);

  // Effects:
  useEffect(() => {
    if (animatableViewRef && animatableViewRef.current) {
      if (!props.isActive) {
        animatableViewRef.current.animate({
          from: {
            right: -70 - (20 * props.index),
          },
          to: {
            right: 0,
          }
        });
      } else {
        animatableViewRef.current.animate({
          from: {
            right: 0,
          },
          to: {
            right: -70 - (20 * props.index),
          }
        });
      }
    }
  }, [props.isActive]);


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Return:
  return (
    <Animatable.View
      duration={ 500 }
      direction={ "normal" }
      easing={ "ease-in-out-back" }
      ref={ animatableViewRef }
    >
      <Wrapper
        index={ props.index }
      >
        <TouchableNativeFeedback
          background={ TouchableNativeFeedback.Ripple(COLORS.URANIAN_BLUE, false) }
          useForeground={ true }
          onPress={ () => Vibration.vibrate(50) }
        >
          <IconWrapper>
            <Icon source={ FOLDER_ICON } />
          </IconWrapper>
        </TouchableNativeFeedback>
      </Wrapper>
    </Animatable.View>
  );
};
