import OpenAI from "openai";
import axios from "axios";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  const { query } = await req.json();

  const openai = new OpenAI({
    baseURL: process.env["OPAENAI_BASE_URL"],
    apiKey: process.env["OPENAI_API_KEY"],
  });

  const result = await getSearchResults(query);

  let context = "";

//   result.forEach((item: any) => {
//     console.log("item", item);
//     context += `${item["snippet"]}\n\n`;
//   });

  result.forEach((v: any, i: number) => {
    const content = v["snippet"];
    const item = `[[citation:${i + 1}]]${content}`;
    context += `${item}`;
  });

  const prompt = `
You are a large language AI assistant. You are given a user question, and please write clean, concise and accurate answer to the question. You will be given a set of related contexts to the question, each starting with a reference number like [[citation:x]], where x is a number. Please use the context and cite the context at the end of each sentence if applicable.

Your answer must be correct, accurate and written by an expert using an unbiased and professional tone. Please limit to 1024 tokens. Do not give any information that is not related to the question, and do not repeat. Say "information is missing on" followed by the related topic, if the given context do not provide sufficient information.

Please cite the contexts with the reference numbers, in the format [citation:x]. If a sentence comes from multiple contexts, please list all applicable citations, like [citation:3][citation:5]. Other than code and specific names and citations, your answer must be written in the same language as the question.

Here are the set of contexts:

{context}

Remember, don't blindly repeat the contexts verbatim. And here is the user question:
`.replace('{context}', context);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: prompt },
    { role: "user", content: query },
  ];

  console.log("messages", messages);

  const res = await openai.chat.completions.create({
    messages: messages,
    model: "moonshot-v1-128k",
  });

  return Response.json(res);
}

async function getSearchResults(query: string) {
  let data = JSON.stringify({
    q: query,
    location: "United States",
  });

  let config = {
    method: "post",
    url: "https://google.serper.dev/search",
    headers: {
      "X-API-KEY": "efd36fc8abb110c8a3f269740d85b8d7225c8c73",
      "Content-Type": "application/json",
    },
    data: data,
  };

  const res = await axios(config);

  return res.data["organic"];
}
