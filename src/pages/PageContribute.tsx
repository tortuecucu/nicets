import { ArrowRight } from 'react-bootstrap-icons';

const PageContribute = () => {
    return (
        <>
            <div className="container bg-body rounded shadow-sm mt-5 px-4">
                <div className="row flex-lg-row-reverse align-items-center border-bottom">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src="/imgs/people.png" className="d-block mx-lg-auto img-fluid" alt="NICE Improvement" width="700" height="500" loading="lazy"></img>
                    </div>
                    <div className="col-lg-6 ps-4">
                        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Faisons-le, ensemble !</h1>
                        <p className="lead">Nous n'irons jamais aussi loin qu'avec vous.<br></br>Aidez-nous à définir un nouveau standard de résolution des pannes informatiques</p>
                        <a href="/nice" className="btn btn-outline-primary btn-lg rounded-pill">L'essentiel du projet NICE <ArrowRight className='ms-2'/></a>
                    </div>
                </div>
                <div className="row flex-lg-row-reverse align-items-center py-5 mt-1 border-bottom">
                    <div className="row row-cols-1 row-cols-md-2 align-items-md-center py-1">
                        <div className="col d-flex flex-column align-items-start gap-2">
                            <h2 className="fw-bold text-body-emphasis">Rejoignez-nous sur Yammer</h2>
                            <p className="text-body-secondary">La communauté Yammer est l'endroit idéal pour échanger avec l'équipe projet et les autres utilisateurs.</p>
                            <a href="https://web.yammer.com/main/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIzNjc0MDM4MjcyMSJ9" className="btn btn-primary btn-lg">Aller sur Yammer</a>
                        </div>
                        <div className="col">
                            <div className="row row-cols-1 row-cols-sm-2 g-4">
                                <div className="col d-flex flex-column gap-2">
                                    <div
                                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">

                                    </div>
                                    <h4 className="fw-semibold mb-0 text-body-emphasis">Choisissez</h4>
                                    <p className="text-body-secondary">Choisissez les prochaines améliorations et fonctionnalités</p>
                                </div>

                                <div className="col d-flex flex-column gap-2">
                                    <div
                                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">

                                    </div>
                                    <h4 className="fw-semibold mb-0 text-body-emphasis">Partagez</h4>
                                    <p className="text-body-secondary">Partagez vos impressions avec la communauté</p>
                                </div>

                                <div className="col d-flex flex-column gap-2">
                                    <div
                                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">

                                    </div>
                                    <h4 className="fw-semibold mb-0 text-body-emphasis">Echangez</h4>
                                    <p className="text-body-secondary">Posez-nous vos questions et évaluez nos réponses.</p>
                                </div>

                                <div className="col d-flex flex-column gap-2">
                                    <div
                                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">

                                    </div>
                                    <h4 className="fw-semibold mb-0 text-body-emphasis">Remontez</h4>
                                    <p className="text-body-secondary">Singalez nous les erreurs ou les bugs rencontrés</p>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
                <div className="row flex-lg-row-reverse align-items-center py-5 mt-1 border-bottom">
                    <div className="row row-cols-1 row-cols-md-2 align-items-md-center py-1">
                        <div className="col d-flex flex-column align-items-start gap-2">
                            <h2 className="fw-bold text-body-emphasis">Vos idées comptent</h2>
                            <p className="text-body-secondary">Prochainement, nous vous inviterons à participer à un défi sur Improve</p>
                            <a href="https://improve.idhall.com/" className="btn btn-primary btn-lg">Aller sur Improve</a>
                        </div>
                        <div className="col">
                            <div className="row row-cols-1 row-cols-sm-2 g-4">
                                <div className="col d-flex flex-column gap-2">
                                    <div
                                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">

                                    </div>
                                    <h4 className="fw-semibold mb-0 text-body-emphasis">Une idée, une IP</h4>
                                    <p className="text-body-secondary">Engagez vous dans le projet tout en activant votre innovation participative</p>
                                </div>

                                <div className="col d-flex flex-column gap-2">
                                    <div
                                        className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">

                                    </div>
                                    <h4 className="fw-semibold mb-0 text-body-emphasis">Des goodies</h4>
                                    <p className="text-body-secondary">Participez à vos challenges et renportez des cadeaux</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="row flex-lg-row-reverse align-items-center py-5 my-3">
                    <div className="row row-cols-1 row-cols-md-2 align-items-md-center py-1">
                        <div className="col d-flex flex-column align-items-start gap-2">
                            <h2 className="fw-bold text-body-emphasis">Nous contacter</h2>
                            <p className="text-body-secondary">Si vous préférez les solutions plus classiques, envoyez-nous simplement un courriel</p>
                            <a href="mailto:francois-xavier.zakrzewski@safrangroup.com" className="btn btn-light btn-lg">Contacter le responsable projet</a>
                        </div>
                        <div className="col">
                            <div className="row row-cols-1 row-cols-sm-2 g-4">
                                

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};



export default PageContribute;
