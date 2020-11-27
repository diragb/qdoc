// Packages:
import React from 'react';
// import { Dispatch } from "redux";
import { connect } from "react-redux";
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
import { IState } from '../../../../redux/reducers/ts/interfaces';
import { IDocument } from './ts/types';


// Imports:
import DOCUMENT_1_ICON from '../../../../../assets/DOCUMENT/DOCUMENT_1.png';
import DOCUMENT_2_ICON from '../../../../../assets/DOCUMENT/DOCUMENT_2.png';
import DOCUMENT_3_ICON from '../../../../../assets/DOCUMENT/DOCUMENT_3.png';


// Constants:
import ROUTES from '../../../../router/routes';
import COLORS from '../../../../styles/colors';


// Styles:
import {
  Wrapper,
  DocumentWrapper,
  DocumentIcon,
  DocumentName,
  DocumentGlanceDetails,
} from './styles';


// Redux:
// import { toggleTheme } from "../../../../actions";

// const mapStateToProps = (state: IState) => {
//   // Return:
//   return {
//     theme: state.global.theme,
//   };
// };

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     toggleTheme: (newTheme: TTheme) => dispatch(toggleTheme(newTheme)),
//   };
// };


// Functions:
import timeAgo from '../../../../functions/time-ago';

const Document: IDocument = (props) => {
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
        <DocumentWrapper>
          <DocumentIcon source={ DOCUMENT_1_ICON } />
          <DocumentName>{ truncate(props.name, 45) }</DocumentName>
          <DocumentGlanceDetails>{ timeAgo.format(props.lastModified) }</DocumentGlanceDetails>
        </DocumentWrapper>
      </TouchableNativeFeedback>
    </Wrapper>
  );
};


// Exports:
export default connect(null, null)(Document);
