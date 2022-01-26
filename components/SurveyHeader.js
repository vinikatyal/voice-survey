import * as React from 'react'

import Image from 'next/image'
import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Container from '@mui/material/Container'
import { Button, Typography } from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

const AppBarCustom = styled(AppBar)(({}) => ({
  backgroundColor: '#fff',
  color: '#707070',
}))
const HeaderContainer = styled(Container)(({}) => ({
  color: '#707070',
  display: 'flex',
}))

const SurveyNameWrapped = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '19px 0',
  width: '40%',
})

const Nav = styled('div')(({}) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '60%',
}))

const NavItem = styled('div')(({ active }) => ({
  color: active ? '#0a23fb' : '#707070',
  marginLeft: '20px',
  marginRight: '20px',
  cursor: 'pointer',
  '&:hover': {
    color: '#0a23fb',
  },
}))

export default function Index() {
  return (
    <>
      <AppBarCustom position='sticky'>
        <HeaderContainer maxWidth='lg'>
          <SurveyNameWrapped>
            <ArrowBackIcon />
            <Typography variant='h4' ml={2} color='#00063e'>
              Survey's Name Here
            </Typography>
          </SurveyNameWrapped>
          <Nav>
            <NavItem active={true}>Create</NavItem>
            <KeyboardDoubleArrowRightIcon />
            <NavItem>Share</NavItem>
            <KeyboardDoubleArrowRightIcon />
            <NavItem>Report</NavItem>
          </Nav>
        </HeaderContainer>
      </AppBarCustom>
    </>
  )
}
