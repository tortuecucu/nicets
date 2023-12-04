export default function ResultBadge({label, type, yes, no}) {
    return(
        <div className="row">
                <div className="col col-3">
                    <span className="badge d-flex p-2 align-items-center rounded-pill text-bg-danger">
                        <span className="text-center w-auto me-auto">Colomiers</span>
                        <span className="bg-body text-bg-success rounded-pill p-1 ms-2 text-dark fw-lighter ratio-1x1 py-2">25%</span>
                    </span>
                    <span className="badge mt-2 d-flex p-2 align-items-center rounded-pill text-bg-success justify-content-between">
                        <span className="bg-body text-bg-success rounded-pill p-1 me2 text-dark fw-lighter ratio-1x1 py-2">25%</span>
                        <span>Colomiers</span>
                    </span>
                    <span className="mt-2 badge d-flex p-2 align-items-center rounded-pill bg-success-subtle justify-content-between">
                        <span className="bg-success rounded-pill p-1 me-2 text-white fw-lighter ratio-1x1 py-2">75%</span>
                        <span className="text-dark">Colomiers</span>
                        <span className="bg-danger rounded-pill p-1 ms-2 text-white fw-lighter ratio-1x1 py-2">25%</span>
                    </span>
                    <span className="mt-2 badge d-flex p-2 align-items-center rounded-pill bg-body-secondary text-dark">
                        <span className="me-auto">Colomiers</span>
                        <span className="bg-body bg-success-subtle text-success rounded-pill rounded-end p-1 me-0 text-dark fw-lighter ratio-1x1 py-2 border-end">25</span>
                        <span className="bg-body bg-danger-subtle text-danger rounded-pill p-1 ms-0 rounded-start text-dark fw-lighter ratio-1x1 py-2">25</span>
                    </span>

                    <div className="row">
                        <div className="bdg ">
                            <span className="mt-2 badge d-flex p-0 align-items-center rounded-pill bg-body-secondary text-dark">
                                <span className="me-auto p-2 pe-3">Colomiers</span>
                                <span className="bg-body bg-success-subtle text-success rounded-pill rounded-end p-1 me-0 fw-lighter p-2 flex-even text-center">5</span>
                                <span className="bg-body bg-danger-subtle text-danger rounded-pill ms-0 rounded-start fw-lighter p-2 flex-even text-center">255</span>
                            </span>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="inner ">
                            <div className="bicolor">
                                <div className="content position-relative px-4 py-1">
                                    <span className="invisible">25 Pont-Audemer 25</span>
                                    <div className="bar success w-50 bg-success-subtle h-100 position-absolute top-50 start-0 translate-middle-y rounded-end rounded-pill"><span className="result ps-2 text-success align-middle fw-light">25</span></div>
                                    <div className="bar danger w-50 bg-danger-subtle position-absolute top-50 end-0 translate-middle-y h-100 rounded-start rounded-pill text-end"><span className="result pe-2 text-danger align-middle  fw-light">25</span></div>
                                    <span className="position-absolute top-50 start-50 translate-middle w-100 text-center">Pont-Audemer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    )
};