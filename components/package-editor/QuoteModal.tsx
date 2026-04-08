'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalıdır.'),
  company: z.string().min(2, 'Firma adı en az 2 karakter olmalıdır.'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
  phone: z
    .string()
    .regex(/^(\+90|0)?[5][0-9]{9}$/, 'Geçerli bir Türk cep numarası giriniz. (Örn: 05XX...)'),
});

type FormData = z.infer<typeof schema>;

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasPng: string | undefined;
  product: string | null;
}

const PRODUCT_LABELS: Record<string, string> = {
  wipe: 'Islak Mendil',
  diaper: 'Bebek Bezi',
  pad: 'Hijyen Pedi',
  adult: 'Yetişkin Bezi',
};

export function QuoteModal({ isOpen, onClose, canvasPng, product }: QuoteModalProps) {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitState('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          product: product ? PRODUCT_LABELS[product] ?? product : 'Belirtilmedi',
          canvasPng: canvasPng ?? '',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitState('success');
        reset();
      } else {
        setSubmitState('error');
        setErrorMessage(json.error ?? 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch {
      setSubmitState('error');
      setErrorMessage('Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.');
    }
  };

  const handleClose = () => {
    setSubmitState('idle');
    setErrorMessage('');
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #0d2d5e, #1a5fa8)' }}
        >
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">Teklif Al</h2>
            {product && (
              <p className="text-blue-200 text-sm mt-0.5">
                {PRODUCT_LABELS[product] ?? product} — Özel Etiket
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors text-xl leading-none"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5">
          {/* Success state */}
          {submitState === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">Teklifiniz alındı!</h3>
              <p className="text-gray-500 text-sm">
                24 saat içinde dönüş yapacağız. Tasarımınız e-postanıza iletildi.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #1a5fa8, #0d2d5e)' }}
              >
                Tamam
              </button>
            </div>
          )}

          {/* Error state */}
          {submitState === 'error' && (
            <div className="mb-4 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <svg
                className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          {submitState !== 'success' && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Ad Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Adınız ve soyadınız"
                  className={`w-full text-sm border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                    errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Firma Adı <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('company')}
                  type="text"
                  placeholder="Firma / marka adı"
                  className={`w-full text-sm border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                    errors.company ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  E-posta <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="ornek@firma.com"
                  className={`w-full text-sm border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                    errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  className={`w-full text-sm border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                    errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Canvas preview notice */}
              {canvasPng && (
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
                  <svg
                    className="w-4 h-4 text-teal-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Tasarımınız e-postaya ek olarak gönderilecek.
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState === 'loading'}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #1a5fa8, #0d2d5e)' }}
              >
                {submitState === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Gönderiliyor...
                  </span>
                ) : (
                  'Teklif Talebi Gönder'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
