const allowedOrigins = [
    "http://localhost:3000",
    "https://bravixcreative.com",
  ];
  
  export function getCorsHeaders(origin: string | null) {
    const allowedOrigin =
      origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
    return {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
  }
  
  export function handleOptions(req: Request) {
    const origin = req.headers.get("origin");
  
    return new Response(null, {
      status: 204,
      headers: getCorsHeaders(origin),
    });
  }