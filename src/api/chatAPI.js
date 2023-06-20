require('dotenv').config();
const fetch = require('node-fetch');
const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/chatbot', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_CHAT_GPT_API}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100,
        }),
    };
    try {
        console.log(options);
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(`Error with Chat completion: ${error}`);
    }
});

app.listen(PORT, () => console.log(`Your server is running on PORT: ${PORT}`));
