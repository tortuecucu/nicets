import React, { ReactNode } from "react"
import { ChildrenProp } from "src/types/common"

export type RenderProps = {
    condition: boolean | (() => boolean) ,
    children: ChildrenProp,
    fallback?: React.ReactElement
}

const evaluator = (statement: boolean | (() => boolean)) => {
    try {
        if (typeof statement === 'function') {
            return statement()
        } else if (typeof statement == "boolean") {
            return statement
        } else {
            return false
        }
    } catch (e) {
        console.error(e)
        return false
    }
}

const Render = (props: RenderProps) => {
    if (evaluator(props.condition)) {
        return (<>{props.children}</>)
    } else if (props.fallback) {
        return (<>{props.fallback}</>)
    }
}

type RenderOneProps = {
    fallback?: React.ReactElement,
    children: React.ReactElement | Array<React.ReactElement>
}

type ChildType = React.ReactElement | string | number | Iterable<ReactNode> | RenderProps

function isRender(child: ChildType): child is RenderProps {
    return (child as RenderProps).condition !== undefined;
  }

const RenderOne = (props: RenderOneProps) => {
    const children: Array<ChildType> = React.Children.toArray(props.children)
    const renders: Array<RenderProps> = children.filter<RenderProps>(isRender)
    const firstRenderable: RenderProps | undefined = renders.find(r => evaluator(r.condition))

    if (firstRenderable) {
        return(<>{firstRenderable}</>)
    } else if (props.fallback) {
        return(<>{props.fallback}</>)
    } else {
        return(<></>)
    }
}
RenderOne.Render = Render

export { Render, RenderOne }