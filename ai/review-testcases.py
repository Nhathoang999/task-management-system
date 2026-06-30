import os
import google.generativeai as genai

# Setup Gemini API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Please set the GEMINI_API_KEY environment variable.")
    exit(1)

genai.configure(api_key=api_key)

def review_test_cases():
    try:
        # In a real scenario, we'd read the Excel file and pass it as context.
        # For demonstration, we simulate the prompt context.
        with open("ai/prompt.md", "r", encoding="utf-8") as f:
            prompt = f.read()

        print("Uploading test-cases.xlsx context...")
        # Simulate Excel data context (or use pandas to extract text)
        test_case_context = "Test Cases: TC-001 to TC-013 covering Login, CRUD, Search, Filter."
        
        full_prompt = f"{prompt}\n\nContext:\n{test_case_context}"
        
        model = genai.GenerativeModel('gemini-1.5-pro')
        print("Requesting review from Gemini AI...")
        response = model.generate_content(full_prompt)
        
        with open("ai/review-result.md", "w", encoding="utf-8") as f:
            f.write("# AI Test Case Review Results\n\n")
            f.write(response.text)
            
        print("Review completed and saved to ai/review-result.md")
        
    except Exception as e:
        print(f"Error during AI review: {e}")

if __name__ == "__main__":
    review_test_cases()
