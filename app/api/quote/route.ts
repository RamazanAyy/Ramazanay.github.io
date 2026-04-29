import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── Types ─────────────────────────────────────────────────────────────────────

interface LegacyQuoteBody {
  contact: {
    name: string;
    company: string;
    email: string;
    phone: string;
    notes?: string;
  };
  config: {
    product?: string;
    brandText?: string;
    brandColor?: string;
    size?: string;
    quantity?: number | string;
  };
}

interface PackageEditorQuoteBody {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  canvasPng?: string; // base64 data-URL or empty string
}

type QuoteBody = LegacyQuoteBody | PackageEditorQuoteBody;

function isPackageEditorBody(body: QuoteBody): body is PackageEditorQuoteBody {
  return 'name' in body && typeof (body as PackageEditorQuoteBody).name === 'string';
}

// ── Helper ────────────────────────────────────────────────────────────────────

/**
 * Strips the data-URL prefix (e.g. "data:image/png;base64,") and returns
 * the raw base64 string. Returns null if the input is not a valid PNG data-URL.
 */
function extractBase64(dataUrl: string): string | null {
  const idx = dataUrl.indexOf(',');
  const match = idx > 0 && /^data:image\/(png|jpeg|jpg|webp);base64,/.test(dataUrl.slice(0, idx + 1))
    ? [null, null, dataUrl.slice(idx + 1)]
    : null;
  return match ? match[2] : null;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as QuoteBody;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ── Package-editor quote ─────────────────────────────────────────────────
    if (isPackageEditorBody(body)) {
      const { name, company, email, phone, product, canvasPng } = body;

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0d2d5e, #1a5fa8); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Yeni Paket Tasarım Teklif Talebi</h1>
          </div>
          <div style="background: #f4f7fb; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
            <h2 style="color: #0d2d5e; font-size: 16px; margin-top: 0;">İletişim Bilgileri</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #666; width: 140px;">Ad Soyad</td><td style="font-weight: bold; color: #0d2d5e;">${name}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Firma</td><td style="font-weight: bold; color: #0d2d5e;">${company}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">E-posta</td><td style="font-weight: bold; color: #0d2d5e;">${email}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Telefon</td><td style="font-weight: bold; color: #0d2d5e;">${phone}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <h2 style="color: #0d2d5e; font-size: 16px;">Ürün Bilgisi</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #666; width: 140px;">Ürün</td><td style="font-weight: bold; color: #0d2d5e;">${product || '-'}</td></tr>
            </table>
            ${
              canvasPng
                ? `<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                   <p style="color: #555; font-size: 13px; margin: 0;">Paket tasarımı bu e-postaya ek olarak gönderilmiştir.</p>`
                : ''
            }
            <div style="margin-top: 24px; padding: 12px; background: #dbeafe; border-radius: 8px; font-size: 13px; color: #1e40af;">
              Bu talep softandpower.com paket tasarım editöründen gönderilmiştir.
            </div>
          </div>
        </div>
      `;

      // Build attachments array — include canvas PNG if provided
      const attachments: nodemailer.SendMailOptions['attachments'] = [];
      if (canvasPng) {
        const b64 = extractBase64(canvasPng);
        if (b64) {
          attachments.push({
            filename: `paket-tasarim-${Date.now()}.png`,
            content: b64,
            encoding: 'base64',
            contentType: 'image/png',
          });
        }
      }

      await transporter.sendMail({
        from: `"Soft & Power Web" <${process.env.SMTP_USER}>`,
        to: ['info@softandpower.com', 'mustafapolat@globalvefa.com'],
        replyTo: email,
        subject: `Paket Tasarım Teklif Talebi — ${company} (${product})`,
        html,
        attachments,
      });

      return NextResponse.json({ success: true });
    }

    // ── Legacy configurator quote ────────────────────────────────────────────
    const { contact, config } = body;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0d2d5e, #1a5fa8); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">Yeni Özel Etiket Teklif Talebi</h1>
        </div>
        <div style="background: #f4f7fb; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">

          <h2 style="color: #0d2d5e; font-size: 16px; margin-top: 0;">İletişim Bilgileri</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #666; width: 140px;">Ad Soyad</td><td style="font-weight: bold; color: #0d2d5e;">${contact.name}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Firma</td><td style="font-weight: bold; color: #0d2d5e;">${contact.company}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">E-posta</td><td style="font-weight: bold; color: #0d2d5e;">${contact.email}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Telefon</td><td style="font-weight: bold; color: #0d2d5e;">${contact.phone}</td></tr>
          </table>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />

          <h2 style="color: #0d2d5e; font-size: 16px;">Konfigürasyon</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #666; width: 140px;">Ürün</td><td style="font-weight: bold; color: #0d2d5e;">${config.product ?? '-'}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Marka Adı</td><td style="font-weight: bold; color: #0d2d5e;">${config.brandText || '-'}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Marka Rengi</td><td><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${config.brandColor};margin-right:6px;vertical-align:middle;border:1px solid #ddd;"></span><strong>${config.brandColor}</strong></td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Beden / Paket</td><td style="font-weight: bold; color: #0d2d5e;">${config.size || '-'}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Adet</td><td style="font-weight: bold; color: #0d2d5e;">${Number(config.quantity).toLocaleString('tr-TR')} adet</td></tr>
          </table>

          ${
            contact.notes
              ? `
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <h2 style="color: #0d2d5e; font-size: 16px;">Ek Notlar</h2>
          <p style="color: #555; margin: 0;">${contact.notes}</p>
          `
              : ''
          }

          <div style="margin-top: 24px; padding: 12px; background: #dbeafe; border-radius: 8px; font-size: 13px; color: #1e40af;">
            Bu talep softandpower.com özel etiket konfiguratöründen gönderilmiştir.
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Soft & Power Web" <${process.env.SMTP_USER}>`,
      to: ['info@softandpower.com', 'mustafapolat@globalvefa.com'],
      replyTo: contact.email,
      subject: `Özel Etiket Talebi — ${contact.company} (${config.product})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quote email error:', error);
    return NextResponse.json({ success: false, error: 'Mail gönderilemedi' }, { status: 500 });
  }
}
