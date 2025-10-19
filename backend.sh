cd backend
python3.11 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install fastapi "uvicorn[standard]" python-dotenv langchain-openai crewai "crewai[tools]"
echo "Setup complete! Now run: uvicorn main:app --reload --port 8000"