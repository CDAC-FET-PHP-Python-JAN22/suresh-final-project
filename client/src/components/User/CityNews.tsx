import { Link, useParams } from "react-router-dom";
import { newsList } from "./NewsCard";
import { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";


import Axios from "axios";

function CityNews (){

    const [cityNews, setCityNews] = useState<newsList[]>([]);

  let { city } = useParams();
  console.log("city is : " + city);

  // const params = {
  //     news_id: news_id
  //   };

  const getCityNews = () => {
    // const news_ID = { news_id };
    Axios.get(`http://localhost:3001/cityNews/${city}`).then(
      (response) => {
        console.log(response.data[0]);
        // setFullNews(response.data[0]);
        const result = response.data;
        setCityNews(result);
      }
    );
    console.log("city => " + cityNews);
  };

  useEffect(() => {
    getCityNews();
  }, []);

    return(
        <Container sx={{ p:3 }}>
          <h1>What's happening in {city}</h1>
        <Grid container spacing={2}>
        {cityNews.map((val: newsList, key: number) => {
          return (
            <Grid item xs={12} md={12} lg={6} key={key}>
            {/* <Card sx={{ maxWidth: 345 }}> */}
            <Card sx={{ height: 350}}>
              <CardMedia
                component="img"
                height="160"
                image={val.image}
                alt="?"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {val.title}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small" color="inherit" component={Link} to="/fullNews"> */}
                <Button size="small" color="inherit" component={Link} to={`/fullNews/${val.news_id}`} >
                  Read More
                </Button>
              </CardActions>
              {/* <div>{showNews ? <div>{val.news_desc}</div> : null}</div> */}
            </Card>
            </Grid>
          );
        })}
        </Grid>
      </Container>
    )
}

export default CityNews