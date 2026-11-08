// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'ar'

export default function Home() {
  const [lang, setLang] = useState<Language>('it')
  const [selectedImage, setSelectedImage] = useState<string | null>(null) // Lightbox per ingrandire

  const [siteConfig, setSiteConfig] = useState({
    companyName: 'Nexus-3D',
    address: 'Via Roma 123, Napoli (NA)',
    taxId: 'P.IVA 01234567890',
    fiscalCode: 'C.F. RSSMRA80A01F839X',
    email: 'info@nexus-3d.it',
    phone: '+39 081 1234567',
    aboutImage: '',
    aboutImage2: '',
    aboutImage3: '',
    p1Image: '',
    p2Image: '',
    p3Image: '',
  })

  useEffect(() => {
    async function fetchConfig() {
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .eq('id', 'main')
        .single()

      if (data && !error) {
        setSiteConfig({
          companyName: data.company_name || 'Nexus-3D',
          address: data.address || '',
          taxId: data.tax_id || '',
          fiscalCode: data.fiscal_code || '',
          email: data.email || '',
          phone: data.phone || '',
          aboutImage: data.about_image || '',
          aboutImage2: data.about_image2 || '',
          aboutImage3: data.about_image3 || '',
          p1Image: data.p1_image || '',
          p2Image: data.p2_image || '',
          p3Image: data.p3_image || '',
        })
      }
    }
    fetchConfig()
  }, [])

  const t: Record<Language, any> = {
    it: {
      navHome: 'Home', navAbout: 'Chi Siamo', navProducts: 'Prodotti & Servizi', navContact: 'Contatti', adminArea: 'Area Admin', requestQuote: 'Richiedi Preventivo', badge: 'Stampe 3D di Alta Qualità • Design & Artigianato', heroTitle1: 'Porta le tue idee', heroTitle2: 'nella realtà tridimensionale', heroDesc: `Realizziamo prototipi, action figure, statue dettagliate e oggetti di design unici stampati in 3D da ${siteConfig.companyName}.`, exploreProducts: 'Scopri i Prodotti', contactUs: 'Contattaci', aboutTag: 'Chi Siamo', aboutTitle: 'Innovazione e passione per il dettaglio', aboutDesc: `${siteConfig.companyName} nasce dalla passione per la tecnologia di stampa tridimensionale.`, yearsExp: '+5 Anni', yearsExpDesc: 'Nel settore 3D', craftsmanship: '100%', craftsmanshipDesc: 'Finitura artigianale', showroomText: '[ Foto Laboratorio ]', productsTag: 'Vetrina & Servizi', productsTitle: 'I Nostri Prodotti in Evidenza', productsDesc: 'Soluzioni su misura e oggetti da collezione.', p1Title: 'Action Figure Anime', p1Desc: 'Stampa 3D ad altissima risoluzione.', p2Title: 'Statua da Collezione', p2Desc: 'Design personalizzato.', p3Title: 'Prototipazione Industriale', p3Desc: 'Componenti tecnici e prototipi.', moreInfo: 'Richiedi info →', contactTag: 'Contattaci', contactTitle: 'Parla con il nostro team', contactDesc: 'Hai un progetto in mente?', formName: 'Nome', formEmail: 'Email', formMessage: 'Messaggio', formSubmit: 'Invia Messaggio', addressLabel: 'Indirizzo:', emailLabel: 'Email:', phoneLabel: 'Telefono:', fiscalLabel: 'Dati Fiscali:', rights: 'Tutti i diritti riservati.'
    },
    en: { navHome: 'Home', navAbout: 'About Us', navProducts: 'Products & Services', navContact: 'Contact', adminArea: 'Admin Area', requestQuote: 'Request Quote', badge: 'High Quality 3D Printing', heroTitle1: 'Bring your ideas', heroTitle2: 'into 3D reality', heroDesc: `Unique 3D printed objects by ${siteConfig.companyName}.`, exploreProducts: 'Explore Products', contactUs: 'Contact Us', aboutTag: 'About Us', aboutTitle: 'Innovation and detail', aboutDesc: `${siteConfig.companyName} 3D printing lab.`, yearsExp: '+5 Years', yearsExpDesc: 'Experience', craftsmanship: '100%', craftsmanshipDesc: 'Handmade finish', showroomText: '[ Lab Photo ]', productsTag: 'Showcase', productsTitle: 'Featured Products', productsDesc: 'Custom 3D printing.', p1Title: 'Anime Action Figures', p1Desc: 'High resolution 3D print.', p2Title: 'Collectible Statues', p2Desc: 'Unique pieces.', p3Title: 'Industrial Prototyping', p3Desc: 'Technical parts.', moreInfo: 'More info →', contactTag: 'Contact', contactTitle: 'Get in touch', contactDesc: 'Write to us.', formName: 'Name', formEmail: 'Email', formMessage: 'Message', formSubmit: 'Send', addressLabel: 'Address:', emailLabel: 'Email:', phoneLabel: 'Phone:', fiscalLabel: 'Tax Info:', rights: 'All rights reserved.' },
    es: { navHome: 'Inicio', navAbout: 'Nosotros', navProducts: 'Productos', navContact: 'Contacto', adminArea: 'Admin', requestQuote: 'Presupuesto', badge: 'Impresión 3D', heroTitle1: 'Tus ideas', heroTitle2: 'en realidad 3D', heroDesc: `Diseños por ${siteConfig.companyName}.`, exploreProducts: 'Productos', contactUs: 'Contacto', aboutTag: 'Nosotros', aboutTitle: 'Innovación', aboutDesc: `${siteConfig.companyName}`, yearsExp: '+5 Años', yearsExpDesc: 'Experiencia', craftsmanship: '100%', craftsmanshipDesc: 'Artesanal', showroomText: '[ Foto Taller ]', productsTag: 'Servicios', productsTitle: 'Productos', productsDesc: 'Soluciones 3D.', p1Title: 'Figuras Anime', p1Desc: 'Alta resolución.', p2Title: 'Estatua', p2Desc: 'Colección.', p3Title: 'Prototipo', p3Desc: 'Industrial.', moreInfo: 'Info →', contactTag: 'Contacto', contactTitle: 'Habla con noi', contactDesc: 'Escríbenos.', formName: 'Nombre', formEmail: 'Email', formMessage: 'Mensaje', formSubmit: 'Enviar', addressLabel: 'Dirección:', emailLabel: 'Email:', phoneLabel: 'Teléfono:', fiscalLabel: 'Datos:', rights: 'Derechos reservados.' },
    fr: { navHome: 'Accueil', navAbout: 'À Propos', navProducts: 'Produits', navContact: 'Contact', adminArea: 'Admin', requestQuote: 'Devis', badge: 'Impression 3D', heroTitle1: 'Vos idées', heroTitle2: 'en réalité 3D', heroDesc: `Projets par ${siteConfig.companyName}.`, exploreProducts: 'Produits', contactUs: 'Contact', aboutTag: 'À Propos', aboutTitle: 'Innovation', aboutDesc: `${siteConfig.companyName}`, yearsExp: '+5 Ans', yearsExpDesc: 'Expérience', craftsmanship: '100%', craftsmanshipDesc: 'Artisanal', showroomText: '[ Photo Labo ]', productsTag: 'Services', productsTitle: 'Produits', productsDesc: 'Impression 3D.', p1Title: 'Figurines', p1Desc: 'Haute résolution.', p2Title: 'Statue', p2Desc: 'Collection.', p3Title: 'Prototypage', p3Desc: 'Industriel.', moreInfo: 'Info →', contactTag: 'Contact', contactTitle: 'Contactez-nous', contactDesc: 'Écrivez-nous.', formName: 'Nom', formEmail: 'E-mail', formMessage: 'Message', formSubmit: 'Envoyer', addressLabel: 'Adresse :', emailLabel: 'E-mail :', phoneLabel: 'Téléphone :', fiscalLabel: 'Fiscal :', rights: 'Tous droits réservés.' },
    de: { navHome: 'Startseite', navAbout: 'Über uns', navProducts: 'Produkte', navContact: 'Kontakt', adminArea: 'Admin', requestQuote: 'Angebot', badge: '3D-Druck', heroTitle1: 'Ihre Ideen', heroTitle2: 'in 3D-Realität', heroDesc: `Erstellt von ${siteConfig.companyName}.`, exploreProducts: 'Produkte', contactUs: 'Kontakt', aboutTag: 'Über uns', aboutTitle: 'Innovation', aboutDesc: `${siteConfig.companyName}`, yearsExp: '+5 Jahre', yearsExpDesc: 'Erfahrung', craftsmanship: '100%', craftsmanshipDesc: 'Handarbeit', showroomText: '[ Labor Foto ]', productsTag: 'Dienste', productsTitle: 'Produkte', productsDesc: '3D-Lösungen.', p1Title: 'Figuren', p1Desc: 'Hohe Auflösung.', p2Title: 'Statue', p2Desc: 'Sammlung.', p3Title: 'Prototyping', p3Desc: 'Industriell.', moreInfo: 'Infos →', contactTag: 'Kontakt', contactTitle: 'Unser Team', contactDesc: 'Schreiben Sie uns.', formName: 'Name', formEmail: 'E-Mail', formMessage: 'Nachricht', formSubmit: 'Senden', addressLabel: 'Adresse:', emailLabel: 'E-Mail:', phoneLabel: 'Telefon:', fiscalLabel: 'Steuer:', rights: 'Alle Rechte vorbehalten.' },
    ar: { navHome: 'الرئيسية', navAbout: 'من نحن', navProducts: 'المنتجات', navContact: 'اتصل بنا', navAdmin: 'التحكم', requestQuote: 'طلب سعر', badge: 'طباعة 3د', heroTitle1: 'أفكارك', heroTitle2: 'واقع 3D', heroDesc: `بواسطة ${siteConfig.companyName}.`, exploreProducts: 'المنتجات', contactUs: 'اتصل بنا', aboutTag: 'من نحن', aboutTitle: 'ابتكار', aboutDesc: `${siteConfig.companyName}`, yearsExp: '+5 سنوات', yearsExpDesc: 'خبرة', craftsmanship: '100%', craftsmanshipDesc: 'يدوي', showroomText: '[ صورة المختبر ]', productsTag: 'خدمات', productsTitle: 'منتجات', productsDesc: 'طباعة 3د.', p1Title: 'مجسمات', p1Desc: 'دقة عالية.', p2Title: 'تمثال', p2Desc: 'تحصيل.', p3Title: 'نموذج', p3Desc: 'صناعي.', moreInfo: 'تفاصيل ←', contactTag: 'اتصل', contactTitle: 'فريقنا', contactDesc: 'راسلنا.', formName: 'الاسم', formEmail: 'البريد', formMessage: 'الرسالة', formSubmit: 'إرسال', addressLabel: 'العنوان:', emailLabel: 'البريد:', phoneLabel: 'الهاتف:', fiscalLabel: 'الضريبي:', rights: 'جميع الحقوق محفوظة.' }
  }

  const text = t[lang]
  const isRtl = lang === 'ar'

  return (
    <div className={`min-h-screen bg-gray-950 text-white font-sans ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <Link href="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {siteConfig.companyName}
          </Link>
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-300">
            <a href="#home" className="hover:text-pink-400">{text.navHome}</a>
            <a href="#about" className="hover:text-pink-400">{text.navAbout}</a>
            <a href="#products" className="hover:text-pink-400">{text.navProducts}</a>
            <a href="#contact" className="hover:text-pink-400">{text.navContact}</a>
          </nav>
          <div className="flex items-center gap-3">
            <select value={lang} onChange={(e) => setLang(e.target.value as Language)} className="bg-gray-900 border border-gray-800 text-gray-200 text-xs rounded-lg px-2.5 py-2 cursor-pointer">
              <option value="it">🇮🇹 Italiano</option>
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>
            <Link href="/admin" className="hidden sm:inline-block text-xs text-gray-400 border border-gray-800 px-3 py-2 rounded-lg">{text.adminArea}</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="px-3 py-1 text-xs font-semibold bg-pink-500/10 text-pink-400 rounded-full border border-pink-500/20">{text.badge}</span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold">{text.heroTitle1} <br /><span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">{text.heroTitle2}</span></h1>
          <p className="mt-6 text-lg text-gray-400">{text.heroDesc}</p>
        </div>
      </section>

      {/* Sezione Chi Siamo con 3 Foto Intere */}
      <section id="about" className="py-24 px-6 border-t border-gray-900 bg-gray-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-pink-400 uppercase">{text.aboutTag}</span>
            <h2 className="mt-2 text-3xl font-bold">{text.aboutTitle}</h2>
            <p className="mt-4 text-gray-400">{text.aboutDesc}</p>
          </div>

          {/* Griglia 3 Foto con object-contain per mostrarle intere */}
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => siteConfig.aboutImage && setSelectedImage(siteConfig.aboutImage)} 
              className="h-64 col-span-2 rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 cursor-pointer group relative flex items-center justify-center p-2"
            >
              {siteConfig.aboutImage ? (
                <>
                  <img src={siteConfig.aboutImage} alt="Chi Siamo 1" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-semibold">🔍 Ingrandisci</div>
                </>
              ) : <div className="text-gray-600">{text.showroomText} 1</div>}
            </div>

            <div 
              onClick={() => siteConfig.aboutImage2 && setSelectedImage(siteConfig.aboutImage2)} 
              className="h-44 rounded-xl border border-gray-800 overflow-hidden bg-gray-900 cursor-pointer group relative flex items-center justify-center p-2"
            >
              {siteConfig.aboutImage2 ? (
                <>
                  <img src={siteConfig.aboutImage2} alt="Chi Siamo 2" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-semibold">🔍 Ingrandisci</div>
                </>
              ) : <div className="text-gray-600 text-xs">{text.showroomText} 2</div>}
            </div>

            <div 
              onClick={() => siteConfig.aboutImage3 && setSelectedImage(siteConfig.aboutImage3)} 
              className="h-44 rounded-xl border border-gray-800 overflow-hidden bg-gray-900 cursor-pointer group relative flex items-center justify-center p-2"
            >
              {siteConfig.aboutImage3 ? (
                <>
                  <img src={siteConfig.aboutImage3} alt="Chi Siamo 3" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-semibold">🔍 Ingrandisci</div>
                </>
              ) : <div className="text-gray-600 text-xs">{text.showroomText} 3</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Vetrina Prodotti con Immagini Intere */}
      <section id="products" className="py-24 px-6 border-t border-gray-900 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-pink-400 uppercase">{text.productsTag}</span>
            <h2 className="mt-2 text-3xl font-bold">{text.productsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 flex flex-col">
              <div 
                onClick={() => siteConfig.p1Image && setSelectedImage(siteConfig.p1Image)}
                className="h-64 bg-gray-950 overflow-hidden flex items-center justify-center cursor-pointer group relative p-4"
              >
                {siteConfig.p1Image ? (
                  <>
                    <img src={siteConfig.p1Image} alt="P1" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-semibold">🔍 Ingrandisci</div>
                  </>
                ) : <span className="text-gray-600">[ {text.p1Title} ]</span>}
              </div>
              <div className="p-6"><h3 className="text-xl font-bold mb-2">{text.p1Title}</h3><p className="text-gray-400 text-sm">{text.p1Desc}</p></div>
            </div>

            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 flex flex-col">
              <div 
                onClick={() => siteConfig.p2Image && setSelectedImage(siteConfig.p2Image)}
                className="h-64 bg-gray-950 overflow-hidden flex items-center justify-center cursor-pointer group relative p-4"
              >
                {siteConfig.p2Image ? (
                  <>
                    <img src={siteConfig.p2Image} alt="P2" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-semibold">🔍 Ingrandisci</div>
                  </>
                ) : <span className="text-gray-600">[ {text.p2Title} ]</span>}
              </div>
              <div className="p-6"><h3 className="text-xl font-bold mb-2">{text.p2Title}</h3><p className="text-gray-400 text-sm">{text.p2Desc}</p></div>
            </div>

            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 flex flex-col">
              <div 
                onClick={() => siteConfig.p3Image && setSelectedImage(siteConfig.p3Image)}
                className="h-64 bg-gray-950 overflow-hidden flex items-center justify-center cursor-pointer group relative p-4"
              >
                {siteConfig.p3Image ? (
                  <>
                    <img src={siteConfig.p3Image} alt="P3" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-semibold">🔍 Ingrandisci</div>
                  </>
                ) : <span className="text-gray-600">[ {text.p3Title} ]</span>}
              </div>
              <div className="p-6"><h3 className="text-xl font-bold mb-2">{text.p3Title}</h3><p className="text-gray-400 text-sm">{text.p3Desc}</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section id="contact" className="py-24 px-6 border-t border-gray-900 bg-gray-950">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold">{text.contactTitle}</h2>
            <div className="mt-8 space-y-4 text-gray-300 text-sm">
              <p>📍 {text.addressLabel} {siteConfig.address}</p>
              <p>📧 {text.emailLabel} {siteConfig.email}</p>
              <p>📞 {text.phoneLabel} {siteConfig.phone}</p>
              <p>📋 {text.fiscalLabel} {siteConfig.taxId} — {siteConfig.fiscalCode}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Modal per Ingrandire Immagini */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img src={selectedImage} alt="Ingrandimento" className="max-w-full max-h-[90vh] rounded-2xl object-contain border border-gray-800 shadow-2xl" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-lg bg-gray-900 px-4 py-2 rounded-full border border-gray-800"
            >
              ✕ Chiudi
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-gray-900 py-12 px-6 bg-gray-950 text-center text-gray-500 text-xs">
        <p>{siteConfig.companyName} &bull; {siteConfig.address} &bull; {siteConfig.taxId}</p>
      </footer>
    </div>
  )
}
