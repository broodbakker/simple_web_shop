import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  const data = { name: "mario", age: 35, job: "plumber" }

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


};

export { handler };
