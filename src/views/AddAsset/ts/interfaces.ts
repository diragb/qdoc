// Imports:
import { ASSET } from "../../../constants";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../router/ts/types';
import ROUTES from '../../../router/routes';


// Exports:
export interface IAddAssetStackParams {
  URI: string;
  fileName: string;
  fileSize: number;
};

export interface IAddAssetProps {
  route: RouteProp<RootStackParamList, typeof ROUTES.ADD_ASSET>;
  navigation: StackNavigationProp<RootStackParamList, typeof ROUTES.ADD_ASSET>;
};

export interface IFileType {
  icon: any;
  name: string;
  type: typeof ASSET.CERTIFICATE | typeof ASSET.CREDIT_CARD | typeof ASSET.DEBIT_CARD | typeof ASSET.DOCUMENT | typeof ASSET.FOLDER;
};
