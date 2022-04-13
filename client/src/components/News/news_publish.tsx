
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormEvent, useState, ChangeEvent } from 'react';
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Input, Autocomplete, FormHelperText } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { exit } from "process";
import Alert from '@mui/material/Alert';
import ReporterHome from "../ReporterHome/ReporterHome";


function News() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [news_desc, setDescription] = useState('');
    const [news_length, setNewsLength] = useState(0);
    const [news_status, setNews_Status] = useState("Show");
    const [isPublished, setPublishStatus] = useState(false);

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState("");

    const saveFile = (e:any) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

      const navigate = useNavigate();
        const Home = ()=>{
            navigate('/Home');
        }
      

      const submitNews = (e:any) => {
        if ((news_desc == " ") || (news_length < 10)) {
            alert("News Description Should Contain Atleast 10 Words");
        } else if (news_length > 450) {
            alert("News Description Can Contain Only 450 Words");

        } else{
        const formData = new FormData();
        formData.append("title",title);
        formData.append("city",city);
        formData.append("category",category);
        formData.append("news_desc",news_desc);
        formData.append("news_status",news_status);
        formData.append("file", file);
        formData.append("fileName", fileName);
        console.log("Data:=> ",formData);
        try {
          const res = axios.post(
            "http://localhost:3001/api/newspublish",
            formData
          );
          console.log(res);
          alert("Your News Is Published On Our Website.");
          Home();
        } catch (ex) {
          console.log(ex);
        }
    }
      };



    return (

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <AssignmentIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Publish Your News
                </Typography>
                <Box component="form" onSubmit={submitNews} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        sx={{ mt: 1 }}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />

                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel id="demo-simple-select-city">City</InputLabel>
                        <Select
                            labelId="demo-simple-select-city"
                            required
                            id="demo-simple-select"
                            value={city}
                            label="City"
                            autoComplete="city"
                            onChange={(e) => {
                                setCity(e.target.value)
                            }}
                        >
                            <MenuItem value={"Pune"}>Pune</MenuItem>
                            <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                            <MenuItem value={"Navi Mumbai"}>Navi Mumbai</MenuItem>
                            <MenuItem value={"Nashik"}>Nashik</MenuItem>
                            <MenuItem value={"Nagpur"}>Nagpur</MenuItem>
                            <MenuItem value={"Aurangabad"}>Aurangabad</MenuItem>
                            <MenuItem value={"Jalgaon"}>Jalgaon</MenuItem>
                            <MenuItem value={"Thane"}>Thane</MenuItem>
                            <MenuItem value={"Kolhapur"}>Kolhapur</MenuItem>
                            <MenuItem value={"Solapur"}>Solapur</MenuItem>
                            <MenuItem value={"Nanded"}>Nanded</MenuItem>
                            <MenuItem value={"Dhule"}>Dhule</MenuItem>
                            <MenuItem value={"India"}>India</MenuItem>
                            <MenuItem value={"World"}>World</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                        <FormHelperText>Select the City</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="demo-simple-select-category">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-category"
                            required
                            fullWidth
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            autoComplete="category"
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                        >
                            <MenuItem value={"Sports"}>Sports</MenuItem>
                            <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                            <MenuItem value={"Technology"}>Technology</MenuItem>
                            <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
                            <MenuItem value={"Bollywood"}>Bollywood</MenuItem>
                            <MenuItem value={"Business"}>Business</MenuItem>
                            <MenuItem value={"Accident"}>Accident</MenuItem>
                            <MenuItem value={"Politics"}>Politics</MenuItem>
                            <MenuItem value={"Movies"}>Movies</MenuItem>
                            <MenuItem value={"Gadgets"}>Gadgets</MenuItem>
                            <MenuItem value={"Travel"}>Travel</MenuItem>
                            <MenuItem value={"Scam"}>Scam</MenuItem>
                            <MenuItem value={"Child Abuse"}>Child Abuse</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                        <FormHelperText>Select the Category of Your News</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={5}
                            placeholder="upto 450 words"
                            required
                            id="news_desc"
                            name="news_desc"
                            autoComplete="news_desc"
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setNewsLength(e.target.value.split(' ').length);
                            }
                            }
                        />
                    </FormControl>

                   <input type="file" onChange={saveFile} name="file"/>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Publish
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
export default News;

