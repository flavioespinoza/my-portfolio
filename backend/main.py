from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Multi-Agent Research API")

# Configure CORS for your portfolio domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://your-portfolio-domain.com"  # Update with your domain
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

# Initialize tools and LLM
search_tool = SerperDevTool()
llm = ChatOpenAI(
    model="gpt-4",
    temperature=0.7,
    api_key=os.getenv("OPENAI_API_KEY")
)

def create_crew(topic: str):
    """Create and configure the agent crew"""
    
    researcher = Agent(
        role='Senior Research Analyst',
        goal=f'Uncover cutting-edge developments on {topic}',
        backstory="""Expert research analyst skilled at finding and 
        synthesizing information from multiple sources.""",
        verbose=True,
        allow_delegation=False,
        tools=[search_tool],
        llm=llm
    )

    writer = Agent(
        role='Content Writer',
        goal=f'Create engaging content about {topic}',
        backstory="""Skilled writer who makes complex topics 
        accessible and engaging.""",
        verbose=True,
        allow_delegation=False,
        llm=llm
    )

    reviewer = Agent(
        role='Quality Reviewer',
        goal='Review content for accuracy and quality',
        backstory="""Meticulous editor ensuring high standards 
        of accuracy and readability.""",
        verbose=True,
        allow_delegation=False,
        llm=llm
    )

    research_task = Task(
        description=f"""Research {topic} thoroughly. Identify trends, 
        key players, and recent developments.""",
        expected_output='Detailed research report',
        agent=researcher
    )

    writing_task = Task(
        description=f"""Write an engaging 500-800 word article about {topic} 
        based on the research.""",
        expected_output='Well-structured article',
        agent=writer
    )

    review_task = Task(
        description="""Review the article for accuracy, clarity, and quality. 
        Provide constructive feedback.""",
        expected_output='Review with feedback',
        agent=reviewer
    )

    crew = Crew(
        agents=[researcher, writer, reviewer],
        tasks=[research_task, writing_task, review_task],
        process=Process.sequential,
        verbose=2
    )
    
    return crew

@app.get("/")
async def root():
    return {"message": "Multi-Agent Research API", "status": "running"}

@app.post("/research", response_model=ResearchResponse)
async def research(request: ResearchRequest):
    """Execute multi-agent research on given topic"""
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