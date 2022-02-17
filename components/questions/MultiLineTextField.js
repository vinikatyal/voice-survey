import * as React from "react";

import PropTypes from "prop-types";

import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const QuestionTextField = styled(TextField)(({}) => ({}));

const QuestionDiv = styled("div")(({}) => ({}));

function MultiLineTextField({
  placeholder = "Please enter your response",
  _id,
}) {
  return (
    <QuestionDiv>
      <QuestionTextField
        placeholder={placeholder}
        name={_id}
        id={_id}
        multiline
      ></QuestionTextField>
    </QuestionDiv>
  );
}

MultiLineTextField.propTypes = {
  placeholder: PropTypes.string,
  _id: PropTypes.string,
};

export default MultiLineTextField;
