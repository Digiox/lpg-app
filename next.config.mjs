/** @type {import('next').NextConfig} */
import gracefulFs from "graceful-fs"
gracefulFs.gracefulify(import("fs"));

const nextConfig = {
    images: {
        domains: ['avatars.steamstatic.com'],
      },
      webpack: (config, { isServer }) => {
        // Vous pouvez choisir d'appliquer ce changement seulement pour le build côté serveur
  
          // Ceci remplace fs par graceful-fs dans la configuration de webpack
          config.resolve.alias.fs = 'graceful-fs';
        
    
        return config;
      },
};

export default nextConfig;
