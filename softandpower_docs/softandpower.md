# Soft & Power Hygiene — Web Sitesi Projesi

## Proje Özeti

**Şirket:** Soft & Power Hygiene  
**Mevcut site:** https://softandpower.com  
**Yeni teknoloji:** Next.js 14 + Tailwind CSS  
**Hosting:** Vercel (ücretsiz)  
**Domain:** softandpower.com (Hostinger'da kayıtlı)

---

## Şirket Hakkında

Soft & Power Hygiene, Türkiye merkezli bir hijyen ürünleri üreticisidir.  
Toptan satış ve özel etiket (private label / fason) hizmeti vermektedir.

**İletişim:**
- Telefon: +90 539 631 23 92
- E-posta: info@softandpower.com
- WhatsApp: +90 539 631 23 92

**Sosyal medya:**
- Facebook: https://www.facebook.com/people/Softpower/61579102840493/
- Instagram: http://www.instagram.com/softandpowertr
- LinkedIn: https://www.linkedin.com/company/softandpower

---

## Ürünler

1. Baby Diapers (Bebek Bezi)
2. Adult Diapers (Yetişkin Bezi)
3. Adult Pants (Yetişkin Külot Bez)
4. Adult Underpads (Yetişkin Hasta Altı)
5. Baby Underpads (Bebek Hasta Altı)
6. Sanitary Pads (Ped)
7. Unisex Bladder Pads (Mesane Pedi)
8. Baby Wet Wipes (Bebek Islak Mendil)
9. Wet Wipes (Islak Mendil)
10. Cleaning Towels (Temizlik Havlusu)

---

## Desteklenen Diller

| Kod | Dil |
|-----|-----|
| tr | Türkçe |
| en | İngilizce |
| de | Almanca |
| ru | Rusça |
| ar | Arapça |
| uk | Ukraynaca |

---

## Teknik Stack

- **Framework:** Next.js 14 (App Router)
- **Stil:** Tailwind CSS
- **Çok dil:** next-intl
- **Form:** Web3Forms (ücretsiz, e-postaya iletir)
- **Deploy:** Vercel
- **SEO:** Next.js metadata API + hreflang

---

## Renk Paleti

- **Primary (Ana Renk):** #1B4F8A (Koyu Mavi)
- **Secondary:** #FFFFFF (Beyaz)
- **Accent:** #E8F0FB (Açık Mavi)
- **Text:** #1A1A2E (Koyu)
- **Muted:** #6B7280 (Gri)

---

## Sayfa Yapısı

```
/                    → Anasayfa
/products            → Tüm ürünler
/products/[slug]     → Ürün detay sayfası
/private-label       → Fason / Özel etiket
/corporate/about     → Hakkımızda
/corporate/quality   → Kalite kontrol
/corporate/certificates → Sertifikalar
/contact             → İletişim + Başvuru formu
```

---

## Anasayfa Bölümleri

1. **Navbar** — Logo sol, menü orta, dil seçici sağ
2. **Hero** — Büyük başlık, alt başlık, 2 CTA butonu (Ürünleri Gör / Teklif Al)
3. **Ürün Kategorileri** — 10 ürün kartı, grid layout
4. **Neden Biz** — 4 özellik kartı (Kalite, Üretim, İhracat, Özel Etiket)
5. **Private Label / Fason Bölümü** — Başvuru formu CTA
6. **İstatistikler** — Ülke sayısı, ürün çeşidi, yıllık üretim
7. **Sertifikalar** — Logo grid
8. **Footer** — İletişim, linkler, sosyal medya

---

## Claude Code'a Verilecek İlk Prompt

```
Next.js 14 App Router + Tailwind CSS ile Soft & Power Hygiene 
şirketi için statik kurumsal web sitesi kurulumunu yap.

Özellikler:
- next-intl ile 6 dil desteği (tr, en, de, ru, ar, uk)
- Temel klasör yapısı (app, components, messages, public)
- Ana layout (layout.tsx) ve boş sayfa yapısı
- Navbar bileşeni: logo sol, menü orta, dil seçici sağ
- Tailwind config: primary renk #1B4F8A

Şimdilik sadece iskelet yapıyı kur, içerik sonra eklenecek.
Türkçe açıklamalarla yap.
```

---

## Geliştirme Sırası

- [x] Proje kurulumu ve iskelet yapı
- [ ] Navbar + Footer
- [ ] Anasayfa Hero bölümü
- [ ] Ürün kategorileri grid
- [ ] Neden biz bölümü
- [ ] Private label sayfası + form
- [ ] İletişim sayfası
- [ ] 6 dil çevirileri
- [ ] SEO meta etiketleri
- [ ] Vercel deploy + domain bağlama

---

## Notlar

- E-ticaret YOK, sadece tanıtım sitesi
- Backend YOK, tamamen statik
- Formlar Web3Forms ile e-postaya gidecek
- Mevcut WordPress sitesi geçiş tamamlanana kadar çalışmaya devam edecek
- Ürün görselleri mevcut WordPress sitesinden indirilecek:
  `https://softandpower.com/wp-content/uploads/2025/10/`
