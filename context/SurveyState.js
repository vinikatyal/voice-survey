import React, { useReducer, useContext, createContext } from "react";

import produce from "immer";

import dayjs from "dayjs";

import theme1 from "../images/themes/theme1.png";
import theme2 from "../images/themes/theme2.png";
import theme3 from "../images/themes/theme3.png";

const SurveyStateContext = createContext();
const SurveyDispatchContext = createContext();

const initialState = {
  userEmail: "",
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
  questionTypeList: [
    { id: 1, label: "Textfield", value: "text" },
    { id: 2, label: "Description", value: "description" },
    { id: 3, label: "Email", value: "email" },
    { id: 4, label: "Phone number", value: "contact" },
    { id: 5, label: "Date picker", value: "date_picker" },
    { id: 6, label: "Voice", value: "audio" },
  ],
  questions: [
    {
      qid: 0,
      question: "",
      question_type: "text",
      required: false,
      expandStatus: true,
    },
  ],
  selectedSurveyTheme: {
    id: 1,
    theme: theme1,
    name: "BLUE",
    themeName: "Theme Blue",
    color: "linear-gradient(to right, #1EA798, #2D4C93)!important;",
  },
  surveyUserName: "",
  previousSurveyType: null,
  surveyEditId: null,
  surveyShareLink: "",
  surveyCreatedDate: dayjs().subtract(30, "days").startOf("day").toDate(),
  startDate: dayjs().subtract(30, "days").startOf("day").toDate(),
  endDate: dayjs().endOf("day").toDate(),
  reportStats: {},
  reportData: [],
  quesReportData: [],
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case "SET_USER_EMAIL":
      draft.userEmail = action.value;
      break;
    case "SET_TITLE":
      draft.surveyTitle = action.value;
      break;

    case "SET_MEMBERS":
      draft.accessMembers = action.value;
      break;

    case "SET_TYPE":
      draft.surveyType = action.value;
      break;
    case "SET_CREATE_DATE":
      draft.surveyCreatedDate = action.value;
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
    case "SET_SURVEY_EDIT_ID":
      draft.surveyEditId = action.value;
      break;
    case "SET_SURVEY_SHARE_LINK":
      draft.surveyShareLink = action.value;
      break;
    case "SET_SURVEY_USER_NAME":
      draft.surveyUserName = action.value;
      break;
    case "SET_START_DATE":
      draft.startDate = action.value;
      break;
    case "SET_END_DATE":
      draft.endDate = action.value;
      break;
    case "SET_REPORT_STATS":
      draft.reportStats = action.value;
      break;
    case "SET_REPORT_DATA":
      draft.reportData = action.value;
      break;

    case "SET_QUESTION_REPORT_DATA":
      draft.quesReportData = action.value;
      break;
    case "RESET_SURVEY":
      {
        draft.surveyTitle = "";
        draft.accessMembers = [];
        draft.surveyEditId = null;
        draft.surveyType = "";
        draft.surveyWelcomeText = "";
        draft.questions = [
          {
            qid: 0,
            question: "",
            question_type: "text",
            required: false,
            expandStatus: true,
          },
        ];
        draft.selectedSurveyTheme = {
          id: 1,
          theme: theme1,
          name: "BLUE",
          themeName: "Theme Blue",
          color: "linear-gradient(to right, #1EA798, #2D4C93)!important;",
        };
        draft.previousSurveyType = null;
        draft.surveyCreatedDate = dayjs()
          .subtract(30, "days")
          .startOf("day")
          .toDate();
        draft.startDate = dayjs().subtract(30, "days").startOf("day").toDate();
        draft.endDate = dayjs().endOf("day").toDate();
        draft.reportData = [];
        draft.reportStats = {};
      }
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
