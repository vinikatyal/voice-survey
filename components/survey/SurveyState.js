import React, { useReducer, useContext, createContext } from "react";

const SurveyStateContext = createContext();
const SurveyDispatchContext = createContext();

// const initialState = {
//   surveyTitle: "",
//   accessMembers: [],
// };

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "TITLE":
      return {
        ...state,
        surveyTitle: action.value,
      };
    case "MEMBERS":
      return {
        ...state,
        accessMembers: action.value,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const SurveyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    surveyTitle: "",
    accessMembers: [],
  });
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
