
import News from '../components/home/News';
import Headline from '../components/home/Headline';
import { OutagesPanel } from '../components/home/outages/OutagePanels';
import { PerformancePanel } from "../components/home/PerformancePanel";
import { TipsPanel } from "../components/home/TipsPanel";

import "./home.css"

const Home = () => {
  return (
    <>
      <Headline />
      <OutagesPanel />
      <div className="row">
        <div className="col col-5">
          <PerformancePanel />
          <News />
        </div>
        <div className="col">
          <TipsPanel />

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