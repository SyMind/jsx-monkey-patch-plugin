const path = require('path')
const JSXMonkeyPatchPlugin = require('../lib').default

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        config.plugins.push(new JSXMonkeyPatchPlugin({
            path: path.resolve(__dirname, './jsxMonkeyPatch')
        }))
        return config
    }
}

module.exports = nextConfig
