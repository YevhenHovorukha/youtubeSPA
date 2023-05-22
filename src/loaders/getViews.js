import axios from "axios";

export const getViews = async (currentId) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          key: "AIzaSyCJ6AL7gdQucwj1Mmd1wTXWz9-nUJT-M90",
          part: "statistics",
          id: currentId,
        },
      }
    );

    return response.data.items[0].statistics.viewCount;
  } catch (error) {
    console.log(error);
  }
};
