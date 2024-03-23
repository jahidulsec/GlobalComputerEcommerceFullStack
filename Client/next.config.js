module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.globalcomputer.com.bd',
          port: '',
          pathname: '/media/images/**',
        },
        {
          protocol: 'https',
          hostname: 'api.globalcomputer.com.bd',
          port: '',
          pathname: '/media/**',
        },
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '8000',
          pathname: '/media/images/**',
        },
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '8000',
          pathname: '/media/**',
        },
      ],
    },
  }