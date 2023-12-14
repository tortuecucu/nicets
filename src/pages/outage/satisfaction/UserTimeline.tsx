import { OutageType } from "src/types/outage";
import { DummyData } from "src/components/utils/Alerts";
import { Timeline } from "primereact/timeline";

type UserTimelineProps = {
    outage: OutageType
}

function UserTimeline(props: UserTimelineProps) {
    //NEXT
    const events = [
        { status: 'Déclaration helpdesk', date: '15oct 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Sondage impact', date: '15oct 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Modification impact', date: '15oct 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Confirmation retour au nominal', date: '16oct 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="pb-2 mb-0">Vos actions ont fait la différence, merci !</h6>
                <DummyData />
                <div className="d-flex text-body-secondary pt-3 mb-3">
                    <p>Vous nous avez permis de résoudre cet incident plus rapidement</p>
                </div>
                <Timeline align="right" value={events} opposite={(item) => item.status} content={(item) => <small className="date">{item.date}</small>} />
            </div>
        </>
    );
}

export {UserTimeline}