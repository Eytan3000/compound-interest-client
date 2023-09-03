import React, { useEffect, useState } from 'react';
import { Card, Typography } from '@mui/joy';
import { get10RecentFv, getLog } from '../../utils/database';
import { useDispatch } from 'react-redux';
import { formActions } from '../../store';
//---------------------------------------------------
type Object = {
  fv: number;
  id: number;
};

interface Props {
  dataPosted: boolean;
}
//---------------------------------------------------
export default function SavedResultCard({ dataPosted }: Props) {
  const [logsArr, setLogsArray] = useState<Object[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await get10RecentFv();
      setLogsArray(data);
    };
    fetchData();
  }, [dataPosted]);

  async function handleCardClick(e: any) {
    const id = e.target.id;
    /**
    1) fetch log details - V
    2) make logs disapeare
    3) set these:
      -setPrincipal
      -setMonthlyContribution
      -setYears
      -setInterestRate
    4) handle sumbit()
    5) change background to selected
    */

    const log = await getLog(id);
    console.log(log);
    dispatch(formActions.setReduxPrincipal(log.principal));
    dispatch(formActions.setReduxMonthlyContribution(log.monthlyContribution));
    dispatch(formActions.setReduxYears(log.yearsToGrow));
    dispatch(formActions.setReduxInterestRate(log.yearlyInterestRate));
  }

  return (
    <Card
      sx={{
        marginLeft: '20px',
        maxHeight: '400px',
        width: '200px',
        overflowY: 'auto',
        flexDirection: 'column',
      }}
      size="lg"
      variant="outlined">
      <Typography textAlign={'center'} sx={{ textDecoration: 'underline' }}>
        Recent results
      </Typography>
      {/* <div style={{ maxHeight: '100%', overflow: 'hidden', }}> */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {logsArr.reverse().map((item, index) => {
          return (
            <Card
              id={item.id.toLocaleString()}
              onClick={(e) => handleCardClick(e)}
              key={index}
              variant="outlined"
              sx={{ marginY: 2, textAlign: 'center', cursor: 'pointer' }}>
              {' '}
              ${item.fv.toLocaleString()}
            </Card>
          );
        })}
      </div>
    </Card>
  );
}
