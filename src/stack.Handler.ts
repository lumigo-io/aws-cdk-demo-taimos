// Importing the Axios module
import axios from 'axios';

// Defining an async handler function that takes in an event parameter of type AWSLambda.SQSEvent
// The code logs the event object passed into the handler function after stringifying it using JSON.stringify().
// It then uses the axios.get() method to make an HTTP request to the URL specified in the HTTP_TARGET environment
// variable (using the process.env object for referencing it). The ! operator asserts that the variable is not null or undefined.
//
// The response data is logged to console using console.log().
//
// Note that this code assumes that the environment variable HTTP_TARGET contains a valid URL.
// The exclamation mark at the end of process.env.HTTP_TARGET! ensures that TypeScript knows that
// this variable will always exist at runtime. If the variable is not set, this code would throw an error.


export async function handler(event: AWSLambda.SQSEvent) {

  // Logging the JSON stringified event object to console
  console.log(JSON.stringify(event));

  // Fetching data from an HTTP target URL specified in an environment variable using the Axios GET method, awaiting the response
  const response = await axios.get(process.env.HTTP_TARGET!);

  // Logging the response data to console
  console.log(response.data);
}
