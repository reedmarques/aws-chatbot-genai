"use client";

// import styles from './page.module.css'
import { Text, Select, Slider, SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";

// different modelParam objects because each LLM takes different params
// Llama 2 - 13B on Jumpstart
var Llama2ModelParams = {
  do_sample: true,
  top_p: 0.2,
  temperature: 0.2,
  max_new_tokens: 512,
};

// Llama 2 - 13B on Bedrock
var Llama2BedrockModelParams = {
  max_gen_len: 100,
  temperature: 0.2,
  top_p: 0.9,
  model: "meta.llama2-13b-chat-v1",
};

// create new param objects for custom models here...

export default function ModelConfig(props: any) {
  const { handleUpdateSetModel, handleUpdateModelParameters } = props;

  const [model, setModel] = useState("meta.llama2-13b-chat-v1");
  const [modelParams, setModelParams] = useState(Llama2BedrockModelParams);

  useEffect(() => {
    console.log("Updating model: ", model, modelParams);
    setModel(model);
    if (model === "jumpstart") {
      setModelParams(Llama2ModelParams);
    } else {
      setModelParams(Llama2BedrockModelParams);
    }
    handleUpdateSetModel(model);
  }, [model]);

  useEffect(() => {
    handleUpdateModelParameters(modelParams);
    console.log("Updating model params", modelParams);
  }, [modelParams]);

  function updateModelParameters(value) {
    console.log("Updating model parameters: ", model, modelParams);
    setModel(model);
    if (model === "jumpstart") {
      setModelParams((modelParams) =>
        Object.assign({}, modelParams, { max_new_tokens: value })
      );
    } else {
      setModelParams((modelParams) =>
        Object.assign({}, modelParams, { max_gen_len: value })
      );
    }
  }

  return (
    <div style={{ backgroundColor: "" }}>
      <Text fz="lg" fw={600}>
        Model Options
      </Text>
      <Select
        label="Select LLM"
        placeholder="Choose..."
        defaultValue="meta.llama2-13b-chat-v1"
        data={[
          // add custom models here...
          { value: "meta.llama2-13b-chat-v1", label: "Bedrock Llama 2 - 13B" },
          { value: "jumpstart", label: "Jumpstart Llama 2 - 13B" },
        ]}
        onChange={(value) => setModel(value)}
      />
      <Text
        fz="md"
        fw={350}
        style={{ marginTop: "12px", marginBottom: "8px", fontSize: 14 }}
      >
        Temperature
      </Text>
      <Slider
        value={modelParams.temperature}
        onChange={(v) =>
          setModelParams((modelParams) =>
            Object.assign({}, modelParams, { temperature: v })
          )
        }
        marks={[
          { value: 0.0, label: "0.0" },
          { value: 5.0, label: "5.0" },
        ]}
        min={0.0}
        max={5}
        step={0.01}
        precision={2}
      />
      <Text
        fz="md"
        fw={350}
        style={{ marginTop: "24px", marginBottom: "8px", fontSize: 14 }}
      >
        Top P
      </Text>
      <Slider
        value={modelParams.top_p}
        onChange={(v) =>
          setModelParams((modelParams) =>
            Object.assign({}, modelParams, { top_p: v })
          )
        }
        marks={[
          { value: 0.01, label: "0.01" },
          { value: 1.0, label: "1.0" },
        ]}
        min={0.01}
        max={1}
        step={0.01}
        precision={2}
      />
      <Text
        fz="md"
        fw={350}
        style={{ marginTop: "24px", marginBottom: "8px", fontSize: 14 }}
      >
        Max New Tokens
      </Text>
      <SegmentedControl
        data={[
          { label: "100", value: "100" },
          { label: "512", value: "512" },
          { label: "1024", value: "1024" },
          { label: "2048", value: "2048" },
          { label: "4096", value: "4096" },
        ]}
        color="blue"
        fullWidth
        value={
          model === "jumpstart"
            ? String(modelParams.max_new_tokens)
            : String(modelParams.max_gen_len)
        }
        onChange={(v) => updateModelParameters(Number(v))}
      />
    </div>
  );
}
