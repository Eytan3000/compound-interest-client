import { Box, Button, Input, Typography } from '@mui/joy'
import React from 'react'

export default function Footer() {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'  justifyContent='space-around' sx={{height:400, background: '#e3effb', marginTop:5 }}>
        <Box textAlign={'center'}>
            <Typography level='h3'>
                Newsletter
            </Typography>
            <Input sx={{margin:4}}/>
            <Button variant='soft'>Send</Button>
        </Box>
    </Box>
  )
}
