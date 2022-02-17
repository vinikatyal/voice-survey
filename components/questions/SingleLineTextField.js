import * as React from "react";

import PropTypes from "prop-types";

import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

const QuestionTextField = styled(TextField)(({}) => ({}));

const QuestionDiv = styled("div")(({}) => ({}));


function SingleLineTextField({
  placeholder = "Please enter your response",
  _id,
}) {
  return (
    <QuestionDiv>
      <QuestionTextField
        placeholder={placeholder}
        name={_id}
        id={_id}
      ></QuestionTextField>
    </QuestionDiv>
  );
}

SingleLineTextField.propTypes = {
  placeholder: PropTypes.string,
  _id: PropTypes.string,
};

export default SingleLineTextField;
