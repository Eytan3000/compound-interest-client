import React from 'react';
import { Box, Card, Divider, Sheet, Stack, Typography, Theme } from '@mui/joy';
import BasicLineChart from './Chart';
import { useSelector } from 'react-redux';
//-------------------------------------------------
interface Props {
  futureValue: number | string;
  totalDeposits: number | string;
  totalInteres: number | string;
  futureValueArray: number[];
  years: number;
}

function yearsToDataX(years: number): number[] {
  let yearsArr = [];
  for (let i = 1; i <= years; i++) {
    yearsArr.push(i);
  }
  return yearsArr;
}
//-------------------------------------------------
export default function SumsCard({
  futureValue,
  totalDeposits,
  totalInteres,
  futureValueArray,
  years,
}: Props) {
  const reduxFutureValue = useSelector((state: any) => state.sumsValues.futureValue);

  const sumsBoxStyles = (theme:Theme) => ({
    [theme.breakpoints.down('sm')]: {
      marginY:4
    },
    [theme.breakpoints.up('md')]: {
      width:'30%',
      
    },
  })

  return (
    <Card
      sx={{maxWidth: '800px', margin: { xs: '30px', md:'20px auto' }}}
      size="lg"
      variant="outlined">
      {/* Sums */}
      <Sheet
        color="primary"
        variant="soft"
        
        sx={{ margin: 1, padding: 3, borderRadius: 8 }}>
        <Box
          // width="30%"
          display="column"
          justifyContent="center"
          textAlign={'center'}
          sx={{ margin: '0 auto' }}
          >
          <Stack spacing={1}>
            <Typography level="body-md" textColor="inherit">
              Future Value
            </Typography>
            <Divider />
            <Typography level="h4" textColor="inherit">
              {/* ${futureValue.toLocaleString()} */}
              ${reduxFutureValue.toLocaleString()}
            </Typography>
          </Stack>
        </Box>


        <Stack
        direction={{ xs: 'column', sm: 'row' }}
          marginTop={2}
          display="flex"
          justifyContent="space-between"

          // sx={sumsCardStyles}
          flexDirection={"column"} 
          alignItems="center" 


          
          textAlign={'center'}
          px={10}>
          <Box sx={sumsBoxStyles}
          // width="30%"
          >
             {/* <Stack spacing={1}> */}
              <Typography level="body-md" textColor="inherit">
                Total Deposits
              </Typography>
              <Divider />
              <Typography level="h4" textColor="inherit">
                ${totalDeposits.toLocaleString()}
              </Typography>
            {/* </Stack> */}
          </Box>
          <Box  
          sx={sumsBoxStyles}
          // width="30%"
          >
            {/* <Stack spacing={1}> */}
              <Typography level="body-md" textColor="inherit">
                Total Interest
              </Typography>
              <Divider />
              <Typography level="h4" textColor="inherit">
                ${totalInteres.toLocaleString()}
              </Typography>
            {/* </Stack> */}
          </Box>
        </Stack>
      </Sheet>

      {/* Chart */}
      {
        <Box display={'flex'} justifyContent={'center'} 
        marginY={{ xs: -15, sm:0, md: 0 }}
        >
          <BasicLineChart
            dataX={yearsToDataX(years)}
            dataY={futureValueArray}
          />
        </Box>
      }
    </Card>
  );
}
