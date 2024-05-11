import type { NextApiRequest, NextApiResponse } from 'next';
import { generateCompletion } from '@/services/openai';
import { ChatCompletion } from 'openai/resources/index.mjs';

type Data = {
    answer: ChatCompletion;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const prompt = req.body.prompt;
    const completion = await generateCompletion(prompt)
    res.status(200).json({ answer: completion});
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}