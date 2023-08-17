import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Sheet, Skeleton, Typography } from '@mui/joy';
import Link from '@mui/joy/Link';
import AspectRatio from '@mui/joy/AspectRatio';
import { yahooFinanceLogo } from '../utils/links';
import { yahooNewsApi } from '../utils/api';
import axios from 'axios';
//---------------------------------------
// type RequestOptions = {
//   method: string;
//   url: string;
//   params: {
//     region: string;
//     snippetCount: string;
//   };
//   headers: {
//     'content-type': string;
//     'X-RapidAPI-Key': string | undefined;
//     'X-RapidAPI-Host': string;
//   };
//   data: string;
// };

interface NewsItem {
  content: {
    clickThroughUrl: {
      url: string;
    };
    provider: {
      displayName: string;
    };
    thumbnail: {
      resolutions: {
        height: number;
        tag: string;
        url: string;
        width: number;
      }[];
    };
    title: string;
  };
  id: string;
}

//---------------------------------------
export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //AxiosResponse<any, any>
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        // Real API:
        // const response = await yahooNewsApi();
        // const data = response.data.data.main.stream;
        // setNewsData(data); //newsArray

        // json api
        const response = await axios.get('/data/YahooFinance.json');
        setNewsData(response.data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  console.log(newsData);
  console.log(loading);

  return (
    <Sheet variant="outlined" sx={{ marginTop: 5, padding: 5 }}>
      <Typography sx={{ textAlign: 'center' }} level="h3">
        Today's highlights
      </Typography>

      <Box display={'flex'} justifyContent={'center'}>
        {newsData.map((newsItem, index) => {
          if (newsItem.content.thumbnail && index < 5) {
            //sometimes there's no thumbnail, so checking if there's one.
            return (
              <Card
                sx={{ minWidth: 300, margin: 4, height: '100%' }}
                key={index}
                variant="outlined">
                <AspectRatio
                  sx={{
                    flexBasis: '200px',
                    overflow: 'auto',
                  }}>
                  <img
                    src={newsItem.content.thumbnail.resolutions[0].url}
                    alt="news thumbnail"
                  />
                </AspectRatio>

                <Typography level="body-xs" marginTop="-40px">
                  {newsItem.content.provider.displayName}
                </Typography>
                <Typography level="title-lg">
                  <Link
                    overlay
                    underline="none"
                    href={newsItem.content.clickThroughUrl.url}
                    target="_blank"
                    sx={{ color: 'text.tertiary' }}>
                    {newsItem.content.title}
                  </Link>
                </Typography>
              </Card>
            );
          }
          return null;
        })}
        <img height={20} alt="yahoo finance logo" src={yahooFinanceLogo} />
      </Box>
    </Sheet>
  );
}
