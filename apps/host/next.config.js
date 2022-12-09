// @ts-check

const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('@nrwl/next/plugins/with-nx').WithNxOptions} */
module.exports = withNx({
  nx: {
    svgr: false,
  },
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ['media.graphassets.com'],
  },
  webpack(config) {
    config.plugins.push(
      //
      // 💡
      // It's a bad practice to expose anything from host
      // which creates a circular imports.
      // It works, but it will significantly decrease maintainability.
      // Please don't expose anything here.
      // You can create a shared library or another remote module, instead.
      //
      new NextFederationPlugin({
        name: 'host',
        remotes: {
          remote: 'remote@http://localhost:3001/remote-entry.js',
        },
        filename: 'static/chunks/remote-entry.js',
        extraOptions: {},
      })
    );

    return config;
  },
});
