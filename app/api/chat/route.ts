import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { knowledge } from '@/src/data/knowledge';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message: string = body.message;
  const history: Message[] = body.history ?? [];

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are a professional AI assistant embedded in Anhar Munir's portfolio website. Your role is to help visitors learn about Anhar — his skills, projects, experience, education, and background.

Answer questions accurately and concisely based on the knowledge base below. If a visitor asks about something not covered in the knowledge base, politely say you don't have that information but direct them to contact Anhar directly via email (anharmunirse@gmail.com) or WhatsApp (+92 311 7791014).

Keep responses professional, clear, and helpful. Do not make up information.

Knowledge base:
${JSON.stringify(knowledge, null, 2)}`,
      },
      ...history,
      { role: 'user', content: message },
    ],
    max_tokens: 600,
  });

  const reply = response.choices[0]?.message?.content ?? 'Sorry, I could not generate a response.';
  return NextResponse.json({ reply });
}
