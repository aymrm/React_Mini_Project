import React, { useState } from 'react';

export default function OpenAi(){
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleGenerateResponse = async () => {
        try {
            const requestBody = {
                model:'gpt-3.5-turbo',
                messages: [{role:'user',content:input}],
                max_tokens: 100,
            };
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${process.env.REACT_APP_GPT_SECRET_KEY}`,
                },
                body: JSON.stringify(requestBody),
            });

            const responseData = await response.json();
    
            setOutput(responseData.choices[0].message.content);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
      <div>
        <h1>open ai 사용</h1>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleGenerateResponse}>Generate Response</button>
        <div>
          <strong>Response:</strong>
          <div>{output}</div>
        </div>
      </div>
    );
}