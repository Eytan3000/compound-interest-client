import React, { ChangeEvent, useState } from 'react';
import './App.css';
import {
  Box,
  Typography
} from '@mui/joy';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CompoundForm from './components/form/CompoundForm';
//-------------------------------------------------
interface ParentProps {
  sendDataToParent: (data: { futureValue: string; totalInterest: string }) => void;
}
//-------------------------------------------------



function App() {
  const [futureValue, setFutureValue] = useState<string>('');
  const [totalInteres, setTotalInterest] = useState<string>('');

  function handleFormData(data : {futureValue:string, totalInterest:string}):void{
      const {futureValue, totalInterest} = data;
      setFutureValue(futureValue);
      setTotalInterest(totalInterest);
  }

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
        <CompoundForm sendDataToParent={handleFormData}/>
      </div>
      <Typography>{`Total Interest: ${futureValue} (How much you earned from compund interest)`}</Typography>
      {/* <Typography>{`Total deposits: ${}`}</Typography> */}
      <Typography>{`Total Future Value: ${totalInteres}`}</Typography>
    </>
  );
}

export default App;
