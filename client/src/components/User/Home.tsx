import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import Axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import NewsCard from "./NewsCard";
import NavbarTemp from "./NavbarTemp";
import { useState, useEffect } from "react";

const drawerWidth = 160;

export type cityList = {
  city: string;
};

function Home() {
  const [cityList, setCityList] = useState<cityList[]>([]);

  useEffect(() => {
    getCity();
  }, []);

  const getCity = () => {
    Axios.get("http://localhost:3001/getCity").then((response) => {
      console.log(response.data);
      setCityList(response.data);
    });
    console.log("CityList => " + cityList);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <NavbarTemp />
        <Toolbar />

        <Box sx={{ overflow: "auto" }}>
          <List>
            {cityList.map((val, key) => {
              return (
                <ListItem key={key}>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/cityNews/${val.city}`}
                  >
                    <ListItemText primary={val.city} />
                  </Button>
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <NewsCard />
      </Box>
    </Box>
  );
}

export default Home;
