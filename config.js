// ========================================
// PAPER GENERATOR CONFIGURATION
// ========================================

const PAPER_GENERATOR_CONFIG = {

    appName: "Professional Paper Generator",

    version: "1.0.0",

    supportedLanguages: [
        "English",
        "Urdu"
    ],

    difficultyLevels: [
        "Easy",
        "Normal",
        "Difficult",
        "Very Difficult",
        "Custom"
    ],

    subjects: [
        "English",
        "Urdu",
        "Mathematics",
        "Science",
        "Islamiat",
        "Pakistan Studies",
        "Computer Science",
        "Custom"
    ],

    questionTypes: [
        "MCQs",
        "Short Questions",
        "Conceptual Questions",
        "Analytical Questions",
        "Application Questions",
        "Long Questions",
        "Fill in the Blanks",
        "True / False",
        "Mathematics Questions"
    ],

    features: {
        answerKey: true,
        randomQuestions: true,
        multipleVersions: true,
        rtlUrdu: true,
        printPaper: true,
        savePDF: true
    }

};
