"use strict";

const functions = require("./functions");

module.exports.images = (event, context, callback) => {
  return functions
    .images("samhood")
    .then(result => {
      const response = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {},
        body: result
      };
      callback(null, response);
    })
    .catch(e => {
      const error = {
        statusCode: 501,
        body: e.message
      };

      callback(null, error);
    });
};

module.exports.image = (event, context, callback) => {
  return functions
    .image("samhood", event["path"]["filename"])
    .then(result => {
      const response = {
        isBase64Encoded: true,
        statusCode: 200,
        headers: {},
        body: result
      };

      callback(null, response);
    })
    .catch(e => {
      const error = {
        statusCode: 501,
        body: e.message
      };
      callback(null, error);
    });
};

module.exports.faceSearch = (event, context, callback) => {
  return functions
    .faceSearch("samhoodfaces", event["path"]["faceId"])
    .then(result => {
      const response = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {},
        body: result
      };

      callback(null, response);
    })
    .catch(e => {
      const error = {
        statusCode: 501,
        body: e.message
      };
      callback(null, error);
    });
};

module.exports.getFaces = (event, context, callback) => {
  return functions
    .getFaces("samhood", "samhoodfaces", event["path"]["image"])
    .then(result => {
      const response = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {},
        body: result
      };

      callback(null, response);
    })
    .catch(e => {
      const error = {
        statusCode: 501,
        body: e.message
      };
      callback(null, error);
    });
};
