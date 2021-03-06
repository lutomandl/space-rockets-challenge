import AWS from "aws-sdk"

export default async function handleSubmit(values, launch, price) {
  const SES_CONFIG = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION,
  }

  const AWS_SES = new AWS.SES(SES_CONFIG)

  const { firstName, lastName, email } = values
  const { mission_name, launch_site, rocket } = launch

  try {
    const emailText = `CONGRATULATION! You have just purchased a seat in SpaceX launch!\n\n

      Name: ${firstName} ${lastName}\n\n

      Information about the launch:\n
      - Mission: ${mission_name}\n
      - Launch site: ${launch_site.site_name}\n
      - Rocket: ${rocket.rocket_name}\n\n

      - Purchase price: ${price}\n\n

      We will contact you about the next steps and other details once everything is planned and set.\n\n

      See you soon, in SPACE!\n\n

      Spacex
      `
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: emailText,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "CONGRATULATION on the SpaceX tickets!",
        },
      },
      ReplyToAddresses: ["lutomandl@gmail.com"],
      Source: "lutomandl@gmail.com",
    }

    return AWS_SES.sendEmail(params, function (err, data) {
      if (err) {
        console.log(err, err.stack)
        return false
      } else {
        console.log(data)
        return true
      }
    })
  } catch (error) {
    console.log(error)
    return false
  }
}
