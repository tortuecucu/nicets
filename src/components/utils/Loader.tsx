import { PacmanLoader } from "react-spinners";

type LoaderProps = {
    children: React.ReactElement
}

export default function Loader(props: LoaderProps) {
    return (
        <div className="my-3 p-2 bg-info rounded shadow-sm">
            <h5 className="text-white">Chargement...</h5>
            <PacmanLoader color="#ffffff"/>
            { props.children}
        </div>
    );
}