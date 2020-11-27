// Imports:
import ROUTES from '../routes';
import { IHomeStackParams } from '../../views/Home/ts/interfaces';
import { IAddAssetStackParams } from '../../views/AddAsset/ts/interfaces';


// Exports:
export type RootStackParamList = {
  [ ROUTES.PIN ]: any;
  [ ROUTES.LOGIN ]: any;
  [ ROUTES.SIGNUP ]: any;
  [ ROUTES.HOME ]: IHomeStackParams;
  [ ROUTES.SEARCH ]: any;
  [ ROUTES.FOLDER_VIEW ]: any;
  [ ROUTES.ADD_ASSET ]: IAddAssetStackParams;
  [ ROUTES.FILE_VIEWER ]: any;
};
