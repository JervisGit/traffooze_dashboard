import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from './LoginPage/LoginPage';
import UpdatesMap from './TrafficUpdates';
import TrafficFlowForecast from './TrafficFlowForecast';
import TrafficCountForecast from './TrafficCountForecast';
import Account from './account';
import FavoriteLocations from './FavoriteLocations';
import TrafficUpdatesTable from './TrafficUpdatesTable'
import TrafficUpdatesMap from './TrafficUpdatesMap';
import MapContainer from './MapContainer';
import NavigationMap from './NavigationMap';
import ErpTable from './ErpTable'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrafficFlowForecast />} />
        <Route path="/count" element={<TrafficCountForecast />} />
        <Route path="/traffic_updates" element={<TrafficUpdatesTable />} />
        <Route path="/updates_map" element={<TrafficUpdatesMap />} />
        <Route path="/erp" element={<ErpTable />} />
        <Route path="/navigation" element={<NavigationMap />} />
        <Route path="/account" element={<Account />} />
        <Route path="/favorite" element={<FavoriteLocations />} />
        <Route path="/mapcontainer" element={<MapContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
