import * as React from "react";

import PropTypes from "prop-types";

import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

const QuestionTextField = styled(TextField)(({}) => ({}));

const QuestionDiv = styled("div")(({}) => ({}));

function DateField({ _id }) {
  return (
    <QuestionDiv>
      <QuestionTextField id={_id} name={_id} type="date" />
    </QuestionDiv>
  );
}

DateField.propTypes = {
  _id: PropTypes.string,
};

export default DateField;
