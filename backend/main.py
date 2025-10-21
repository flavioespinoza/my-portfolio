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
    model="gpt-4o-mini",  # Back to better model
    temperature=0.5,
    api_key=os.getenv("OPENAI_API_KEY"),
    max_tokens=800,  # Increased for better quality
    timeout=15
)

def create_crew(topic: str):
    researcher = Agent(
        role='Research Analyst',
        goal=f'Find key insights about {topic}',
        backstory="""Expert research analyst skilled at finding relevant information.""",
        verbose=False,
        allow_delegation=False,
        tools=[],
        llm=llm
    )

    writer = Agent(
        role='Content Writer',
        goal=f'Write engaging content about {topic}',
        backstory="""Skilled writer who creates clear, informative content.""",
        verbose=False,
        allow_delegation=False,
        llm=llm
    )

    reviewer = Agent(
        role='Quality Reviewer',
        goal='Review content for quality',
        backstory="""Editor ensuring high standards of accuracy and clarity.""",
        verbose=False,
        allow_delegation=False,
        llm=llm
    )

    research_task = Task(
        description=f"""Research {topic}. Provide 4-5 key insights in bullet points. 
        Keep it under 200 words.""",
        expected_output='4-5 bullet points with key insights (200 words max)',
        agent=researcher
    )

    writing_task = Task(
        description=f"""Write a 3-4 paragraph summary about {topic} based on the research. 
        Make it informative and well-structured. Around 250 words.""",
        expected_output='3-4 paragraph summary (250 words)',
        agent=writer
    )

    review_task = Task(
        description="""Review the content for accuracy and clarity. 
        Provide 2-3 brief suggestions for improvement.""",
        expected_output='Brief review with 2-3 suggestions',
        agent=reviewer
    )

    crew = Crew(
        agents=[researcher, writer, reviewer],
        tasks=[research_task, writing_task, review_task],
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
            content=str(tasks_output[1]) if len(tasks_output) > 1 else "Content generated",
            review=str(tasks_output[2]) if len(tasks_output) > 2 else "Review completed"
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