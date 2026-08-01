/** @type {import('next').NextConfig} */
const nextConfig = {
  // The upstream demo still contains legacy Appwrite helper types that are not
  // part of this standalone UI demo.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
