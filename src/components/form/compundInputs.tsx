import React, { useState } from 'react';
import { Button, Input, Sheet, Typography } from '@mui/joy';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
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


export default function FromInput({ text = '', placeHolder = '', id = '' }) {
    const [principal, setPrincipal] = useState<string>('');

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
