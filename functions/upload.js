export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const formData = await request.formData();
    const file = formData.get('photo');
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }
    const key = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await env.PHOTOS.put(key, file.stream(), {
      httpMetadata: { contentType: file.type }
    });
    return new Response(JSON.stringify({ success: true, key }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}
