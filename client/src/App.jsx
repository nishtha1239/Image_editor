import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Edit from "./Edit";
import RecentImages from "./RecentImages";
import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen m-0 p-0 flex flex-row">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/recent-images" element={<RecentImages />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
