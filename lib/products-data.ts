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
      "Yüksek emiş gücü, sızdırmaz koruması ve nefes alabilen yapısı ile gündüz ve gece kullanımına uygundur.",
    seoTitle: "Yetişkin Bezi | M / L / XL | Soft & Power",
    seoDescription:
      "Soft & Power yetişkin bezleri yüksek emiş gücü, sızdırmaz koruma ve nefes alabilen yapısı ile gündüz ve gece kullanıma uygundur. Dermatolojik olarak test edilmiştir.",
    features: [
      "Superior Absorption",
      "Breathable",
      "Anti-leak",
      "Dermatoloji Tested",
    ],
    gradient: "from-indigo-600 to-blue-400",
    products: [
      {
        slug: "yetiskin-bezi-m",
        name: "Yetişkin Bezi M",
        description:
          "Orta beden yetişkin bezi. Yüksek emiş gücü, sızdırmaz yan bariyerleri ve nefes alabilen yapısıyla gündüz ve gece kullanıma uygundur. Bel çevresi 85-125 cm.",
        count: "30 Adet",
        size: "M (85-125 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "yetiskin-bezi-l",
        name: "Yetişkin Bezi L",
        description:
          "Büyük beden yetişkin bezi. Yüksek emiş gücü, sızdırmaz yan bariyerleri ve nefes alabilen yapısıyla gündüz ve gece kullanıma uygundur. Bel çevresi 100-150 cm.",
        count: "30 Adet",
        size: "L (100-150 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "yetiskin-bezi-xl",
        name: "Yetişkin Bezi XL",
        description:
          "Ekstra büyük beden yetişkin bezi. Yüksek emiş gücü, sızdırmaz yan bariyerleri ve nefes alabilen yapısıyla gündüz ve gece kullanıma uygundur. Bel çevresi 120-170 cm.",
        count: "30 Adet",
        size: "XL (120-170 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
    ],
    faqs: [
      {
        question: "Yetişkin bezi hangi durumlarda kullanılır?",
        answer:
          "Yetişkin bezleri idrar kaçırma problemi yaşayan kişiler, ameliyat sonrası dönemde olan hastalar ve yaşlı bakımında kullanılır. Hareket kısıtlılığı olan bireylerde de günlük konfor için tercih edilmektedir.",
      },
      {
        question: "Yetişkin bezi sızıntı yapar mı?",
        answer:
          "Soft & Power yetişkin bezleri çift bariyer sistemi, sızdırmaz yan lastikler ve ultra emici çekirdeği sayesinde sızıntıyı etkili biçimde önler. Esnek bel bandı vücuda tam oturarak uzun süreli kullanımlarda bile güvenli koruma sağlar.",
      },
      {
        question: "Yetişkin bezi cilt tahrişine neden olur mu?",
        answer:
          "Soft & Power yetişkin bezleri dermatolojik olarak test edilmiş ve nefes alabilen malzemelerden üretilmiştir. Düzenli aralıklarla değiştirildiğinde cilt tahrişi riskini minimize eder.",
      },
      {
        question: "Doğru beden nasıl seçilir?",
        answer:
          "Beden seçiminde bel çevresini ölçmeniz gerekmektedir. M beden 85-125 cm, L beden 100-150 cm ve XL beden 120-170 cm bel çevresine uygundur. Doğru ölçüm konforlu kullanım için çok önemlidir.",
      },
      {
        question: "Yetişkin bezi ne sıklıkla değiştirilmelidir?",
        answer:
          "Yetişkin bezi, ıslaklık durumu ve kullanıcının ihtiyacına bağlı olarak ortalama 3-4 saatte bir değiştirilmelidir. Her dışkılamadan sonra derhal yenilenmesi gerekir. Cildin temiz ve kuru tutulması cilt tahrişini ve enfeksiyon riskini en aza indirir.",
      },
      {
        question: "Yetişkin bezleri koku yapar mı?",
        answer:
          "Soft & Power yetişkin bezleri koku kontrol teknolojisiyle donatılmıştır. Emici çekirdekteki özel granüller kokuyu hapsetmeye yardımcı olur ve kullanıcının sosyal ortamlarda kendini rahat hissetmesini sağlar.",
      },
    ],
  },

  // ─── 3. YETİŞKİN KÜLOT BEZİ ──────────────────────────────────────
  {
    slug: "yetiskin-kulot-bezi",
    name: "Yetişkin Külot Bezi",
    nameKey: "adultPants",
    description:
      "Aktif yaşam için tasarlanmış külot tipi yetişkin bezleri; 360° koruma ve esnek bel bandı ile gün boyu konfor sunar.",
    seoTitle: "Yetişkin Külot Bezi | 360° Koruma | Soft & Power",
    seoDescription:
      "Soft & Power yetişkin külot bezleri 360° koruma, çift bariyer sistemi ve esnek bel bandıyla aktif yaşamınızda özgürce hareket etmenizi sağlar.",
    features: ["360° Koruma", "Elastik Bel", "Çift Bariyer", "Anatomik Uyum"],
    gradient: "from-violet-600 to-indigo-400",
    products: [
      {
        slug: "kulot-bezi-m",
        name: "Külot Bezi Medium",
        description:
          "Orta beden külot bezi, normal iç çamaşırı gibi giyilip çıkarılabilir. 360° elastik bel bandı ile vücuda tam oturur.",
        count: "30 Adet",
        size: "M (70-100 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "kulot-bezi-l",
        name: "Külot Bezi Large",
        description:
          "Büyük beden külot bezi, aktif kullanıcılar için ideal hareket özgürlüğü sağlar. Çift bariyer sistemiyle sızıntıyı önler.",
        count: "30 Adet",
        size: "L (90-120 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "kulot-bezi-xl",
        name: "Külot Bezi XLarge",
        description:
          "Ekstra büyük beden külot bezi, geniş emici yüzeyiyle üstün koruma sunar. Yırtılarak kolayca çıkarılabilir tasarıma sahiptir.",
        count: "28 Adet",
        size: "XL (110-150 cm)",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
    ],
    faqs: [
      {
        question: "Külot bezi ile bantlı bez arasındaki fark nedir?",
        answer:
          "Külot bezi normal iç çamaşırı gibi giyilip çıkarılır, bantlı bez ise yatarak takılır. Aktif ve hareketli kişiler için külot bezi daha pratik bir seçenektir.",
      },
      {
        question: "Külot bezi giysi altında belli olur mu?",
        answer:
          "Hayır, Soft & Power külot bezleri ince ve ergonomik tasarımı sayesinde giysi altında belli olmaz. Normal iç çamaşırına benzer siluetiyle günlük hayatta rahatça kullanılabilir.",
      },
      {
        question: "Külot bezi nasıl giyilir ve çıkarılır?",
        answer:
          "Külot bezi normal iç çamaşırı gibi ayaklardan geçirilerek giyilir. Çıkarırken yanlardan yırtarak kolayca çıkarılabilir. Bu özellik özellikle bakım verenlerin işini kolaylaştırır.",
      },
      {
        question: "Hangi beden külot bezi seçmeliyim?",
        answer:
          "Bel çevrenizi ölçerek doğru bedeni belirleyebilirsiniz. M beden 70-100 cm, L beden 90-120 cm ve XL beden 110-150 cm bel çevresine uygundur.",
      },
      {
        question: "Külot bezi gün boyu kullanıma uygun mu?",
        answer:
          "Evet. Soft & Power külot bezleri esnek bel bandı, anatomik kesimi ve çift bariyer sistemi sayesinde gün boyu konforlu kullanıma uygundur. İhtiyaca göre gündüz ve gece kullanılabilir, ortalama 3-4 saatte bir değiştirilmesi önerilir.",
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
    features: ["Su Geçirmez Yüzey", "Hızlı Emici Yüzey", "Kaydırmaz Yapı"],
    gradient: "from-sky-600 to-cyan-400",
    products: [
      {
        slug: "alt-serme-60x90",
        name: "Alt Serme Örtüsü 60x90",
        description:
          "Geniş boyutlu yetişkin alt serme örtüsü, yatak koruma için en çok tercih edilen boyut. Hızlı emici üst yüzeyi ile cildi kuru tutar.",
        count: "30 Adet",
        size: "60x90 cm",
        series: "Standart",
        seriesColor: "#1a5fa8",
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
        question: "Alt serme örtüsü evde kullanılabilir mi?",
        answer:
          "Evet, 60×90 cm boyutlu alt serme örtümüz evde rahatlıkla kullanılabilir.",
      },
      {
        question: "Alt serme örtüsü ne sıklıkla değiştirilmelidir?",
        answer:
          "Her ıslandığında veya kirlendiğinde derhal değiştirilmelidir. Kuru kaldığı sürece günlük olarak değiştirmek yeterlidir. Hijyenik kullanım için tek kullanımlık olarak tasarlanmıştır.",
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
        slug: "bebek-alt-serme-60x60",
        name: "Bebek Alt Serme Örtüsü 60x60",
        description:
          "Geniş boyutlu bebek alt serme örtüsü, bebek yatağı ve alt değiştirme ünitesi için mükemmel boyut. Nefes alan yapısıyla bebeğinizin cildini korur.",
        count: "10 Adet",
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
        question: "Bebek alt serme örtüsü tekrar kullanılabilir mi?",
        answer:
          "Hayır, ürünlerimiz tek kullanımlık olarak tasarlanmıştır. Hijyen açısından her kullanımdan sonra atılması ve yenisinin serilmesi önerilir. Bu sayede bebeğiniz her zaman temiz bir yüzeyde olur.",
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
        slug: "mesane-pedi-4-damla",
        name: "Mesane Pedi 4 Damla",
        description:
          "Hafif idrar kaçırma için tasarlanmış mesane pedi. İnce ve gizli yapısıyla günlük hayatta rahatça kullanılabilir. Normal iç çamaşırına yapışarak sabit kalır.",
        count: "20 Adet",
        size: "4 Damla · Hafif Akıntı",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "mesane-pedi-6-damla",
        name: "Mesane Pedi 6 Damla",
        description:
          "Orta düzey idrar kaçırma için ideal mesane pedi. Anatomik formu ile vücuda uyum sağlar ve hareket sırasında yerinden oynamaz.",
        count: "20 Adet",
        size: "6 Damla · Orta Akıntı",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "mesane-pedi-8-damla",
        name: "Mesane Pedi 8 Damla",
        description:
          "Yoğun idrar kaçırma için yüksek emiciliğe sahip mesane pedi. Geniş emici yüzeyi ve nötr koku sistemiyle uzun süreli güvence sağlar.",
        count: "20 Adet",
        size: "8 Damla · Yoğun Akıntı",
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
          "Hayır, Soft & Power mesane pedleri ince ve anatomik tasarımı sayesinde giysi altında belli olmaz. 4, 6 ve 8 damlalı modellerin tamamı vücuda uyum sağlar ve fark edilmez.",
      },
      {
        question: "Hangi mesane pedi modelini seçmeliyim?",
        answer:
          "4 damla modeli hafif kaçırma için, 6 damla modeli orta düzey kaçırma için, 8 damla modeli ise yoğun kaçırma sorunları için uygundur. İhtiyacınıza göre doğru modeli seçebilirsiniz.",
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
    features: ["Hızlı Emici Yüzey", "Sızdırmaz Yapı", "Nefes Alabilen Yüzey"],
    gradient: "from-rose-500 to-pink-400",
    products: [
      {
        slug: "hijyenik-ped-4-damla",
        name: "Hijyenik Ped 4 Damla",
        description:
          "Ultra ince hijyenik ped. Esnek kanatları, ekstra kuruluk yüzeyi ve cildi tahriş etmeyen yumuşak yapısıyla normal akıntılı günler için ideal koruma sunar.",
        count: "20 Adet",
        size: "4 Damla",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "hijyenik-ped-5-damla",
        name: "Hijyenik Ped 5 Damla",
        description:
          "Yoğun akıntılı günler için tasarlanmış süper emici hijyenik ped. Geniş emici çekirdeği ve esnek kanatlarıyla gün boyu konfor ve güvence sağlar.",
        count: "20 Adet",
        size: "5 Damla",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "hijyenik-ped-6-damla",
        name: "Hijyenik Ped 6 Damla",
        description:
          "Gece kullanımı için ekstra uzun ve yüksek emicilikli hijyenik ped. Gece boyu tam koruma ve rahat bir uyku için güvence sunar.",
        count: "20 Adet",
        size: "6 Damla",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
    ],
    faqs: [
      {
        question: "Hijyenik ped ne sıklıkla değiştirilmelidir?",
        answer:
          "Hijyenik pedler 3-4 saatte bir değiştirilmelidir. Yoğun akıntılı günlerde daha sık değiştirme gerekebilir. Uzun süre değiştirmemek bakteri üremesine ve kötü kokuya neden olabilir.",
      },
      {
        question: "Hangi modeli seçmeliyim?",
        answer:
          "4 damla model normal akıntılı günler için günlük kullanıma uygundur. 5 damla model yoğun akıntılı günler için tasarlanmıştır. 6 damla model ise daha uzun yapısı ve yüksek emiciliği ile gece kullanımı için idealdir.",
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
          "Evet, Soft & Power hijyenik pedlerinin tamamı esnek kanatlı yapısı sayesinde spor sırasında güvenle kullanılabilir. Hareket sırasında yerinden oynamaz ve sızıntı riski oluşturmaz.",
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
      // Bebek serisi
      {
        slug: "islak-mendil-bebek-72",
        name: "Bebek Hassas Islak Mendil 72'li",
        description:
          "Parfümsüz formülüyle yeni doğan bebekler dahil tüm bebekler için güvenli ıslak mendil. pH dengeli yapısıyla bebek cildinin doğal dengesini korur.",
        count: "72 Yaprak",
        series: "Bebek",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "islak-mendil-bebek-90",
        name: "Bebek Hassas Islak Mendil 90'lı",
        description:
          "Yumuşak ve kalın dokusuyla bebek cildine nazik temizlik sunar. Pratik kapaklı ambalajıyla evde ve dışarıda kolay kullanım sağlar.",
        count: "90 Yaprak",
        series: "Bebek",
        seriesColor: "#1a5fa8",
      },
      {
        slug: "islak-mendil-bebek-120",
        name: "Bebek Hassas Islak Mendil 120'li",
        description:
          "Aile boyu ekonomik ambalaj. Yoğun kullanım dönemleri için ideal, bebek alt temizliği ve günlük bakımda güvenle tercih edilir.",
        count: "120 Yaprak",
        series: "Bebek",
        seriesColor: "#1a5fa8",
      },
      // Günlük Kullanım serisi
      {
        slug: "islak-mendil-fresh-splash-120",
        name: "Fresh Splash Islak Mendil",
        description:
          "Ferahlatıcı kokusu ve kalın dokusuyla el, yüz ve yüzey temizliği için günlük kullanıma uygun ıslak mendil. Kapaklı paketi tazeliğini korur.",
        count: "120 Yaprak",
        series: "Günlük Kullanım",
        seriesColor: "#00b4c8",
      },
      {
        slug: "islak-mendil-fresh-splash-90",
        name: "Fresh Splash Islak Mendil 90'lı",
        description:
          "Pratik boyutlu günlük kullanım ıslak mendili. Çantada yer kaplamaz, dışarıda hızlı temizlik için idealdir.",
        count: "90 Yaprak",
        series: "Günlük Kullanım",
        seriesColor: "#00b4c8",
      },
      // Çiçek Serisi
      {
        slug: "islak-mendil-aloe-vera",
        name: "Aloe Vera Islak Mendil",
        description:
          "Aloe vera özlü Gentle Touch ıslak mendil. Cildi temizlerken aynı zamanda nemlendirir ve doğal ferahlık sağlar.",
        count: "90 Yaprak",
        series: "Çiçek Serisi",
        seriesColor: "#a78bfa",
      },
      {
        slug: "islak-mendil-papatya",
        name: "Papatya Islak Mendil",
        description:
          "Papatya özlü Gentle Touch ıslak mendil. Cildi yatıştıran nazik formülüyle hassas ciltler için idealdir.",
        count: "90 Yaprak",
        series: "Çiçek Serisi",
        seriesColor: "#a78bfa",
      },
      {
        slug: "islak-mendil-gul",
        name: "Gül Islak Mendil",
        description:
          "Gül özlü Gentle Touch ıslak mendil. Hoş kokusu ve nazik formülüyle yüz ve el temizliğinde günlük bakım sunar.",
        count: "90 Yaprak",
        series: "Çiçek Serisi",
        seriesColor: "#a78bfa",
      },
      {
        slug: "islak-mendil-lavanta",
        name: "Lavanta Islak Mendil",
        description:
          "Lavanta özlü Gentle Touch ıslak mendil. Rahatlatıcı kokusuyla cildinizi tazeler ve yumuşak hisle bırakır.",
        count: "90 Yaprak",
        series: "Çiçek Serisi",
        seriesColor: "#a78bfa",
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
        question: "Çiçek serisi mendillerin farkı nedir?",
        answer:
          "Çiçek serisi mendiller (Aloe Vera, Papatya, Gül, Lavanta) doğal bitki özleriyle zenginleştirilmiştir. Her biri kendine özgü kokusu ve cilt bakım etkisiyle günlük yüz, el ve vücut temizliğinde nazik bir alternatif sunar.",
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
    ],
  },

  // ─── 9. YÜZEY TEMİZLEME HAVLUSU ──────────────────────────────────
  {
    slug: "yuzey-temizleme-havlusu",
    name: "Yüzey Temizleme Havlusu",
    nameKey: "cleaningTowels",
    description:
      "Ev, ofis ve endüstriyel kullanım için pratik ve dayanıklı temizleme havluları.",
    seoTitle: "Yüzey Temizleme Havlusu | Pratik & Dayanıklı | Soft & Power",
    seoDescription:
      "Soft & Power yüzey temizleme havluları pratik, dayanıklı ve tek kullanımlık yapısıyla ev, ofis ve endüstriyel temizlikte profesyonel sonuçlar sunar.",
    features: ["Pratik", "Dayanıklı", "Tek Kullanımlık"],
    gradient: "from-amber-500 to-yellow-400",
    products: [
      {
        slug: "yuzey-temizleme-havlusu-100",
        name: "Yüzey Temizleme Havlusu",
        description:
          "Cam, mutfak tezgahı, lavabo ve banyo gibi tüm yüzeylerde pratik ve hijyenik temizlik sağlar. Paraben ve SLS içermez; her silmede etkili sonuç sunar.",
        count: "100 Yaprak",
        series: "Standart",
        seriesColor: "#1a5fa8",
      },
    ],
    faqs: [
      {
        question: "Yüzey temizleme havlusu hangi yüzeylerde kullanılabilir?",
        answer:
          "Cam, mutfak tezgahı, masa, lavabo, banyo armatürleri, halı ve elektronik cihaz gibi pek çok farklı yüzeyde güvenle kullanılabilir.",
      },
      {
        question: "Yüzey temizleme havlusu tüy bırakır mı?",
        answer:
          "Hayır. Soft & Power yüzey temizleme havlusu özel üretim dokusuyla tüy bırakmayan yapıya sahiptir; cam ve hassas yüzeylerde temiz, leke bırakmayan sonuç sağlar.",
      },
      {
        question: "İçerikler cilt için güvenli mi?",
        answer:
          "Paraben ve SLS içermez. Yüzey temizliği için optimize edilmiş formülüyle ev ortamında güvenle kullanılır.",
      },
      {
        question: "Açılan paket ne kadar süre kullanılabilir?",
        answer:
          "Açılan paketin kapağını her kullanımdan sonra sıkıca kapatmanız gerekir. Doğru saklama koşullarında havlular nemini uzun süre korur.",
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
