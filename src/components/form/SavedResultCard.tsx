import React from 'react';
import { Card, Typography } from '@mui/joy';

const results:number[] = [184293,18429344,34587844,435345822,4345393,4539829,732340992,4982398];

export default function SavedResultCard() {
  return (
    <Card
      sx={{
        marginLeft: '20px',
        maxHeight: '400px',
        width: '200px',
        overflowY: 'auto',
        flexDirection: 'column'
      }}
      size="lg"
      variant="outlined">
      <Typography textAlign={'center'} sx={{ textDecoration: 'underline' }}>
        Recent results
      </Typography>
      {/* <div style={{ maxHeight: '100%', overflow: 'hidden', }}> */}
      <div style={{ flex: 1, overflow: 'auto' }}>

{results.reverse().map((item)=>{
    return (<Card variant='outlined' sx={{marginY:2}}>FV: ${item.toLocaleString()}</Card>);
})}
    
      </div>
    </Card>
  );
}
