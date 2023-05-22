import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getViews } from "../loaders/getViews";
import { formatViews } from "../utils/formatViews ";

const CardComponent = ({ id, title, img, channelTitle, gridState }) => {
  const [viewCount, setViewCount] = useState(null);
  const currentId = id;
  const navigate = useNavigate("");

  useEffect(() => {
    const getDataView = async () => {
      try {
        const response = await getViews(currentId);
        setViewCount(response);
      } catch (error) {
        console.log(error);
      }
    };
    getDataView();
  }, [currentId]);

  return (
    <Card
      onClick={() => {
        navigate(`/${currentId}`);
      }}
      sx={{
        "@media (max-width: 750px)": {
          width: "100%",
        },
        "@media (min-width: 750px)": {
          maxWidth: gridState ? "280px" : "80%",
        },
      }}
    >
      <CardContent
        sx={{
          padding: 0,
          fontFamily: "Roboto,Arial,sans-serif",
          fontWeight: "bolt",
          ...(gridState ? null : { display: "flex" }),
          ":last-child": { paddingBottom: "0" },
        }}
      >
        <CardMedia
          sx={{ maxWidth: gridState ? "100%" : "50%" }}
          component="img"
          image={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`}
          alt={title}
        />
        <div>
          <Typography
            variant="subtitle2"
            component="div"
            color="primary"
            sx={{ margin: "20px 10px 0" }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            color="gray"
            sx={{ marginLeft: "10px" }}
          >
            {channelTitle}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            color="gray"
            sx={{ marginLeft: "10px" }}
          >
            {formatViews(viewCount)} views
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
