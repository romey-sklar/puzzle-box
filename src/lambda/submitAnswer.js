export async function handler(event, context) {
  try {
    const { username, password } = event.queryStringParameters
    if (username.toLowerCase() === 'admin' && password === 's3nd n00ds') {
      return {
        statusCode: 200,
        body: JSON.stringify({
          msg: '__  +  __!  /  __!  -  __ / __  =  __'
        })
      }
    }
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Incorrect username and password combination'
      })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
