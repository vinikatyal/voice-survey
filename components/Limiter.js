import * as React from 'react'
import styled from '@emotion/styled'

const LimitItems = styled('div')({
  width: '1200px',
  margin: 'auto',
})

export default function Limiter({ children }) {
  return <LimitItems>{children}</LimitItems>
}
