import { Box } from '@mui/joy';
import React from 'react';
import SavedResultCard from './SavedResultCard';
import CompoundForm from './CompoundForm';

// export default function FormArea({ handleFormData, setSubmited }) {
export default function FormArea() {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <SavedResultCard />

      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <CompoundForm
        //   sendDataToParent={handleFormData}
        //   setSubmited={setSubmited}
        /> */}
      </div>

      <div // just an empty dic to center the form
        style={{
          marginLeft: '20px',
          maxHeight: '400px',
          width: '200px',
        }}
      />
    </Box>
  );
}
