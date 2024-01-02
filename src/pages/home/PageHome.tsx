
import News from 'src/components/home/News';
import Headline from 'src/components/home/Headline';
import { OutagesPanel } from 'src/components/home/outages/OutagePanel';
import { PerformancePanel } from "src/components/home/PerformancePanel";
import { TipsPanel } from "src/components/home/TipsPanel";
import { NicePanel } from 'src/components/home/NicePanel';
import { EngagePanel } from 'src/components/home/EngagePanel';

import "src/pages/home/home.css"

const PageHome = () => {
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
          <EngagePanel />
          <NicePanel />
        </div>
      </div>
    </>
  );
};

export default PageHome;