import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

interface props {
  dataX?: number[];
  dataY?: number[];
}

export default function BasicLineChart({
  dataX = [1, 2, 3, 5, 8, 10],
  dataY = [2, 5.5, 2, 8.5, 1.5, 5]
}:props) {

  return (
    <LineChart
      xAxis={[{ data: dataX }]}
      series={[
        {
          data: dataY,
          curve:'linear',
          color: '#3498DB',
 
        },
      ]}
      width={500}
      height={300}
    />
  );
}