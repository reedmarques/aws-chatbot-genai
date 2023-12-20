import AWS from "../config";

const lambda = new AWS.Lambda({
  region: "us-east-1",
});

export default async function invokeLlama2LLM(memory: any, parameters: any) {
  const params = {
    FunctionName: "invokeLlama2LLM", // Replace with the name of your Lambda function
    Payload: JSON.stringify({
      payload: { inputs: memory, parameters: parameters },
    }), // Replace with the payload you want to send
  };

  try {
    console.log("PARAMS", params);
    const response = await lambda.invoke(params).promise();
    const result = JSON.parse(response.Payload as string);
    console.log("LLM RESULT", result);

    const res = result[0]["generation"];

    return res;
  } catch (error) {
    console.error(error);
  }
}

// Example memory structure
// const res = [
//   [
//     {
//       role: "system",
//       content: "You are a helpful assistant.",
//     },
//     {
//       role: "user",
//       content: "what is golf",
//     },
//     {
//       role: "assistant",
//       content:
//         " Hey there! I'd be happy to help you with your question about golf! 🏌️\n\nGolf is a sport played on a large outdoor course, typically consisting of 18 holes, where players use various clubs to hit a small ball into a series of holes using the fewest number of strokes possible. The objective is to hit the ball into each hole using the appropriate club and in as few strokes as possible, while also following the rules and etiquette of the game.\n\nGolf is a popular recreational activity and professional sport, enjoyed by people of all ages and skill levels. It's a great way to get some exercise, enjoy the outdoors, and socialize with friends and fellow golfers. Many golf courses offer lessons and instruction for beginners, so don't worry if you're new to the game - you can still learn and have fun! 😊\n\nDo you have any other questions about golf, or would you like to know more about the rules or how to get started? I'm here to help! 👍",
//     },
//     {
//       role: "user",
//       content: "how long does the average round take?",
//     },
//     {
//       role: "assistant",
//       content:
//         "🕰️ Great question! The length of an average round of golf can vary depending on a number of factors, such as the course difficulty, the number of players, and the pace of play. However, on average, a round of golf can take anywhere from 4 to 5 hours to complete.\n\nIf you're playing on a par-3 course, the round may be shorter, typically lasting around 2-3 hours. On the other hand, if you're playing on a more challenging course with longer holes and more obstacles, the round may take longer, potentially up to 6 hours or more.\n\nIt's also worth noting that the pace of play is an important aspect of golf, and it's important to keep up with the group in front of you to avoid slowing down the entire group. Many courses have strict time limits, and if you're falling behind, you may be asked to pick up the pace or even be asked to leave the course.\n\nSo, to sum it up, the length of an average round of golf can vary, but on average, you can expect to spend around 4-5 hours on the course. 🌳",
//     },
//   ],
// ];
