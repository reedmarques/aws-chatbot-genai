"use client";

import { ActionIcon } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { ChangeEvent, useEffect, useState, useRef } from "react";
import ChatQueryMessage from "./ChatQueryMessage";
import ChatResponseMessage from "./ChatResponseMessage";
import invokeLlama2LLM from "@/lib/api/invokeLlama2LLM";

export default function Chat(props: any) {
  const { modelParameters } = props;

  const [systemInput, setSystemInput] = useState<string>(
    "You are a consice assistant."
  );
  const [memory, setMemory] = useState([
    [{ role: "system", content: systemInput }],
  ]);

  const [currMessage, setCurrMessage] = useState("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const Scroll = () => {
    const { scrollHeight } = container.current as HTMLDivElement;
    container.current?.scrollTo(0, scrollHeight);
  };

  useEffect(() => {
    Scroll();
  }, [memory]);

  // update system input
  useEffect(() => {
    let copy = memory;
    copy[0][0].content = systemInput;
    console.log("Just updated system input", copy);

    setMemory(copy);
  }, [systemInput]);

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setCurrMessage(e.target.value);
  }

  function buildQuery(prompt: string) {
    var query: any = {
      role: "user",
      content: prompt,
    };

    return query;
  }

  function handleSubmitQuery(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    if (currMessage.length < 1) return;

    // build new query object and push to current array of messages
    // this is specific to Llama 2 on Jumpstart
    var query = buildQuery(currMessage);

    // Add to LLM memory
    var newMemory = memory;
    newMemory[0].push(query);
    // have to assign a whole new object to memory
    setMemory((memory) => Object.assign({}, newMemory));

    console.log("invoking", modelParameters);

    handleInvokeEndpoint(newMemory, modelParameters);

    // reset currMessage to empty
    setCurrMessage("");
  }

  async function handleInvokeEndpoint(llmMemory: any, params: any) {
    setSubmitting(true);

    const res = await invokeLlama2LLM(llmMemory, params);
    console.log("RES", res);

    // Push to LLM memory
    // some destructuring required
    var newMemory = memory;
    console.log(newMemory[0], newMemory[0][0]);
    newMemory[0].push(res);
    setMemory(newMemory);

    setSubmitting(false);
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
        {memory[0]
          .slice(1)
          .map((m, i) =>
            m.role === "user" ? (
              <ChatQueryMessage message={m} key={i} />
            ) : (
              <ChatResponseMessage message={m} key={i} />
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
