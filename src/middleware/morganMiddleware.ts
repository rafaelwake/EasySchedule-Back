import morgan, { StreamOptions } from "morgan";

import config from "config";

import Logger from "../../config/logger";
/**
 * @description This code sets up a middleware using the Morgan library for logging HTTP requests in an Express.js application. It overrides the default logging function to use a custom logger from the application's configuration and skips logging in non-development environments. The middleware logs the HTTP method, URL, response status code, response content length, and response time in milliseconds. The resulting middleware is exported as the default export of the module.
 *
 */
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message),
};

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  const env = config.get<string>("env") || "development";
  return env !== "development";
};

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ":method :url :status :res[content-length] - :response-time ms",
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

export default morganMiddleware;
