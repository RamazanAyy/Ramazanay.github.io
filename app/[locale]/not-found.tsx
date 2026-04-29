import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center bg-[#f4f7fb]">
      <Image
        src="/logo-transparent.png"
        alt="Soft & Power"
        width={180}
        height={60}
        className="mb-8 opacity-90"
        priority
      />
      <h1 className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1a5fa8] to-[#00b4c8] mb-4">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold text-[#0d2d5e] mb-3">
        Aradığınız sayfa bulunamadı
      </h2>
      <p className="text-gray-500 max-w-md mb-8 text-sm sm:text-base">
        Bu adres geçersiz veya taşınmış olabilir. Lütfen aşağıdaki bağlantılardan birini kullanın.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/tr"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1a5fa8] to-[#00b4c8] text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          Anasayfaya Dön
        </Link>
        <Link
          href="/tr/urunler"
          className="inline-flex items-center gap-2 border-2 border-[#1a5fa8] text-[#1a5fa8] font-semibold px-6 py-3 rounded-xl hover:bg-[#1a5fa8] hover:text-white transition-all"
        >
          Ürünleri Gör
        </Link>
        <Link
          href="/tr/iletisim"
          className="inline-flex items-center gap-2 text-[#1a5fa8] font-semibold px-6 py-3 hover:text-[#00b4c8] transition-all"
        >
          İletişim
        </Link>
      </div>
    </main>
  );
}
