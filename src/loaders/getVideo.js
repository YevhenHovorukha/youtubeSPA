import axios from "axios";

export const getVideo = async (currentId) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          key: "AIzaSyCJ6AL7gdQucwj1Mmd1wTXWz9-nUJT-M90",
          part: "snippet",
          id: currentId,
        },
      }
    );

    return response.data.items[0].snippet;
  } catch (error) {
    console.log(error);
  }
};
