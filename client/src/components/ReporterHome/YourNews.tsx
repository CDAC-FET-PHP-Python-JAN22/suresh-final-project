import { Button, Card, CardActions, CardContent, CardMedia, Container,  Grid,  Typography } from "@mui/material"
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    image:string,
}

function YourNews() {
    const[newsFeeds, setNewsFeeds] = useState<newsType[]>([])

    useEffect(() => {
        yourNews();
    }, [])

    const yourNews = () => {
        Axios.get("http://localhost:3001/yournews")
            .then((response) => {
                console.log(response.data)
                setNewsFeeds(response.data)
            })
        console.log("NewsList" + newsFeeds)
    } 

    return(
        <>
            <Container fixed sx={{ py: 2 }}>
                <Typography variant="h6" color="primary">
                    Your News
                </Typography>
                <Grid container spacing={2}>
                    {newsFeeds.map((val: newsType, key: number) => {
                        return (
                            <Grid item xs={12} md={12} lg={4} key={key}>
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

            </Container>
        </>
    )
}

export default YourNews