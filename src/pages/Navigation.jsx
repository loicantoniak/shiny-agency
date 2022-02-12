import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "../components/error/Error";
import Header from "../components/header/Header";
import Home from "./Home";
import Results from "./Results";
import Survey from "./Survey";
import Freelances from "./Freelances";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire/:questionnaireId" element={<Survey />} />
        <Route path="/resultats" element={<Results />} />
        <Route path="/freelances" element={<Freelances />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
