
import config from "../config.json";
import News from '../components/home/News';
import Headline from '../components/home/Headline';
import { OutagesPanel } from '../components/home/OutagePanels';

import "./home.css"

function PerformancePanel({ baseURl, nps, mttr }) {
  function formatMttr(minutes) {
    if (minutes < 60) {
      return minutes + ' minutes';
    } else {
      return `${Math.floor(minutes / 60)}h${minutes % 60}`;
    }
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
        <a href={baseURl + '/dashboard'} className="btn btn-outline-primary w-100 mt-2 mb-4">Notre performance en détail</a>
      </div>
    </>
  )
}

function TipsPanel({ baseUrl }) {
  return (
    <>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h5 className="pb-2 mb-4">Besoin du support informatique ?</h5>
        <div className="d-flex flex-row">
          <div className="image">
            <img src="assets/wizard.png" width="150"></img>
          </div>
          <div className="ms-2">
            <p className="lead fs-5">Formuler votre besoin efficacement est la clé pour obtenir le bon support au bon moment.</p>
            <p className="lead fs-6">Utilisez notre assistant pour faire bon du premier coup.</p>
            <a href={baseUrl + '/how-to'} className="btn btn-primary w-100 mb-4">J'utilise l'assistant</a>
          </div>
        </div>
      </div>
    </>
  )
}

const Home = () => {
  return (
    <>
      <Headline />
      <OutagesPanel />
      <div className="row">
        <div className="col col-5">
          <PerformancePanel baseURl={config.HOME_URL} nps={43} mttr={92} />
          <News />
        </div>
        <div className="col">
          <TipsPanel baseUrl={config.HOME_URL} />

          <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5 className="pb-2 mb-4">Réagissez, participez, améliorez !</h5>
            <div className="d-flex flex-row">
              <div className="image p-2">
                <img src="assets/people.png" width="150"></img>
              </div>
              <div className="ps-2">
                <p className="lead fs-5">Aidez-nous à améliorer encore votre satisfaction</p>
                <p className="lead fs-6">Nous avons conçu ce portail pour qu'il vous donne accès à tout ce que vous avez besoin quand un incident informatique survient.</p>
                <p className="lead fs-6">Nous avons besoin de vous pour savoir si nous avons atteint notre objectif et toujours faire mieux.</p>
                <a href="/contribute" className="btn btn-success w-100 mb-4">Je participe à l'amélioration</a>
              </div>
            </div>
          </div>

          <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h5 className="pb-2 mb-4">Le projet NICE en 2 minutes</h5>
            <div className="d-flex flex-row">
              <div className="image">
                <img src="assets/team.png" width="150"></img>
              </div>
              <div className="text">
                <p className="lead fs-5">New Incident Cooperative Experience</p>
                <p className="lead fs-6">NICE est un projet green belt dont le but est d'améliorer la satisfaction des utilisteurs lorsque nous traitons les incidents informatiques.</p>
                <p className="lead fs-6">Découvrez en quelques minutes les informations clés du projet.</p>
                <a href="/nice" className="btn btn-outline-primary w-100 mb-4">Je découvre le projet NICE</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;