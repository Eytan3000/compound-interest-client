import React, { useState } from 'react';
import { Button, Input, Sheet, Typography } from '@mui/joy';
import { Grid } from '@mui/material';
import { calculateFutureValue } from '../../utils/helpers';

//-----------------------------------------------------------
type Event = React.ChangeEvent<HTMLInputElement>;
interface ParentProps {
  sendDataToParent: (data: {
    futureValue: number;
    totalInterest: number;
    futureValueArray:number[];
    yearsNum:number;
  }) => void;
  setSubmited:React.Dispatch<React.SetStateAction<boolean>>;
}

//-----------------------------------------------------------
export default function CompoundForm({ sendDataToParent, setSubmited }: ParentProps) {

  const [principal, setPrincipal] = useState<string>('');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    //destructuring returning elements from function that calculates the compound
    const { futureValue, totalInterest, futureValueArray } = calculateFutureValue(
      +principal,
      +monthlyContribution,
      +years,
      +interestRate
    );
      const yearsNum:number = +years;
    sendDataToParent({ futureValue, totalInterest, futureValueArray, yearsNum  }); //send to parent
    setSubmited(true); // sent from parent
  };

  const handleReset = () => {
    setPrincipal('');
    setMonthlyContribution('');
    setYears('');
    setInterestRate('');
  };

  const handleInputChange = (e: Event): void => {

    if (e.target.id === 'initial-investment') setPrincipal(e.target.value);
    if (e.target.id === 'monthly-contribution')
      setMonthlyContribution(e.target.value);
    if (e.target.id === 'years-to-grow') setYears(e.target.value);
    if (e.target.id === 'interest-rate') setInterestRate(e.target.value);
  };
  // const handleInputChange = (e: Event): void => {
  //   if (e.target.id === 'initial-investment') {
  //     const inputValue = e.target.value.replace(/,/g, ''); // Remove existing commas
  //     const numericValue = parseFloat(inputValue);
  //     if (!isNaN(numericValue)) {
  //       setPrincipal(numericValue.toLocaleString()); // Format with commas
  //     } else {
  //       setPrincipal(inputValue); // If not a valid number, set as is
  //     }
  //   } else if (e.target.id === 'monthly-contribution') {
  //           setMonthlyContribution(e.target.value); 
  
  //   }
  //     if (e.target.id === 'years-to-grow') setYears(e.target.value);
  //   if (e.target.id === 'interest-rate') setInterestRate(e.target.value);
  // };

  return (
    <Sheet variant="outlined" sx={{
      width: '600px',
      margin: '0 auto',
      borderRadius: 10,
}}>
      <form onSubmit={handleSubmit}>
        <Grid container direction={'column'}>

          {/* Inputs */}
          <Grid
            width={'600px'}
            item
            display={'flex'}
            justifyContent={'space-between'}
            marginY={4}>
            <Typography marginY={1} marginX={4}>
              Initial Investment
            </Typography>
            <Input
            // type='number'
            sx={{marginRight:2}}
              value={principal}
              id="initial-investment"
              placeholder="Example: 20,000"
              variant="outlined"
              color="primary"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            width={'600px'}
            item
            display={'flex'}
            justifyContent={'space-between'}
            marginY={4}>
            <Typography marginY={1} marginX={4}>
              Monthly Contribution
            </Typography>
            <Input
              value={monthlyContribution}
              id="monthly-contribution"
              placeholder="Example: 1200"
              variant="outlined"
              color="primary"
              sx={{marginRight:2}}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            width={'600px'}
            item
            display={'flex'}
            justifyContent={'space-between'}
            marginY={4}>
            <Typography marginY={1} marginX={4}>
              Years to Grow
            </Typography>
            <Input
              value={years}
              id="years-to-grow"
              placeholder="Example: 15"
              variant="outlined"
              color="primary"
              sx={{marginRight:2}}              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            width={'600px'}
            item
            display={'flex'}
            justifyContent={'space-between'}
            marginY={4}>
            <Typography marginY={1} marginX={4}>
              Estimated Interest Rate (%)
            </Typography>
            <Input
              value={interestRate}
              id="interest-rate"
              placeholder="Example: 7"
              variant="outlined"
              color="primary"
              sx={{marginRight:2}}              onChange={handleInputChange}
            />
          </Grid>

          {/* Buttons */}
          <Grid
            item
            xs={12}
            padding={2}
            display="flex"
            justifyContent="flex-end">
            <Button
              color="warning"
              sx={{ marginX: '8px' }}
              onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Sheet>
  );
}
