import React, { useReducer, useContext, createContext } from "react";

import produce from "immer";

const SurveyStateContext = createContext();
const SurveyDispatchContext = createContext();

const initialState = {
  surveyTitle: "",
  accessMembers: [],
  surveyType: "",
  surveyWelcomeText: "",
  questions: [
    {
      qid: 1,
      question: "",
      question_type: "text",
      required: false,
      expandStatus: true,
    },
  ],
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
