import { Box } from '@mui/joy';
import React, { useState } from 'react';
import SavedResultCard from './SavedResultCard';
import CompoundForm from './CompoundForm';

interface Props {
  handleFormData: (data: {
    futureValue: number;
    totalInterest: number;
    futureValueArray: number[];
    yearsNum: number;
  }) => void;
  setSubmited: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile:boolean;
}

export default function FormArea({ handleFormData, setSubmited, isMobile }: Props) {
  
  return (
    <Box display={'flex'} justifyContent={'center'}>
     {!isMobile && <SavedResultCard />} 

      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CompoundForm
          sendDataToParent={handleFormData}
          setSubmited={setSubmited}
        />
      </div>

      {!isMobile &&  <div // just an empty dic to center the form
        style={{
          marginLeft: '20px',
          maxHeight: '400px',
          width: '200px',
        }}
      />}
    </Box>
  );
}
