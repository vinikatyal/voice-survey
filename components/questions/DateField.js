import * as React from "react";

import PropTypes from "prop-types";

import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const QuestionTextField = styled(TextField)(({}) => ({}));

const QuestionDiv = styled("div")(({}) => ({}));

function DateField({ title, placeholder, _id }) {
  return (
    <QuestionDiv>
      <Typography component="h4">{title}</Typography>
      <TextField
        id={_id}
        placeholder={placeholder}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </QuestionDiv>
  );
}

DateField.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  _id: PropTypes.string,
};

export default DateField;
