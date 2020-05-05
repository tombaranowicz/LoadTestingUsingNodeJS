"use strict";

const axios = require("axios");
const argv = require('minimist')(process.argv.slice(2));

(async () => {
  
  axios.interceptors.request.use(function (config) {
    config.metadata = { startTime: new Date()}
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.get(argv.url)
  .then((response) => {
    process.stdout.write(response.duration.toString());
    process.exitCode = 0;
  })
  .catch((error) => {
    process.exitCode = 1;
  })
})();
