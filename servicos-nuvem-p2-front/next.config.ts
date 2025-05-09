import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
    images: {
        remotePatterns: 
            [
                new URL('https://image.tmdb.org/t/p/w500/**'),
                new URL('https://image.tmdb.org/t/p/w1280/**'),
            ]
    }
}

export default nextConfig;
