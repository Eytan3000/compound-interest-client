import * as React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';

interface props {
  dataX?: number[];
  dataY?: number[];
}

export default function BasicLineChart({
  dataX,
  dataY
}:props) {

  // return (
  //   <LineChart
  //     xAxis={[{ data: dataX }]}
  //     series={[
  //       {
  //         data: dataY,
  //         curve:'linear',
  //         color: '#3498DB',
 
  //       },
  //     ]}
  //     width={800}
  //     height={500}
  //   />
  // );
}