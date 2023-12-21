import React, { ReactNode } from "react"
import { ChildrenProp } from "src/types/common"

export type RenderProps = {
    condition: boolean | (() => boolean) ,
    children: ChildrenProp,
    fallback?: React.ReactElement
}

type RenderOneProps = {
    fallback?: React.ReactElement,
    children: React.ReactElement | Array<React.ReactElement>
}

type RenderElement = {
    props: RenderProps
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

type ChildType = React.ReactElement | string | number | Iterable<ReactNode> | RenderElement

function isRender(child: ChildType): child is RenderElement {
    return (child as RenderElement).props.condition !== undefined;
    
  }

const RenderOne = (props: RenderOneProps) => {
    const items: Array<ChildType> = React.Children.toArray(props.children)
    const renders: Array<RenderElement> = items.filter<RenderElement>(isRender)
    const firstRenderable: RenderElement | undefined = renders.find(r => evaluator(r.props.condition))

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