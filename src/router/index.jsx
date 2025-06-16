import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayout } from "../layouts";
import { Login, NotFound, Dashboard, SiteMap, Charts, Chat, Teams, Order, CreateProject, Files, Calendar, Settings, Profile, TimeLine } from "../pages"


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/sitemap" element={<SiteMap />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/create-project" element={<CreateProject/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/files" element={<Files/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/timeline" element={<TimeLine/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
