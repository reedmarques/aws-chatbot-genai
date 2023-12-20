import AWS from "../config";

const lambda = new AWS.Lambda({
  region: "us-east-1",
});

export default async function invokeFalconLLM(query: String) {
  const params = {
    FunctionName: "invokeFalconLLM", // Replace with the name of your Lambda function
    Payload: JSON.stringify({ payload: query }), // Replace with the payload you want to send
  };

  try {
    console.log(params);
    const response = await lambda.invoke(params).promise();
    const result = JSON.parse(response.Payload as string);
    console.log(result);

    const cleanedRes = result.body.substr(1, result.body.length);
    console.log("cR", cleanedRes);

    return cleanedRes;
  } catch (error) {
    console.error(error);
  }
}
