import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import OtherUserProfile from "./components/OtherUserProfile";
import NotFound from "./components/NotFound";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:userid",
    element: <OtherUserProfile />,
  },
  {
    path: "/create",
    element: <CreateQuote />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
