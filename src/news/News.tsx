import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, Sheet, Typography } from '@mui/joy';
import Link from '@mui/joy/Link';
import AspectRatio from '@mui/joy/AspectRatio';
import { yahooFinanceLogo } from '../utils/links';
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
    'X-RapidAPI-Key': string;
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

const apiKey = '6f1fd04672msh6ecdfeba8d52940p116d0djsn4c940f805ced';

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
  const [flexBasis, setFlexBasis] = React.useState(200);
  useEffect(() => {
    (async function news(options: RequestOptions) {
      try {
        const response = await axios.request(options);
        // console.log((response.data.data.main.stream)[0].content.title);
        // console.log(response.data.data.main.stream);
        // console.log(response.data.data.main.stream);
        setNewsData(response.data.data.main.stream); //newsArray
      } catch (error) {
        console.error(error);
      }
    })(options);
  }, []);
  console.log(newsData);

  function handleReadClick() {
    // navigate
    console.log('navigate');
  }

  return (
    // <Container sx={{marginTop:10, background:'red'}}>
    <Sheet variant="outlined" sx={{ marginTop: 5, padding: 5 }}>

      
      <Typography sx={{ textAlign: 'center' }} level="h3">
        Today's highlights
      </Typography>

      <Box display={'flex'} justifyContent={'center'}>
        {newsData.map((newsItem, index) => {
          if (index < 3) {
            return (
              <Card
                sx={{ width: 300, margin: 4, height: '100%' }}
                key={index}
                variant="outlined">
                {/* <img
                  src={newsItem.content.thumbnail.resolutions[0].url}
                  alt="news thumbnail"
                /> */}

   <AspectRatio
                  sx={{
                    // flexBasis: flexBasis ? `${flexBasis}px` : undefined,
                    flexBasis: '200px',
                    overflow: 'auto',
                  }}>
                  <img
                    src={newsItem.content.thumbnail.resolutions[0].url}
                    alt="news thumbnail"
                  />
                </AspectRatio>


                <Typography level="body-xs" marginTop='-40px'>
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
                {/* <Typography level="body-sm">
                  {newsItem.content.title}
                </Typography> */}

                {/* <Button variant="outlined">Keep reading</Button> */}
              </Card>
            );
          }
        })}
        <img height={20} alt='yahoo finance logo' src={yahooFinanceLogo} />
      </Box>
    </Sheet>
    // </Container>
  );
}
