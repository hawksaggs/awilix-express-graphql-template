import {
  Lifetime,
  asClass,
  asValue,
  createContainer,
  InjectionMode,
} from "awilix";

import * as utils from "./utils";
import models from "./models";

async function getInstance(options = {}) {
  const opts = {
    injectionMode: InjectionMode.PROXY,
    ...options,
  };

  const modulesToLoad = [
    [
      "services/**.js",
      {
        register: asClass,
        lifetime: Lifetime.SINGLETON,
      },
    ],
    [
      "controllers/**.js",
      {
        register: asClass,
        lifetime: Lifetime.SCOPED,
      },
    ],
  ];
  // Create the container and set the injectionMode to PROXY (which is also the default).
  return createContainer(opts)
    .loadModules(modulesToLoad, {
      formatName: "camelCase",
      cwd: __dirname,
    })
    .register({
      container: { resolve: (c) => c },
      lifetime: Lifetime.SINGLETON,
    })
    .register({
      models: asValue(models),
      lifetime: Lifetime.SINGLETON,
    })
    .register({
      utils: asValue(utils),
      lifetime: Lifetime.SINGLETON,
    });
}

let containerInstance = null;
const getContainerInstance = async (options) => {
  if (!containerInstance) containerInstance = await getInstance(options);
  return containerInstance;
};

export default getContainerInstance;
