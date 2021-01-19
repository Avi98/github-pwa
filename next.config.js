const path = require("path");
const { join } = require("path");
const fs = require('fs')

const { readFile, writeFile } = require("fs-extra");
const exportSw = require("./exportSw");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");


module.exports = {
  // exportPathMap: exportSw,
  webpack: (config, { isServer, buildId, dev, ...rest }) => {
    config.node = {
      fs: "empty",
    };
    // Next build metadata files that shouldn't be included in the pre-cache manifest.
    const preCacheManifestBlacklist = [
      "react-loadable-manifest.json",
      "build-manifest.json",
      /\.map$/,
    ];

    const defaultInjectOpts = {
      exclude: preCacheManifestBlacklist,
      modifyURLPrefix: {
        "static/": "_next/static/",
        "public/": "_next/public/",
      },
    };

    const defaultGenerateOpts = {
      ...defaultInjectOpts,
      // As of Workbox v5 Alpha there isn't a well documented way to move workbox runtime into the directory
      // required by Next. As a work around, we inline the tree-shaken runtime into the main Service Worker file
      // at the cost of less cacheability
      inlineWorkboxRuntime: true,
      mode: "development",
      swDest:join(__dirname, '/public/service-worker.js'),
      runtimeCaching: [
        {
          urlPattern: /^http?.*/,
          handler: "CacheFirst",
          options: {
            cacheName: "offlineCache",
            expiration: {
              maxEntries: 200,
            },
          },
        },
      ],
    };

    if (dev) {
      config.plugins.push(new GenerateSW({ ...defaultGenerateOpts }));

      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        const swCompiledPath = join(__dirname, "register-sw-compiled.js");
        if (
          entries["main.js"] &&
          !entries["main.js"].includes(swCompiledPath)
          // !dontApathutoRegisterSw
        ) {
          let content = await readFile(
            require.resolve("./register-sw.js"),
            "utf8"
          );
          // content = content.replace('{REGISTER_SW_PREFIX}', ' ');
          content = content.replace("{SW_SCOPE}", "/");

          await writeFile(swCompiledPath, content, "utf8");

          entries["main.js"].unshift(swCompiledPath);
        }
        return entries;
      };
    
    }
    if (isServer) {
      const devSwSrc = join(__dirname, "service-worker.js");

      
      config.plugins.push(
        new HtmlWebpackPlugin({
          filename: `shell.html`,
          template: path.resolve(__dirname, "default.ejs"),
          nextData: {
            dataManager: [],
            props: {
              isServer: false,
              initialState: {},
              initialProps: {},
            },
            page: "/" + "shell",
            query: {},
            buildId: buildId,
            isFallback: false,
            customServer: true,
            gip: true,
            appGip: true,
            isAppShell: true,
            head: [],
          },
        })
      );
    }
    return config;
  },
};
