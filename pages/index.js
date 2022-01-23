import * as React from 'react'

import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import { Button } from '@mui/material'
import Limiter from '../components/Limiter'
import Link from 'next/link'

const FullBackground = styled(Box)(({ theme }) => ({
  height: '100vh',
  backgroundColor: '#f7fafc',
}))
export default function Index() {
  return (
    <Layout H1={1}>
      <Limiter>
        <Link href='/login' passHref>
          <Button variant='contained'>Take me to Login Page</Button>
        </Link>
      </Limiter>
    </Layout>
  )
}
