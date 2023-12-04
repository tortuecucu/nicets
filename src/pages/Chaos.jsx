import { Children } from 'react';
import { CheckLg, StopwatchFill, ExclamationTriangleFill, Play } from 'react-bootstrap-icons';

function StackItem({ name, status, total, done }) {
    let icon = <Play color="var(--gray-500)" />;
    switch (status) {
        case 'late':
            icon = <StopwatchFill color="var(--bs-warning)" />;
            break;
        case 'error':
            icon = <ExclamationTriangleFill color="var(--bs-danger)" />;
            break;
        case 'success':
            icon = <CheckLg color="var(--bs-success)" />;
            break;
    }

    return (
        <>
            <li className={"list-group-item p-2 stackitem " + status}>
                <div className="d-flex flex-row align-items-center">
                    {icon}
                    <span className="mx-2 name">{name}</span>
                    <span className="ms-auto fw-light counter">{done}/{total}</span>
                </div>
            </li>
        </>
    )
}

function Stack({ name, children }) {
    var done = 0;
    var total = 0;
    Children.forEach(children, (child) => {
        try {
            if(child.type.name=="StackItem"){
                done = done + child.props.done;
                total = total + child.props.total;
            }
            
        } catch (error) {
            console.log(child, error);
        }
    });
    var percent=Math.round((done/total)*100);
    return (
        <>
            <div className="stack w-auto">
                <ul className="list-group">
                    <li className="list-group-item bg-body-tertiary">
                        <h6>{name}</h6>
                        <div className="progress" style={{ height: '5px' }}>
                            <div className="progress-bar bg-success" role="progressbar" style={{ width: percent+'%' }}></div>
                        </div>
                    </li>
                    {children}
                </ul>
            </div>
        </>
    )
}

const Chaos = () => {
    return (
        <>
            <div className="my-3 p-3 bg-body rounded shadow-sm m-5">
                <h3 className="mb-3">The stack of chaos</h3>
                <div className="row d-flex">

                    <Stack name="User">
                        <StackItem name="Legacy account" status="success" total={1} done={1} />
                        <StackItem name="OneAD account" status="ongoing" total={5} done={3} />
                        <StackItem name="Application account" status="success" total={1} done={1} />
                        <StackItem name="Rights" status="ongoing" total={7} done={4} />
                    </Stack>
                    <Stack name="Client">
                        <StackItem name="Browser" status="ongoing" total={10} done={4} />
                        <StackItem name="Application" status="late" total={10} done={4} />
                        <StackItem name="VDI Launcher" status="ongoing" total={10} done={4} />
                    </Stack>
                    <Stack name="Computer">
                        <StackItem name="Hardware" status="ongoing" total={10} done={4} />
                        <StackItem name="OS" status="ongoing" total={10} done={4} />
                        <StackItem name="Security" status="ongoing" total={10} done={4} />
                        <StackItem name="Network Card" status="ongoing" total={10} done={4} />
                    </Stack>
                    <Stack name="Network">
                        <StackItem name="Connectivity" status="ongoing" total={10} done={4} />
                        <StackItem name="Lan / Wan" status="ongoing" total={10} done={4} />
                        <StackItem name="Core Network" status="ongoing" total={10} done={4} />
                        <StackItem name="BDS" status="ongoing" total={10} done={4} />
                    </Stack>
                    <Stack name="Infrastructure">
                        <StackItem name="Datacenter" status="ongoing" total={10} done={4} />
                        <StackItem name="Virtualization" status="success" total={10} done={4} />
                        <StackItem name="Server" status="ongoing" total={10} done={4} />
                        <StackItem name="Service" status="ongoing" total={10} done={4} />
                        <StackItem name="My Mobility" status="ongoing" total={10} done={4} />
                    </Stack>
                    <Stack name="Application">
                        <StackItem name="DBA" status="ongoing" total={10} done={4} />
                        <StackItem name="Reverseproxy" status="ongoing" total={10} done={4} />
                        <StackItem name="Svs accounts" status="error" total={10} done={4} />
                        <StackItem name="Certificate" status="ongoing" total={10} done={4} />
                    </Stack>
                </div>

            </div>
        </>
    );
};

export default Chaos;