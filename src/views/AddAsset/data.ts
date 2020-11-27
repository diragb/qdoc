// Typescript:
import { IFileType } from './ts/interfaces';


// Imports:
import CERTIFICATE_ICON from '../../../assets/CERTIFICATE/CERTIFICATE_1.png';
import CREDIT_CARD_ICON from '../../../assets/BANK_CARD/BANK_CARD_7.png';
import DEBIT_CARD_ICON from '../../../assets/BANK_CARD/BANK_CARD_1.png';
import DOCUMENT_ICON from '../../../assets/DOCUMENT/DOCUMENT_1.png';
import { ASSET } from '../../constants';


// Exports:
export const FileTypes: IFileType[] = [
  {
    icon: CERTIFICATE_ICON,
    name: "Certificate",
    type: ASSET.CERTIFICATE
  },
  {
    icon: CREDIT_CARD_ICON,
    name: "Credit Card",
    type: ASSET.CREDIT_CARD
  },
  {
    icon: DEBIT_CARD_ICON,
    name: "Debit Card",
    type: ASSET.DEBIT_CARD
  },
  {
    icon: DOCUMENT_ICON,
    name: "Document",
    type: ASSET.DOCUMENT
  },
];
