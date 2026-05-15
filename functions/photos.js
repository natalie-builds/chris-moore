export async function onRequestGet(context) {
  const { env } = context;
  const list = await env.PHOTOS.list();
  const keys = list.objects.map(o => o.key);
  return new Response(JSON.stringify(keys), {
    headers: { 'Content-Type': 'application/json' }
  });
}
