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

# Enable web search tool
search_tool = SerperDevTool()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.7,
    api_key=os.getenv("OPENAI_API_KEY"),
    max_tokens=1500,  # Higher quality output
    timeout=30
)

def create_crew(topic: str):
    researcher = Agent(
        role='Senior Research Analyst',
        goal=f'Conduct comprehensive research on {topic}',
        backstory="""You are an expert research analyst with deep knowledge 
        across multiple domains. You excel at finding credible information 
        and identifying key trends and insights.""",
        verbose=True,
        allow_delegation=False,
        tools=[search_tool],  # Enable web search
        llm=llm
    )

    writer = Agent(
        role='Content Writer',
        goal=f'Create detailed, engaging content about {topic}',
        backstory="""You are a skilled content writer who transforms research 
        into clear, informative, and engaging articles. You structure content 
        logically and make complex topics accessible.""",
        verbose=True,
        allow_delegation=False,
        llm=llm
    )

    reviewer = Agent(
        role='Quality Assurance Reviewer',
        goal='Ensure content meets high standards',
        backstory="""You are a meticulous editor who ensures accuracy, clarity, 
        and quality. You provide constructive feedback and catch errors.""",
        verbose=True,
        allow_delegation=False,
        llm=llm
    )

    research_task = Task(
        description=f"""Conduct thorough research on {topic}. 
        
        Include:
        - Key facts and statistics
        - Recent developments and trends
        - Important context and background
        - Notable experts or organizations
        
        Provide 5-7 well-researched bullet points (300-400 words total).""",
        expected_output='Comprehensive research findings with 5-7 bullet points',
        agent=researcher
    )

    writing_task = Task(
        description=f"""Write a detailed, well-structured article about {topic} 
        based on the research provided.
        
        Structure:
        - Introduction (set context)
        - Main body (3-4 paragraphs covering key points)
        - Conclusion (summarize importance)
        
        Target length: 400-500 words
        Make it informative, engaging, and accessible.""",
        expected_output='Well-structured 400-500 word article',
        agent=writer
    )

    review_task = Task(
        description="""Review the article thoroughly for:
        - Factual accuracy
        - Clarity and readability
        - Structure and flow
        - Grammar and style
        
        Provide:
        - Overall assessment
        - 3-4 specific strengths
        - 2-3 suggestions for improvement""",
        expected_output='Detailed review with assessment and feedback',
        agent=reviewer
    )

    crew = Crew(
        agents=[researcher, writer, reviewer],
        tasks=[research_task, writing_task, review_task],
        process=Process.sequential,
        verbose=True
    )
    
    return crew

@app.get("/")
async def root():
    return {"message": "Multi-Agent Research API", "status": "running"}

@app.post("/research", response_model=ResearchResponse)
async def research(request: ResearchRequest):
    try:
        print(f"Starting research on: {request.topic}")
        crew = create_crew(request.topic)
        result = crew.kickoff(inputs={'topic': request.topic})
        
        tasks_output = result.tasks_output if hasattr(result, 'tasks_output') else []
        
        print(f"Research completed for: {request.topic}")
        
        return ResearchResponse(
            research=str(tasks_output[0]) if len(tasks_output) > 0 else str(result),
            content=str(tasks_output[1]) if len(tasks_output) > 1 else "Content generated",
            review=str(tasks_output[2]) if len(tasks_output) > 2 else "Review completed"
        )
    
    except Exception as e:
        print(f"ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "api_key_set": bool(os.getenv("OPENAI_API_KEY")),
        "serper_key_set": bool(os.getenv("SERPER_API_KEY"))
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)