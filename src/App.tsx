import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

//context providers
import ApiProvider from "./contexts/ApiProvider";


//common components
import { Watchdog, Fallback } from "./components/utils/Watchdog";

//pages
import { PageNotFound } from "./components/utils/BigMessages";


//pages loaded when requested


import { Layout } from "./pages/Layout"
import Home from "./pages/Home";

//styles
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


              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </>
  )
}

export default App