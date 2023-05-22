import { Container } from "@mui/system";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, TextField, Box, Stack } from "@mui/material";
import CardComponent from "../components/CardComponent";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getYouTubeData } from "../Redux/reducers/youtubeDataSlice";
import { addItem } from "../Redux/reducers/searchListSlice";

const SearchBox = () => {
  const videosYouTubeData = useSelector((state) => state.youtube.data.data);
  const youTubeDataSearch = useSelector((state) => state.youtube.data.search);
  const loading = useSelector((state) => state.youtube.loading);
  const error = useSelector((state) => state.youtube.error);
  const listArray = useSelector((state) => state.searchList.value);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    search: "",
  });
  const [gridItemsView, setGridItemsView] = useState(true);

  const isActive = (str) => {
    return (
      (formData.search ? false : true) ||
      listArray.some(
        (item) =>
          item.search.trim().toLowerCase() ===
          formData.search.trim().toLowerCase()
      )
    );
  };

  const onChangeHandler = (event) => {
    setFormData(() => {
      return {
        [event.target.name]: event.target.value,
      };
    });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(
      getYouTubeData({ search: formData.search, results: 8, sort: "relevance" })
    );
  };

  const videos = videosYouTubeData
    ? videosYouTubeData.map((item, index) => (
        <CardComponent
          key={index}
          id={item.id.videoId}
          title={item.snippet.title}
          img={item.snippet.thumbnails.high.url}
          channelTitle={item.snippet.channelTitle}
          gridState={gridItemsView}
        />
      ))
    : null;

  const onClickIconHandler = (event) => {
    event.stopPropagation();
    dispatch(addItem(formData.search));
  };

  const handlerClickGridIcon = () => {
    setGridItemsView(true);
  };

  const handlerClickListIcon = () => {
    setGridItemsView(false);
  };

  return (
    <Container
      sx={{
        "@media (min-width: 1200px) and (max-width: 1200px)": {
          margin: "0 auto",
          maxWidth: "1200px",
        },
      }}
    >
      <Typography
        variant="h5"
        component="div"
        color="primary"
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      >
        VIDEO SEARCH
      </Typography>
      <form onSubmit={handlerSubmit}>
        <Stack direction="row" spacing={2} sx={{ width: "100%", mt: "10px" }}>
          <TextField
            label="SEARCH"
            variant="outlined"
            sx={{ width: "75%", bgcolor: "white" }}
            inputProps={{ style: { height: "10px", padding: "1em" } }}
            InputLabelProps={{ style: { marginTop: "-5px" } }}
            type="search"
            name="search"
            value={formData.search}
            onChange={onChangeHandler}
            InputProps={{
              endAdornment: (
                <IconButton
                  edge="end"
                  aria-label="Heart Icon"
                  disabled={isActive(formData.search)}
                  onClick={onClickIconHandler}
                >
                  {isActive(formData.search) ? (
                    <FavoriteIcon sx={{ fill: "#1976d2" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "25%" }}
            disabled={formData.search ? false : true}
          >
            SUBMIT
          </Button>
        </Stack>
      </form>
      <Stack direction="row" spacing={2} sx={{ width: "100%", mt: "10px" }}>
        <Typography
          variant="h6"
          component="div"
          color="black"
          sx={{ marginTop: "5px", fontSize: "18px" }}
        >
          Video on demand:"{youTubeDataSearch}""
        </Typography>
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <IconButton aria-label="Grid Icon" onClick={handlerClickGridIcon}>
            <GridViewIcon />
          </IconButton>
          <IconButton aria-label="Lise Icon" onClick={handlerClickListIcon}>
            <FormatListBulletedIcon />
          </IconButton>
        </div>
      </Stack>
      <Box
        display={"flex"}
        flexDirection={gridItemsView ? "row" : "column"}
        flexWrap="wrap"
        maxWidth="1200px"
        padding="20px 0"
        gap="10px"
      >
        {videos}
      </Box>
    </Container>
  );
};

export default SearchBox;
