import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AnalysisPage from './AnalysisPage';
import TablePage from './TablePage';
import NewsDetailPage from './NewsDetailPage';
import GasStationsPage from './GasStationsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/table/:brand" element={<TablePage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/gas-stations" element={<GasStationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
