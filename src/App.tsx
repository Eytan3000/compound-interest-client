import React, { useState } from 'react';
import './App.css';
import { Box, Container, Typography } from '@mui/joy';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CompoundForm from './components/form/CompoundForm';
import { formatSums } from './utils/helpers';
import SumsCard from './components/ui/SumsCard';
import axios from 'axios';
import News from './news/News';
import HpArticle from './news/HpArticle';
//-------------------------------------------------
type FormData = {
  futureValue: number;
  totalInterest: number;
  futureValueArray: number[];
  yearsNum: number;
}

//-------------------------------------------------

function App() {
  const [futureValue, setFutureValue] = useState<string>('');
  const [totalInteres, setTotalInterest] = useState<number | string>('');
  const [totalDeposits, setTotalDeposits] = useState<number | string>('');
  const [futureValueArray, setfutureValueArray] = useState<number[]>([]);
  const [years, setYears] = useState<number>(0);

  const [submited, setSubmited] = useState<boolean>(false);

  function handleFormData(data: FormData): void {
    const { futureValue, totalInterest, futureValueArray, yearsNum } = data;

    const formattedFutureValue = formatSums(futureValue);
    const formattedTotalInterest = formatSums(totalInterest);
    const formatedTotalDeposits = formatSums(futureValue - totalInterest);

    setFutureValue(formattedFutureValue);
    setTotalInterest(formattedTotalInterest);
    setTotalDeposits(formatedTotalDeposits);
    setfutureValueArray(futureValueArray);
    setYears(yearsNum);
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
        <CompoundForm sendDataToParent={handleFormData} setSubmited={setSubmited}/>
      </div>

      {submited && (
        <SumsCard
          futureValue={futureValue}
          totalDeposits={totalDeposits}
          totalInteres={totalInteres}
          futureValueArray={futureValueArray}
          years={years}
        />
      )}
      <News />
      <HpArticle />
      
    </>
  );
}

export default App;
