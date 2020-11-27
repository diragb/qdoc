// Imports:
import { DARK, LIGHT } from '../';
import { ASSET } from '../';

// Exports:
export interface IThemeObject {
  DARK: typeof DARK;
  LIGHT: typeof LIGHT;
};

export interface IFSAsset {
  id: string;
  type: typeof ASSET.CERTIFICATE | typeof ASSET.CREDIT_CARD | typeof ASSET.DEBIT_CARD | typeof ASSET.DOCUMENT | typeof ASSET.FOLDER;
  name: string;
  fileExtension?: string;
  lastModified: number;
  creationTime: number;
  icon?: number;
  items?: IFSAsset[];
};

export interface IPinnedAsset {
  id: string;
  type: typeof ASSET.CERTIFICATE | typeof ASSET.CREDIT_CARD | typeof ASSET.DEBIT_CARD | typeof ASSET.DOCUMENT | typeof ASSET.FOLDER;
  name: string;
  fileExtension?: string;
  lastModified: number;
  icon?: number;
  itemsCount?: number;
  routeArray?: string[];
};
