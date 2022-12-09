//@ts-check

const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
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
};

module.exports = withNx(nextConfig);
