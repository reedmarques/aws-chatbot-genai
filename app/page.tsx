"use client";

import Head from "next/head";
import ModelConfig from "../components/ModelConfig";
import { useEffect, useState } from "react";
// add imports for your custom models
import Chat from "../components/jumpstart/Chat";
import ChatBedrock from "@/components/bedrock/Chat";

export default function Home() {
  const [model, setModel] = useState("meta.llama2-13b-chat-v1");
  const [modelParams, setModelParams] = useState();

  function handleUpdateSetModel(model) {
    setModel(model);
  }
  // update modelParams to pass to Chat page to ultimately go in request payload
  function handleUpdateModelParameters(newModelParams) {
    setModelParams(newModelParams);
  }

  useEffect(() => {
    console.log("UP Model Home", model);
  }, [model]);
  useEffect(() => {
    console.log("UP Model Params Home", modelParams);
  }, [modelParams]);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <div style={{ paddingLeft: "24px", backgroundColor: "" }}>
        <h1>Virtual Assistant - ask me anything</h1>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            backgroundColor: "",
          }}
        >
          {/* Left half, chatbot */}
          <div
            style={{
              flex: 4,
              backgroundColor: "",
              height: "",
            }}
          >
            {model === "jumpstart" ? (
              <Chat modelParameters={modelParams} />
            ) : (
              <ChatBedrock modelParameters={modelParams} />
            )}
          </div>
          {/* right half, model config */}
          <div
            style={{
              flex: 1,
              backgroundColor: "",
              marginLeft: "48px",
              marginRight: "48px",
            }}
          >
            <ModelConfig
              handleUpdateSetModel={handleUpdateSetModel}
              handleUpdateModelParameters={handleUpdateModelParameters}
            />
          </div>
        </div>
      </div>
    </>
  );
}
