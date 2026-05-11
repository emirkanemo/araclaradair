import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import TablePage from './TablePage';
import NewsDetailPage from './NewsDetailPage';
import GasStationsPage from './GasStationsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:brand" element={<TablePage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/gas-stations" element={<GasStationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
