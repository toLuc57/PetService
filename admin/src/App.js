import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { orderInputs, productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode, currentAdmin } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {currentAdmin ? 
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="users">
                <Route index element={<List type="users"/>} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="services">
                <Route index element={<List type="services"/>} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New Service" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<List type="products"/>} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={productInputs} title="Add New Product" />}
                />
              </Route>
              <Route path="orders">
                <Route index element={<List type="orders"/>} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={orderInputs} title="Add New Order" />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        :
        <BrowserRouter>
          <Routes>
            <Route path="/">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      }
      
    </div>
  );
}

export default App;
