'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

interface ProductContactFormProps {
  productName: string;
}

export default function ProductContactForm({
  productName,
}: ProductContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: integrate with backend / email service
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#0d2d5e] mb-1">
          Mesajınız Gönderildi
        </h3>
        <p className="text-sm text-gray-500">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-[#0d2d5e] mb-1.5"
          >
            Adınız Soyadınız <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Adınız Soyadınız"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-[#0d2d5e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8] transition-all duration-200"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-[#0d2d5e] mb-1.5"
          >
            E-posta <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="ornek@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-[#0d2d5e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8] transition-all duration-200"
          />
        </div>
      </div>

      {/* Product (read-only) */}
      <div>
        <label className="block text-sm font-medium text-[#0d2d5e] mb-1.5">
          Ürün
        </label>
        <input
          type="text"
          readOnly
          value={productName}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 cursor-not-allowed"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[#0d2d5e] mb-1.5"
        >
          Mesajınız <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Fiyat bilgisi, minimum sipariş miktarı, özel etiket vb."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-[#0d2d5e] placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8] transition-all duration-200"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#1a5fa8] hover:bg-[#154d8a] text-white font-semibold text-sm shadow-lg shadow-[#1a5fa8]/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Gönder
      </button>
    </form>
  );
}
