import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiProvider from "./contexts/ApiProvider";
import { Layout } from "./pages/Layout"
import Home from "./pages/Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './App.css'


function App() {

  //TODO: api provider
  return (
    <>
      <ApiProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </>
  )
}

export default App
