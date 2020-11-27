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
import { IFolder } from './ts/types';


// Imports:
import EMPTY_FOLDER_ICON from '../../../../../assets/FOLDER/EMPTY_FOLDER.png';
import FULL_FOLDER_ICON from '../../../../../assets/FOLDER/FULL_FOLDER.png';


// Constants:
import COLORS from '../../../../styles/colors';
import ROUTES from '../../../../router/routes';


// Styles:
import {
  Wrapper,
  FolderWrapper,
  FolderIcon,
  FolderName,
  FolderGlanceDetails,
} from './styles';


// Functions:
import timeAgo from '../../../../functions/time-ago';

const Folder: IFolder = (props) => {
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
            props.navigation.push(ROUTES.FOLDER_VIEW, {
              name: props.name,
              routeArray: props.routeArray
            });
          }
        }
      >
        <FolderWrapper>
          <FolderIcon source={ FULL_FOLDER_ICON } />
          <FolderName>{ truncate(props.name, 45) }</FolderName>
          <FolderGlanceDetails>{ timeAgo.format(props.lastModified) }, { (props.itemsCount === undefined || props.itemsCount === 0) ? '' : props.itemsCount > 1 ? `${ props.itemsCount } items` : `${ props.itemsCount } item` }</FolderGlanceDetails>
        </FolderWrapper>
      </TouchableNativeFeedback>
    </Wrapper>
  );
};


// Exports:
export default Folder;
