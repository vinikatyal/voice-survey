import * as React from 'react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'

const PrimaryButton = styled(Button)(({ width, bgColor, bgHoverColor, fullWidth, borderRadius }) => ({
  width: fullWidth ? '' : width ? width + 'px' : '160px',
  height: '40px',
  borderRadius: borderRadius? borderRadius: '4px',
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
