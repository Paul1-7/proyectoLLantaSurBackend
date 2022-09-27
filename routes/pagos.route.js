const express = require('express')
const axios = require('axios')
const {
  PAYPAL_API,
  PAYPAL_CLIENT,
  PAYPAL_SECRET,
  PORT
} = require('../config/config.js')

const paymentRoute = express.Router()

paymentRoute.post('/crear-orden', async (req, res, next) => {
  try {
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '105'
          }
        }
      ],
      application_context: {
        brand_name: 'mycompany.com',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `http://localhost:${PORT}/pagos/capturar-orden`,
        cancel_url: `http://localhost:${PORT}/pagos/cancelar-orden`
      }
    }

    // format the body
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    // Generate an access token
    const {
      data: { access_token }
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: PAYPAL_CLIENT,
        password: PAYPAL_SECRET
      }
    })

    // make a request
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )

    return res.json(response.data)
  } catch (error) {
    next(error)
  }
})

paymentRoute.post('capturar-orden', (req, res, next) => {})

paymentRoute.post('cancelar-orden', (req, res, next) => {})

module.exports = paymentRoute
