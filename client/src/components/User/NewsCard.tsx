import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { Box, CardActions } from "@mui/material";

export type newsList = {
  news_id: number;
  title: string;
  city: string;
  category: string;
  created_on: string;
  published_on: string;
  user_ID: number;
  news_status: string;
  news_desc: string;
  image: string;
};

function NewsCard() {
  const [newsList, setNewsList] = useState<newsList[]>([]);

  useEffect(() => {
    getNews();
  }, [])

  const getNews = () => {
    Axios.get("http://localhost:3001/getNews").then((response) => {
      console.log(response.data);
      setNewsList(response.data);
    });
    console.log("NewList => " + newsList);
  };

  return (
    <>
      <Grid container spacing={2}>
        {newsList.map((val: newsList, key: number) => {
          return (
            <Grid item xs={10} md={4} lg={6} key={key}>
              
              <Card sx={{ height: 400, maxWidth: 700 }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={val.image}
                  alt=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {val.title}
                  </Typography>
                </CardContent>
              
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {val.category} 
                </Typography>
              
                <CardActions >
                
                  <Button size="small" color="inherit" component={Link} to={`/fullNews/${val.news_id}`} >
                    Read More
                  </Button>
                </CardActions>


               
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default NewsCard;
