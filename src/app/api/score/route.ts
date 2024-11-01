// app/api/score/route.js
let viratScore = 0;

export async function GET() {
  return new Response(JSON.stringify({ score: viratScore }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username, score } = await req.json();
    const expectedBinary = (1000).toString(2); // Binary representation of 1000
    const binaryCheck = score.toString(2); // Binary representation of score

    // Validate the score to determine if the flag is awarded
    if (typeof score === 'number' && score === 10000 && binaryCheck === expectedBinary) {
      viratScore = score;
      return new Response(JSON.stringify({ score: viratScore, flag: "FLAG{your_flag_here}" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the score if the score is a multiple of 10 without flag
    if (typeof score === 'number' && score % 10 === 0) {
      viratScore = score;
    }

    return new Response(JSON.stringify({ score: viratScore }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
          }
}

