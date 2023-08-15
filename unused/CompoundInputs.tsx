import React from 'react';
import { Input, Typography } from '@mui/joy';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

//---------------------------------------------
type Event = React.ChangeEvent<HTMLInputElement>;
interface ChildComponentProps {
  text: string;
  placeHolder: string;
  id: string;
  setPrincipal: React.Dispatch<React.SetStateAction<string>>;
  setMonthlyContribution: React.Dispatch<React.SetStateAction<string>>;
  setYears: React.Dispatch<React.SetStateAction<string>>;
  setInterestRate: React.Dispatch<React.SetStateAction<string>>;
  value?: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles({
  FormComponent2_input: {
    width: '200px',
    marginRight: 20,
  },
  mainSheet: {
    width: '600px',
    margin: '0 auto', // Center the Sheet horizontally
    borderRadius: 10,
  },
  input: {
    width: '600px',
  },
});
//---------------------------------------------
export default function FromInput({
  text,
  placeHolder,
  id,
  setPrincipal,
  setMonthlyContribution,
  setYears,
  setInterestRate,
}: ChildComponentProps) {

  const handleInputChange = (e: Event): void => {
    if (e.target.id === 'initial-investment') setPrincipal(e.target.value);
    if (e.target.id === 'monthly-contribution')
      setMonthlyContribution(e.target.value);
    if (e.target.id === 'years-to-grow') setYears(e.target.value);
    if (e.target.id === 'interest-rate') setInterestRate(e.target.value);
  };

  const classes = useStyles();
  return (
    <Grid
      className={classes.input}
      item
      display={'flex'}
      justifyContent={'space-between'}
      marginY={4}>
      <Typography marginY={1} marginX={4}>
        {text}
      </Typography>
      <Input
        id={id}
        placeholder={placeHolder}
        variant="outlined"
        color="primary"
        className={classes.FormComponent2_input}
        onChange={handleInputChange}
      />
    </Grid>
  );
}
