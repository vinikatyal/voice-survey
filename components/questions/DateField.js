import * as React from "react";

import PropTypes from "prop-types";

import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

const QuestionTextField = styled(TextField)(({}) => ({}));

const QuestionDiv = styled("div")(({}) => ({}));

const QuestionHeader = styled("h2")(({}) => ({
  fontSize: "28px",
  color: "#00063e",
}));

function DateField({ title, _id }) {
  return (
    <QuestionDiv>
      <QuestionHeader>{title}</QuestionHeader>
      <TextField id={_id} name={_id} type="date" />
    </QuestionDiv>
  );
}

DateField.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  _id: PropTypes.string,
};

export default DateField;
