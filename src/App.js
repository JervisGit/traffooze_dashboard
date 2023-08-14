import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from './LoginPage/LoginPage';
import UpdatesMap from './TrafficUpdates';
import TrafficFlowForecast from './TrafficFlowForecast';
import Account from './account';
import FavoriteLocations from './FavoriteLocations';
import TrafficJamUpdates from './TrafficJamUpdates';
import MapContainer from './MapContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/trafficUpdates" element={<UpdatesMap />} />
        <Route path="/flow" element={<TrafficFlowForecast />} />
        <Route path="/trafficjam" element={<TrafficJamUpdates />} />
        <Route path="/account" element={<Account />} />
        <Route path="/favorite" element={<FavoriteLocations />} />
        <Route path="/mapcontainer" element={<MapContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
