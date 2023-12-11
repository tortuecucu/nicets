import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationPage } from "./pages/login/Login";
import { MustAuthenticate } from "./router/MustAuthenticate";



//pages
import { Layout } from "./pages/Layout"
import { PageNotFound } from "./components/utils/BigMessages";
import Home from "./pages/home/Home";

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ContextsProvider } from "./contexts/ContextsProvider";

function App() {
  return (
    <>
      <ContextsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MustAuthenticate><Layout /></MustAuthenticate>}>
              <Route index element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="login" element={<AuthenticationPage />} />
          </Routes>
        </BrowserRouter>
      </ContextsProvider>
    </>
  )
}

export default App