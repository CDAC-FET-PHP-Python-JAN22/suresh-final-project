import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FacebookIcon, FacebookShareButton, WhatsappShareButton, WhatsappIcon } from "react-share"; 
import Axios from "axios";
import { newsList } from "./AllNewsCard";

function FullNews() {
  const [fullNews, setFullNews] = useState<newsList | null>(null);

  let { news_id } = useParams();
  console.log("news Id is : " + news_id);

  // const params = {
  //     news_id: news_id
  //   };

  const getFullNews = () => {
    // const news_ID = { news_id };
    Axios.get(`http://localhost:3001/getFullNews/${news_id}`).then(
      (response) => {
        console.log(response.data[0]);
        // setFullNews(response.data[0]);
        const result = response.data[0];
        setFullNews(result);
      }
    );
    console.log("NewData => " + fullNews);
  };

  useEffect(() => {
    getFullNews();
  }, []);

  console.log(fullNews);
  
  return (
    <Grid alignItems="center" justifyContent="center">
      <Container sx={{ p: 5 }}>
        <Card sx={{ maxWidth: 1000 }}>
          <CardHeader
            titleTypographyProps={{ variant: "h2" }}
            title={fullNews?.title}
            subheader={fullNews?.published_on}
          />
          <CardMedia
            component="img"
            height="250"
            image={fullNews?.image}
            alt=""
          />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {fullNews?.news_desc}
            </Typography>
          </CardContent>
          <CardActions disableSpacing >
            
              <ShareIcon />
           

            <FacebookShareButton url="https://www.facebook.com/" >
              <FacebookIcon lightingColor={"white"} round={true} size="40"></FacebookIcon>
            </FacebookShareButton>

            <WhatsappShareButton url="https://www.facebook.com/">
              <WhatsappIcon lightingColor={"white"} round={true} size="40"></WhatsappIcon>
            </WhatsappShareButton>
          </CardActions>
        </Card>
      </Container>
    </Grid>
  );
}

export default FullNews;
