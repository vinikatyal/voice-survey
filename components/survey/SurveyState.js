import React, { useReducer, useContext, createContext } from "react";

import produce from "immer";

const SurveyStateContext = createContext();
const SurveyDispatchContext = createContext();

const initialState = {
  surveyTitle: "",
  accessMembers: [],
  surveyType: "",
  questions: [
    {
      id: 1,
      question: "",
      answerTypeId: 1,
      expandStatus: true,
    },
  ],
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case "TITLE":
      draft.surveyTitle = action.value;
      break;

    case "MEMBERS":
      draft.accessMembers = action.value;
      break;

    case "TYPE":
      draft.surveyType = action.value;
      break;

    case "QUESTIONS":
      draft.questions = action.value;
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
