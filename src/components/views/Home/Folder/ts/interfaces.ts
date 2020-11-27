// Imports:
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../router/ts/types';
import ROUTES from '../../../../../router/routes';


// Exports:
export interface IFolderProps {
  navigation: StackNavigationProp<RootStackParamList, typeof ROUTES.HOME>;
  name: string;
  lastModified: number;
  itemsCount: number;
  routeArray: string[];
};
