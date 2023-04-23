import "dotenv/config";
import "./utils/db";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { middlewareUtils } from "./utils";
import { asValue } from "awilix";
import { router } from "./routes";

const loadApp = async (app, { container }) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use(middlewareUtils.checkToken);
  app.use((req, res, next) => {
    // create a scoped container
    req.scope = container.createScope();
    // register some request-specific data
    req.scope.register({
      currentUser: asValue(req.user),
    });

    next();
  });
  await router(app, { container });
  app.use(function (err, req, res, next) {
    // console.log(err);
    // console.error(err);
    console.log(err);
    console.log(res.statusCode);
    console.log(err.message);
    return res.json({ message: err.message });
    // next(err);
  });

  return app;
};

module.exports = loadApp;
