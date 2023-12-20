// NOTE: HARD CODING CREDENTIALS SHOULD NOT BE DONE IN PRODUCTION
// For more information, see: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_federated-users.html

import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1", // Replace with your AWS region
  credentials: {
    accessKeyId: "", // Replace with your AWS access key ID
    secretAccessKey: "", // Replace with your AWS secret access key
  },
});

export default AWS;
