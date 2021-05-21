/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const path = require('path')
const utils = require('../lib/utils')

module.exports = function serveAngularClient () {
  return ({ url }, res, next) => {
    if (!utils.startsWith(url, '/api') && !utils.startsWith(url, '/rest')) {
      res.sendFile(path.resolve(__dirname, '../frontend/dist/frontend/index.html'))
    } else {
      next(new Error('Unexpected path: ' + url))
    }
  }
}
