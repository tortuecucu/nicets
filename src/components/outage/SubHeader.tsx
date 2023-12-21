import { Render } from "../utils/Render";
import { OutageRecord } from "src/hooks/backend/useOutage";
import useOutageDetail from "src/hooks/backend/useOutageDetail";
import { useOutageSettings } from "src/hooks/backend/useOutageSettings";
import { OutageDetailsProperties as Detail } from "src/types/outagedetails";

type SubHeaderProps = {
    outage: OutageRecord
}

const SubHeader = (props: SubHeaderProps) => {
    const {get: getDetail} = useOutageDetail(props.outage)
    const settings = useOutageSettings(props.outage).getSetting();

    const labels = {
        actionsDone: getDetail(Detail.ActionsDone)?.value || settings.actions.done || '',
        actionsOngoing: getDetail(Detail.ActionsOngoing)?.value || settings.actions.ongoing || '',
        actionsNext: getDetail(Detail.ActionsNext)?.value || settings.actions.next || '',
        userAttitude: getDetail(Detail.UserAttitude)?.value || settings.userAttitude,
    }

    return (<SubHeaderDumb {...labels} />)
}

type SubHeaderDumbProps = {
    actionsDone: string,
    actionsOngoing: string,
    actionsNext: string,
    userAttitude?: string,
}

const SubHeaderDumb = (props: SubHeaderDumbProps) => {
    const { actionsDone, actionsOngoing, actionsNext, userAttitude } = props;
    return (<>
        <div className="row mt-0 mb-0 p-0 border-top clearfix">
            <div className="action col col-4 bg-body  shadow-sm p-2">
                <h6 className="text-center">Actions réalisées</h6>
                <p className="text-justify p-2">{actionsDone}</p>
            </div>
            <div className="action col col-4 bg-body border border-top-0 border-bottom-0 shadow-sm p-2">
                <h6 className="text-center">Actions en cours</h6>
                <p className="text-justify p-2">{actionsOngoing}</p>
            </div>
            <div className="action col col-4 bg-body  shadow-sm p-2">
                <h6 className="text-center">Actions suivantes</h6>
                <p className="text-justify p-2">{actionsNext}</p>
            </div>
        </div>
        <Render condition={userAttitude !== undefined}>
            <div className="row">
                <div className="bg-warning-subtle shadow-sm rounded-bottom behaviour">
                    <p className="my-1">{userAttitude}</p>
                </div>
            </div>
        </Render>
    </>)
}

export { SubHeader }