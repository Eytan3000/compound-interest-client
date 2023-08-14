import React, { ChangeEvent, useState } from 'react';
import { Box, Card, Divider, Sheet, Stack, Typography } from '@mui/joy';
import { makeStyles } from '@mui/styles';
import BasicLineChart from './Chart';

//-------------------------------------------------

interface Props{
    futureValue : number | string;
    totalDeposits : number| string;
    totalInteres : number| string;
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
export default function SumsCard({
    futureValue,
    totalDeposits,
    totalInteres
}:Props) {
    const classes = useStyles();
    
  return (
    <Card className={classes.card} size="lg" variant="outlined">
        {/* Sums */}
        <Sheet
          color="primary"
          variant="soft"
          sx={{ margin: 1, padding: 3, borderRadius: 8 }}>
          <Box
            width="30%"
            display="column"
            justifyContent="center"
            textAlign={'center'}
            sx={{ margin: '0 auto' }}>
            <Stack spacing={1}>
              <Typography level="body-md" textColor="inherit">
                Future Value
              </Typography>
              <Divider />
              <Typography level="h4" textColor="inherit">
                ${futureValue.toLocaleString()}
              </Typography>
            </Stack>
          </Box>
          <Box
            marginTop={2}
            display="flex"
            justifyContent="space-between"
            textAlign={'center'}
            px={10}>
            <Box width="30%">
              <Stack spacing={1}>
                <Typography level="body-md" textColor="inherit">
                  Total Deposits
                </Typography>
                <Divider />
                <Typography level="h4" textColor="inherit">
                  ${totalDeposits.toLocaleString()}
                </Typography>
              </Stack>
            </Box>
            <Box width="30%">
              <Stack spacing={1}>
                <Typography level="body-md" textColor="inherit">
                  Total Interest
                </Typography>
                <Divider />
                <Typography level="h4" textColor="inherit">
                  ${totalInteres.toLocaleString()}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Sheet>

    {/* Chart */}
    <Box display={'flex'} justifyContent={'center'}>
    <BasicLineChart />
    <Typography level='body-xs'>x axis</Typography>
    </Box>
      </Card>
  )
}
