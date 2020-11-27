// Typescript:
import { IAction, IState } from "./ts/interfaces";


// Constants:
import { TOGGLE_THEME } from "../action-types";
import { THEME } from "../../constants";


const initialState: IState = {
  global: {
    theme: THEME.LIGHT,
  }
};


// Functions:
const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        global: {
          theme: action.payload,
        },
      };
    default:
      return state;
  }
};


// Exports:
export default reducer;
