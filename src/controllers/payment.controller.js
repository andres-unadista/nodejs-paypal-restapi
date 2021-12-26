import axios from "axios"
import { param } from "express/lib/request";
import { HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from "../config"

const config_order = {
  "intent": "CAPTURE",
  "purchase_units": [
    {
      "amount": {
        "currency_code": "USD",
        "value": "100.00"
      }
    }
  ],
  application_context: {
    brand_name: "mycompany.com",
    landing_page: "LOGIN",
    user_action: "PAY_NOW",
    return_url: `${HOST}/accept-order`,
    cancel_url: `${HOST}/cancel-order`,
  }
}

export const createOrder = async (req, res) => {

  try {
    const params = new URLSearchParams();
    params.append('grant_type', "client_credentials")

    const { data: {access_token} } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token", 
      params, 
      { 
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "auth": {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET
        }
      }
    )
  
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, config_order, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
   
    res.json(response.data)
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error in server')
  }
}

export const acceptOrder = async (req, res) => {
  const {token} = req.query
  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
    "auth": {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET
    }
  })
  console.log(response.data);
  res.redirect('/payed.html')
}

export const cancelOrder = (req, res) => {
  res.redirect('/')
}