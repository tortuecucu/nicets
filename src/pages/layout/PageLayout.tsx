import { Outlet, } from "react-router-dom";
import { LayoutMode } from "src/types/layout";
import { Head } from "src/pages/layout/common/Head";
import { Foot } from "src/pages/layout/common/Foot";

const PageLayout = (props: { header?: React.JSX.Element, footer?: React.JSX.Element }) => {
    return (<>
        {props.header && props.header}
        <main className="container">
            <Outlet />
        </main>
        {props.footer && props.footer}
    </>)
};

const Layout = (props: { mode: LayoutMode }) => {
    return (
        <PageLayout header={<Head mode={props.mode}/>} footer={<Foot mode={props.mode} />} />
    )
}

export { PageLayout, Layout };