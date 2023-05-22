import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Favorites from "./Pages/Favorites";
import SearchBox from "./Pages/SearchBox";
import ProtectedRoute from "./Pages/ProtectedRoute";
import YoutubeVideo from "./Pages/YoutubeVideo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="youtubeSPA/" element={<Header />}>
            <Route index element={<SearchBox />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path=":id" element={<YoutubeVideo />} />
          </Route>
        </Route>
        {/* <Route path="login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
