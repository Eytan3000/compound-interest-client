import React, { useState } from 'react';
import { Button, Input, Sheet, Typography, Alert, Theme, Grid } from '@mui/joy';
//  import Grid from '@mui/system/Unstable_Grid';
// import { Grid } from '@mui/material';
import { calculateFutureValue } from '../../utils/helpers';
import WarningIcon from '@mui/icons-material/Warning';
import { postDataToDb } from '../../utils/database';
import { useDispatch, useSelector } from 'react-redux';
import { formActions, sumsValuesActions } from '../../store';
//-----------------------------------------------------------
type Event = React.ChangeEvent<HTMLInputElement>;

interface ParentProps {
  sendDataToParent: (data: {
    futureValue: number;
    totalInterest: number;
    futureValueArray: number[];
    yearsNum: number;
  }) => void;
  setSubmited: React.Dispatch<React.SetStateAction<boolean>>;
  setDataPosted: React.Dispatch<React.SetStateAction<boolean>>;
}

//-----------------------------------------------------------
export default function CompoundForm({
  sendDataToParent,
  setSubmited,
  setDataPosted,
}: ParentProps) {
  // const [principal, setPrincipal] = useState<string>('');
  // const [monthlyContribution, setMonthlyContribution] = useState<string>('');
  // const [years, setYears] = useState<string>('');
  // const [interestRate, setInterestRate] = useState<string>('');

  const [emptyField, setEmptyField] = useState<boolean>(false);

  //--
  const dispatch = useDispatch();
  const reduxPrincipal = useSelector((state: any) => state.form.principal);
  const reduxMonthlyContribution = useSelector((state: any) => state.form.monthlyContribution);
  const reduxYears = useSelector((state: any) => state.form.years);
  const reduxInterestRate = useSelector((state: any) => state.form.interestRate);

  const reduxFutureValue = useSelector((state: any) => state.sumsValues.futureValue);
  // const reduxTotalInterest = useSelector((state: any) => state.sumsValues.totalInterest);
  // const reduxFutureValueArray = useSelector((state: any) => state.sumsValues.futureValueArray);
  //--
  const sheetStyles = (theme: Theme) => ({
    padding: 3,
    margin: '0 auto',
    borderRadius: 10,
    [theme.breakpoints.up('xs')]: {
      width: '300px',
    },
    [theme.breakpoints.up('md')]: {
      width: '450px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '600px',
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (
      reduxPrincipal === '' ||
      reduxMonthlyContribution === '' ||
      reduxYears === '' ||
      reduxInterestRate === ''
    ) {
      setEmptyField(true);
      return;
    }

    setEmptyField(false);

    //destructuring returning elements from function that calculates the compound
    const { futureValue, totalInterest, futureValueArray } =
      calculateFutureValue(
        +reduxPrincipal,
        +reduxMonthlyContribution,
        +reduxYears,
        +reduxInterestRate
      );
    const yearsNum: number = +reduxYears;

    sendDataToParent({
      futureValue,
      totalInterest,
      futureValueArray,
      yearsNum,
    }); //send to parent
    dispatch(sumsValuesActions.setReduxfutureValue(futureValue));

    setSubmited(true); // sent from parent

    postDataToDb(
      reduxPrincipal,
      reduxMonthlyContribution,
      yearsNum,
      +reduxInterestRate,
      futureValue
    ).then((res) => {
      if (res) {
        // render sums card
        setDataPosted((prev) => {
          return !prev;
        });
      }
    });
  };

  const handleReset = () => {
    // setPrincipal('');
    // setMonthlyContribution('');
    dispatch(formActions.setReduxPrincipal(''));
    dispatch(formActions.setReduxMonthlyContribution(''));
    dispatch(formActions.setReduxYears(''));
    dispatch(formActions.setReduxInterestRate(''));

    setEmptyField(false);
  };

  const handleInputChange = (e: Event): void => {
    setEmptyField(false);
    if (e.target.id === 'initial-investment') {
      // setPrincipal(e.target.value);
      dispatch(formActions.setReduxPrincipal(e.target.value));
    }
    if (e.target.id === 'monthly-contribution') dispatch(formActions.setReduxMonthlyContribution(e.target.value));
    if (e.target.id === 'years-to-grow')  dispatch(formActions.setReduxYears(e.target.value));
    if (e.target.id === 'interest-rate') dispatch(formActions.setReduxInterestRate(e.target.value));
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
    <>
      <Sheet variant="outlined" sx={sheetStyles}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            columns={16}
            sx={{ flexGrow: 1 }}
            rowSpacing={{ xs: 2, md: 5 }}>
            <Grid xs={10} mt={1.5}>
              <Typography marginY={1} marginX={4}>
                Initial Investment
              </Typography>
            </Grid>
            <Grid xs={6} mt={1.5}>
              <Input
                type="number"
                sx={{ marginRight: 2, height: '100%' }}
                value={reduxPrincipal}
                id="initial-investment"
                placeholder="Example: 20,000"
                variant="outlined"
                color="primary"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={10} mt={1.5}>
              <Typography marginY={1} marginX={4}>
                Monthly Contribution
              </Typography>
            </Grid>
            <Grid xs={6} mt={1.5}>
              <Input
                type="number"
                value={reduxMonthlyContribution}
                id="monthly-contribution"
                placeholder="Example: 1200"
                variant="outlined"
                color="primary"
                sx={{ marginRight: 2, height: '100%' }}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={10} mt={1.5}>
              <Typography marginY={1} marginX={4}>
                Years to Grow
              </Typography>
            </Grid>
            <Grid xs={6} mt={1.5}>
              <Input
                type="number"
                value={reduxYears}
                id="years-to-grow"
                placeholder="Example: 15"
                variant="outlined"
                color="primary"
                sx={{ marginRight: 2, height: '100%' }}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={10} mt={1.5}>
              <Typography marginY={1} marginX={4}>
                Estimated Interest Rate (%)
              </Typography>
            </Grid>
            <Grid xs={6} mt={1.5}>
              <Input
                type="number"
                value={reduxInterestRate}
                id="interest-rate"
                placeholder="Example: 7"
                variant="outlined"
                color="primary"
                sx={{ marginRight: 2, height: '100%' }}
                onChange={handleInputChange}
              />
            </Grid>
            {/* Buttons */}
            <Grid xs={10} mt={1.5}></Grid>
            <Grid xs={6} padding={2} display="flex" justifyContent="flex-end">
              <Button
                color="warning"
                sx={{ marginX: '8px' }}
                onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </Grid>
          </Grid>
          {emptyField && (
            <Alert
              sx={{ marginTop: 4 }}
              startDecorator={<WarningIcon />}
              variant="soft"
              color="danger">
              No empty fields are allowed{' '}
            </Alert>
          )}
        </form>
      </Sheet>
    </>
  );
}
