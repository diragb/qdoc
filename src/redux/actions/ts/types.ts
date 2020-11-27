// Typescript:
import { TOGGLE_THEME } from '../../action-types';
import { TTheme } from "../../../constants/ts/types";

// Exports:
export type TAction = typeof TOGGLE_THEME;
export type TPayload = TTheme;
