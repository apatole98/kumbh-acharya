import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }

  const { message, language = 'hindi', systemPrompt, userId = 'guest' } = body

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Message is required' }) }
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured. Please add it to Netlify environment variables.' }),
    }
  }

  const defaultSystem = 'You are Kumbh Acharya - a revered spiritual guide at the Kumbh Mela. Speak with wisdom and compassion.'

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      system: systemPrompt || defaultSystem,
      messages: [{ role: 'user', content: message.trim() }],
    })

    const text = response.content[0]?.text || ''
    const tokensUsed = response.usage?.input_tokens + response.usage?.output_tokens || 0

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        response: text,
        language,
        tokensUsed,
        userId,
      }),
    }
  } catch (err) {
    console.error('Claude API error:', err.message)

    const status = err.status || 500
    const msg =
      status === 401 ? 'Invalid API key. Check your ANTHROPIC_API_KEY.' :
      status === 429 ? 'Rate limit reached. Please try again shortly.' :
      status === 400 ? 'Invalid request to Claude API.' :
      'An unexpected error occurred. Please try again.'

    return {
      statusCode: status,
      body: JSON.stringify({ error: msg }),
    }
  }
}
