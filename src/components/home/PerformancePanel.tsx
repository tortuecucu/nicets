import { useNavigate } from "react-router-dom";

const PerformancePanel = () => {
    function formatMttr(minutes: number) {
        if (minutes < 60) {
            return minutes + ' minutes';
        } else {
            return `${Math.floor(minutes / 60)}h${minutes % 60}`;
        }
    }

    const handleNavigate = () =>{
        const navigate = useNavigate()
        navigate('/dashboard')
    }

    return ( //NEXT: enable it with dashboard feature
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h5 className="pb-0 mb-0">Notre performance</h5>
                <p className="fw-light text-secondary mb-4">Dans le rétablissement des services</p>
                <ul className="list-group list-group-horizontal mb-4">
                    <li className="list-group-item w-50 text-center bg-light">
                        <p className="fs-2 fw-bold mb-0 lh-1 text-success">{'TBD' /*formatMttr(mttr)*/}</p>
                        <p className="pb-0 mt-1 fw-light fs-6 lh-1 text-black-50">MEAN TIME TO RESOLVE</p>
                    </li>
                    <li className="list-group-item w-50 text-center bg-light">
                        <p className="fs-2 fw-bold mb-0 lh-1 text-primary">{'TBD' /*nps*/}</p>
                        <p className="pb-0 mt-1 fw-light fs-6 lh-1 text-black-50">NET PROMOTER SCORE</p>
                    </li>
                </ul>
                <a onClick={handleNavigate} className="btn btn-outline-primary w-100 mt-2 mb-4">Notre performance en détail</a>
            </div>
        </>
    )
}

export { PerformancePanel }