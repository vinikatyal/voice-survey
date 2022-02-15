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

function SingleLineTextField({
  title,
  placeholder = "Please enter your response",
  _id,
}) {
  return (
    <QuestionDiv>
      <QuestionHeader>{title}</QuestionHeader>
      <QuestionTextField
        placeholder={placeholder}
        name={_id}
        id={_id}
      ></QuestionTextField>
    </QuestionDiv>
  );
}

SingleLineTextField.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  _id: PropTypes.string,
};

export default SingleLineTextField;
