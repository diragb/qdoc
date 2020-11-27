// Imports:
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../router/ts/types';
import ROUTES from '../../../router/routes';


// Exports:
export interface IHomeStackParams {
  fileUploadStatus: string | null;
};

export interface IHomeProps {
  route: RouteProp<RootStackParamList, typeof ROUTES.HOME>;
  navigation: StackNavigationProp<RootStackParamList, typeof ROUTES.HOME>;
};
