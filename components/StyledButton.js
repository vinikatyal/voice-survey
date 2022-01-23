import * as React from 'react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'

const PrimaryButton = styled(Button)(({ width, bgColor, bgHoverColor }) => ({
  width: width ? width + 'px' : '160px',
  height: '46px',
  margin: '30px 620px 0',
  padding: '10.9px 60px 10.1px',
  objectFit: 'contain',
  borderRadius: '4px',
  background: bgColor ? bgColor : 'linear-gradient(to left, #556df2, #3932be)',
  '&:hover': {
    background: bgHoverColor ? bgHoverColor : 'linear-gradient(to left, #3932be, #556df2)',
  },
}))

export default function StyledButton(props) {
  return (
    <PrimaryButton variant='contained' {...props}>
      {props.children}
    </PrimaryButton>
  )
}
