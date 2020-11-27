// Typescript:
import { TOGGLE_THEME } from '../../action-types';
import { TTheme } from "../../../constants/ts/types";

// Exports:
export interface IToggleTheme {
  (payload: TTheme): {
    type: typeof TOGGLE_THEME;
    payload: TTheme;
  };
};
