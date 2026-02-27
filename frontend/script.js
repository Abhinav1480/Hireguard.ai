async function analyzeBias() {
    const question = document.getElementById("question").value;

    const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (data.biasDetected) {
        alert(`⚠ ${data.type} Detected\nSeverity: ${data.severity}\nSuggestion: ${data.suggestion}`);
    } else {
        alert("✅ No Bias Detected");
    }
}