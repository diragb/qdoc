// Typescript:
import { TAction, TPayload } from '../../actions/ts/types';
import { TTheme } from "../../../constants/ts/types";

// Exports:
export interface IAction {
  type: TAction;
  payload: TPayload;
};

export interface IState {
  global: {
    theme: TTheme;
  };
};
