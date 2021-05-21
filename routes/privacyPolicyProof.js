/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const path = require('path')
const utils = require('../lib/utils')
const challenges = require('../data/datacache').challenges

module.exports = function servePrivacyPolicyProof () {
  return (req, res) => {
    utils.solveIf(challenges.privacyPolicyProofChallenge, () => { return true })
    res.sendFile(path.resolve(__dirname, '../frontend/dist/frontend/assets/private/thank-you.jpg'))
  }
}
