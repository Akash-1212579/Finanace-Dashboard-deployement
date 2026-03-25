const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");
const APIKEY = process.env.LLM_API_KEY;
// console.log("api key is",APIKEY);
const ALLOWED_CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Other",
];
async function categorizeExpense(transactions) {
  const prompt = `
  SYSTEM:
You are a STRICT JSON EMITTER.
You do NOT think, explain, reason, or add text.
You ONLY output raw JSON.

IF ANY RULE IS BROKEN, THE OUTPUT IS INVALID.

═════════════ ABSOLUTE RULES ═════════════
1. Output MUST be valid JSON.
2. Output MUST be a SINGLE flat JSON OBJECT.
3. Output MUST start with { and end with }.
4. Output MUST contain ONLY JSON. No text, no markdown, no comments.
5. EVERY key MUST have a value.
6. NO key may appear without a value.
7. NO duplicate keys.
8. DO NOT invent, generate, infer, or modify IDs.
9. DO NOT output IDs that are NOT present in the input.
10. DO NOT skip ANY input ID.
11. DO NOT include input data in output.
12. JSON KEYS MUST BE STRINGS THAT CONTAIN ONLY DIGITS (0–9).
13. JSON VALUES MUST BE ONE category string ONLY.

═════════════ ID CONSTRAINT (CRITICAL) ═════════════
- The ONLY allowed keys are the exact transactionId values
  found in the input transactions.
- If an ID is not present in the input, you are FORBIDDEN
  from outputting it.
- If an input ID exists, you are REQUIRED to output it.
- Every input ID MUST appear EXACTLY ONCE in the output.

═════════════ CATEGORY CONSTRAINT ═════════════
Allowed categories (EXACT spelling, case-sensitive):
Food
Transport
Utilities
Entertainment
Shopping
Healthcare
Other

If the category is unclear, output "Other".
NEVER leave a value empty.
NEVER omit a category.

═════════════ INPUT TRANSACTIONS ═════════════
${JSON.stringify(transactions)}

═════════════ OUTPUT FORMAT (EXAMPLE ONLY) ═════════════
{"736":"Food","737":"Transport","738":"Shopping"}

RETURN ONLY THE JSON OBJECT.
ABSOLUTELY NOTHING ELSE.

`;

  // const response = await fetch("http://localhost:11434/api/generate", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     model: "phi",
  //     prompt,
  //     stream: false,
  //   }),
  // });
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${APIKEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Node LLM Backend"
  },
  body: JSON.stringify({
    model: "meta-llama/llama-3-8b-instruct",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0,
    max_tokens: 350
  })
});

if (!response.ok) {
  const err = await response.text();
  throw new Error(`OpenRouter error: ${response.status} ${err}`);
}
  const data = await response.json();
  const rawOutput = data.choices[0].message.content;
  console.log("LLM response is \n", rawOutput);
  let parsed;
  try {
    parsed = JSON.parse(rawOutput);
  } catch (err) {
    throw new Error("LLM returned invalid JSON");
  }

  // Validate and transform
  return Object.entries(parsed).map(([id, category]) => ({
    transactionId: Number(id),
    category: ALLOWED_CATEGORIES.includes(category) ? category : "Other",
  }));
}

module.exports = { categorizeExpense };
