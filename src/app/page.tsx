'use client';

import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-center"
      style={{
        backgroundImage: 'url(/images/bg3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-6xl font-[Press Start 2P] text-white">
        WELCOME
      </h1>

      <p className="mt-4 text-xl text-white">
        Press Start to Begin
      </p>

      <button
        className="mt-8 px-8 py-4 text-xl font-bold text-black bg-pink-400 border-4 border-pink-600 rounded-lg hover:scale-110 transition-transform"
        onClick={() => router.push('/level')}
      >
        Start
      </button>
    </div>
  );
}
