import {Compiler, NormalModule} from 'webpack'

const PLUGIN_NAME = 'JSXMonkeyPatchPlugin'

interface JSXMonkeyPatchPluginOptions {
    path: string
}

class JSXMonkeyPatchPlugin {
    path: string

    constructor(options: JSXMonkeyPatchPluginOptions) {
        this.path = options.path
    }

    apply(compiler: Compiler): void {
        const isWebpackV5 = compiler.webpack && compiler.webpack.version >= '5'

        compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
            const tapCallback = (_: any, normalModule: NormalModule): void => {
                const rawRequest = normalModule.rawRequest || ''
                if (['react/jsx-runtime', 'react/jsx-dev-runtime'].includes(rawRequest)) {
                    normalModule.loaders.push({
                        loader: require.resolve('./loader'),
                        options: {
                            path: this.path
                        },
                        ident: null,
                        type: null
                    })
                }
            }

            if (isWebpackV5) {
                NormalModule.getCompilationHooks(compilation).beforeLoaders.tap(
                    PLUGIN_NAME,
                    tapCallback
                )
            } else {
                compilation.hooks.normalModuleLoader.tap(PLUGIN_NAME, tapCallback)
            }
        })
    }
}

export default JSXMonkeyPatchPlugin
