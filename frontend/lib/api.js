// If Vercel gives us an address, use it. Otherwise, assume we are on localhost.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function getStories() {
  // This asks Django for the list of stories
  const res = await fetch(`${API_URL}/stories/`);
  if (!res.ok) throw new Error('Failed to fetch stories');
  return res.json();
}

export async function subscribeEmail(email) {
  // This sends an email to Django
  const res = await fetch(`${API_URL}/newsletter/subscribe/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
}



export async function getStory(slug) {
  const res = await fetch(`http://127.0.0.1:8000/api/stories/${slug}/`);
  if (!res.ok) return null;
  return res.json();
}