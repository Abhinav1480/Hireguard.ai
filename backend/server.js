const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// -------- Interview Bias Endpoint --------
app.post("/analyze", (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: "Question is required" });
    }

    let result = {
        biasDetected: false,
        type: null,
        severity: "Low",
        suggestion: null
    };

    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("married") || lowerQuestion.includes("pregnant")) {
        result = {
            biasDetected: true,
            type: "Gender Bias",
            severity: "High",
            suggestion: "Instead ask about availability or commitment."
        };
    } else if (lowerQuestion.includes("age")) {
        result = {
            biasDetected: true,
            type: "Age Bias",
            severity: "Medium",
            suggestion: "Focus on skills and experience instead of age."
        };
    }

    res.json(result);
});

// -------- Resume Analysis Endpoint --------
app.post("/resume", (req, res) => {
    const { resumeText } = req.body;

    if (!resumeText) {
        return res.status(400).json({ error: "Resume text is required" });
    }

    let fraudScore = 10;

    if (resumeText.toLowerCase().includes("10 years experience") &&
        resumeText.toLowerCase().includes("2024 graduate")) {
        fraudScore = 85;
    }

    res.json({
        fraudRiskScore: fraudScore,
        message: fraudScore > 70 ? "⚠ Potential Resume Fraud Detected" : "✅ Resume Looks Normal"
    });
});

// -------- Server Start --------
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});