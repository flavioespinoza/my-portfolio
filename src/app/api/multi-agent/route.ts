import { serve } from "@upstash/qstash/nextjs";
import { NextRequest } from "next/server";

export const POST = serve(async (context) => {
  // Get the initial request from context
  const initialPayload = context.requestPayload;
  
  // Parse the body based on what Upstash provides
  let topic: string;
  
  if (typeof initialPayload === 'string') {
    const parsed = JSON.parse(initialPayload);
    topic = parsed.topic;
  } else if (initialPayload && typeof initialPayload === 'object') {
    topic = (initialPayload as any).topic;
  } else {
    throw new Error('Invalid request payload');
  }

  if (!topic) {
    throw new Error('Topic is required');
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  
  const researchData = await context.call(
    "research-agent",
    `${backendUrl}/research`,
    "POST",
    JSON.stringify({ topic }),
    {
      "Content-Type": "application/json",
    }
  );

  await context.run("process-results", async () => {
    console.log("Research completed for:", topic);
    console.log("Data:", researchData);
  });
});

export const GET = async () => {
  return Response.json({
    message: 'Multi-Agent Research API with Upstash Workflow',
    status: 'ready'
  });
};