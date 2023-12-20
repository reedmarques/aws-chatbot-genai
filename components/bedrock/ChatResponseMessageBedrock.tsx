import { Code, Avatar, Image } from "@mantine/core";

export default function ChatResponseMessageBedrock(props: any) {
  const { message } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "",
      }}
    >
      <Avatar
        alt="no image here"
        style={{
          margin: "12px",
        }}
      >
        <Image
          src="./AWS_logo.svg"
          alt="logo"
          fit="contain"
          style={{
            alignSelf: "center",
          }}
        />
      </Avatar>
      <div
        style={{
          marginTop: "12px",
        }}
      >
        {/* LLM responses here  */}
        <Code color="green" fz="md">
          {message}
        </Code>
      </div>
    </div>
  );
}
