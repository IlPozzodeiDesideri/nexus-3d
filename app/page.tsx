// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'ar'

export default function Home() {
  const [lang, setLang] = useState<Language>('it')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
      navHome: 'Home', navAbout: 'Chi Siamo', navProducts: 'Prodotti & Servizi', navContact: 'Contatti', adminArea: 'Area Admin', requestQuote: 'Richiedi Preventivo', badge: 'Stampe 3D di Alta Qualità • Design & Artigianato', heroTitle1: 'Porta le tue idee', heroTitle2: 'nella realtà tridimensionale', heroDesc: `Realizziamo prototipi, action figure, statue dettagliate e oggetti di design unici stampati in 3D con cura artigianale da ${siteConfig.companyName}.`, exploreProducts: 'Scopri i Prodotti', contactUs: 'Contattaci', aboutTag: 'Chi Siamo', aboutTitle: 'Innovazione e passione per il dettaglio', aboutDesc: `${siteConfig.companyName} nasce dalla passione per la tecnologia di stampa tridimensionale e la modellazione avanzata.`, yearsExp: '+5 Anni', yearsExpDesc: 'Nel settore della stampa 3D', craftsmanship: '100%', craftsmanshipDesc: 'Finitura artigianale', showroomText: '[ Foto Laboratorio ]', productsTag: 'Vetrina & Servizi', productsTitle: 'I Nostri Prodotti in Evidenza', productsDesc: 'Soluzioni su misura e oggetti da collezione stampati in 3D.', p1Title: 'Action Figure Anime', p1Desc: 'Stampa 3D ad altissima risoluzione con dettagli rifiniti e dipinti a mano.', p2Title: 'Statua da Collezione', p2Desc: 'Design personalizzato per pezzi unici da esposizione.', p3Title: 'Prototipazione Industriale', p3Desc: 'Componenti tecnici e prototipi funzionali in PLA, ABS e resine speciali.', moreInfo: 'Richiedi informazioni →', contactTag: 'Contattaci', contactTitle: 'Parla con il nostro team', contactDesc: 'Hai un progetto in mente o desideri maggiori informazioni sui nostri servizi di stampa 3D? Scrivici.', formName: 'Nome', formEmail: 'Email', formMessage: 'Messaggio', formSubmit: 'Invia Messaggio', addressLabel: 'Indirizzo:', emailLabel: 'Email:', phoneLabel: 'Telefono:', fiscalLabel: 'Dati Fiscali:', rights: 'Tutti i diritti riservati.'
    },
    en: { navHome: 'Home', navAbout: 'About Us', navProducts: 'Products & Services', navContact: 'Contact', adminArea: 'Admin Area', requestQuote: 'Request Quote', badge: 'High Quality 3D Printing • Design & Craftsmanship', heroTitle1: 'Bring your ideas', heroTitle2: 'into three-dimensional reality', heroDesc: `We create prototypes, action figures, detailed statues, and unique design objects 3D printed with craftsmanship by ${siteConfig.companyName}.`, exploreProducts: 'Explore Products', contactUs: 'Contact Us', aboutTag: 'About Us', aboutTitle: 'Innovation and passion for detail', aboutDesc: `${siteConfig.companyName} was born from a passion for 3D printing technology and advanced modeling.`, yearsExp: '+5 Years', yearsExpDesc: 'In 3D printing industry', craftsmanship: '100%', craftsmanshipDesc: 'Handcrafted finish', showroomText: '[ Lab Photo ]', productsTag: 'Showcase & Services', productsTitle: 'Featured Products', productsDesc: 'Custom solutions and 3D printed collectibles.', p1Title: 'Anime Action Figures', p1Desc: 'Ultra-high resolution 3D printing with hand-painted details.', p2Title: 'Collectible Statues', p2Desc: 'Custom design for unique display pieces.', p3Title: 'Industrial Prototyping', p3Desc: 'Technical components and functional prototypes.', moreInfo: 'Request details →', contactTag: 'Contact Us', contactTitle: 'Speak with our team', contactDesc: 'Have a project in mind? Write to us.', formName: 'Name', formEmail: 'Email', formMessage: 'Message', formSubmit: 'Send Message', addressLabel: 'Address:', emailLabel: 'Email:', phoneLabel: 'Phone:', fiscalLabel: 'Tax Info:', rights: 'All rights reserved.' },
    es: { navHome: 'Inicio', navAbout: 'Quiénes Somos', navProducts: 'Productos', navContact: 'Contacto', adminArea: 'Admin', requestQuote: 'Presupuesto', badge: 'Impresión 3D', heroTitle1: 'Lleva tus ideas', heroTitle2: 'a la realidad', heroDesc: `Creamos objetos con ${siteConfig.companyName}.`, exploreProducts: 'Productos', contactUs: 'Contacto', aboutTag: 'Nosotros', aboutTitle: 'Innovación', aboutDesc: `${siteConfig.companyName}`, yearsExp: '+5 Años', yearsExpDesc: 'Experiencia', craftsmanship: '100%', craftsmanshipDesc: 'Artesanal', showroomText: '[ Taller ]', productsTag: 'Servicios', productsTitle: 'Productos', productsDesc: 'Soluciones', p1Title: 'Figuras', p1Desc: 'Alta resolución', p2Title: 'Estatua', p2Desc: 'Colección', p3Title: 'Prototipo', p3Desc: 'Industrial', moreInfo: 'Info →', contactTag: 'Contacto', contactTitle: 'Hablemos', contactDesc: 'Escríbenos', formName: 'Nombre', formEmail: 'Email', formMessage: 'Mensaje', formSubmit: 'Enviar', addressLabel: 'Dirección:', emailLabel: 'Email:', phoneLabel: 'Teléfono:', fiscalLabel: 'Fiscal:', rights: 'Derechos reservados.' },
    fr: { navHome: 'Accueil', navAbout: 'À Propos', navProducts: 'Produits', navContact: 'Contact', adminArea: 'Admin', requestQuote: 'Devis', badge: 'Impression 3D', heroTitle1: 'Donnez vie', heroTitle2: 'à vos idées', heroDesc: `Créations par ${siteConfig.companyName}.`, exploreProducts: 'Produits', contactUs: 'Contact', aboutTag: 'À Propos', aboutTitle: 'Innovation', aboutDesc: `${siteConfig.companyName}`, yearsExp: '+5 Ans', yearsExpDesc: 'Expérience', craftsmanship: '100%', craftsmanshipDesc: 'Artisanal', showroomText: '[ Labo ]', productsTag: 'Services', productsTitle: 'Produits', productsDesc: 'Solutions', p1Title: 'Figurines', p1Desc: 'Haute résolution', p2Title: 'Statue', p2Desc: 'Collection', p3Title: 'Prototypage', p3Desc: 'Industriel', moreInfo: 'Info →', contactTag: 'Contact', contactTitle: 'Équipe', contactDesc: 'Écrivez-nous', formName: 'Nom', formEmail: 'E-mail', formMessage: 'Message', formSubmit: 'Envoyer', addressLabel: 'Adresse :', emailLabel: 'E-mail :', phoneLabel: 'Téléphone :', fiscalLabel: 'Fiscal :', rights: 'Tous droits réservés.' },
    de: { navHome: 'Startseite', navAbout: 'Über uns', navProducts: 'Produkte', navContact: 'Kontakt', adminArea: 'Admin', requestQuote: 'Angebot', badge: '3D-Druck', heroTitle1: 'Bringen Sie', heroTitle2: 'Ideen real', heroDesc: `Erstellt von ${siteConfig.companyName}.`, exploreProducts: 'Produkte', contactUs: 'Kontakt', aboutTag: 'Über uns', aboutTitle: 'Innovation', aboutDesc: `${siteConfig.companyName}`, yearsExp: '+5 Jahre', yearsExpDesc: 'Erfahrung', craftsmanship: '100%', craftsmanshipDesc: 'Handarbeit', showroomText: '[ Labor ]', productsTag: 'Dienste', productsTitle: 'Produkte', productsDesc: 'Lösungen', p1Title: 'Figuren', p1Desc: 'Hohe Auflösung', p2Title: 'Statue', p2Desc: 'Sammlung', p3Title: 'Prototyp', p3Desc: 'Industriell', moreInfo: 'Infos →', contactTag: 'Kontakt', contactTitle: 'Team', contactDesc: 'Schreiben Sie uns', formName: 'Name', formEmail: 'E-Mail', formMessage: 'Nachricht', formSubmit: 'Senden', addressLabel: 'Adresse:', emailLabel: 'E-Mail:', phoneLabel: 'Telefon:', fiscalLabel: 'Steuer:', rights: 'Alle Rechte vorbehalten.' },
    ar: { navHome: 'الرئيسية', navAbout: 'من نحن', navProducts: 'المنتجات', navContact: 'اتصل بنا', navAdmin: 'التحكم', requestQuote: 'طلب سعر', badge: 'طباعة 3د', heroTitle1: 'اجلب أفكارك', heroTitle2: 'للواقع', heroDesc: `بواسطة ${siteConfig.companyName}.`, exploreProducts: 'المنتجات', contactUs: 'اتصل بنا', aboutTag: 'من نحن', aboutTitle: 'ابتكار', aboutDesc: `${siteConfig.companyName}`, yearsExp: '+5 سنوات', yearsExpDesc: 'خبرة', craftsmanship: '100%', craftsmanshipDesc: 'يدوي', showroomText: '[ معرض ]', productsTag: 'خدمات', productsTitle: 'منتجات', productsDesc: 'حلول', p1Title: 'مجسمات', p1Desc: 'دقة عالية', p2Title: 'تمثال', p2Desc: 'تحصيل', p3Title: 'نموذج', p3Desc: 'صناعي', moreInfo: 'تفاصيل ←', contactTag: 'اتصل', contactTitle: 'تحدث معنا', contactDesc: 'راسلنا', formName: 'الاسم', formEmail: 'البريد', formMessage: 'الرسالة', formSubmit: 'إرسال', addressLabel: 'العنوان:', emailLabel: 'البريد:', phoneLabel: 'الهاتف:', fiscalLabel: 'الضريبي:', rights: 'جميع الحقوق محفوظة.' }
  }

  const text = t[lang]
  const isRtl = lang === 'ar'

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-500 selection:text-white ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <Link href="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent">
            {siteConfig.companyName}
          </Link>
          
          <nav className="hidden lg:flex gap-6 text-sm font-semibold text-slate-600">
            <a href="#home" className="hover:text-rose-600 transition">{text.navHome}</a>
            <a href="#about" className="hover:text-rose-600 transition">{text.navAbout}</a>
            <a href="#products" className="hover:text-rose-600 transition">{text.navProducts}</a>
            <a href="#contact" className="hover:text-rose-600 transition">{text.navContact}</a>
          </nav>

          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-rose-500 cursor-pointer font-medium"
            >
              <option value="it">🇮🇹 Italiano</option>
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>

            <Link href="/admin" className="hidden sm:inline-block text-xs text-slate-600 hover:text-rose-600 border border-slate-200 bg-white px-3 py-2 rounded-lg transition font-medium shadow-xs">
              {text.adminArea}
            </Link>
            <a href="#contact" className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs md:text-sm font-semibold rounded-lg transition shadow-md shadow-rose-600/20">
              {text.requestQuote}
            </a>
          </div>
        </div>
      </header>

      <section id="home" className="relative py-28 px-6 text-center bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-400/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="px-3.5 py-1.5 text-xs font-bold bg-rose-50 text-rose-600 rounded-full border border-rose-200 inline-block shadow-xs">
            {text.badge}
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            {text.heroTitle1} <br />
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {text.heroTitle2}
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">{text.heroDesc}</p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a href="#products" className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition shadow-lg shadow-rose-600/25">{text.exploreProducts}</a>
            <a href="#contact" className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 transition shadow-xs">{text.contactUs}</a>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-md">{text.aboutTag}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">{text.aboutTitle}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-base">{text.aboutDesc}</p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-xs">
                <h3 className="text-3xl font-black text-rose-600">{text.yearsExp}</h3>
                <p className="text-sm font-medium text-slate-600 mt-1">{text.yearsExpDesc}</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-xs">
                <h3 className="text-3xl font-black text-indigo-600">{text.craftsmanship}</h3>
                <p className="text-sm font-medium text-slate-600 mt-1">{text.craftsmanshipDesc}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => siteConfig.aboutImage && setSelectedImage(siteConfig.aboutImage)} 
              className="h-64 col-span-2 rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 cursor-pointer group relative flex items-center justify-center p-2 shadow-sm"
            >
              {siteConfig.aboutImage ? (
                <>
                  <img src={siteConfig.aboutImage} alt="Chi Siamo 1" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-bold backdrop-blur-xs">🔍 Ingrandisci</div>
                </>
              ) : <div className="text-slate-400 font-medium">{text.showroomText} 1</div>}
            </div>

            <div 
              onClick={() => siteConfig.aboutImage2 && setSelectedImage(siteConfig.aboutImage2)} 
              className="h-44 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 cursor-pointer group relative flex items-center justify-center p-2 shadow-sm"
            >
              {siteConfig.aboutImage2 ? (
                <>
                  <img src={siteConfig.aboutImage2} alt="Chi Siamo 2" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-bold backdrop-blur-xs">🔍 Ingrandisci</div>
                </>
              ) : <div className="text-slate-400 text-xs font-medium">{text.showroomText} 2</div>}
            </div>

            <div 
              onClick={() => siteConfig.aboutImage3 && setSelectedImage(siteConfig.aboutImage3)} 
              className="h-44 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 cursor-pointer group relative flex items-center justify-center p-2 shadow-sm"
            >
              {siteConfig.aboutImage3 ? (
                <>
                  <img src={siteConfig.aboutImage3} alt="Chi Siamo 3" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-bold backdrop-blur-xs">🔍 Ingrandisci</div>
                </>
              ) : <div className="text-slate-400 text-xs font-medium">{text.showroomText} 3</div>}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-24 px-6 border-t border-slate-200 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-md">{text.productsTag}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">{text.productsTitle}</h2>
            <p className="mt-3 text-slate-600">{text.productsDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col">
              <div 
                onClick={() => siteConfig.p1Image && setSelectedImage(siteConfig.p1Image)}
                className="h-64 bg-slate-100 overflow-hidden flex items-center justify-center cursor-pointer group relative p-4 border-b border-slate-100"
              >
                {siteConfig.p1Image ? (
                  <>
                    <img src={siteConfig.p1Image} alt="P1" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-bold backdrop-blur-xs">🔍 Ingrandisci</div>
                  </>
                ) : <span className="text-slate-400 font-medium">[ {text.p1Title} ]</span>}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{text.p1Title}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{text.p1Desc}</p>
                <a href="#contact" className="text-rose-600 text-sm font-bold hover:text-rose-700">{text.moreInfo}</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col">
              <div 
                onClick={() => siteConfig.p2Image && setSelectedImage(siteConfig.p2Image)}
                className="h-64 bg-slate-100 overflow-hidden flex items-center justify-center cursor-pointer group relative p-4 border-b border-slate-100"
              >
                {siteConfig.p2Image ? (
                  <>
                    <img src={siteConfig.p2Image} alt="P2" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-bold backdrop-blur-xs">🔍 Ingrandisci</div>
                  </>
                ) : <span className="text-slate-400 font-medium">[ {text.p2Title} ]</span>}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{text.p2Title}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{text.p2Desc}</p>
                <a href="#contact" className="text-rose-600 text-sm font-bold hover:text-rose-700">{text.moreInfo}</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col">
              <div 
                onClick={() => siteConfig.p3Image && setSelectedImage(siteConfig.p3Image)}
                className="h-64 bg-slate-100 overflow-hidden flex items-center justify-center cursor-pointer group relative p-4 border-b border-slate-100"
              >
                {siteConfig.p3Image ? (
                  <>
                    <img src={siteConfig.p3Image} alt="P3" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs text-white font-bold backdrop-blur-xs">🔍 Ingrandisci</div>
                  </>
                ) : <span className="text-slate-400 font-medium">[ {text.p3Title} ]</span>}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{text.p3Title}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{text.p3Desc}</p>
                <a href="#contact" className="text-rose-600 text-sm font-bold hover:text-rose-700">{text.moreInfo}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-md">{text.contactTag}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">{text.contactTitle}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{text.contactDesc}</p>
            <div className="mt-8 space-y-4 text-slate-700 text-sm font-medium">
              <p className="flex items-center gap-3">📍 <strong className="text-slate-900">{text.addressLabel}</strong> {siteConfig.address}</p>
              <p className="flex items-center gap-3">📧 <strong className="text-slate-900">{text.emailLabel}</strong> {siteConfig.email}</p>
              <p className="flex items-center gap-3">📞 <strong className="text-slate-900">{text.phoneLabel}</strong> {siteConfig.phone}</p>
              <p className="flex items-center gap-3">📋 <strong className="text-slate-900">{text.fiscalLabel}</strong> {siteConfig.taxId} — {siteConfig.fiscalCode}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{text.formName}</label>
                <input type="text" placeholder={text.formName} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-rose-500 shadow-2xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{text.formEmail}</label>
                <input type="email" placeholder={text.formEmail} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-rose-500 shadow-2xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{text.formMessage}</label>
                <textarea rows={4} placeholder={text.formMessage} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-rose-500 shadow-2xs"></textarea>
              </div>
              <button type="button" className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-sm shadow-md shadow-rose-600/20 transition">{text.formSubmit}</button>
            </form>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img src={selectedImage} alt="Ingrandimento" className="max-w-full max-h-[90vh] rounded-2xl object-contain border border-slate-200 shadow-2xl bg-white p-2" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-slate-900 font-bold text-xs bg-white px-4 py-2 rounded-full border border-slate-200 shadow-md hover:bg-slate-100 transition"
            >
              ✕ Chiudi
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 py-12 px-6 bg-white text-center text-slate-500 text-xs font-medium space-y-2">
        <p className="text-slate-700 font-semibold">{siteConfig.companyName} &bull; {siteConfig.address} &bull; {siteConfig.taxId} &bull; {siteConfig.fiscalCode}</p>
        <p>&copy; 2026 {siteConfig.companyName}. {text.rights}</p>
      </footer>
    </div>
  )
}
