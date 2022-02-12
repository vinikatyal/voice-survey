import * as React from "react";

import PropTypes from "prop-types";

import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const QuestionTextField = styled(TextField)(({}) => ({}));

const QuestionDiv = styled("div")(({}) => ({}));

function EmailTextField({ title, placeholder, _id }) {
  return (
    <QuestionDiv>
      <Typography component="h4">{title}</Typography>
      <QuestionTextField
        placeholder={placeholder}
        name={_id}
        type="email"
      ></QuestionTextField>
    </QuestionDiv>
  );
}

EmailTextField.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  _id: PropTypes.string,
};

export default EmailTextField;
