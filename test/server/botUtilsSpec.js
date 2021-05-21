/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const chai = require('chai')
const expect = chai.expect
const insecurity = require('../../lib/insecurity')

describe('botUtils', () => {
  const botUtils = require('../../lib/botUtils')

  describe('testFunction', () => {
    it('returns static test response', () => {
      expect(botUtils.testFunction()).to.deep.equal({
        action: 'response',
        body: '3be2e438b7f3d04c89d7749f727bb3bd'
      })
    })
  })

  describe('couponCode', () => {
    it('response contains a valid 10% coupon code for current date', () => {
      expect(botUtils.couponCode()).to.deep.equal({
        action: 'response',
        body: `Oooookay, if you promise to stop nagging me here's a 10% coupon code for you: ${insecurity.generateCoupon(10, new Date())}`
      })
    })
  })
})
