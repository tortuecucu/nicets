import { PacmanLoader } from "react-spinners";

export default function Loader({ children }) {
    return (
        <div className="my-3 p-2 bg-info rounded shadow-sm">
            <h5 className="text-white">Chargement...</h5>
            <PacmanLoader color="#ffffff"/>
            { children}
        </div>
    );
}