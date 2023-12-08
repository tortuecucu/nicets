import { Outlet, } from "react-router-dom";
import { Head } from "../components/common/Head";
import { Foot } from "src/components/common/Foot";

const Layout = () => {
  return (<>
    <Head />
    <main className="container">
      <Outlet />
    </main>
    <Foot />
  </>)
};

export { Layout };