const jsxMonkeyPatch = createElement => (type, props, ...children) => {
    return createElement(type, props, ...children)
}

export default jsxMonkeyPatch
