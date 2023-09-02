import React, { useEffect, useState, Dispatch } from 'react';
import './App.css';
import { Box, Theme, Typography } from '@mui/joy';
import ResponsiveAppBar from './components/ui/ResponsiveAppBar';
import { formatSums } from './utils/helpers';
import SumsCard from './components/ui/SumsCard';
import News from './news/News';
import HpArticle from './news/HpArticle';
import SavedResultCard from './components/form/SavedResultCard';
import FormArea from './components/form/FormArea';
import Modal from '@mui/material/Modal';

//-------------------------------------------------
type FormData = {
  futureValue: number;
  totalInterest: number;
  futureValueArray: number[];
  yearsNum: number;

};

//-------------------------------------------------

function App() {
  const [futureValue, setFutureValue] = useState<string>('');
  const [totalInteres, setTotalInterest] = useState<number | string>('');
  const [totalDeposits, setTotalDeposits] = useState<number | string>('');
  const [futureValueArray, setfutureValueArray] = useState<number[]>([]);
  const [years, setYears] = useState<number>(0);

  const [submited, setSubmited] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dataPosted, setDataPosted] = useState<boolean>(false); // postData function re-renders savedResultCard after saving details to db

  //get the size of screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1200); // Adjust the breakpoint as needed. xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
    };
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const titleStyles = (theme: Theme) => ({
    [theme.breakpoints.up('xs')]: {
      fontSize: '24px', // Adjust the font size for small to medium screens
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '24px', // Font size for medium to large screens
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '36px', // Font size for large screens
    },
  });
  const titleBoxStyles = (theme: Theme) => ({
    [theme.breakpoints.up('xs')]: {
      margin: 3,
    },
    [theme.breakpoints.up('lg')]: {
      margin: 10,
    },
  });

  function handleFormData(data: FormData): void {
    const {
      futureValue,
      totalInterest,
      futureValueArray,
      yearsNum,
    } = data;

    const formattedFutureValue = formatSums(futureValue);
    const formattedTotalInterest = formatSums(totalInterest);
    const formatedTotalDeposits = formatSums(futureValue - totalInterest);

    setFutureValue(formattedFutureValue);
    setTotalInterest(formattedTotalInterest);
    setTotalDeposits(formatedTotalDeposits);
    setfutureValueArray(futureValueArray);
    setYears(yearsNum);
  }
  const handleOpen = () => setMenuOpen(true);
  const handleClose = () => setMenuOpen(false);

  return (
    <>
      <ResponsiveAppBar isMobile={isMobile} handleOpen={handleOpen} />

      <Modal
        open={menuOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box display={'flex'} justifyContent={'center'} mt={4}>
          <SavedResultCard dataPosted={dataPosted} />
        </Box>
      </Modal>

      <Box
        display={'flex'}
        justifyContent={'center'}
        textAlign={'center'}
        sx={titleBoxStyles}>
        <Typography level="h1" sx={titleStyles}>
          Compound Interest Calculator
        </Typography>
      </Box>

      <FormArea
        handleFormData={handleFormData}
        setSubmited={setSubmited}
        isMobile={isMobile}
        setDataPosted={setDataPosted}
        dataPosted={dataPosted}
      />

      {submited && (
        <SumsCard
          futureValue={futureValue}
          totalDeposits={totalDeposits}
          totalInteres={totalInteres}
          futureValueArray={futureValueArray}
          years={years}
        />
      )}
      <News />
      <HpArticle />
    </>
  );
}

export default App;
