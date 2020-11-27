// Packages:
import React from 'react';
import {
  Vibration,
  TouchableNativeFeedback,
} from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import truncate from 'truncate';


// Typescript:
import { ICreditCard } from './ts/types';


// Imports:
import BANK_CARD_1_ICON from '../../../../../assets/BANK_CARD/BANK_CARD_1.png';
import BANK_CARD_2_ICON from '../../../../../assets/BANK_CARD/BANK_CARD_2.png';
import BANK_CARD_3_ICON from '../../../../../assets/BANK_CARD/BANK_CARD_3.png';
import BANK_CARD_4_ICON from '../../../../../assets/BANK_CARD/BANK_CARD_4.png';
import BANK_CARD_5_ICON from '../../../../../assets/BANK_CARD/BANK_CARD_5.png';
import BANK_CARD_6_ICON from '../../../../../assets/BANK_CARD/BANK_CARD_6.png';
import BANK_CARD_7_ICON from '../../../../../assets/BANK_CARD/BANK_CARD_7.png';


// Constants:
import COLORS from '../../../../styles/colors';
import ROUTES from '../../../../router/routes';


// Styles:
import {
  Wrapper,
  CreditCardWrapper,
  CreditCardIcon,
  CreditCardName,
  CreditCardGlanceDetails,
} from './styles';


// Functions:
import timeAgo from '../../../../functions/time-ago';


const CreditCard: ICreditCard = (props) => {
  // State:
  const [ fontsLoaded ] = useFonts({
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Return:
  return (
    <Wrapper>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(COLORS.MEDIUM_GREY, true)}
        useForeground={ true }
        onPress={
          () => {
            Vibration.vibrate(50);
            props.navigation.navigate(ROUTES.FILE_VIEWER, {
              id: props.id,
              name: props.name,
              fileExtension: props.fileExtension,
            });
          }
        }
      >
        <CreditCardWrapper>
          <CreditCardIcon source={ BANK_CARD_7_ICON } />
          <CreditCardName>{ truncate(props.name, 45) }</CreditCardName>
          <CreditCardGlanceDetails>{ timeAgo.format(props.lastModified) }</CreditCardGlanceDetails>
        </CreditCardWrapper>
      </TouchableNativeFeedback>
    </Wrapper>
  );
};


// Exports:
export default CreditCard;
