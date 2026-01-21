import { getStories } from '../lib/api';
import Link from 'next/link';
import Subscribe from '../components/Subscribe'; // Import the form

export default async function Home() {
  let stories = [];
  try {
    stories = await getStories();
  } catch (e) {
    console.error("Backend offline or empty");
  }

  return (
    <main className="min-h-screen p-12 bg-white text-black font-sans">
      {/* HEADER */}
      <header className="mb-16 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Onedottwo Live!</h1>
        {/* Updated: This now jumps to the bottom section */}
        <a href="#newsletter" className="text-sm text-gray-500 hover:text-black transition cursor-pointer">
          Subscribe
        </a>
      </header>

      {/* STORY LIST */}
      <section className="max-w-2xl mx-auto space-y-12">
        {stories.length > 0 ? (
          stories.map((story: any) => (
            <Link href={`/${story.slug}`} key={story.id}>
              <article className="group cursor-pointer mb-12">
                <h2 className="text-2xl font-serif font-medium group-hover:underline decoration-1 underline-offset-4 mb-2">
                  {story.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {story.content.slice(0, 140)}...
                </p>
                <div className="mt-2 text-xs text-gray-400 uppercase tracking-wider">
                  Read Story →
                </div>
              </article>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No stories published yet.</p>
            <p className="text-xs text-gray-400 mt-2">Check your Django Admin.</p>
          </div>
        )}
      </section>

      {/* NEW: The Subscribe Section */}
      <div id="newsletter" className="max-w-2xl mx-auto mt-24 border-t border-gray-100 pt-12">
        <Subscribe />
      </div>

    </main>
  );
}