const nodemailer = require('nodemailer')
const { NODEMAILER_USER, NODEMAILER_PASSWORD } = require('../config/config')

let mailHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de contraseña</title>
  </head>
  <body>
    <h1>Recuperación de contraseña</h1>
    <p>Hola,</p>
    <p>Recibimos una solicitud para recuperar tu contraseña. Si no solicitaste un cambio de contraseña, por favor ignora este correo electrónico.</p>
    <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
    <a href="{{url}}">Abrir enlace</a>
    <p>Este enlace expirará en 5 minutos.</p>
    <p>Gracias</p>
  </body>
  </html>
`

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD
      }
    })

    await transporter.sendMail({
      from: NODEMAILER_USER,
      to: email,
      subject: subject,
      html: mailHtml.replace('{{url}}', text)
    })
  } catch (error) {
    console.log(error, 'email not sent')
  }
}

module.exports = sendEmail
