import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useState, useEffect } from "react"
import { Grid } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export type newsList = {
  news_id: number,
  title: string,
  city: string,
  category: string,
  created_on: string,
  published_on: string,
  user_ID: number,
  news_status: string,
  news_desc: string,
  image: string
}

function NewsCard() {
    let { news_id } = useParams();

    const[newsFeeds, setNewsFeeds] = useState<newsList[]>([])

    useEffect(() => {
      cityNews();
    }, [])

    const cityNews = () => {
        axios.get("http://localhost:3001/getNews")
        .then((response) => {
            console.log(response.data)
            setNewsFeeds(response.data)
        })
        console.log("NewsList" + newsFeeds)
    }

    const handleClick = (news_id: number) => {
        axios.delete(`http://localhost:3001/delete/${news_id}`).then((response) => {
            console.log("news Id is : " + news_id);
            console.log(response);
            alert("Deleted successfully");
        })
    } 

  return (
    <>
      <Grid container spacing={2}>
        {newsFeeds.map((val: newsList, key: number) => {
          return(
            <Grid item xs={12} md={12} lg={6} key={key}>
            <Card sx={{ maxWidth: 700, height: 400 }}>
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
                <Button size="small" component={Link} to={`/admin/fullnews/${val.news_id}`}>Read More</Button>
                <Button size="small" onClick={() => {handleClick(val.news_id)}} >Delete</Button>
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