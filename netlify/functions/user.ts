import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {

  if (context?.clientContext?.user) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello World" }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ message: "You must be logged in" }),
  };


  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };
