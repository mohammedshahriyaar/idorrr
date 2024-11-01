// app/api/score/route.js
let viratScore = 0;

export async function GET() {
  return new Response(JSON.stringify({ score: viratScore }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// export async function POST(req: Request) {
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { username, score } = await req.json();
//     const expectedBinary = (1000).toString(2); // Binary representation of 1000
//     const binaryCheck = score.toString(2); // Binary representation of score

//     // Validate the score to determine if the flag is awarded
//     if (typeof score === 'number' && score === 10000 && binaryCheck === expectedBinary) {
//       viratScore = score;
//       return new Response(JSON.stringify({ score: viratScore, flag: "FLAG{your_flag_here}" }), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Update the score if the score is a multiple of 10 without flag
//     if (typeof score === 'number' && score % 10 === 0) {
//       viratScore = score;
//     }

//     return new Response(JSON.stringify({ score: viratScore }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         console.error('Error processing request:', error);
//         return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
//           }
// }

interface ResponseBody {
  score: number;
  flag?: string; // Optional flag property
}
export async function POST(req: Request) {
  try {
    // Extract data from the request
    const { username, score, binaryCheck } = await req.json();
    const expectedBinary = (10000).toString(2); // Binary representation of 10000

    // Initialize response object
    const response:ResponseBody= { score: viratScore  };

    // Validate the score to determine if the flag is awarded
    if (typeof score === 'number' && score === 10000) {
      // Check if binaryCheck is provided and matches the expected binary
      if (binaryCheck && binaryCheck === expectedBinary) {
        viratScore = score; // Update the score
        response.flag = "FLAG{your_flag_here}"; // Return the flag
      }
    }

    // Update the score if the score is a multiple of 10 without flag
    if (typeof score === 'number' && score % 10 === 0) {
      viratScore = score; // Update the score if it's a multiple of 10
    }

    // Always return the current score
    response.score = viratScore;

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
}

