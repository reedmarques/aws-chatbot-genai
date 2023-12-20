import { Text, Avatar } from "@mantine/core";

export default function ChatQueryMessageBedrock(props: any) {
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
        src={null}
        alt="no image here"
        color="indigo"
        style={{ margin: "12px" }}
      />
      <div
        style={{
          backgroundColor: "",
          marginTop: "12px",
        }}
      >
        {/* LLM responses here  */}
        <Text fz="lg" fw={500}>
          {message}
        </Text>
      </div>
    </div>
  );
}
