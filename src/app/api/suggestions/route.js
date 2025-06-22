import {Groq} from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const client = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROK_API_KEY })
    const MODEL = 'llama-3.3-70b-versatile'

    const prompt = `You have to provide 3 personalized suggestion for the user for whom i am providing you the data. You have to keep in mind that you are a technical interview helper that is going to provide suggestions based on the previous user performance. If the user has no performance, then you should generate the suggestions based on some tips for practicing technical interview. Keep the instructions short and concise with clarity.
    The response should be in the form of an array of strings. And you have to strictly adhere to the given format. Your suggestions should adhere to the strengths weaknesses and areas of improvement of the user. 
    User Data: ${JSON.stringify(data.data)}
    Sample responses: 
    ["Work on communication skills", "Work on optimization of your problems", "Try to explain your thought process in a clear and distinct manner"]
    
    ["Practice solving problems under time constraints", "Review common data structures and algorithms", "Use clear variable names and clean code structure"]

    ["Understand the problem before jumping to code", "Communicate your approach out loud", "Handle edge cases and test your code"]

    ["Stay calm if you get stuck", "Break down complex problems into smaller parts", "Think out loud to show your reasoning"]

    ["Ask clarifying questions if needed", "Focus on correctness before optimization", "Write code that is easy to debug and understand"]
    `

    try {
        const response = await client.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that provides personalized suggestions based on user performance in technical interviews.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: MODEL,
            temperature: 0.3,
            max_tokens: 500,
            top_p: 0.9,
            stop: null,
            stream: false,
        })

        let results = response.choices[0].message.content.trim();
        console.log("Raw response from Groq:", results);
        
        // Clean and normalize the response
        let suggestions = [];
        
        // Case 1: Response is already a properly formatted array string
        if (results.startsWith('[') && results.endsWith(']')) {
            try {
                suggestions = JSON.parse(results);
            } catch (e) {
                console.log("JSON parse error, trying alternative parsing");
            }
        }
        
        // Case 2: Response is a string that looks like an array but might have extra text
        if (suggestions.length === 0) {
            // Extract array-like content between square brackets
            const arrayMatch = results.match(/\[(.*?)\]/s);
            if (arrayMatch) {
                try {
                    // Try to parse the matched content
                    suggestions = JSON.parse(`[${arrayMatch[1]}]`);
                } catch (e) {
                    console.log("Alternative parse failed");
                }
            }
        }
        
        // Case 3: Response is just a string with list items
        if (suggestions.length === 0) {
            // Split by newlines and clean each line
            suggestions = results.split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0 && !line.startsWith('[') && !line.startsWith(']'))
                .map(line => line.replace(/^-\s*|^\d+\.\s*|"/g, '').trim())
                .slice(0, 3); // Take only first 3 items
        }
        
        // Final fallback if all parsing fails
        if (suggestions.length === 0) {
            console.log("No valid suggestions found, using default suggestions");
            suggestions = [
                "Practice solving problems under time constraints",
                "Review common data structures and algorithms",
                "Communicate your thought process clearly"
            ];
        }
        
        // Ensure we have exactly 3 suggestions
        if (suggestions.length > 3) {
            suggestions = suggestions.slice(0, 3);
        } else if (suggestions.length < 3) {
            console.log("Less than 3 suggestions, filling with defaults");
            const defaultSuggestions = [
                "Practice solving problems under time constraints",
                "Review common data structures and algorithms",
                "Communicate your thought process clearly"
            ];
            for (let i = suggestions.length; i < 3; i++) {
                suggestions.push(defaultSuggestions[i]);
            }
        }

        return NextResponse.json(suggestions);
        
    } catch (error) {
        console.log("Error generating suggestions:", error);
        // Return default suggestions if there's an error
        return NextResponse.json([
            "Practice solving problems under time constraints",
            "Review common data structures and algorithms",
            "Communicate your thought process clearly"
        ]);
    }
}