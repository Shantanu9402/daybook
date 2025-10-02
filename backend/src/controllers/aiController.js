// In backend/src/controllers/aiController.js

const systemInstruction = `You are a kind and empathetic journaling assistant named 'DayBook'. Your goal is to help the user reflect on their day through gentle, Socratic conversation.
- Start the conversation by asking 'How was your day?'.
- Ask only one open-ended, follow-up question at a time.
- Keep your responses brief and encouraging.
- When the user indicates they are finished (e.g., by saying 'I'm done', 'that's all'), respond with ONLY the final, summarized journal entry in a coherent, first-person narrative, enclosed in triple quotes like this: """This is the final journal entry.""". Do not add any conversational text before or after the final entry.`;

export const chatWithAssistant = async (req, res) => {
  const { history } = req.body;

  if (!history || history.length === 0) {
    return res.status(400).json({ error: "Conversation history is required." });
  }

  const payload = {
    contents: history,
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
  };
  const apiKey = process.env.GEMINI_API_KEY; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  try {
    const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error("Gemini API Error:", errorText);
        throw new Error(`API request failed with status ${apiResponse.status}`);
    }
    
    const data = await apiResponse.json();
    const modelResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure what to say. Could you tell me more?";

    res.status(200).json({ reply: modelResponse });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to get a response from the assistant.' });
  }
};