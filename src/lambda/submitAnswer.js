export async function handler(event, context) {
  try {
    if ((event.queryStringParameters.username === 'Master' &&
      event.queryStringParameters.password === 'Brookline')) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          msg: '__  +  __!  /  __!  -  __ / __  =  __'
        })
      }
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
