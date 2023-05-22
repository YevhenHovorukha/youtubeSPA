import React from "react";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemComponent from "../components/ListItemComponent";
import { useDispatch, useSelector } from "react-redux/es/exports";

const Favorites = () => {
  const searchList = useSelector((state) => state.searchList.value);

  const searcListItems = Array.from(
    new Set(searchList.map(JSON.stringify)),
    JSON.parse
  ).map((item, index) => (
    <ListItemComponent listItemName={item.search} key={index} info={item} />
  ));

  return (
    <Container
      sx={{
        "@media (min-width: 1200px) and (max-width: 1200px)": {
          maxWidth: "1200px",
        },
      }}
    >
      <Typography variant="h5" color="primary" sx={{ mt: "0.5em" }}>
        FAVORITES
      </Typography>
      <List>{searcListItems}</List>
    </Container>
  );
};

export default Favorites;
