// ========================================
// PROFESSIONAL PAPER GENERATOR
// GEMINI API CONNECTION
// ========================================

const AI_CONFIG = {
    API_URL:
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",

    MODEL: "gemini-3.8-flash"
};


// ========================================
// GENERATE PAPER WITH GEMINI
// ========================================

async function generatePaperWithAI(data, apiKey) {

    if (!apiKey) {
        throw new Error("Gemini API key is required.");
    }

    const prompt = `
You are a professional school examination paper generator.

Create an examination paper using ONLY the lesson/content provided below.

CLASS:
${data.className || ""}

SUBJECT:
${data.subject || ""}

LANGUAGE:
${data.language || "English"}

DIFFICULTY:
${data.difficulty || "Normal"}

MCQs:
${data.mcqCount || 0}

SHORT QUESTIONS:
${data.shortCount || 0}

LONG QUESTIONS:
${data.longCount || 0}

TOTAL MARKS:
${data.totalMarks || 0}

PASSING MARKS:
${data.passingMarks || 0}

RULES:
1. Use only the supplied lesson/content.
2. Do not introduce unrelated facts.
3. Follow the selected class and subject.
4. Follow the selected difficulty.
5. Create clear examination-quality questions.
6. Avoid unnecessary repetition.
7. Create conceptual and analytical questions where appropriate.
8. Create application-based questions where appropriate.
9. Keep the requested number of questions.
10. Provide a separate answer key.

SOURCE CONTENT:
${data.lessonContent || ""}
`;

    const response = await fetch(AI_CONFIG.API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
        },

        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(
            "Gemini API Error " +
            response.status +
            ": " +
            error
        );
    }

    const result = await response.json();

    const text =
        result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error("Gemini نے کوئی جواب واپس نہیں کیا۔");
    }

    return text;
}


// ========================================
// SIMPLE API TEST
// ========================================

async function testGeminiAPI(apiKey) {

    return await generatePaperWithAI(
        {
            className: "9th",
            subject: "Science",
            language: "English",
            difficulty: "Normal",
            mcqCount: 2,
            shortCount: 2,
            longCount: 1,
            totalMarks: 10,
            passingMarks: 4,

            lessonContent:
                "Plants make food through photosynthesis. " +
                "Chlorophyll helps plants absorb light energy."
        },
        apiKey
    );
}
