import * as React from "react";

import PropTypes from "prop-types";

import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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
        InputProps={{
          endAdornment: (
            <InputAdornment position={"end"}>
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <CalendarTodayIcon />
              </IconButton>
            </InputAdornment>
          ),
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
