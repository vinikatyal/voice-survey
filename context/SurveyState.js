import React, { useReducer, useContext, createContext } from "react";

import produce from "immer";

import theme1 from "../images/themes/theme1.png";
import theme2 from "../images/themes/theme2.png";
import theme3 from "../images/themes/theme3.png";

const SurveyStateContext = createContext();
const SurveyDispatchContext = createContext();

const initialState = {
  surveyTitle: "",
  accessMembers: [],
  surveyType: "",
  surveyWelcomeText: "",
  themes: [
    {
      id: 1,
      theme: theme1,
      name: "BLUE",
      themeName: "Theme Blue",
      color: "linear-gradient(to right, #1EA798, #2D4C93)!important;",
    },
    {
      id: 2,
      theme: theme2,
      name: "PINK",
      themeName: "Theme Pink",
      color: "linear-gradient(to right, #EC2E89, #9540E4)!important;",
    },
    {
      id: 3,
      theme: theme3,
      name: "YELLOW",
      themeName: "Theme Yellow",
      color: "linear-gradient(to right, #350F69, #BA824C)!important;",
    },
  ],
  questions: [
    {
      qid: 1,
      question: "",
      question_type: "text",
      required: false,
      expandStatus: true,
    },
  ],
  selectedSurveyTheme: {
    id: 1,
    theme: theme1,
    themeName: "BLUE",
    color: "linear-gradient(to right, #1EA798, #2D4C93)!important;",
  },
  previousSurveyType: null,
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case "SET_TITLE":
      draft.surveyTitle = action.value;
      break;

    case "SET_MEMBERS":
      draft.accessMembers = action.value;
      break;

    case "SET_TYPE":
      draft.surveyType = action.value;
      break;
    case "SET_WELCOME_TEXT":
      draft.surveyWelcomeText = action.value;
      break;

    case "SET_QUESTIONS":
      draft.questions = action.value;
      break;
    case "SET_PREV_SURVEYTYPE":
      draft.previousSurveyType = action.value;
      break;

    case "SET_THEME":
      draft.selectedSurveyTheme = action.value;
      break;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
});

export const SurveyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SurveyDispatchContext.Provider value={dispatch}>
      <SurveyStateContext.Provider value={state}>
        {children}
      </SurveyStateContext.Provider>
    </SurveyDispatchContext.Provider>
  );
};

export const useSurvey = () => useContext(SurveyStateContext);
export const useDispatchSurvey = () => useContext(SurveyDispatchContext);
