import AWS from "../config";

const lambda = new AWS.Lambda({
  region: "us-east-1",
});

export default async function invokeBedrock(memory: any, parameters: any) {
  const params = {
    FunctionName: "invokeBedrock", // Replace with the name of your Lambda function
    Payload: JSON.stringify({
      input: {
        prompt: memory[memory.length - 1],
        max_gen_len: parameters.max_gen_len,
        temperature: parameters.temperature,
        top_p: parameters.top_p,
      },
      modelId: parameters.model,
    }),
  };

  try {
    console.log("PARAMS", params);
    const response = await lambda.invoke(params).promise();
    console.log("LLM RESP", response);
    var result = JSON.parse(response.Payload as string);
    console.log("LLM RESULT", result);

    // RESULT OBJECT STRUCTURE:
    // var result = {
    //   statusCode: 200,
    //   headers: {
    //     "Access-Control-Allow-Headers": "*",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    //   },
    //   body: '{"Answer": "\\n\\nBaseball is a bat-and-ball sport played between two teams of nine players each. The goal is to score runs by hitting a thrown ball with a bat and touching a series of four markers called bases arranged at the corners of a 90-foot square diamond. A team consists of a pitcher who throws the ball, a catcher who catches it, and seven fielders who play various positions in the field. The offensive team sends one player at a time to bat, and the defensive team tries to stop them from scoring runs by getting three outs. A game is divided into innings, and the team with the most runs at the end of nine innings wins.\\n\\nBaseball has a rich history, dating back to the 18th century, and has evolved into a popular professional sport with a global following. It is played at various levels, from Little League and high school baseball to college and professional leagues, including Major League Baseball (MLB) in the United States and Canada. The sport is known for its unique terminology, such as \\"home run,\\" \\"strikeout,\\" and \\"double play,\\" and its iconic players, like Babe Ruth and Jackie Robinson, who have become legends of the game."}',
    // };

    const res = JSON.parse(result["body"])["Answer"];

    console.log("RES ", res);

    return res;
  } catch (error) {
    console.error("Error invoking lambda", error);
    throw error;
  }
}
