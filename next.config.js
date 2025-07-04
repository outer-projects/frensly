// Configuration options for Next.js
const runtimeCaching = require("next-pwa/cache")

const nextConfig = {
    reactStrictMode: true, // Enable React strict mode for improved error handling
    swcMinify: true,      // Enable SWC minification for improved performance
    
    compiler: {
      removeConsole: false, // Remove console.log in production
    },
  };
  
  // Configuration object tells the next-pwa plugin 
  const withPWA = require("next-pwa")({
    dest: "public", // Destination directory for the PWA files
    mode: 'production',
    disable: false, // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/]
  });
  
  // Export the combined configuration for Next.js with PWA support
  module.exports = withPWA(nextConfig);