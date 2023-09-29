const isExport = process.env.EXPORT

const config = isExport
    ? {
          images: {
              loader: 'akamai',
              path: '',
          },
          assetPrefix: './',
      }
    : {}

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    typescript: {
      ignoreBuildErrors: true
    },
    future: {
        webpack5: true,
    },
    ...config,
}
