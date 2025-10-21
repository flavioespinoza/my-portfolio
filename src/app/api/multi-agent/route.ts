import { serve } from "@upstash/qstash/nextjs";

export const POST = serve(async (context) => {
  const request = context.requestPayload as Request;
  const body = await request.json();
  const { topic } = body as { topic: string };

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