import { BrowserRouter } from "react-router-dom";
import { ContextsProvider } from "src/contexts/ContextsProvider";
import Router from "src/router/Router";

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

function App() {
  return (
    <ContextsProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ContextsProvider >
  )
}

export default App