import React, { ChangeEvent, useState } from 'react';
import './App.css';
import {
  Box,
  Typography
} from '@mui/joy';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CompundForm from './components/form/CompundForm';
//-------------------------------------------------
//-------------------------------------------------

function App() {

  return (
    <>
    <ResponsiveAppBar />
      <Box display={'flex'} justifyContent={'center'} margin={10}>
        <Typography level="h1">Compound Interest Calculator</Typography>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CompundForm />
      </div>
      {/* <Typography>{`Total Interest: ${futureValue}`}</Typography> */}
      <Typography>{`How much you earned from compund interest`}</Typography>
      {/* <Typography>{`Total Future Value: ${totalInteres}`}</Typography> */}
    </>
  );
}

export default App;
