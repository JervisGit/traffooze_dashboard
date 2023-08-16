import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from './LoginPage/LoginPage';
import UpdatesMap from './TrafficUpdates';
import TrafficFlowForecast from './TrafficFlowForecast';
import TrafficCountForecast from './TrafficCountForecast';
import Account from './account';
import FavoriteLocations from './FavoriteLocations';
import TrafficJamUpdates from './TrafficJamUpdates';
import TrafficUpdatesMap from './TrafficUpdatesMap';
import MapContainer from './MapContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/trafficUpdates" element={<UpdatesMap />} />
        <Route path="/flow" element={<TrafficFlowForecast />} />
        <Route path="/count" element={<TrafficCountForecast />} />
        <Route path="/trafficjam" element={<TrafficJamUpdates />} />
        <Route path="/updates_map" element={<TrafficUpdatesMap />} />
        <Route path="/account" element={<Account />} />
        <Route path="/favorite" element={<FavoriteLocations />} />
        <Route path="/mapcontainer" element={<MapContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
