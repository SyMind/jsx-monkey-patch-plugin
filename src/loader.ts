function jsxMonkeyPatchLoader(this: any, source: string): string {
    const {path} = this.getOptions()

    return `
        const customJSXMonkeyPatch = require(${JSON.stringify(path)}).default

        ${source}

        ['jsxDEV', 'jsx', 'jsxs'].forEach(function (key) {
            var orig = module.exports[key]
            if (orig) {
                module.exports[key] = function () {
                    var args = Array.prototype.slice.call(arguments)
                    var [type, {children, ...props}, key, ...rest] = args
                    if (!Array.isArray(children)) {
                        children = [children]
                    }
                    function createElement(customType, {key, ...customProps}, ...customChildren) {
                        return orig(
                            customType,
                            {
                                ...customProps,
                                children: customChildren.length === 1 ? customChildren[0] : customChildren
                            },
                            key,
                            ...rest
                        )
                    }
                    return customJSXMonkeyPatch(createElement)(type, {...props, key}, ...children)
                }
            }
        })
    `
}

export default jsxMonkeyPatchLoader
