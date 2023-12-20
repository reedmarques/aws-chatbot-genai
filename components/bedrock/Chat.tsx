"use client";

import { ActionIcon } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ModelParams } from "@/lib/types";

import { ChangeEvent, useEffect, useState, useRef } from "react";
import ChatQueryMessageBedrock from "./ChatQueryMessageBedrock";
import ChatResponseMessageBedrock from "./ChatResponseMessageBedrock";
import invokeBedrock from "@/lib/api/invokeBedrockLambda";

export default function ChatBedrock(props: any) {
  const { modelParameters } = props;

  const [memory, setMemory] = useState<Array<string>>([]);

  const [currMessage, setCurrMessage] = useState("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const [modelParams, setModelParams] = useState<ModelParams>(modelParameters);

  const Scroll = () => {
    const { scrollHeight } = container.current as HTMLDivElement;
    container.current?.scrollTo(0, scrollHeight);
  };

  // Update modelParams from ModelConfig
  useEffect(() => {
    setModelParams(modelParameters);
  }, [modelParameters]);

  useEffect(() => {
    Scroll();
    console.log("scrolling", memory);
  }, [memory]);

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setCurrMessage(e.target.value);
  }

  function handleSubmitQuery(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    if (currMessage.length < 1) return;

    handleInvokeEndpoint([...memory, currMessage], modelParams);

    // reset currMessage to empty
    setCurrMessage("");
  }

  async function handleInvokeEndpoint(llmMemory: any, params: any) {
    try {
      setSubmitting(true);
      // Add user message to LLM memory first
      setMemory((memory) => [...memory, llmMemory[llmMemory.length - 1]]);
      const res = await invokeBedrock(llmMemory, params);

      // Add LLM response if successful
      setMemory((memory) => [...memory, res]);
    } catch (error) {
      // remove user question if error
      setMemory(memory.slice(0, memory.length));
      alert(`Error invoking Lambda: , ${error}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{}}>
      <div
        ref={container}
        style={{
          backgroundColor: "",
          height: "70vh",
          overflowY: "scroll",
        }}
      >
        {memory.map((m, i) =>
          i % 2 === 0 ? (
            <ChatQueryMessageBedrock message={m} key={i} />
          ) : (
            <ChatResponseMessageBedrock message={m} key={i} />
          )
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          width: "70%",
          backgroundColor: "",
          marginBottom: "12px",
        }}
      >
        <Textarea
          value={currMessage}
          placeholder="How do I..."
          onChange={(e) => handleInputChange(e)}
          rightSection={
            <ActionIcon
              color="blue"
              variant="light"
              size="xl"
              style={{ marginRight: "24px" }}
              onClick={handleSubmitQuery}
              disabled={currMessage.length < 1}
              loading={submitting}
            >
              <PaperAirplaneIcon height={20} width={20} strokeWidth="1.5px" />
            </ActionIcon>
          }
        />
      </div>
    </div>
  );
}
