import * as React from 'react'

import Image from 'next/image'

import logo from '../../images/logo.png'
import styled from '@emotion/styled'
import Layout from '../../components/Layout'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import Typography from '@mui/material/Typography'

import Limiter from '../../components/Limiter'

const ImageContainer = styled(Box)({
  paddingTop: '30px',
  display: 'flex',
  justifyContent: 'center',
})
const DetailHeader = styled(Typography)({
  marginTop: '30px',
  padding: '19px 0',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#f5f8ff',
  fontFamily: 'Poppins',
  fontSize: '24px',
  fontWeight: '600',
})

const LogoSection = styled(Box)({
  height: '173px',
  margin: '40px',
  display: ' flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})
const LogoHeading = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '16px',
  fontWeight: '500',
})
const LogoInputSection = styled(Box)({
  width: '140px',
  height: '140px',
  margin: '10px 47px 0',
  borderRadius: '8px',
  border: 'dotted 2px #0a23fb',
  backgroundColor: '#f5f8ff',
  display: 'flex ',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '25px',
})

const LogoAddButton = styled(Fab)({
  height: '10px',
  width: '36px',
})
const NextSection = styled('div')({
  display: ' flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const NextButton = styled(Button)({
  width: '160px',
  height: '46px',
  margin: '30px 620px 0',
  padding: '10.9px 60px 10.1px',
  objectFit: 'contain',
  borderRadius: '4px',
  background: 'linear-gradient(to left, #556df2, #3932be)',
  '&:hover': {
    background: 'linear-gradient(to left, #3932be, #556df2)',
  },
})

export default function Index() {
  return (
    <Layout>
      <Limiter>
        <ImageContainer>
          <Image src={logo} alt='background' />
        </ImageContainer>
      </Limiter>
      <DetailHeader>Add Details</DetailHeader>

      <Limiter>
        <LogoSection>
          <LogoHeading>Select any png.svg or jpg file</LogoHeading>
          <LogoInputSection>
            <LogoAddButton color='primary' variant='contained'>
              <Typography fontSize={28}>+</Typography>
            </LogoAddButton>
            <Typography fontSize={18} color={'#0a23fb'}>
              Add Logo
            </Typography>
          </LogoInputSection>
        </LogoSection>
        <NextSection>
          <NextButton variant='contained'> next</NextButton>
        </NextSection>
      </Limiter>
    </Layout>
  )
}
