const { copy } = require('fs-extra');
const { join } = require('path');

// Copies the generated Service Worker into the export folder if the Next.js app is being built as
// a Static HTML app
async function exportSw(...args) {
    const [defaultPathMap, { dev, distDir, outDir }] = args;
    const swDest = 'static/service-worker.js';

    if (dev) {
      // Copy service worker from Next.js build dir into the export dir.
      console.log('distDir-------->', distDir)
      console.log('swdist-------->', swDest)
      console.log('outDir-------->', outDir)
      console.log('swDest-------->', swDest)
      // service-worker
      // service-worker
      // await copy(join(distDir, swDest), join(outDir || '', swDest));
    }

    // Run user's exportPathMap function if available.
    // return nextConfig.exportPathMap ? nextConfig.exportPathMap(...args) : defaultPathMap;
    return defaultPathMap
  };


module.exports = exportSw;