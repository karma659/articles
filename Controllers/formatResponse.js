
// Define a helper function to format the API responses
const formatResponse = (statusCode, data, error, message) => {
    const response = {
      statusCode,
      data,
      error,
      message,
    };
    return response;
  };
 
  module.exports = {
    formatResponse: formatResponse
 };
 