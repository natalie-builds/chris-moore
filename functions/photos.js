export async function onRequestGet(context) {
  const { env } = context;
  const list = await env.PHOTOS.list({ include: ['customMetadata'] });
  const photos = list.objects.map(o => ({
    key: o.key,
    caption: o.customMetadata?.caption || ''
  }));
  return new Response(JSON.stringify(photos), {
    headers: { 'Content-Type': 'application/json' }
  });
}
