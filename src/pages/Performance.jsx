import { ConeStriped } from 'react-bootstrap-icons';
import './performance.css'

const Performance = () => {
    return (
        <>
            <div className="container bg-body rounded shadow-sm mt-5 px-4">
                <div className="row flex-lg-row-reverse align-items-center border-bottom">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src="/imgs/performance.png" className="d-block mx-lg-auto img-fluid" alt="NICE Performance" width="700" height="500" loading="lazy"></img>
                    </div>
                    <div className="col-lg-6 ps-4">
                        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Vous avez le dernier mot</h1>
                        <p className="lead">Désormais, la satisfaction de chaque utilisateur est la mesure principale de notre performance, pendant et après la résolution d'un incident.</p>
                        <p className="lead">Aussi, nos indicateurs clés seront actualisés à chaque incident et disponible à tous.</p>
                    </div>
                </div>
                <div className="row flex-lg-row-reverse align-items-center py-5 mt-1 border-bottom">
                    <div className="row row-cols-1 row-cols-md-2 align-items-md-center py-1">
                        <div className="col d-flex flex-column align-items-start gap-2">
                            <ConeStriped height={64} width={64} color='#FF4D53'></ConeStriped>
                            <h2 className="fw-bold text-body-emphasis">Encore un peu de patience...</h2>
                            <p className="text-body-secondary">Nous ne sommes pas encore prêts à dévoiler cette fonctionnalité.</p>
                            <p className="text-body-secondary"> En attendant, partagez avec nous et les autres utilisateurs vos attententes en matière de performance.</p>
                            <a href="/contribute" className="btn btn-primary btn-lg">Comment améliorer ce portail ?</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Performance;

