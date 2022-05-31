import { Route, Routes } from "react-router";
import App from "./App";
import CreateProfile from "./pages/createProfile";
import CreateRecipe from "./pages/createRecipe";
import ErrorPage from "./pages/error";
import Home from "./pages/home";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import Search from "./pages/search";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="create" element={<CreateRecipe />} />
        <Route path="create-profile" element={<CreateProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
