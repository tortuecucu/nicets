import { ChildrenProp } from "src/types/common";
import { FunctionComponent} from 'react';

type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6

type TitledContentProps = {
    children: ChildrenProp,
    title: string,
    lead: string,
    divClass: string,
    leadClass: string,
    titleClass: string,
    level: HeaderLevel
}

type HeadingProps = {
    level: HeaderLevel,
    children: any,
    className: string
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HeadingComponent: FunctionComponent<HeadingProps> = (props: HeadingProps) => {
    const Tag = `h${props.level}` as HeadingTag;
    return (
        <Tag>{props.children}</Tag>
    )
}

const TitledContent = (props: TitledContentProps) => {
    return (
        <div className={props.divClass}>
            <HeadingComponent level={props.level} className={props.titleClass}>{props.title}</HeadingComponent>
            {(props.lead) && <p className={props.leadClass}>{props.lead}</p>}
            {props.children}
        </div>
    )
}
TitledContent.defaultProps = {
    title: undefined,
    titleClass: 'mb-2',
    lead: undefined,
    leadClass: 'lead',
    divClass: '',
    level: 4
}

export { TitledContent }