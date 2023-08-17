import React, { useState } from 'react';
import './App.css';
import { Box, Container, Theme, Typography, styled } from '@mui/joy';
import ResponsiveAppBar from './components/ui/ResponsiveAppBar';
import CompoundForm from './components/form/CompoundForm';
import { formatSums } from './utils/helpers';
import SumsCard from './components/ui/SumsCard';
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

const titleStyles = (theme:Theme) => ({
  [theme.breakpoints.up('xs')]: {
    fontSize: '24px', // Adjust the font size for small to medium screens
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '24px', // Font size for medium to large screens
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '36px', // Font size for large screens
  },
})
const titleBoxStyles = (theme:Theme) => ({
  [theme.breakpoints.up('xs')]: {
    margin:3,
  },
  [theme.breakpoints.up('lg')]: {
    margin:10,
  },
})

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
      <Box display={'flex'} justifyContent={'center'} textAlign={'center'} sx={titleBoxStyles}>
        <Typography level="h1" 
              sx={titleStyles}
        >Compound Interest Calculator</Typography>
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
