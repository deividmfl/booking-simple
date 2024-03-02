/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: { plugins: [{ removeViewBox: false }] },
          },
        },
      ],
    });
    return config;
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/im/pictures/**",
      },
      {
        protocol: "http",
        hostname: "w3.org/",
        port: "",
        pathname: "/2000/svg",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/reservation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
