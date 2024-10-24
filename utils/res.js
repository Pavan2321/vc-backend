"use strict";

const ResUtil = {
  SUCCESS: (req, res, body, message) => {
    let resObject = resetRes();
    delete resObject.error;
    resObject.success.message = message;
    resObject.success.body = body;
    resObject.status_code = 200;
    res.status(200).json(resObject);
  },

  SERVER_ERROR: async (req, res, body, message) => {
    let resObject = resetRes();
    delete resObject.success;
    resObject.error.message = message;
    resObject.error.body = body || {};
    resObject.error_status = true;
    resObject.status_code = 502;
    res.status(500).json(resObject);
  },

  VALIDATION_ERROR: async (req, res, body, message) => {
    let resObject = resetRes();
    delete resObject.success;
    resObject.error.message = message;
    resObject.error.body = body;
    resObject.error_status = true;
    resObject.status_code = 400;
    res.status(400).json(resObject);
  },

  UNAUTHORIZED: async (req, res, body, message) => {
    let resObject = resetRes();
    delete resObject.success;
    resObject.error.message = message;
    resObject.error.body = body;
    resObject.error_status = true;
    resObject.status_code = 401;
    res.status(401).json(resObject);
  },

  NOTFOUND: async (req, res, body, message) => {
    let resObject = resetRes();
    delete resObject.success;
    resObject.error.message = message;
    resObject.error.body = body;
    resObject.error_status = true;
    resObject.status_code = 404;
    res.status(404).json(resObject);
  },
};

// new response object
function resetRes() {
  let resObject = {
    api_version: process.env.API_VERSION,
    success: {
      message: "",
      body: {},
    },
    error: {
      message: "",
      body: {},
    },
    error_status: false,
    status_code: 200,
  };
  return JSON.parse(JSON.stringify(resObject));
}

module.exports = ResUtil;
