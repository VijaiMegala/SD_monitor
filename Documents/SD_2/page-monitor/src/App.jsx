import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { MainChart } from './components/MainChart';
import { ChartProvider } from "./context/CharContext";

function App() {
  return (
    <ChartProvider>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/chart/:id" element={<MainChart/>}></Route>
      </Routes>
    </ChartProvider>
  );
}

export default App;
