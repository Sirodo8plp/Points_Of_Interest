import React from "react";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Layout } from "./components/Layout/Layout";
import Register from "./pages/Register/Register";
import SignIn from "./pages/SignIn/SignIn";
import SearchPlace from "./pages/Places/SearhPlace";
import PointOfInterestContainer from "./pages/PointOfInterest/PointOfInterestContainer";
import Profile from "./pages/Profile/Profile";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="register" element={<Register />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="places" element={<SearchPlace />} />
        <Route path="POI/:coordinates" element={<PointOfInterestContainer />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
