type EmptyPlaceholderProps = {
    imageSrc: string,
    imageWidth: number,
    imageAlt: string,
    text: string
}

const EmptyPlaceholder = (props: EmptyPlaceholderProps) => {
    return(<div className="d-flex align-items-center">
        <img src={props.imageSrc} width={props.imageWidth} className="img-fluid" alt={props.imageAlt}></img>
        <span className="text-muted ms-2">{props.text}</span>
    </div>)
}
EmptyPlaceholder.defaultProps = {
    imageSrc: '/imgs/empty-box.svg',
    imageWidth: 72,
    imageAlt: 'Liste vide',
    text: 'cette liste est vide'
}

export {EmptyPlaceholder}