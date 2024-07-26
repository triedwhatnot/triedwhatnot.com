const GPT_OPTIONS = {
    LINKEDIN: {
        id: 1
    },
    TWITTER: {
        id: 2
    },
    CUSTOM: {
        id: 3
    },
}

async function getAiEnhancedText(optionId, text, prompt = null){
    try{
        if(!text || !optionId) return;
        
        if(optionId === GPT_OPTIONS.LINKEDIN.id) prompt = process.env.LINKEDIN_PROMPT
        else if(optionId === GPT_OPTIONS.TWITTER.id) prompt = process.env.TWIITER_PROMPT

        text = `${prompt} "${text}"`;
        let messagesArr = [{
            role: "user",
            content: text,
        }];

        const response = await fetch(process.env.CHAT_GPT_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.CHAT_GPT_API_KEY}`,
            },
            body: JSON.stringify({
                messages: messagesArr,
                model: "gpt-3.5-turbo",
            }),
        });

        const jsonRes = await response.json();
        return jsonRes.choices[0].message.content;
    }
    catch(e){
        console.log("Error in getAiEnhancedText: ", e);
    }
}

module.exports = { getAiEnhancedText };