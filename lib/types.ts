import { EnumType } from "typescript";

export interface QueryMessageInterface {
  id: number;
  user_id: number;
  occurred_on: Date;
  content: string;
  type: "query";
}

export interface QueryResponseInterface {
  id: number;
  query_id: number;
  user_id: number;
  occurred_on: Date;
  content: string;
  type: "reponse";
}

export interface ModelParams {
  do_sample: boolean;
  top_p: number;
  temperature: number;
  max_new_tokens: number;
  model: string;
}
