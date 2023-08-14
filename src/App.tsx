import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Box, Card, Divider, Sheet, Stack, Typography } from '@mui/joy';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CompoundForm from './components/form/CompoundForm';
import { makeStyles } from '@mui/styles';
import { formatSums } from './utils/helpers';
import SumsCard from './components/ui/SumsCard';
import { createTheme } from '@mui/material';
//-------------------------------------------------
interface ParentProps {
  sendDataToParent: (data: {
    futureValue: number;
    totalInterest: number;
  }) => void;
}

const useStyles = makeStyles({
  resultSheet: {
    width: '600px',
    margin: '0 auto', // Center the Sheet horizontally
    borderRadius: 10,
  },
  card: {
    width: '800px',
    // margin: '0 auto', // Center the Sheet horizontally
    margin: '20px auto', // Center the Sheet horizontally
  },
});

//-------------------------------------------------

function App() {
  const [futureValue, setFutureValue] = useState<number | string>('');
  const [totalInteres, setTotalInterest] = useState<number | string>('');
  const [totalDeposits, setTotalDeposits] = useState<number | string>('');

  const classes = useStyles();
  function handleFormData(data: {
    futureValue: number;
    totalInterest: number;
  }): void {
    const { futureValue, totalInterest } = data;
    // const formattedFutureValue = futureValue.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //removing 3rd digit after dcimal point

    const formattedFutureValue = formatSums(futureValue);
    const formattedTotalInterest = formatSums(totalInterest);
    const formatedTotalDeposits = formatSums(futureValue - totalInterest);

    setFutureValue(formattedFutureValue);
    setTotalInterest(formattedTotalInterest);
    setTotalDeposits(formatedTotalDeposits);
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
        <CompoundForm sendDataToParent={handleFormData} />
      </div>

      <SumsCard futureValue={futureValue}
    totalDeposits={totalDeposits}
    totalInteres={totalInteres}
    />
    </>
  );
}

export default App;
