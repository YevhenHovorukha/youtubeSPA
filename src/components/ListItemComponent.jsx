import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { deleteItem, editItem } from "../Redux/reducers/searchListSlice";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { getYouTubeData } from "../Redux/reducers/youtubeDataSlice";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Slider,
} from "@mui/material";

const ListItemComponent = ({ listItemName, info }) => {
  const videosYouTubeData = useSelector((state) => state.youtube.data);
  const loading = useSelector((state) => state.youtube.loading);
  const error = useSelector((state) => state.youtube.error);
  const searchList = useSelector((state) => state.searchList.value);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    newState: "",
    results: 8,
    sort: "relevance",
  });

  const onChangeHandler = (event) => {
    setFormData(() => {
      return { ...formData, [event.target.name]: event.target.value };
    });
  };

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const handlerOnClick = (event) => {
    event.stopPropagation();
    dispatch(deleteItem(listItemName));
  };

  const handleOnClickList = () => {
    dispatch(
      getYouTubeData({
        search: listItemName,
        results: formData.results,
        sort: formData.sort,
      })
    );
    navigate("/youtubeSPA");
  };

  const handlerClickButton = (event) => {
    event.preventDefault();
    dispatch(
      editItem({
        prevState: listItemName,
        newState: formData.newState,
        results: formData.results,
        sort: formData.sort,
      })
    );
    setOpenModal(false);
  };

  return (
    <>
      <ListItemButton
        sx={{ bgcolor: "white" }}
        onClick={handleOnClickList}
        aria-label="favorites-list"
      >
        <ListItemText primary={listItemName} />
        <IconButton edge="end" aria-label="edit" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={handlerOnClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemButton>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            "@media (max-width: 600px)": {
              left: "10%",
              top: "20%",
              maxWidth: 350,
              transform: "translate(-10%, -20%)",
            },
          }}
        >
          <form>
            <Typography
              variant="h5"
              component="div"
              color="primary"
              sx={{ width: "50px", margin: "0 auto", marginBottom: 2 }}
            >
              EDIT
            </Typography>
            <TextField
              variant="filled"
              label="SEARCH"
              sx={{ width: "100%", bgcolor: "white" }}
              disabled={true}
              value={listItemName}
            ></TextField>
            <TextField
              label="EDIT SEARCH"
              sx={{ width: "100%", bgcolor: "white", mt: 3 }}
              type="newState"
              name="newState"
              onChange={onChangeHandler}
              value={formData.newState}
            ></TextField>
            <InputLabel sx={{ mt: 1 }} id="demo-select-small-label">
              Sort
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={formData.sort}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
              type="sort"
              name="sort"
            >
              <MenuItem value="relevance">relevance</MenuItem>
              <MenuItem value={"date"}>date</MenuItem>
              <MenuItem value={"rating"}>rating</MenuItem>
              <MenuItem value={"viewCount"}>viewCount</MenuItem>
              <MenuItem value={"title"}>title</MenuItem>
            </Select>
            <InputLabel sx={{ mt: 3 }}>Results Count</InputLabel>
            <Stack direction="row" width="100%" sx={{ mt: 1 }}>
              <Slider
                defaultValue={8}
                valueLabelDisplay="auto"
                max={25}
                sx={{ display: "block", width: "60%" }}
                type="results"
                onChange={onChangeHandler}
                value={formData.results}
                name="results"
              />
              <TextField
                label="NUM"
                sx={{ width: "30%", marginLeft: "auto" }}
                type="results"
                name="results"
                onChange={onChangeHandler}
                value={formData.results}
              ></TextField>
            </Stack>
            <Stack direction="row" width="100%" sx={{ mt: 1 }}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                sx={{ width: "45%", mt: 4 }}
              >
                Close
              </Button>
              <Button
                onClick={handlerClickButton}
                variant="contained"
                color="primary"
                sx={{
                  width: "45%",
                  mt: 4,
                  display: "block",
                  marginLeft: "auto",
                }}
                disabled={!formData.newState}
              >
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ListItemComponent;
