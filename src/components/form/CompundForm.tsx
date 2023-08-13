import React, { useState } from 'react';
import { Button, Input, Sheet, Typography } from '@mui/joy';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import FromInput from './compundInputs';

//-----------------------------------------------------------
type Event = React.ChangeEvent<HTMLInputElement>;

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

//-----------------------------------------------------------
export default function CompundForm() {
  console.log('loaded');
  const classes = useStyles();

  //   const [formData, setFormData] = useState<FormData>({
  //     principal: '0',
  //     monthlyCont: '0',
  //     years: '0',
  //     iRate: '0',
  //   });

  const [principal, setPrincipal] = useState<string>('');

  const [futureValue, setFutureValue] = useState<string>('');
  const [totalInteres, setTotalInterest] = useState<string>('');

  const handleSubmit = () => {
    console.log('handleSubmit');
  };

  const handleInputChange = (e: Event) => {
    console.log(e.target.value);
    const input = e.target.value;
    // if (e.target.id === 'initial-investment') setPrincipal(e.target.value);
    setPrincipal(input);
    // console.log(formData)
    //   if(e.target.id === "monthly-contribution")
    //   if(e.target.id === "years-to-grow")
    //   if(e.target.id === "interest-rate")
  };


  return (
    <Sheet variant="outlined" className={classes.mainSheet}>
      <form onSubmit={handleSubmit}>
        <Grid container direction={'column'}>
          <FromInput
            text="Initial Investment"
            placeHolder="Example: 20,000"
            id="initial-investment"
          />
          <FromInput
            text="Monthly Contribution"
            placeHolder="Example: 1200"
            id="monthly-contribution"
          />
          <FromInput
            text="Years to Grow"
            placeHolder="Example: 15"
            id="years-to-grow"
          />
          <FromInput
            text="Estimated Interest Rate (%)"
            placeHolder="Example: 7"
            id="interest-rate"
          />

          <Grid
            item
            xs={12}
            padding={2}
            display="flex"
            justifyContent="flex-end">
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Sheet>
  );
}
