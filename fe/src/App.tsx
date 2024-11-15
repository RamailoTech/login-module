import { Routes, Route } from "react-router-dom";
import { Profile, Login, NotFound } from "./pages/index";
import PrivateRoute from "./components/PrivetRoutes/index";

const App = () => {
  return (

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
};

export default App;