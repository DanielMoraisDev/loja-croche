import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.tsx";
import ItemPage from "./pages/ItemPage/ItemPage.tsx";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/item/:id"
            element={
              <>
                <ItemPage />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
