/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['firebasestorage.googleapis.com'], // Replace with your Firebase Storage domain
    },
    compiler: {
      // Remove all console logs
       removeConsole: process.env.NODE_ENV === "production"
    },
  };
export default nextConfig;
