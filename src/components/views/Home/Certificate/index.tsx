// Packages:
import React from 'react';
import {
  View,
  Vibration,
  TouchableNativeFeedback,
} from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import truncate from 'truncate';
import { LongPressGestureHandler } from 'react-native-gesture-handler';


// Typescript:
import { ICertificate } from './ts/types';


// Imports:
import CERTIFICATE_ICON_1 from '../../../../../assets/CERTIFICATE/CERTIFICATE_1.png';
import CERTIFICATE_ICON_2 from '../../../../../assets/CERTIFICATE/CERTIFICATE_2.png';
import CERTIFICATE_ICON_3 from '../../../../../assets/CERTIFICATE/CERTIFICATE_3.png';
import CERTIFICATE_ICON_4 from '../../../../../assets/CERTIFICATE/CERTIFICATE_4.png';


// Constants:
import ROUTES from '../../../../router/routes';
import COLORS from '../../../../styles/colors';


// Styles:
import {
  Wrapper,
  CertificateWrapper,
  CertificateIcon,
  CertificateName,
  CertificateGlanceDetails,
} from './styles';


// Functions:
import timeAgo from '../../../../functions/time-ago';

const Certificate: ICertificate = (props) => {
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
        background={ TouchableNativeFeedback.Ripple(COLORS.MEDIUM_GREY, true) }
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
        onLongPress={
          () => console.log(456)
        }
      >
        <CertificateWrapper>
          <CertificateIcon source={ CERTIFICATE_ICON_1 } />
          <CertificateName>{ truncate(props.name, 45) }</CertificateName>
          <CertificateGlanceDetails>{ timeAgo.format(props.lastModified) }</CertificateGlanceDetails>
        </CertificateWrapper>
      </TouchableNativeFeedback>
    </Wrapper>
  );
};


// Exports:
export default Certificate;
