import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { ISimpleAiResponse } from "@/types";
import {
  FREQUENCY_PENALTY,
  MAX_TOKENS,
  MODEL,
  PRESENCE_PENALTY,
  TEMPERATURE,
  TOP_P,
} from "constants/openai";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { Configuration, OpenAIApi } from "openai";

type Choices = {
  text: string;
};

export async function magic(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if( session.user.tokensLeft === 0 ) {
    res.status(402).json({ message: "You have no tokens left." });
    return;
  } 

  const { prompt } = req.body as { prompt: string };
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: MODEL,
    prompt: `${prompt}.  Each color in the palette should be in a HEX format and have five shades ranging from light to dark. Return the palette as a JSON object with five keys: "primary", "secondary", "accent", and "foreground", where each key corresponds to a different use case for the colors in the palette. Each color in the palette should be different and complementary to the other and need to make sense together.
    The last key should be the title which should be auto-generated based on the initial description and make it fun and memorable.
    
    EXAMPLE OUTPUT: {"primary": ["#3F5C9D", "#5A7FCF", "#7FA3F3", "#AAC8FF", "#D3E2FF"], "secondary": ["#FFCF4F", "#FFD971", "#FFE395", "#FFEEB8", "#FFF9DC"], "accent": ["#A8A8A8", "#C2C2C2", "#DCDCDC", "#F7F7F7", "#FFFFFF"], "foreground": ["#000000", "#333333", "#666666", "#999999", "#CCCCCC"], "title": "CV Builder Palette"}
    ->`,
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
    top_p: TOP_P,
    frequency_penalty: FREQUENCY_PENALTY,
    presence_penalty: PRESENCE_PENALTY,
  });

  const { choices } = response.data as { choices: Choices[] };

  //@ts-ignore
  const colors = JSON.parse(choices[0].text) as ISimpleAiResponse;
  return res.status(200).json(colors);
}

export default magic;
