export async function onRequestGet(context) {
  const { params, env } = context;
  const object = await env.PHOTOS.get(params.key);
  if (!object) return new Response('Not found', { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('Cache-Control', 'public, max-age=31536000');
  return new Response(object.body, { headers });
}
