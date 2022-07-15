export const generateResponse = (statusCode: number, input: Object) => {
    return {
        statusCode,
        body: JSON.stringify(input),
        headers: {
            "Access-Control-Allow-Origin": "localhost:3000",
            "Access-Control-Allow-Credentials": true,
          },
      };
}