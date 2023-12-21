import { SitesAffected, getSites } from "./SitesAffected";
import { OutageRecord } from "src/hooks/backend/useOutage";

type HeaderProps = {
    outage: OutageRecord,
    children?: React.ReactNode
}

//NEXT: calculate last refresh and next news
const Header = (props: HeaderProps) => {
    const {outage, children} = props;
    return (
        <>
            <div className="row header bg-body rounded-top shadow-sm mt-4 mb-0 p-3">
                <div className="d-flex">
                    <div className="">
                        <h3>{outage.service.name} - {outage.type.label}</h3>
                        <SitesAffected outage={outage} sites={getSites()} compact={true} />
                        <p className="lead">{outage.shortDescription}</p>
                    </div>
                    <div className="ms-auto align-end">
                        <p className="updated text-right my-0">Actualisé il y a <span className="value">-- minutes</span></p>
                        <p className="mailing text-right my-0">Prochaine communication dans <span className="value">-- minutes</span></p>
                    </div>
                </div>
                {children && children}
            </div>


        </>
    );
};

export { Header }