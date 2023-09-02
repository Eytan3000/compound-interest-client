import { Box } from '@mui/joy';
import React, { useState, Dispatch } from 'react';
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
  setDataPosted: React.Dispatch<React.SetStateAction<boolean>>;
  dataPosted:boolean;
}

export default function FormArea({ handleFormData, setSubmited, isMobile, setDataPosted, dataPosted }: Props) {
  
  return (
    <Box display={'flex'} justifyContent={'center'}>
     {!isMobile && <SavedResultCard dataPosted={dataPosted}/>} 

      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CompoundForm
        setDataPosted={setDataPosted}
          sendDataToParent={handleFormData}
          setSubmited={setSubmited}
        />
      </div>

      {!isMobile &&  <div // just an empty div to center the form
        style={{
          marginLeft: '20px',
          maxHeight: '400px',
          width: '200px',
        }}
      />}
    </Box>
  );
}
