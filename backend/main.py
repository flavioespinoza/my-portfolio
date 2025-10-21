from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Multi-Agent Research API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://flavioespinoza.com",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchRequest(BaseModel):
    topic: str

class ResearchResponse(BaseModel):
    research: str
    content: str
    review: str

llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.3,
    api_key=os.getenv("OPENAI_API_KEY"),
    max_tokens=200,
    timeout=8
)

def create_crew(topic: str):
    researcher = Agent(
        role='Research Analyst',
        goal=f'Find 2-3 key facts about {topic}',
        backstory="""Quick research specialist.""",
        verbose=False,
        allow_delegation=False,
        tools=[],
        llm=llm
    )

    writer = Agent(
        role='Writer',
        goal=f'Write brief summary of {topic}',
        backstory="""Concise content writer.""",
        verbose=False,
        allow_delegation=False,
        llm=llm
    )

    research_task = Task(
        description=f"""Provide 2-3 quick facts about {topic}. Max 50 words.""",
        expected_output='2-3 facts (50 words max)',
        agent=researcher
    )

    writing_task = Task(
        description=f"""Write 1-2 sentences about {topic}.""",
        expected_output='1-2 sentences',
        agent=writer
    )

    crew = Crew(
        agents=[researcher, writer],
        tasks=[research_task, writing_task],
        process=Process.sequential,
        verbose=False
    )
    
    return crew

@app.get("/")
async def root():
    return {"message": "Multi-Agent Research API", "status": "running"}

@app.post("/research", response_model=ResearchResponse)
async def research(request: ResearchRequest):
    try:
        crew = create_crew(request.topic)
        result = crew.kickoff(inputs={'topic': request.topic})
        
        tasks_output = result.tasks_output if hasattr(result, 'tasks_output') else []
        
        return ResearchResponse(
            research=str(tasks_output[0]) if len(tasks_output) > 0 else str(result),
            content=str(tasks_output[1]) if len(tasks_output) > 1 else "Demo content generated - full content is available on pro vercel account",
            review="Demo review generated - full review is available on pro vercel account"
        )
    
    except Exception as e:
        print(f"ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "api_key_set": bool(os.getenv("OPENAI_API_KEY"))
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)