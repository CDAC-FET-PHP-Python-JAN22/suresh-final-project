import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from "axios"
import { useState, useEffect } from "react"
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

type newsType = {
  news_id: number,
  title: string,
  city: string,
  category: string,
  created_on: string,
  published_on: string,
  user_ID: number,
  news_status: string,
  news_desc: string,
  image: string,
}

function NewsCard() {

    const[newsFeeds, setNewsFeeds] = useState<newsType[]>([])

    useEffect(() => {
      cityNews();
    }, [])

    const cityNews = () => {
      Axios.get("http://localhost:3001/citynews/"+ localStorage.getItem("city"))
      .then((response) => {
          console.log(response.data);
          setNewsFeeds(response.data);
      })
      console.log("NewsList" + newsFeeds)
  }
    
  return (
    <>
      <Grid container spacing={2}>
        {newsFeeds.map((val: newsType, key: number) => {
          return(
            <Grid item xs={12} md={12} lg={6} key={key}>
            <Card sx={{ maxWidth: 700, height: 350 }}>
              <CardMedia
                component="img"
                height="200"
                image={val.image}
                alt="?"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {val.title}
                </Typography>
              </CardContent>
              <CardActions>
              <Button size="small" color="inherit" component={Link} to={`/fullNews/${val.news_id}`} >
                Read More
              </Button>
              </CardActions>
            </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
}

export default NewsCard