import { getStory } from '../../lib/api';
import Link from 'next/link';
import Subscribe from '../../components/Subscribe';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

// NOTE: in Next.js 15, params is a Promise!
export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. We MUST await params now (The Fix)
  const { slug } = await params;
  
  // 2. Ask Backend for this specific story
  const story = await getStory(slug);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl mb-4">Story not found.</h1>
        <p className="text-gray-400">Checked ID: {slug}</p>
        <Link href="/" className="mt-8 underline hover:text-gray-200">Go Home</Link>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-8 bg-white min-h-screen font-serif text-black">
      {/* Navigation Back */}
      <nav className="mb-12">
        <Link href="/" className="text-sm text-gray-400 hover:text-black transition">
          ← Back to Library
        </Link>
      </nav>

      {/* The Story Content */}
      <article>
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">{story.title}</h1>
          <time className="text-sm text-gray-400">
            {new Date(story.created_at).toLocaleDateString()}
          </time>
        </header>

        {/* This displays the text safely */}
     {/* NEW: This reads the formatted text directly from the new Editor */}
        <div 
          className="prose prose-lg mx-auto leading-loose"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />
      </article>
      {/* NEW: The Subscribe Form */}
      <Subscribe />
      
      
      {/* Footer */}
      <hr className="my-16 border-gray-100" />
      <div className="text-center text-sm text-gray-400">
        End of story.
      </div>
    </main>
  );
}