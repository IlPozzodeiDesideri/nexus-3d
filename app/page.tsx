// app/page.tsx - Sincronizzazione Admin
// app/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'ar'

export default function Home() {
  const [lang, setLang] = useState<Language>('it')

  // Dati societari
  const companyInfo = {
    name: 'Nexus-3D',
    address: 'Via Roma 123, Napoli (NA)',
    taxId: 'P.IVA 01234567890',
    fiscalCode: 'C.F. RSSMRA80A01F839X',
    email: 'info@nexus-3d.it',
    phone: '+39 081 1234567'
  }

  // Dizionario multilingua (6 lingue)
  const t: Record<Language, any> = {
    it: {
      navHome: 'Home',
      navAbout: 'Chi Siamo',
      navProducts: 'Prodotti & Servizi',
      navContact: 'Contatti',
      adminArea: 'Area Admin',
      requestQuote: 'Richiedi Preventivo',
      badge: 'Stampe 3D di Alta Qualità • Design & Artigianato',
      heroTitle1: 'Porta le tue idee',
      heroTitle2: 'nella realtà tridimensionale',
      heroDesc: `Realizziamo prototipi, action figure, statue dettagliate e oggetti di design unici stampati in 3D con cura artigianale e rifiniti a mano da ${companyInfo.name}.`,
      exploreProducts: 'Scopri i Prodotti',
      contactUs: 'Contattaci',
      aboutTag: 'Chi Siamo',
      aboutTitle: 'Innovazione e passione per il dettaglio',
      aboutDesc: `${companyInfo.name} nasce dalla passione per la tecnologia di stampa tridimensionale e la modellazione avanzata. Aiutiamo creativi, aziende e appassionati a trasformare progetti digitali in oggetti reali.`,
      yearsExp: '+5 Anni',
      yearsExpDesc: 'Nel settore della stampa 3D',
      craftsmanship: '100%',
      craftsmanshipDesc: 'Finitura artigianale',
      showroomText: '[ Immagine Showroom / Laboratorio 3D ]',
      productsTag: 'Vetrina & Servizi',
      productsTitle: 'I Nostri Prodotti in Evidenza',
      productsDesc: 'Soluzioni su misura e oggetti da collezione stampati in 3D.',
      p1Title: 'Action Figure Anime',
      p1Desc: 'Stampa 3D ad altissima risoluzione con dettagli rifiniti e dipinti a mano.',
      p2Title: 'Statua da Collezione',
      p2Desc: 'Design personalizzato per pezzi unici da esposizione.',
      p3Title: 'Prototipazione Industriale',
      p3Desc: 'Componenti tecnici e prototipi funzionali in PLA, ABS e resine speciali.',
      moreInfo: 'Richiedi informazioni →',
      contactTag: 'Contattaci',
      contactTitle: 'Parla con il nostro team',
      contactDesc: 'Hai un progetto in mente o desideri maggiori informazioni sui nostri servizi di stampa 3D? Scrivici o contattaci direttamente.',
      formName: 'Nome',
      formEmail: 'Email',
      formMessage: 'Messaggio',
      formSubmit: 'Invia Messaggio',
      addressLabel: 'Indirizzo:',
      emailLabel: 'Email:',
      phoneLabel: 'Telefono:',
      fiscalLabel: 'Dati Fiscali:',
      rights: 'Tutti i diritti riservati.'
    },
    en: {
      navHome: 'Home',
      navAbout: 'About Us',
      navProducts: 'Products & Services',
      navContact: 'Contact',
      adminArea: 'Admin Area',
      requestQuote: 'Request Quote',
      badge: 'High Quality 3D Printing • Design & Craftsmanship',
      heroTitle1: 'Bring your ideas',
      heroTitle2: 'into three-dimensional reality',
      heroDesc: `We create prototypes, action figures, detailed statues, and unique design objects 3D printed with craftsmanship and hand-finished by ${companyInfo.name}.`,
      exploreProducts: 'Explore Products',
      contactUs: 'Contact Us',
      aboutTag: 'About Us',
      aboutTitle: 'Innovation and passion for detail',
      aboutDesc: `${companyInfo.name} was born from a passion for 3D printing technology and advanced modeling. We help creators, companies, and enthusiasts turn digital projects into real objects.`,
      yearsExp: '+5 Years',
      yearsExpDesc: 'In 3D printing industry',
      craftsmanship: '100%',
      craftsmanshipDesc: 'Handcrafted finish',
      showroomText: '[ Showroom / 3D Lab Image ]',
      productsTag: 'Showcase & Services',
      productsTitle: 'Featured Products',
      productsDesc: 'Custom solutions and 3D printed collectibles.',
      p1Title: 'Anime Action Figures',
      p1Desc: 'Ultra-high resolution 3D printing with hand-painted details.',
      p2Title: 'Collectible Statues',
      p2Desc: 'Custom design for unique display pieces.',
      p3Title: 'Industrial Prototyping',
      p3Desc: 'Technical components and functional prototypes in PLA, ABS, and special resins.',
      moreInfo: 'Request details →',
      contactTag: 'Contact Us',
      contactTitle: 'Speak with our team',
      contactDesc: 'Have a project in mind or want more information on our 3D printing services? Write to us or contact us directly.',
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Message',
      formSubmit: 'Send Message',
      addressLabel: 'Address:',
      emailLabel: 'Email:',
      phoneLabel: 'Phone:',
      fiscalLabel: 'Tax Information:',
      rights: 'All rights reserved.'
    },
    es: {
      navHome: 'Inicio',
      navAbout: 'Quiénes Somos',
      navProducts: 'Productos y Servicios',
      navContact: 'Contacto',
      adminArea: 'Área Admin',
      requestQuote: 'Pedir Presupuesto',
      badge: 'Impresión 3D de Alta Calidad • Diseño y Artesanía',
      heroTitle1: 'Lleva tus ideas',
      heroTitle2: 'a la realidad tridimensional',
      heroDesc: `Creamos prototipos, figuras de acción, estatuas detalladas y objetos de diseño únicos impresos en 3D y acabados a mano por ${companyInfo.name}.`,
      exploreProducts: 'Explorar Productos',
      contactUs: 'Contáctanos',
      aboutTag: 'Quiénes Somos',
      aboutTitle: 'Innovación y pasión por los detalles',
      aboutDesc: `${companyInfo.name} nace de la pasión por la tecnología de impresión 3D y el modelado avanzado. Ayudamos a creadores y empresas a transformar proyectos digitales en objetos reales.`,
      yearsExp: '+5 Años',
      yearsExpDesc: 'En el sector de la impresión 3D',
      craftsmanship: '100%',
      craftsmanshipDesc: 'Acabado artesanal',
      showroomText: '[ Imagen Showroom / Laboratorio 3D ]',
      productsTag: 'Vitrina y Servicios',
      productsTitle: 'Nuestros Productos Destacados',
      productsDesc: 'Soluciones a medida y coleccionables impresos en 3D.',
      p1Title: 'Figuras de Acción Anime',
      p1Desc: 'Impresión 3D de ultra alta resolución con detalles pintados a mano.',
      p2Title: 'Estatua de Colección',
      p2Desc: 'Diseño personalizado para piezas de exposición únicas.',
      p3Title: 'Prototipado Industrial',
      p3Desc: 'Componentes técnicos y prototipos funcionales en PLA, ABS y resinas especiales.',
      moreInfo: 'Pedir información →',
      contactTag: 'Contáctanos',
      contactTitle: 'Habla con nuestro equipo',
      contactDesc: '¿Tienes un proyecto en mente o deseas más información sobre nuestros servicios de impresión 3D? Escríbenos.',
      formName: 'Nombre',
      formEmail: 'Correo electrónico',
      formMessage: 'Mensaje',
      formSubmit: 'Enviar Mensaje',
      addressLabel: 'Dirección:',
      emailLabel: 'Correo:',
      phoneLabel: 'Teléfono:',
      fiscalLabel: 'Datos Fiscales:',
      rights: 'Todos los derechos reservados.'
    },
    fr: {
      navHome: 'Accueil',
      navAbout: 'À Propos',
      navProducts: 'Produits & Services',
      navContact: 'Contact',
      adminArea: 'Zone Admin',
      requestQuote: 'Demander un Devis',
      badge: 'Impression 3D Haute Qualité • Design & Artisanat',
      heroTitle1: 'Donnez vie à vos idées',
      heroTitle2: 'dans la réalité tridimensionnelle',
      heroDesc: `Nous créons des prototypes, des figurines, des statues détaillées et des objets design uniques imprimés en 3D et finis à la main par ${companyInfo.name}.`,
      exploreProducts: 'Explorer les Produits',
      contactUs: 'Contactez-nous',
      aboutTag: 'À Propos',
      aboutTitle: 'Innovation et passion du détail',
      aboutDesc: `${companyInfo.name} est né de la passion pour la technologie d'impression 3D et la modélisation avancée. Nous aidons les créateurs à transformer des projets numériques en objets réels.`,
      yearsExp: '+5 Ans',
      yearsExpDesc: "Dans l'industrie de l'impression 3D",
      craftsmanship: '100%',
      craftsmanshipDesc: 'Finition artisanale',
      showroomText: '[ Image Showroom / Labo 3D ]',
      productsTag: 'Vitrine & Services',
      productsTitle: 'Nos Produits en Vedette',
      productsDesc: 'Solutions sur mesure et objets de collection imprimés en 3D.',
      p1Title: 'Figurines Anime',
      p1Desc: 'Impression 3D ultra haute résolution avec détails peints à la main.',
      p2Title: 'Statue de Collection',
      p2Desc: 'Design personnalisé pour pièces d’exposition uniques.',
      p3Title: 'Prototypage Industriel',
      p3Desc: 'Composants techniques et prototypes fonctionnels en PLA, ABS et résines spéciales.',
      moreInfo: 'Demander des infos →',
      contactTag: 'Contactez-nous',
      contactTitle: 'Parlez avec notre équipe',
      contactDesc: 'Vous avez un projet en tête ou souhaitez plus d’informations sur nos services d’impression 3D ? Écrivez-nous.',
      formName: 'Nom',
      formEmail: 'E-mail',
      formMessage: 'Message',
      formSubmit: 'Envoyer le Message',
      addressLabel: 'Adresse :',
      emailLabel: 'E-mail :',
      phoneLabel: 'Téléphone :',
      fiscalLabel: 'Informations Fiscales :',
      rights: 'Tous droits réservés.'
    },
    de: {
      navHome: 'Startseite',
      navAbout: 'Über Uns',
      navProducts: 'Produkte & Dienste',
      navContact: 'Kontakt',
      adminArea: 'Admin-Bereich',
      requestQuote: 'Angebot Anfordern',
      badge: 'Hochwertiger 3D-Druck • Design & Handwerkskunst',
      heroTitle1: 'Bringen Sie Ihre Ideen',
      heroTitle2: 'in die dreidimensionale Realität',
      heroDesc: `Wir erstellen Prototypen, Actionfiguren, detailgetreue Statuen und einzigartige Designobjekte, handgefertigt und 3D-gedruckt von ${companyInfo.name}.`,
      exploreProducts: 'Produkte Erkunden',
      contactUs: 'Kontaktieren Sie uns',
      aboutTag: 'Über Uns',
      aboutTitle: 'Innovation und Leidenschaft für Details',
      aboutDesc: `${companyInfo.name} entstand aus der Leidenschaft für 3D-Drucktechnologie und fortgeschrittene Modellierung. Wir helfen Kreativen und Unternehmen, digitale Projekte real werden zu lassen.`,
      yearsExp: '+5 Jahre',
      yearsExpDesc: 'In der 3D-Druck-Branche',
      craftsmanship: '100%',
      craftsmanshipDesc: 'Handgefertigtes Finish',
      showroomText: '[ Showroom / 3D-Labor Bild ]',
      productsTag: 'Vitrine & Dienste',
      productsTitle: 'Unsere Top-Produkte',
      productsDesc: 'Maßgeschneiderte Lösungen und 3D-gedruckte Sammlerstücke.',
      p1Title: 'Anime-Actionfiguren',
      p1Desc: 'Ultra-hochauflösender 3D-Druck mit handbemalten Details.',
      p2Title: 'Sammelstatue',
      p2Desc: 'Maßgeschneidertes Design für einzigartige Ausstellungsstücke.',
      p3Title: 'Industrielle Prototyping',
      p3Desc: 'Technische Komponenten und funktionale Prototypen aus PLA, ABS und Spezialharzen.',
      moreInfo: 'Infos anfordern →',
      contactTag: 'Kontakt',
      contactTitle: 'Sprechen Sie mit unserem Team',
      contactDesc: 'Haben Sie ein Projekt im Kopf oder wünschen Sie weitere Informationen zu unseren 3D-Druck-Diensten? Schreiben Sie uns.',
      formName: 'Name',
      formEmail: 'E-Mail',
      formMessage: 'Nachricht',
      formSubmit: 'Nachricht Senden',
      addressLabel: 'Adresse:',
      emailLabel: 'E-Mail:',
      phoneLabel: 'Telefon:',
      fiscalLabel: 'Steuerdaten:',
      rights: 'Alle Rechte vorbehalten.'
    },
    ar: {
      navHome: 'الرئيسية',
      navAbout: 'من نحن',
      navProducts: 'المنتجات والخدمات',
      navContact: 'اتصل بنا',
      adminArea: 'لوحة التحكم',
      requestQuote: 'طلب عرض سعر',
      badge: 'طباعة ثلاثية الأبعاد عالية الجودة • تصميم و حرفية',
      heroTitle1: 'اجلب أفكارك',
      heroTitle2: 'إلى الواقع ثلاثي الأبعاد',
      heroDesc: `نقوم بتصميم نماذج أولية، مجسمات، وتماثيل مفصلة فريدة من نوعها مطبوعة بتقنية ثلاثية الأبعاد ومصنوعة يدوياً بواسطة ${companyInfo.name}.`,
      exploreProducts: 'استكشف المنتجات',
      contactUs: 'اتصل بنا',
      aboutTag: 'من نحن',
      aboutTitle: 'الابتكار والشغف بالتفاصيل',
      aboutDesc: `تأسست ${companyInfo.name} من شغفنا بتقنية الطباعة ثلاثية الأبعاد والنمذجة المتقدمة. نساعد المبدعين والشركات على تحويل المشاريع الرقمية إلى واقع ملموس.`,
      yearsExp: '+5 سنوات',
      yearsExpDesc: 'في مجال الطباعة ثلاثية الأبعاد',
      craftsmanship: '100%',
      craftsmanshipDesc: 'تشطيب يدوي عالي الجودة',
      showroomText: '[ صورة المعرض / مختبر ثلاثي الأبعاد ]',
      productsTag: 'المنتجات والخدمات',
      productsTitle: 'أبرز منتجاتنا',
      productsDesc: 'حلول مخصصة ومقتنيات مطبوعة بتقنية ثلاثية الأبعاد.',
      p1Title: 'مجسمات شخصيات الأنمي',
      p1Desc: 'طباعة ثلاثية الأبعاد عالية الدقة مع تفاصيل ملونة يدوياً.',
      p2Title: 'تمثال للتحصيل',
      p2Desc: 'تصميم مخصص لقطع عرض فريدة من نوعها.',
      p3Title: 'النماذج الصناعية الأولية',
      p3Desc: 'مكونات تقنية ونماذج وظيفية باستخدام مواد PLA و ABS والراتنجات الخاصة.',
      moreInfo: 'طلب تفاصيل ←',
      contactTag: 'اتصل بنا',
      contactTitle: 'تحدث مع فريقنا',
      contactDesc: 'هل لديك مشروع في ذهنك أو ترغب في مزيد من المعلومات حول خدمات الطباعة ثلاثية الأبعاد؟ راسلنا مباشرة.',
      formName: 'الاسم',
      formEmail: 'البريد الإلكتروني',
      formMessage: 'الرسالة',
      formSubmit: 'إرسال الرسالة',
      addressLabel: 'العنوان:',
      emailLabel: 'البريد:',
      phoneLabel: 'الهاتف:',
      fiscalLabel: 'البيانات الضريبية:',
      rights: 'جميع الحقوق محفوظة.'
    }
  }

  const text = t[lang]
  const isRtl = lang === 'ar'

  return (
    <div className={`min-h-screen bg-gray-950 text-white font-sans selection:bg-pink-500 selection:text-white ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navbar con Selettore 6 Lingue */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <Link href="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {companyInfo.name}
          </Link>
          
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-300">
            <a href="#home" className="hover:text-pink-400 transition">{text.navHome}</a>
            <a href="#about" className="hover:text-pink-400 transition">{text.navAbout}</a>
            <a href="#products" className="hover:text-pink-400 transition">{text.navProducts}</a>
            <a href="#contact" className="hover:text-pink-400 transition">{text.navContact}</a>
          </nav>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Selettore 6 Lingue */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-gray-900 border border-gray-800 text-gray-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-pink-500 cursor-pointer"
            >
              <option value="it">🇮🇹 Italiano</option>
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>

            <Link 
              href="/admin" 
              className="hidden sm:inline-block text-xs text-gray-400 hover:text-pink-400 border border-gray-800 px-3 py-2 rounded-lg transition"
            >
              {text.adminArea}
            </Link>
            <a 
              href="#contact" 
              className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs md:text-sm font-semibold rounded-lg transition shadow-lg shadow-pink-600/20"
            >
              {text.requestQuote}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-28 px-6 text-center bg-gradient-to-b from-purple-900/20 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto">
          <span className="px-3 py-1 text-xs font-semibold bg-pink-500/10 text-pink-400 rounded-full border border-pink-500/20 inline-block">
            {text.badge}
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            {text.heroTitle1} <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {text.heroTitle2}
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            {text.heroDesc}
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a href="#products" className="px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-xl transition shadow-lg shadow-pink-600/25">
              {text.exploreProducts}
            </a>
            <a href="#contact" className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white font-semibold rounded-xl border border-gray-800 transition">
              {text.contactUs}
            </a>
          </div>
        </div>
      </section>

      {/* Sezione Chi Siamo */}
      <section id="about" className="py-24 px-6 border-t border-gray-900 bg-gray-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest">{text.aboutTag}</span>
            <h2 className="mt-2 text-3xl font-bold">{text.aboutTitle}</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              {text.aboutDesc}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-bold text-pink-400">{text.yearsExp}</h3>
                <p className="text-sm text-gray-400 mt-1">{text.yearsExpDesc}</p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-bold text-purple-400">{text.craftsmanship}</h3>
                <p className="text-sm text-gray-400 mt-1">{text.craftsmanshipDesc}</p>
              </div>
            </div>
          </div>
          <div className="h-80 bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl border border-gray-800 flex items-center justify-center text-gray-500">
            {text.showroomText}
          </div>
        </div>
      </section>

      {/* Sezione Prodotti / Vetrina */}
      <section id="products" className="py-24 px-6 border-t border-gray-900 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest">{text.productsTag}</span>
            <h2 className="mt-2 text-3xl font-bold">{text.productsTitle}</h2>
            <p className="mt-2 text-gray-400">{text.productsDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-500/50 transition group flex flex-col">
              <div className="h-64 bg-gray-800 flex items-center justify-center text-gray-600">
                [ {text.p1Title} ]
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{text.p1Title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{text.p1Desc}</p>
                <a href="#contact" className="text-pink-400 text-sm font-semibold hover:underline">{text.moreInfo}</a>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-500/50 transition group flex flex-col">
              <div className="h-64 bg-gray-800 flex items-center justify-center text-gray-600">
                [ {text.p2Title} ]
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{text.p2Title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{text.p2Desc}</p>
                <a href="#contact" className="text-pink-400 text-sm font-semibold hover:underline">{text.moreInfo}</a>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-500/50 transition group flex flex-col">
              <div className="h-64 bg-gray-800 flex items-center justify-center text-gray-600">
                [ {text.p3Title} ]
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{text.p3Title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{text.p3Desc}</p>
                <a href="#contact" className="text-pink-400 text-sm font-semibold hover:underline">{text.moreInfo}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Contatti */}
      <section id="contact" className="py-24 px-6 border-t border-gray-900 bg-gray-950">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest">{text.contactTag}</span>
            <h2 className="mt-2 text-3xl font-bold">{text.contactTitle}</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">{text.contactDesc}</p>

            <div className="mt-8 space-y-4 text-gray-300 text-sm">
              <p>📍 <strong className="text-white">{text.addressLabel}</strong> {companyInfo.address}</p>
              <p>📧 <strong className="text-white">{text.emailLabel}</strong> {companyInfo.email}</p>
              <p>📞 <strong className="text-white">{text.phoneLabel}</strong> {companyInfo.phone}</p>
              <p>📋 <strong className="text-white">{text.fiscalLabel}</strong> {companyInfo.taxId} — {companyInfo.fiscalCode}</p>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{text.formName}</label>
                <input type="text" placeholder="Mario Rossi" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-pink-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{text.formEmail}</label>
                <input type="email" placeholder="mario@example.com" className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-pink-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{text.formMessage}</label>
                <textarea rows={4} placeholder="..." className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-pink-500 text-sm"></textarea>
              </div>
              <button type="button" className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-lg transition shadow-lg shadow-pink-600/20 text-sm">
                {text.formSubmit}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer con Dati Societari */}
      <footer className="border-t border-gray-900 py-12 px-6 bg-gray-950 text-center text-gray-500 text-xs space-y-3">
        <p className="text-gray-400 font-medium">{companyInfo.name} &bull; {companyInfo.address} &bull; {companyInfo.taxId} &bull; {companyInfo.fiscalCode}</p>
        <p>&copy; 2026 {companyInfo.name}. {text.rights}</p>
      </footer>
    </div>
  )
}
