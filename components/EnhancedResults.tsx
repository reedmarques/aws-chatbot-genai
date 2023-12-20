import { Code, Textarea } from "@mantine/core";
import {
  HomeIcon,
  UserIcon,
  ClipboardIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { QueryMessageInterface } from "@/lib/types";
import { Text, Select, ActionIcon, Image } from "@mantine/core";
import { useEffect, useState } from "react";

export default function EnhancedResults(props: any) {
  const { result } = props;
  useEffect(() => {
    console.log("RESULT", result);
  }, []);

  return (
    <div style={{ backgroundColor: "" }}>
      <Text
        fz="lg"
        fw={600}
        style={{ marginTop: "24px", marginBottom: "12px" }}
      >
        Enhanced Results
      </Text>
      <Image
        style={{ marginBottom: "12px" }}
        radius="lg"
        src={result.imageURL}
        alt="With default placeholder"
        withPlaceholder
        height={200}
        // width={200}
        fit="contain"
      />
      <Text
        fz="sm"
        fw={500}
        component="a"
        span
        c="blue"
        td="underline"
        href={result.link}
      >
        {result.title}
      </Text>
      <Text
        fz="sm"
        fw={500}
        color="gray"
        style={{ marginTop: "8px", whiteSpace: "pre-line" }}
      >
        {result.description}
      </Text>
    </div>
  );
}
