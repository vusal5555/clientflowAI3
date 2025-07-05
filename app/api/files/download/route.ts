export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("imageUrl");

  if (!imageUrl) {
    return new Response("Missing imageUrl", { status: 400 });
  }

  const response = await fetch(imageUrl);

  if (!response.ok) {
    return new Response(`${response.statusText}`, { status: 400 });
  }

  return new Response(response.body, {
    headers: {
      ...response.headers,
      "content-type": response.headers.get("content-type") || "",
      "content-disposition": `attachment; filename="${response.headers.get(
        "content-disposition"
      )}"`,
    },
  });
}
