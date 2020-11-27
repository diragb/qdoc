// Packages:
import { useAsyncStorage } from '@react-native-community/async-storage';


// Typescript:
import { IToggleTheme } from "./ts/interfaces";

// Constants:
import { TOGGLE_THEME } from "../action-types";
import { FILE_STRUCTURE } from '../../constants/async-storage';


// Effects:
const { getItem: getASFS, setItem: setASFS } = useAsyncStorage(FILE_STRUCTURE);


// Exports:
export const toggleTheme: IToggleTheme = (payload) => {
  return { type: TOGGLE_THEME, payload };
};
