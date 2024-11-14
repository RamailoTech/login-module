// App.tsx
import { Routes, Route } from "react-router-dom";

import { Profile, Login, NotFound } from "./pages/index";

const App = () => {
  return (

    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
};

export default App;