/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('webhook', () => {
  const webhook = require('../../lib/webhook')

  const challenge = {
    key: 'key',
    name: 'name'
  }

  describe('notify', () => {
    it('fails when no webhook URL is provided via environment variable', () => {
      expect(webhook.notify(challenge)).to.eventually.throw('options.uri is a required argument')
    })

    it('fails when supplied webhook is not a valid URL', () => {
      expect(webhook.notify(challenge, 'localhorst')).to.eventually.throw('Invalid URI "localhorst"')
    })

    it('submits POST with payload to existing URL', () => {
      expect(webhook.notify(challenge, 'https://enlm7zwniuyah.x.pipedream.net/')).to.eventually.not.throw()
    })
  })
})
