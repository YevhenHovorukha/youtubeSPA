import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getViews } from "../loaders/getViews";
import { getVideo } from "../loaders/getVideo";
import { formatViews } from "../utils/formatViews ";

const YoutubeVideo = () => {
  const [videoData, setVideoData] = useState(null);
  const [viewCount, setViewCount] = useState(null);
  const params = useParams();
  console.log(videoData);

  console.log(params);
  useEffect(() => {
    const getDataVideo = async () => {
      try {
        const response = await getVideo(params.id);
        setVideoData(response);
      } catch (error) {
        console.log(error);
      }
    };
    getDataVideo();

    const getDataView = async () => {
      try {
        const response = await getViews(params.id);
        setViewCount(response);
      } catch (error) {
        console.log(error);
      }
    };
    getDataView();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        marginTop: "20px",
      }}
    >
      {videoData && (
        <Card>
          <Box
            sx={{
              position: "relative",
              paddingTop: "56.25%", // Соотношение сторон 16:9 для видео
            }}
          >
            <iframe
              title="YouTube Video"
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${params.id}`}
              frameBorder="0"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0 }}
            ></iframe>
          </Box>
          <CardContent>
            <Typography variant="h5" component="div">
              {videoData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {videoData.channelTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatViews(viewCount)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default YoutubeVideo;
