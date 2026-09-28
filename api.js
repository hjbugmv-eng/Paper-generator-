// ========================================
// PAPER GENERATOR AI API
// ========================================

const AI_CONFIG = {
    API_URL: "YOUR_API_URL_HERE",
    API_KEY: "YOUR_API_KEY_HERE",
    MODEL: "YOUR_MODEL_HERE"
};

async function generatePaperWithAI(data) {

    const prompt = `
You are a professional school examination paper generator.

Create an examination paper using ONLY the content provided by the user.

Class: ${data.className}
Subject: ${data.subject}
Language: ${data.language}
Difficulty: ${data.difficulty}

MCQs: ${data.mcqCount}
Short Questions: ${data.shortCount}
Long Questions: ${data.longCount}

Total Marks: ${data.totalMarks}
Passing Marks: ${data.passingMarks}

Requirements:
- Create clear examination-quality questions.
- Include conceptual questions.
- Include analytical questions where appropriate.
- Include application-based questions where appropriate.
- Follow the requested difficulty.
- Do NOT add information that is not supported by the supplied content.
- Do NOT repeat questions unnecessarily.
- Return the answer key separately.

SOURCE CONTENT:
${data.lessonContent}
`;

    const response = await fetch(AI_CONFIG.API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AI_CONFIG.API_KEY}`
        },

        body: JSON.stringify({
            model: AI_CONFIG.MODEL,

            messages: [
                {
                    role: "system",
                    content:
                        "You are a professional school examination paper generator."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    });

    if (!response.ok) {
        throw new Error("AI API Error: " + response.status);
    }

    return await response.json();
}
