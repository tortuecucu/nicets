const dispatcherFactory = (id, notBefore, repeatsAfter) => {

    return {
        id: id,
        shouldDisplay: false,
        afterDisplay: () => { }
    }
}

export { dispatcherFactory }