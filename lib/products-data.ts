export interface Product {
  slug: string;
  name: string;
  description: string;
  count: string;
  size?: string;
  series: string;
  seriesColor: string;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Category {
  slug: string;
  name: string;
  nameKey: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  features: string[];
  gradient: string;
  image?: string;
  products: Product[];
  faqs: FAQ[];
}

export const categories: Category[] = [
  // ─── 1. BEBEK BEZİ ───────────────────────────────────────────────
  {
    slug: "bebek-bezi",
    name: "Bebek Bezi",
    nameKey: "babyDiapers",
    description:
      "Bebeğinizin hassas cildini koruyan, süper emici ve sızdırmaz bebek bezleri. Eko ve Mega serilerimizle her bütçeye uygun çözümler sunuyoruz.",
    seoTitle: "Bebek Bezi | Eko & Mega Seriler | Soft & Power",
    seoDescription:
      "Soft & Power bebek bezleri hipoalerjenik, süper emici ve sızdırmaz yapısıyla bebeğinize en iyi korumayı sağlar. Eko ve Mega seçenekleriyle uygun fiyatlı çözümler.",
    features: ["Hipoalerjenik", "Süper Emici", "Sızdırmaz", "ISO Sertifikalı"],
    gradient: "from-blue-500 to-cyan-400",
    products: [
      // Ekonomik Paket
      {
        slug: "eco-newborn",
        name: "Ekonomik Newborn",
        description:
          "Yeni doğan bebekler için özel olarak tasarlanmış, nefes alabilen ve ultra yumuşak bebek bezi. Bebeğinizin konforunu sağlar.",
        count: "40 Adet",
        size: "2-5 kg",
        series: "Ekonomik Paket",
        seriesColor: "#16a34a",
      },
      {
        slug: "eco-mini",
        name: "Ekonomik Mini",
        description:
          "Büyüyen bebeğiniz için ideal emicilik ve konfor sunan ekonomik bebek bezi. Esnek bel bandı sayesinde hareketli bebeklerde bile mükemmel uyum sağlar.",
        count: "38 Adet",
        size: "3-6 kg",
        series: "Ekonomik Paket",
        seriesColor: "#16a34a",
      },
      {
        slug: "eco-midi",
        name: "Ekonomik Midi",
        description:
          "Orta boy bebek bezi, aktif bebekler için güçlü emicilik kapasitesi sunar. Çift bariyer sistemiyle yanlardan sızıntıyı önler.",
        count: "34 Adet",
        size: "5-9 kg",
        series: "Ekonomik Paket",
        seriesColor: "#16a34a",
      },
      {
        slug: "eco-maxi",
        name: "Ekonomik Maxi",
        description:
          "Hareketli bebekler için tasarlanmış geniş emici tabanlı bebek bezi. Gece boyunca kuru kalma garantisi sunar.",
        count: "32 Adet",
        size: "7-18 kg",
        series: "Ekonomik Paket",
        seriesColor: "#16a34a",
      },
      {
        slug: "eco-junior",
        name: "Ekonomik Junior",
        description:
          "Büyük bebekler ve tuvalet eğitimine geçiş dönemindeki çocuklar için ideal bebek bezi. Kolay çıkarılabilir yapıştırıcı bantlar içerir.",
        count: "30 Adet",
        size: "11-25 kg",
        series: "Ekonomik Paket",
        seriesColor: "#16a34a",
      },
      {
        slug: "eco-xlarge",
        name: "Ekonomik X Large",
        description:
          "Daha büyük bebekler için ekstra geniş kesimli ve yüksek emiciliğe sahip bebek bezi. Uzun süreli kullanımda bile cildi kuru tutar.",
        count: "28 Adet",
        size: "15+ kg",
        series: "Ekonomik Paket",
        seriesColor: "#16a34a",
      },
      {
        slug: "eco-xxlarge",
        name: "Ekonomik XX Large",
        description:
          "En büyük beden bebek bezi, aktif çocuklar için maksimum koruma sağlar. Ekstra geniş emici çekirdek ile uzun süreli kuruluk sunar.",
        count: "24 Adet",
        size: "20-30 kg",
        series: "Ekonomik Paket",
        seriesColor: "#16a34a",
      },
      // Mega Paket
      {
        slug: "premium-newborn",
        name: "Mega Newborn",
        description:
          "Yeni doğan bebekler için üst düzey koruma sunan mega paket bebek bezi. Ultra emici çekirdeği ile uzun süreli kuruluk sağlar.",
        count: "80 Adet",
        size: "2-5 kg",
        series: "Mega Paket",
        seriesColor: "#00b4c8",
      },
      {
        slug: "premium-mini",
        name: "Mega Mini",
        description:
          "Bebeğinizin hassas cildi için özel geliştirilmiş mega paket bebek bezi. Yüksek emicilik kapasitesiyle cilt tahrişini önler.",
        count: "76 Adet",
        size: "3-6 kg",
        series: "Mega Paket",
        seriesColor: "#00b4c8",
      },
      {
        slug: "premium-midi",
        name: "Mega Midi",
        description:
          "Orta boy mega paket bebek bezi, üstün emicilik teknolojisi ile bebeğinizi her an kuru tutar. Maksimum güvence sağlar.",
        count: "68 Adet",
        size: "5-9 kg",
        series: "Mega Paket",
        seriesColor: "#00b4c8",
      },
      {
        slug: "premium-maxi",
        name: "Mega Maxi",
        description:
          "Hareketli bebekler için mega paket bebek bezi. Elastik bel bandı ve esnek yapısıyla gün boyu konfor sağlar.",
        count: "64 Adet",
        size: "7-18 kg",
        series: "Mega Paket",
        seriesColor: "#00b4c8",
      },
      {
        slug: "premium-junior",
        name: "Mega Junior",
        description:
          "Büyük çocuklar için mega paket bebek bezi. Ekstra ince tasarımı ile giysi altında fark edilmez.",
        count: "60 Adet",
        size: "11-25 kg",
        series: "Mega Paket",
        seriesColor: "#00b4c8",
      },
      {
        slug: "premium-xlarge",
        name: "Mega X Large",
        description:
          "XL beden mega paket bebek bezi, gece ve gündüz üstün koruma sunar. Hava kanalları sayesinde cildi nefes aldırır.",
        count: "56 Adet",
        size: "15+ kg",
        series: "Mega Paket",
        seriesColor: "#00b4c8",
      },
      {
        slug: "premium-xxlarge",
        name: "Mega XX Large",
        description:
          "En büyük beden mega paket bebek bezi, aktif çocuklar için en yüksek emicilik kapasitesini sunar.",
        count: "48 Adet",
        size: "20-30 kg",
        series: "Mega Paket",
        seriesColor: "#00b4c8",
      },
    ],
    faqs: [
      {
        question: "Bebek bezi ne sıklıkla değiştirilmelidir?",
        answer:
          "Yeni doğan döneminde günde 8-10 kez, daha büyük bebeklerde ise günde 5-7 kez bez değiştirmeniz önerilir. Her dışkılamadan sonra hemen değiştirmek cilt sağlığı açısından önemlidir.",
      },
      {
        question: "Bebek bezleri hipoalerjenik mi?",
        answer:
          "Evet, tüm Soft & Power bebek bezleri hipoalerjenik malzemelerden üretilmektedir. Dermatolojik testlerden geçmiş olup hassas bebek cildine uygun olarak tasarlanmıştır.",
      },
      {
        question: "Hangi beden bebek bezini seçmeliyim?",
        answer:
          "Bez seçiminde bebeğinizin kilosunu temel almalısınız. Ambalaj üzerinde belirtilen kilo aralıklarına bakarak doğru bedeni bulabilirsiniz. Bez sık sızıntı yapıyorsa bir üst bedene geçme zamanı gelmiş olabilir.",
      },
      {
        question: "Bebek bezleri ISO sertifikalı mı?",
        answer:
          "Evet, tüm ürünlerimiz ISO 9001 kalite yönetim sistemi ve ISO 13485 medikal cihaz standartlarına uygun olarak üretilmektedir. Uluslararası kalite standartlarına tam uyum sağlanmaktadır.",
      },
    ],
  },

  // ─── 2. YETİŞKİN BEZİ ────────────────────────────────────────────
  {
    slug: "yetiskin-bezi",
    name: "Yetişkin Bezi",
    nameKey: "adultDiapers",
    description:
      "Yetişkinler için üstün emicilik ve konfor sunan bantlı bezler. Standart ve Gece serilerimizle 24 saat güvence sağlıyoruz.",
    seoTitle: "Yetişkin Bezi | Standart & Gece Seriler | Soft & Power",
    seoDescription:
      "Soft & Power yetişkin bezleri üstün emicilik, nefes alabilen yapı ve sızdırmaz tasarımıyla 24 saat güvence sağlar. Dermatolojik olarak test edilmiştir.",
    features: [
      "Superior Absorption",
      "Breathable",
      "Anti-leak",
      "Dermatoloji Tested",
    ],
    gradient: "from-indigo-600 to-blue-400",
    products: [
      {
        slug: "standart-small",
        name: "Standart Small",
        description:
          "Küçük beden yetişkin bezi, günlük kullanım için ideal emicilik sunar. Nefes alabilen dış yüzeyi ile cilt sağlığını korur.",
        count: "30 Adet",
        size: "S",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "standart-medium",
        name: "Standart Medium",
        description:
          "Orta beden yetişkin bezi, geniş emici tabana sahip olup gündüz kullanımında güvenilir koruma sağlar. Esnek bel bandı ile rahat hareket imkanı sunar.",
        count: "30 Adet",
        size: "M",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "standart-large",
        name: "Standart Large",
        description:
          "Büyük beden yetişkin bezi, yüksek emicilik kapasitesi ile uzun süreli kullanıma uygundur. Anatomik tasarımı sayesinde vücuda mükemmel oturur.",
        count: "30 Adet",
        size: "L",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "standart-xlarge",
        name: "Standart XLarge",
        description:
          "Ekstra büyük beden yetişkin bezi, geniş yapısıyla hareket kısıtlaması olmadan üstün koruma sunar. Çift bariyer sistemi ile sızıntıyı önler.",
        count: "30 Adet",
        size: "XL",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "gece-medium",
        name: "Gece Medium",
        description:
          "Gece kullanımı için özel olarak tasarlanmış orta beden yetişkin bezi. 8 saat koruma kapasitesiyle kesintisiz uyku sağlar.",
        count: "30 Adet",
        size: "M - 8 saat koruma",
        series: "Gece",
        seriesColor: "#0d2d5e",
      },
      {
        slug: "gece-large",
        name: "Gece Large",
        description:
          "Gece boyu koruma sunan büyük beden yetişkin bezi. Süper emici çekirdeği ile 8 saat boyunca kuruluk ve konfor sağlar.",
        count: "30 Adet",
        size: "L - 8 saat koruma",
        series: "Gece",
        seriesColor: "#0d2d5e",
      },
      {
        slug: "gece-xlarge",
        name: "Gece XLarge",
        description:
          "Gece kullanımı için ekstra büyük beden yetişkin bezi. 8 saatlik üstün emicilik kapasitesiyle gece boyunca maksimum güvence sunar.",
        count: "30 Adet",
        size: "XL - 8 saat koruma",
        series: "Gece",
        seriesColor: "#0d2d5e",
      },
    ],
    faqs: [
      {
        question: "Yetişkin bezi hangi durumlarda kullanılır?",
        answer:
          "Yetişkin bezleri idrar kaçırma problemi yaşayan kişiler, ameliyat sonrası dönemde olan hastalar ve yaşlı bakımında kullanılır. Hareket kısıtlılığı olan bireylerde de günlük konfor için tercih edilmektedir.",
      },
      {
        question: "Standart ve Gece serisi arasındaki fark nedir?",
        answer:
          "Gece serisi, 8 saate kadar kesintisiz koruma sağlayan ekstra emici çekirdek içerir. Standart seri günlük kullanım için optimize edilmiş olup düzenli aralıklarla değiştirilerek kullanılır.",
      },
      {
        question: "Yetişkin bezi cilt tahrişine neden olur mu?",
        answer:
          "Soft & Power yetişkin bezleri dermatolojik olarak test edilmiş ve nefes alabilen malzemelerden üretilmiştir. Düzenli aralıklarla değiştirildiğinde cilt tahrişi riskini minimize eder.",
      },
      {
        question: "Doğru beden nasıl seçilir?",
        answer:
          "Beden seçiminde bel çevresini ölçmeniz gerekmektedir. S beden 50-80 cm, M beden 70-110 cm, L beden 100-150 cm ve XL beden 130-170 cm bel çevresine uygundur. Doğru ölçüm konforlu kullanım için çok önemlidir.",
      },
      {
        question: "Yetişkin bezi ne sıklıkla değiştirilmelidir?",
        answer:
          "Gündüz kullanımda 3-4 saatte bir, gece serisinde ise 8 saate kadar kullanılabilir. Ancak her dışkılamadan sonra derhal değiştirilmelidir. Cildin temiz ve kuru kalması enfeksiyon riskini azaltır.",
      },
      {
        question: "Yetişkin bezleri koku yapar mı?",
        answer:
          "Soft & Power yetişkin bezleri koku kontrol teknolojisiyle donatılmıştır. Emici çekirdekteki özel granüller kokuyu hapsetmeye yardımcı olur ve kullanıcının sosyal ortamlarda kendini rahat hissetmesini sağlar.",
      },
    ],
  },

  // ─── 3. YETİŞKİN KULOT BEZİ ──────────────────────────────────────
  {
    slug: "yetiskin-kulot-bezi",
    name: "Yetişkin Kulot Bezi",
    nameKey: "adultPants",
    description:
      "Kulot gibi giyilebilen, aktif yaşam tarzına uygun yetişkin bezleri. 360° koruma ve elastik bel bandı ile maksimum konfor.",
    seoTitle: "Yetişkin Kulot Bezi | 360° Koruma | Soft & Power",
    seoDescription:
      "Soft & Power yetişkin kulot bezleri 360° koruma, çift bariyer sistemi ve elastik bel bandıyla aktif yaşamınızda özgürce hareket etmenizi sağlar.",
    features: ["360° Koruma", "Çift Bariyer", "Elastik Bel"],
    gradient: "from-violet-600 to-indigo-400",
    products: [
      {
        slug: "kulot-bezi-m",
        name: "Kulot Bezi Medium",
        description:
          "Orta beden kulot bezi, normal iç çamaşırı gibi giyilip çıkarılabilir. 360° elastik bel bandı ile vücuda tam oturur.",
        count: "30 Adet",
        size: "M (70-100 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "kulot-bezi-l",
        name: "Kulot Bezi Large",
        description:
          "Büyük beden kulot bezi, aktif kullanıcılar için ideal hareket özgürlüğü sağlar. Çift bariyer sistemiyle sızıntıyı önler.",
        count: "30 Adet",
        size: "L (90-120 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "kulot-bezi-xl",
        name: "Kulot Bezi XLarge",
        description:
          "Ekstra büyük beden kulot bezi, geniş emici yüzeyiyle üstün koruma sunar. Yırtılarak kolayca çıkarılabilir tasarıma sahiptir.",
        count: "28 Adet",
        size: "XL (110-150 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "kulot-bezi-xxl",
        name: "Kulot Bezi XXLarge",
        description:
          "En büyük beden kulot bezi, maksimum konfor ve emicilik için tasarlanmıştır. Geniş bel çevresine sahip kullanıcılar için ideal çözüm sunar.",
        count: "24 Adet",
        size: "XXL (130-170 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
    ],
    faqs: [
      {
        question: "Kulot bezi ile bantlı bez arasındaki fark nedir?",
        answer:
          "Kulot bezi normal iç çamaşırı gibi giyilip çıkarılır, bantlı bez ise yatarak takılır. Aktif ve hareketli kişiler için kulot bezi daha pratik bir seçenektir.",
      },
      {
        question: "Kulot bezi giysi altında belli olur mu?",
        answer:
          "Hayır, Soft & Power kulot bezleri ince ve ergonomik tasarımı sayesinde giysi altında belli olmaz. Normal iç çamaşırına benzer siluetiyle günlük hayatta rahatça kullanılabilir.",
      },
      {
        question: "Kulot bezi nasıl giyilir ve çıkarılır?",
        answer:
          "Kulot bezi normal iç çamaşırı gibi ayaklardan geçirilerek giyilir. Çıkarırken yanlardan yırtarak kolayca çıkarılabilir. Bu özellik özellikle bakım verenlerin işini kolaylaştırır.",
      },
      {
        question: "Hangi beden kulot bezi seçmeliyim?",
        answer:
          "Bel çevrenizi ölçerek doğru bedeni belirleyebilirsiniz. M beden 70-100 cm, L beden 90-120 cm, XL beden 110-150 cm ve XXL beden 130-170 cm bel çevresine uygundur.",
      },
      {
        question: "Kulot bezi gece kullanımına uygun mu?",
        answer:
          "Kulot bezleri gece kullanımında da tercih edilebilir, ancak uzun süreli gece kullanımı için bantlı gece bezlerini öneriyoruz. Kulot bezleri daha çok gündüz aktif kullanım için optimize edilmiştir.",
      },
      {
        question: "Kulot bezi ne kadar sıvı absorbe eder?",
        answer:
          "Soft & Power kulot bezleri 800 ml'ye kadar sıvı absorbe edebilir. Çift bariyer sistemi ve süper emici çekirdek ile gün boyu güvenle kullanılabilir.",
      },
    ],
  },

  // ─── 4. YETİŞKİN ALT SERME ÖRTÜSÜ ────────────────────────────────
  {
    slug: "yetiskin-alt-serme-ortusu",
    name: "Yetişkin Alt Serme Örtüsü",
    nameKey: "adultUnderpads",
    description:
      "Yatak ve yüzey koruma için tasarlanmış yetişkin alt serme örtüleri. Su geçirmez alt katman ve hızlı emici üst yüzey ile hijyenik koruma.",
    seoTitle: "Yetişkin Alt Serme Örtüsü | Yatak Koruma | Soft & Power",
    seoDescription:
      "Soft & Power yetişkin alt serme örtüleri su geçirmez taban, hızlı emici yüzey ve kaymaz yapısıyla yatak ve yüzey korumasında güvenilir çözüm sunar.",
    features: ["Su Geçirmez Alt", "Hızlı Emici Üst", "Kaymaz Taban"],
    gradient: "from-sky-600 to-cyan-400",
    products: [
      {
        slug: "alt-serme-60x60",
        name: "Alt Serme Örtüsü 60x60",
        description:
          "Kompakt boyutlu yetişkin alt serme örtüsü, tekerlekli sandalye ve oturma alanları için ideal. Su geçirmez alt katmanı ile yüzeyleri korur.",
        count: "30 Adet",
        size: "60x60 cm",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "alt-serme-60x90",
        name: "Alt Serme Örtüsü 60x90",
        description:
          "Geniş boyutlu yetişkin alt serme örtüsü, yatak koruma için en çok tercih edilen boyut. Hızlı emici üst yüzeyi ile cildi kuru tutar.",
        count: "25 Adet",
        size: "60x90 cm",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "alt-serme-90x180",
        name: "Alt Serme Örtüsü 90x180 Hastane",
        description:
          "Hastane tipi ekstra büyük alt serme örtüsü, hasta yatağını tam olarak kaplar. Yüksek emicilik kapasitesi ile profesyonel sağlık kuruluşlarında güvenle kullanılır.",
        count: "20 Adet",
        size: "90x180 cm",
        series: "Hastane",
        seriesColor: "#6b7280",
      },
    ],
    faqs: [
      {
        question: "Alt serme örtüsü ne amaçla kullanılır?",
        answer:
          "Alt serme örtüleri yatak, koltuk ve oturma alanlarını sıvı sızıntısından korumak için kullanılır. İdrar kaçırma sorunu yaşayan bireylerin yataklarında hijyen sağlamak amacıyla tercih edilir.",
      },
      {
        question: "Alt serme örtüsü kayar mı?",
        answer:
          "Hayır, Soft & Power alt serme örtüleri kaymaz taban teknolojisine sahiptir. Kullanım sırasında yerinden oynamaz ve yatak yüzeyine sabit kalarak güvenli kullanım sağlar.",
      },
      {
        question: "Hastane tipi örtü evde kullanılabilir mi?",
        answer:
          "Evet, 90x180 cm hastane tipi örtümüz evde de rahatlıkla kullanılabilir. Tek kişilik yatağı tamamen kapladığı için özellikle yatağa bağımlı hastaların bakımında çok faydalıdır.",
      },
      {
        question: "Alt serme örtüsü ne sıklıkla değiştirilmelidir?",
        answer:
          "Her ıslandığında veya kirlendiğinde derhal değiştirilmelidir. Kuru kaldığı sürece günlük olarak değiştirmek yeterlidir. Hijyenik kullanım için tek kullanımlık olarak tasarlanmıştır.",
      },
      {
        question: "Alt serme örtüsü ne kadar sıvı emebilir?",
        answer:
          "Boyutuna bağlı olarak 500 ml ile 1500 ml arasında sıvı emebilir. 90x180 cm hastane modeli en yüksek emicilik kapasitesine sahiptir ve profesyonel kullanım için uygundur.",
      },
      {
        question: "Alt serme örtüleri çevreye zararlı mıdır?",
        answer:
          "Soft & Power alt serme örtüleri çevreye duyarlı malzemelerden üretilmektedir. Atık olarak normal çöpe atılabilir, ancak geri dönüşüme uygun değildir. Bertaraf konusunda yerel yönetmeliklere uyulması önerilir.",
      },
    ],
  },

  // ─── 5. BEBEK ALT SERME ÖRTÜSÜ ────────────────────────────────────
  {
    slug: "bebek-alt-serme-ortusu",
    name: "Bebek Alt Serme Örtüsü",
    nameKey: "babyUnderpads",
    description:
      "Bebeğinizin hassas cildi için özel olarak tasarlanmış alt serme örtüleri. Nefes alan üst yüzey ve sızdırmaz alt katman ile hijyenik koruma.",
    seoTitle: "Bebek Alt Serme Örtüsü | Hassas Cilt | Soft & Power",
    seoDescription:
      "Soft & Power bebek alt serme örtüleri nefes alan üst yüzey, sızdırmaz alt katman ve hassas cilde uygun yapısıyla bebeğinizin konforunu sağlar.",
    features: ["Nefes Alan Üst Yüzey", "Sızdırmaz Alt", "Hassas Cilt"],
    gradient: "from-pink-400 to-rose-300",
    products: [
      {
        slug: "bebek-alt-serme-40x60",
        name: "Bebek Alt Serme Örtüsü 40x60",
        description:
          "Kompakt boyutlu bebek alt serme örtüsü, bez değiştirme anında ve dış mekan kullanımında ideal. Çantada az yer kaplar ve her yerde kullanılabilir.",
        count: "30 Adet",
        size: "40x60 cm",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "bebek-alt-serme-60x60",
        name: "Bebek Alt Serme Örtüsü 60x60",
        description:
          "Geniş boyutlu bebek alt serme örtüsü, bebek yatağı ve alt değiştirme ünitesi için mükemmel boyut. Nefes alan yapısıyla bebeğinizin cildini korur.",
        count: "25 Adet",
        size: "60x60 cm",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
    ],
    faqs: [
      {
        question: "Bebek alt serme örtüsü ne zaman kullanılır?",
        answer:
          "Bez değiştirme sırasında, uyku zamanlarında yatak koruma için ve dış mekanda bez değişimi sırasında kullanılır. Ayrıca bebeğin çıplak oynadığı zamanlarda da yüzeyleri korumak için idealdir.",
      },
      {
        question: "Bebek alt serme örtüsü cildi tahriş eder mi?",
        answer:
          "Hayır, Soft & Power bebek alt serme örtüleri bebek cildine uygun hipoalerjenik malzemeden üretilmiştir. Nefes alan üst yüzey sayesinde cilde temas eden kısım yumuşak ve naziktir.",
      },
      {
        question: "Hangi boyutu tercih etmeliyim?",
        answer:
          "40x60 cm boyut taşınabilir kullanım ve bez değiştirme çantası için idealdir. 60x60 cm boyut ise bebek yatağında veya alt değiştirme ünitesinde daha geniş koruma alanı sağlar.",
      },
      {
        question: "Bebek alt serme örtüsü tekrar kullanılabilir mi?",
        answer:
          "Hayır, ürünlerimiz tek kullanımlık olarak tasarlanmıştır. Hijyen açısından her kullanımdan sonra atılması ve yenisinin serilmesi önerilir. Bu sayede bebeğiniz her zaman temiz bir yüzeyde olur.",
      },
      {
        question: "Seyahatte bebek alt serme örtüsü gerekli mi?",
        answer:
          "Kesinlikle, seyahatte temiz bir bez değiştirme alanı bulmak zor olabilir. 40x60 cm boyutlu örtülerimiz çantanızda çok az yer kaplar ve her yerde hijyenik bir bez değiştirme ortamı sağlar.",
      },
      {
        question: "Bebek alt serme örtüsü su geçirir mi?",
        answer:
          "Alt katmanı tamamen su geçirmez olup yüzeyleri sıvıdan korur. Üst yüzey ise nefes alan ve hızlı emici yapıda olup bebeğinizin cildini kuru tutar.",
      },
    ],
  },

  // ─── 6. MESANE PEDİ ───────────────────────────────────────────────
  {
    slug: "mesane-pedi",
    name: "Mesane Pedi",
    nameKey: "bladderPads",
    description:
      "Hafif ve orta düzey idrar kaçırma için tasarlanmış unisex mesane pedleri. Anatomik form ve nötr koku sistemiyle gizli koruma.",
    seoTitle: "Mesane Pedi | Unisex | Anatomik Form | Soft & Power",
    seoDescription:
      "Soft & Power mesane pedleri unisex tasarım, anatomik form ve nötr koku sistemiyle hafif ve orta düzey idrar kaçırmada gizli ve güvenilir koruma sağlar.",
    features: ["Unisex", "Anatomik Form", "Nötr Koku Sistemi"],
    gradient: "from-teal-500 to-emerald-400",
    products: [
      {
        slug: "mesane-pedi-mini",
        name: "Mesane Pedi Mini",
        description:
          "Hafif idrar kaçırma için tasarlanmış mini mesane pedi. İnce ve gizli yapısıyla günlük hayatta rahatça kullanılabilir. Normal iç çamaşırına yapışarak sabit kalır.",
        count: "28 Adet",
        size: "Hafif Akıntı",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "mesane-pedi-normal",
        name: "Mesane Pedi Normal",
        description:
          "Orta düzey idrar kaçırma için ideal mesane pedi. Anatomik formu ile vücuda uyum sağlar ve hareket sırasında yerinden oynamaz.",
        count: "24 Adet",
        size: "Orta Akıntı",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "mesane-pedi-maxi",
        name: "Mesane Pedi Maxi",
        description:
          "Yoğun idrar kaçırma için yüksek emiciliğe sahip maxi mesane pedi. Geniş emici yüzeyi ve nötr koku sistemiyle uzun süreli güvence sağlar.",
        count: "20 Adet",
        size: "Yoğun Akıntı",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
    ],
    faqs: [
      {
        question: "Mesane pedi kimler için uygundur?",
        answer:
          "Mesane pedleri hafif ve orta düzey idrar kaçırma yaşayan kadın ve erkekler için uygundur. Öksürme, hapşırma veya egzersiz sırasında kaçırma yaşayan kişiler günlük konfor için tercih edebilir.",
      },
      {
        question: "Mesane pedi ile hijyenik ped arasındaki fark nedir?",
        answer:
          "Mesane pedleri idrar emiciliği için özel olarak tasarlanmıştır ve hijyenik pedlere göre çok daha fazla sıvı absorbe edebilir. Ayrıca koku kontrol teknolojisi mesane pedlerinde daha gelişmiştir.",
      },
      {
        question: "Mesane pedi giysi altında belli olur mu?",
        answer:
          "Hayır, özellikle Mini model son derece ince tasarlanmış olup giysi altında kesinlikle belli olmaz. Normal ve Maxi modeller de anatomik formları sayesinde vücuda uyum sağlar ve fark edilmez.",
      },
      {
        question: "Hangi mesane pedi boyutunu seçmeliyim?",
        answer:
          "Mini model hafif damlatma şeklindeki kaçırma için, Normal model düzenli ancak orta miktarda kaçırma için, Maxi model ise yoğun kaçırma sorunları için uygundur. İhtiyacınıza göre doğru modeli seçebilirsiniz.",
      },
      {
        question: "Mesane pedi ne sıklıkla değiştirilmelidir?",
        answer:
          "Kullanım yoğunluğuna bağlı olarak günde 3-5 kez değiştirilmesi önerilir. Her ıslanma hissedildiğinde değiştirmek cilt sağlığı açısından en doğru yaklaşımdır.",
      },
      {
        question: "Mesane pedi koku yapar mı?",
        answer:
          "Soft & Power mesane pedleri nötr koku sistemiyle donatılmıştır. Özel emici granüller kokuyu hapseder ve nötralize eder, böylece sosyal ortamlarda kendinizi güvende hissedersiniz.",
      },
    ],
  },

  // ─── 7. HİJYENİK PED ──────────────────────────────────────────────
  {
    slug: "hijyenik-ped",
    name: "Hijyenik Ped",
    nameKey: "sanitaryPads",
    description:
      "Regl döneminde üstün koruma ve konfor sunan hijyenik pedler. Hızlı emici yüzey ve sızdırmaz arka tasarımıyla her anınızda güvence.",
    seoTitle: "Hijyenik Ped | Günlük & Gece | Soft & Power",
    seoDescription:
      "Soft & Power hijyenik pedler hızlı emici yüzey, sızdırmaz arka katman ve nefes alan yapısıyla regl döneminde konforlu ve güvenli koruma sağlar.",
    features: ["Hızlı Emici Yüzey", "Sızdırmaz Arka", "Nefes Alan"],
    gradient: "from-rose-500 to-pink-400",
    products: [
      {
        slug: "hijyenik-ped-gunluk",
        name: "Günlük Ped",
        description:
          "Günlük kullanım için tasarlanmış ince hijyenik ped. Hafif akıntılı günlerde veya regl arası dönemlerde temiz ve kuru kalmanızı sağlar.",
        count: "30 Adet",
        size: "İnce",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "hijyenik-ped-normal",
        name: "Normal Ped",
        description:
          "Normal akıntılı günler için kanatlı hijyenik ped. Kanatları sayesinde iç çamaşırına sabit kalır ve hareket sırasında kayma yapmaz.",
        count: "24 Adet",
        size: "Kanatlı",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "hijyenik-ped-uzun",
        name: "Uzun Ped",
        description:
          "Uzun formlu kanatlı hijyenik ped, yoğun akıntılı günlerde geniş koruma alanı sunar. Arkaya doğru uzatılmış yapısıyla oturma ve yatma pozisyonunda bile sızıntıyı önler.",
        count: "20 Adet",
        size: "Kanatlı",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "hijyenik-ped-gece",
        name: "Gece Pedi",
        description:
          "Gece kullanımı için ekstra uzun hijyenik ped. 34 cm uzunluğuyla gece boyu tam koruma sağlar ve rahat bir uyku için güvence sunar.",
        count: "16 Adet",
        size: "34 cm",
        series: "Gece",
        seriesColor: "#0d2d5e",
      },
    ],
    faqs: [
      {
        question: "Hijyenik ped ne sıklıkla değiştirilmelidir?",
        answer:
          "Hijyenik pedler 3-4 saatte bir değiştirilmelidir. Yoğun akıntılı günlerde daha sık değiştirme gerekebilir. Uzun süre değiştirmemek bakteri üremesine ve kötü kokuya neden olabilir.",
      },
      {
        question: "Günlük ped regl döneminde yeterli mi?",
        answer:
          "Günlük pedler hafif akıntılı günler ve regl öncesi/sonrası dönemler için tasarlanmıştır. Regl döneminin yoğun günlerinde Normal veya Uzun modellerimizi tercih etmenizi öneriyoruz.",
      },
      {
        question: "Gece pedi ile normal ped arasındaki fark nedir?",
        answer:
          "Gece pedi 34 cm uzunluğuyla normal pede göre çok daha geniş koruma alanı sunar. Arkaya doğru genişletilmiş yapısıyla yatarken oluşabilecek sızıntıları önler ve gece boyunca güvence sağlar.",
      },
      {
        question: "Hijyenik pedler cilt tahrişi yapar mı?",
        answer:
          "Soft & Power hijyenik pedleri nefes alan yumuşak üst yüzeyiyle cilt tahrişini minimize eder. Ancak çok hassas cilde sahipseniz düzenli aralıklarla değiştirerek ve temizlik yaparak tahrişi önleyebilirsiniz.",
      },
      {
        question: "Kanatlı ped ile kanatsız ped arasında ne fark var?",
        answer:
          "Kanatlı pedler iç çamaşırının altına katlanan kanatlarıyla pedin kaymasını önler ve yanlardan sızıntıya karşı ekstra koruma sağlar. Aktif yaşam tarzı olanlar için kanatlı modeller daha güvenlidir.",
      },
      {
        question: "Spor yaparken hijyenik ped kullanabilir miyim?",
        answer:
          "Evet, özellikle Normal ve Uzun modellerimiz spor sırasında güvenle kullanılabilir. Kanatlı yapıları sayesinde hareket sırasında yerinden oynamaz ve sızıntı riski oluşturmaz.",
      },
    ],
  },

  // ─── 8. ISLAK MENDİL ──────────────────────────────────────────────
  {
    slug: "islak-mendil",
    name: "Islak Mendil",
    nameKey: "wetWipes",
    description:
      "Her yaş grubuna uygun, pH dengeli ve alkol içermeyen ıslak mendiller. Bebek bakımından genel temizliğe kadar geniş ürün yelpazesi.",
    seoTitle: "Islak Mendil | pH Dengeli & Alkol İçermez | Soft & Power",
    seoDescription:
      "Soft & Power ıslak mendiller pH dengeli, alkol içermeyen ve dermatolojik olarak onaylı formülleriyle bebek bakımından genel temizliğe kadar güvenle kullanılır.",
    features: ["pH Dengeli", "Alkol İçermez", "Dermatoloji Onaylı"],
    gradient: "from-emerald-500 to-teal-400",
    products: [
      {
        slug: "islak-mendil-bebek-hassas",
        name: "Bebek Hassas Islak Mendil",
        description:
          "Parfümsüz formülüyle yeni doğan bebekler dahil tüm bebekler için güvenli ıslak mendil. pH dengeli yapısıyla bebek cildinin doğal dengesini korur.",
        count: "72 Yaprak",
        series: "Bebek",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "islak-mendil-aloe-vera",
        name: "Aloe Vera Islak Mendil",
        description:
          "Aloe vera katkılı nemlendirici ıslak mendil, hem bebek hem yetişkin kullanımına uygundur. Cildi temizlerken aynı zamanda nemlendirici bakım sağlar.",
        count: "72 Yaprak",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "islak-mendil-antibakteriyel",
        name: "Antibakteriyel Islak Mendil",
        description:
          "Antibakteriyel formülüyle el ve yüzey temizliği için ideal ıslak mendil. Bakterilerin %99,9'unu etkisiz hale getirir ve hijyenik ortam sağlar.",
        count: "60 Yaprak",
        series: "Antibakteriyel",
        seriesColor: "#6b7280",
      },
      {
        slug: "islak-mendil-ekstra-kalin",
        name: "Ekstra Kalın Islak Mendil",
        description:
          "Kalın ve dayanıklı dokusuyla zorlu temizlik işleri için tasarlanmış ıslak mendil. Daha az mendil ile daha etkili temizlik sağlar.",
        count: "48 Yaprak",
        series: "Premium",
        seriesColor: "#1a5fa8",
      },
    ],
    faqs: [
      {
        question: "Bebek ıslak mendili yetişkinler de kullanabilir mi?",
        answer:
          "Evet, bebek hassas ıslak mendilimiz yetişkinler için de güvenlidir. Parfümsüz ve pH dengeli formülü sayesinde hassas cilde sahip herkes rahatlıkla kullanabilir.",
      },
      {
        question: "Islak mendiller alkol içerir mi?",
        answer:
          "Hayır, tüm Soft & Power ıslak mendiller alkol içermez. pH dengeli ve dermatolojik olarak onaylanmış formülleriyle cilde nazik temizlik sağlar.",
      },
      {
        question: "Antibakteriyel ıslak mendil bebekler için uygun mu?",
        answer:
          "Antibakteriyel formülümüz yetişkin kullanımı ve yüzey temizliği için tasarlanmıştır. Bebekler için Bebek Hassas modelimizi öneriyoruz çünkü bebek cildine özel nazik formüle sahiptir.",
      },
      {
        question: "Islak mendiller tuvalete atılabilir mi?",
        answer:
          "Hayır, ıslak mendillerimizi tuvalete atmayınız. Tuvalet tıkanmasına neden olabilir. Kullandıktan sonra çöp kutusuna atmanız gerekmektedir.",
      },
      {
        question: "Açılan paket ne kadar süre kullanılabilir?",
        answer:
          "Açılan paketlerin kapağını her kullanımdan sonra sıkıca kapatmanız gerekmektedir. Doğru saklama koşullarında açılan paket 1 ay boyunca nemini korur. Mendiller kurursa kullanılmamalıdır.",
      },
      {
        question: "Ekstra kalın mendil ne amaçla kullanılır?",
        answer:
          "Ekstra kalın mendiller zorlu temizlik işleri için idealdir. Makyaj temizliği, bebek alt temizliği veya yüzey temizliğinde normal mendillere göre daha az sayıda kullanarak etkili sonuç almanızı sağlar.",
      },
    ],
  },

  // ─── 9. YÜZEY TEMİZLEME HAVLUSU ──────────────────────────────────
  {
    slug: "yuzey-temizleme-havlusu",
    name: "Yüzey Temizleme Havlusu",
    nameKey: "cleaningTowels",
    description:
      "Ev, ofis ve endüstriyel kullanım için süper emici ve dayanıklı temizleme havluları. Rulo ve katlı seçeneklerle her ihtiyaca uygun çözüm.",
    seoTitle: "Yüzey Temizleme Havlusu | Rulo & Katlı | Soft & Power",
    seoDescription:
      "Soft & Power yüzey temizleme havluları süper emici, dayanıklı ve tek kullanımlık yapısıyla ev, ofis ve endüstriyel temizlikte profesyonel sonuçlar sunar.",
    features: ["Süper Emici", "Dayanıklı", "Tek Kullanımlık"],
    gradient: "from-amber-500 to-yellow-400",
    products: [
      {
        slug: "temizleme-havlusu-rulo",
        name: "Rulo Temizleme Havlusu",
        description:
          "2 katlı süper emici rulo temizleme havlusu, mutfak ve banyo temizliği için ideal. Koparma çizgisi sayesinde ihtiyacınız kadar kullanabilirsiniz.",
        count: "150 Yaprak",
        size: "2 Katlı",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "temizleme-havlusu-katli",
        name: "Katlı Temizleme Havlusu",
        description:
          "Tek tek çekilebilen katlı temizleme havlusu, ofis ve ev kullanımı için pratik çözüm. Dispenser uyumlu tasarımıyla her ortamda kolayca kullanılır.",
        count: "200 Yaprak",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "temizleme-havlusu-endustriyel-mavi",
        name: "Endüstriyel Temizleme Havlusu Mavi",
        description:
          "Endüstriyel kullanım için tasarlanmış ekstra dayanıklı mavi temizleme havlusu. Yağ, gres ve kimyasal maddelerin temizliğinde üstün performans gösterir.",
        count: "400 Yaprak",
        size: "Mavi",
        series: "Endüstriyel",
        seriesColor: "#6b7280",
      },
      {
        slug: "temizleme-havlusu-endustriyel-beyaz",
        name: "Endüstriyel Temizleme Havlusu Beyaz",
        description:
          "Endüstriyel kullanım için beyaz temizleme havlusu, gıda sektörü ve laboratuvar ortamlarında hijyenik temizlik sağlar. Tüy bırakmayan yapısıyla hassas yüzeylerde güvenle kullanılır.",
        count: "400 Yaprak",
        size: "Beyaz",
        series: "Endüstriyel",
        seriesColor: "#6b7280",
      },
    ],
    faqs: [
      {
        question: "Rulo havlu ile katlı havlu arasındaki fark nedir?",
        answer:
          "Rulo havlu koparma çizgisi sayesinde ihtiyacınız kadar kesip kullanmanıza imkan tanır. Katlı havlu ise tek tek çekilebilen yapısıyla daha hijyenik kullanım sunar ve dispenser ile kullanıma uygundur.",
      },
      {
        question: "Endüstriyel havlular evde kullanılabilir mi?",
        answer:
          "Evet, endüstriyel havlularımız evde garaj temizliği, araç bakımı veya ağır temizlik işlerinde kullanılabilir. Ancak günlük ev temizliği için rulo veya katlı modellerimiz daha ekonomiktir.",
      },
      {
        question: "Mavi ve beyaz endüstriyel havlu arasında ne fark var?",
        answer:
          "Mavi endüstriyel havlular genel sanayi temizliği ve yağlı yüzeyler için idealdir. Beyaz model ise gıda sektörü ve laboratuvar gibi hijyen gerektiren ortamlarda tercih edilir.",
      },
      {
        question: "Temizleme havluları tüy bırakır mı?",
        answer:
          "Soft & Power temizleme havluları özel üretim teknolojisiyle tüy bırakmayan yapıya sahiptir. Özellikle endüstriyel beyaz modelimiz cam ve hassas yüzeylerde leke ve tüy bırakmadan temizlik sağlar.",
      },
      {
        question: "Temizleme havluları ıslak olarak da kullanılabilir mi?",
        answer:
          "Evet, temizleme havlularımız hem kuru hem ıslak kullanıma uygundur. Islandığında yırtılmayan dayanıklı yapıları sayesinde deterjan veya dezenfektanla birlikte etkili temizlik yapabilirsiniz.",
      },
      {
        question: "Bir rulo temizleme havlusu ne kadar dayanır?",
        answer:
          "150 yapraklı rulo temizleme havlusu ortalama bir evde 2-3 hafta süre dayanır. Kullanım sıklığına göre bu süre değişebilir. Endüstriyel modeller 400 yaprak içerdiği için çok daha uzun ömürlüdür.",
      },
    ],
  },
];

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(catSlug: string, prodSlug: string) {
  const cat = getCategoryBySlug(catSlug);
  return cat?.products.find((p) => p.slug === prodSlug);
}
