import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, Sheet, Skeleton, Typography } from '@mui/joy';
import Link from '@mui/joy/Link';
import AspectRatio from '@mui/joy/AspectRatio';
import { yahooFinanceLogo } from '../utils/links';
import { env } from 'process';
//---------------------------------------
type RequestOptions = {
  method: string;
  url: string;
  params: {
    region: string;
    snippetCount: string;
  };
  headers: {
    'content-type': string;
    'X-RapidAPI-Key': string | undefined;
    'X-RapidAPI-Host': string;
  };
  data: string;
};

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

const apiKey = process.env.REACT_APP_YAHOO_API_KEY;
const options = {
  method: 'POST',
  url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list',
  params: {
    region: 'US',
    snippetCount: '28',
  },
  headers: {
    'content-type': 'text/plain',
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
  },
  data: 'Pass in the value of uuids field returned right in this endpoint to load the next page, or leave empty to load first page',
};
//---------------------------------------
export default function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  
    (async function news(options: RequestOptions) {
      try {
        setLoading(true);
        const response = await axios.request(options);
        const data = response.data.data.main.stream;
        setNewsData(data); //newsArray
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })(options);
  }, []);
  console.log(newsData);
  console.log(loading);

  return (
    <Sheet variant="outlined" sx={{ marginTop: 5, padding: 5 }}>
      <Typography sx={{ textAlign: 'center' }} level="h3">
        Today's highlights
      </Typography>

      <Box display={'flex'} justifyContent={'center'}>
      
        {loading ? 
        newsData.map((newsItem, index) => {
          if (index < 3) {
        return (
          <Card
                sx={{ width: 300, margin: 4, height: 350 }}
                key={index}
                variant="outlined">
        <Skeleton variant="rectangular"  width={'100%'} height={'100%'}/>
        </Card>
        )
          }})
        : newsData.map((newsItem, index) => {
          if (newsItem.content.thumbnail && index < 3) { //sometimes there's no thumbnail, so checking if there's one.
            return (
              <Card
                sx={{ width: 300, margin: 4, height: '100%' }}
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
        })}
        <img height={20} alt="yahoo finance logo" src={yahooFinanceLogo} />
      </Box>
    </Sheet>
  );
}
