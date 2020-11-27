// Imports:
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../router/ts/types';
import ROUTES from '../../../../../router/routes';


// Exports:
export interface ICreditCardProps {
  navigation: StackNavigationProp<RootStackParamList, typeof ROUTES.HOME>;
  id: string;
  name: string;
  fileExtension: string;
  lastModified: number;
};
