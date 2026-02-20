/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/donate/cancel',
        destination: '/',
        permanent: false,
      },
      {
        source: '/donate/completed',
        destination: '/',
        permanent: false,
      },

    ];
  },
}

export default nextConfig
