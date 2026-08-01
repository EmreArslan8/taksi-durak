"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="tr">
      <body className="grid min-h-screen place-items-center bg-[#f3f0e8] p-6 text-center">
        <div>
          <p className="text-sm font-bold text-black/45">Bir aksilik oldu</p>
          <h1 className="mt-2 text-3xl font-black">Sayfayı yeniden deneyelim.</h1>
          <button onClick={reset} className="mt-6 rounded-xl bg-[#171711] px-6 py-3 font-bold text-white">Tekrar dene</button>
        </div>
      </body>
    </html>
  );
}
