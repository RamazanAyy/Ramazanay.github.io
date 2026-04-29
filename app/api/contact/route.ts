import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

interface ContactBody {
  source: 'iletisim' | 'ihracat' | 'ozel-etiket' | 'urun';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  productInterest?: string;
  message: string;
  productName?: string;
  locale?: string;
}

const SOURCE_LABEL: Record<ContactBody['source'], string> = {
  iletisim: 'İletişim Formu',
  ihracat: 'İhracat Talebi',
  'ozel-etiket': 'Özel Etiket Talebi',
  urun: 'Ürün Bilgi Talebi',
};

const RECIPIENTS = ['info@softandpower.com', 'mustafapolat@globalvefa.com'];

function escape(s: string | undefined): string {
  if (!s) return '-';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string | undefined) {
  if (!value) return '';
  return `<tr><td style="padding:6px 0;color:#666;width:140px;">${label}</td><td style="font-weight:bold;color:#0d2d5e;">${escape(value)}</td></tr>`;
}

function buildHtml(body: ContactBody, sourceLabel: string) {
  const fields = [
    row('Ad Soyad', body.name),
    row('Firma', body.company),
    row('E-posta', body.email),
    row('Telefon', body.phone),
    row('Konu', body.subject),
    body.productName ? row('Ürün', body.productName) : '',
    body.productInterest ? row('İlgilenilen Ürün', body.productInterest) : '',
    body.locale ? row('Dil', body.locale.toUpperCase()) : '',
  ].filter(Boolean).join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#0d2d5e,#1a5fa8);padding:24px;border-radius:12px 12px 0 0;">
        <h1 style="color:white;margin:0;font-size:22px;">${sourceLabel}</h1>
      </div>
      <div style="background:#f4f7fb;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
        <h2 style="color:#0d2d5e;font-size:16px;margin-top:0;">İletişim Bilgileri</h2>
        <table style="width:100%;border-collapse:collapse;">${fields}</table>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
        <h2 style="color:#0d2d5e;font-size:16px;">Mesaj</h2>
        <p style="color:#1f2937;margin:0;white-space:pre-wrap;line-height:1.6;">${escape(body.message)}</p>
        <div style="margin-top:24px;padding:12px;background:#dbeafe;border-radius:8px;font-size:13px;color:#1e40af;">
          softandpower.com web formundan gönderildi.
        </div>
      </div>
    </div>
  `;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    if (!body || !body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ success: false, error: 'Zorunlu alanlar eksik' }, { status: 400 });
    }
    if (!isEmail(body.email)) {
      return NextResponse.json({ success: false, error: 'Geçersiz e-posta' }, { status: 400 });
    }

    const source = (body.source && SOURCE_LABEL[body.source]) ? body.source : 'iletisim';
    const sourceLabel = SOURCE_LABEL[source];

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Contact form: SMTP credentials missing');
      return NextResponse.json({ success: false, error: 'Mail servisi yapılandırılmamış' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subjectSuffix = body.company ? ` — ${body.company}` : '';
    await transporter.sendMail({
      from: `"Soft & Power Web" <${process.env.SMTP_USER}>`,
      to: RECIPIENTS,
      replyTo: body.email,
      subject: `${sourceLabel}${subjectSuffix}`,
      html: buildHtml(body, sourceLabel),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact email error:', error);
    return NextResponse.json({ success: false, error: 'Mail gönderilemedi' }, { status: 500 });
  }
}
