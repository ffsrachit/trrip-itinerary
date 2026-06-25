import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { createRequire } from 'module';

dotenv.config();

const require = createRequire(import.meta.url);
const { PdfReader } = require('pdfreader');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const extractPDFText = (buffer) => {
  return new Promise((resolve, reject) => {
    const textItems = [];
    new PdfReader().parseBuffer(buffer, (err, item) => {
      if (err) reject(err);
      else if (!item) resolve(textItems.join(' '));
      else if (item.text) textItems.push(item.text);
    });
  });
};

export const extractAndGenerateItinerary = async (buffer, mimeType) => {
  try {
    let extractedText = '';

    if (mimeType === 'application/pdf') {
      extractedText = await extractPDFText(buffer);
      console.log('Extracted PDF text:', extractedText.substring(0, 500));
    } else if (mimeType.startsWith('image/')) {
      const base64Data = buffer.toString('base64');
      const imageCompletion = await groq.chat.completions.create({
        model: 'llama-3.2-11b-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: `data:${mimeType};base64,${base64Data}` }
              },
              {
                type: 'text',
                text: 'Extract all travel related information from this image including flights, hotels, dates, times, passenger details, confirmation numbers.'
              }
            ]
          }
        ],
        max_tokens: 1000
      });
      extractedText = imageCompletion.choices[0].message.content;
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `You are a travel assistant. Here is extracted text from a travel booking document:

${extractedText}

Based on this information, generate a detailed day-by-day travel itinerary in this format:

## Extracted Information
- Flight/Travel Details: ...
- Hotel/Accommodation: ...
- Travel Dates: ...
- Destinations: ...
- Other Details: ...

## Your Travel Itinerary

### Day 1 - [Date] - [Location]
- Morning: ...
- Afternoon: ...
- Evening: ...

### Day 2 - [Date] - [Location]
...and so on

## Important Notes
- Confirmation numbers, check-in times, etc.`
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error('Groq Error:', error);
    throw new Error('Failed to process document');
  }
};