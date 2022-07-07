import {Compiler, NormalModule} from 'webpack'

const PLUGIN_NAME = 'JSXMonkeyPatchPlugin'

class JSXMonkeyPatchPlugin {
    apply(compiler: Compiler): void {
        const isWebpackV5 = compiler.webpack && compiler.webpack.version >= '5'

        compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
            function tapCallback(_: any, normalModule: NormalModule) {
                const rawRequest = normalModule.rawRequest || ''
                if (['react/jsx-runtime', 'react/jsx-dev-runtime'].includes(rawRequest)) {
                    // TODO
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
