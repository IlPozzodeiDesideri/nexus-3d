// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'ar'
type GalleryItem = {
  id: string
  image_url: string
  title: string
  price: number
}

const EUR_TO_USD_RATE = 1.10

export default function Home() {
  const [lang, setLang] = useState<Language>('it')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

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
  })

  const [productsGallery, setProductsGallery] = useState<GalleryItem[]>([])

  useEffect(() => {
    async function fetchConfig() {
      const { data: configData } = await supabase
        .from('site_config')
        .select('*')
        .eq('id', 'main')
        .single()

      if (configData) {
        setSiteConfig({
          companyName: configData.company_name || 'Nexus-3D',
          address: configData.address || '',
          taxId: configData.tax_id || '',
          fiscalCode: configData.fiscal_code || '',
          email: configData.email || '',
          phone: configData.phone || '',
          aboutImage: configData.about_image || '',
          aboutImage2: configData.about_image2 || '',
          aboutImage3: configData.about_image3 || '',
        })
      }

      const { data: galleryData } = await supabase
        .from('products_gallery')
        .select('*')
        .order('created_at', { ascending: false })

      if (galleryData) {
        setProductsGallery(galleryData)
      }
    }
    fetchConfig()
  }, [])

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Per favore compila Nome, Cellulare e Specifiche Progetto.')
      return
    }

    const whatsappNumber = siteConfig.phone.replace(/[^0-9+]/g, '') || '393891234567'
    const textMessage = encodeURIComponent(
      `Salve ${siteConfig.companyName},\n\nNome: ${formData.name}\nEmail: ${formData.email}\nCellulare: ${formData.phone}\n\nSpecifiche Progetto:\n${formData.message}`
    )

    window.open(`https://wa.me/${whatsappNumber}?text=${textMessage}`, '_blank')
  }

  const t: Record<Language, any> = {
    it: {
      navHome: 'Home', navAbout: 'Chi Siamo', navProducts: 'Vetrina 3D', navContact: 'Contatti', requestQuote: 'Richiedi Progetto', badge: 'NEXT-GEN 3D PRINTING & ENGINEERING', heroTitle1: 'Architettura Tridimensionale', heroTitle2: 'e Prototipazione Avanzata', heroDesc: `Trasformiamo geometrie digitali in manufatti fisici ad alta precisione. Prototipi, statue da collezione e componenti tecnici stampati da ${siteConfig.companyName}.`, exploreProducts: 'Esplora Modelli', contactUs: 'Avvia Progetto', aboutTag: 'LABORATORIO TECH', aboutTitle: 'Ingegnerizzazione della Forma e Precisione Micron', aboutDesc: `${siteConfig.companyName} unisce sistemi di stampa 3D a resina e filamento ad alta risoluzione con finitura artigianale e controllo qualità rigoroso.`, yearsExp: '+5 ANNI', yearsExpDesc: 'R&D Stampa Tridimensionale', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Risoluzione Strati', showroomText: '[ SCANSIONE LAB ]', productsTag: 'PORTFOLIO 3D', productsTitle: 'Modelli & Moduli In Evidenza', productsDesc: 'Soluzioni personalizzate realizzate con polimeri ad elevate prestazioni.', moreInfo: 'Dettagli Tecnici →', contactTag: 'COMMUNICATION HUB', contactTitle: 'Inizia il tuo Progetto 3D', contactDesc: 'Invia le tue specifiche tecniche o chatta direttamente con il nostro team tramite WhatsApp.', formName: 'Nome / Azienda', formEmail: 'Email di contatto', formPhone: 'Cellulare / WhatsApp (Obbligatorio)', formMessage: 'Specifiche Progetto', formSubmit: 'Invia Richiesta su WhatsApp', addressLabel: 'HQ Location:', emailLabel: 'Direct Mail:', phoneLabel: 'Supporto Line:', fiscalLabel: 'ID Fiscale:', rights: 'All System Rights Reserved.'
    },
    en: { navHome: 'Home', navAbout: 'About Us', navProducts: '3D Showcase', navContact: 'Contact', requestQuote: 'Start Project', badge: 'NEXT-GEN 3D PRINTING & ENGINEERING', heroTitle1: 'Three-Dimensional', heroTitle2: 'Advanced Prototyping', heroDesc: `Transforming digital geometry into high-precision physical artifacts by ${siteConfig.companyName}.`, exploreProducts: 'Explore Models', contactUs: 'Start Project', aboutTag: 'TECH LAB', aboutTitle: 'Shape Engineering & Micron Precision', aboutDesc: `${siteConfig.companyName} combines resin and filament 3D printing with strict quality control.`, yearsExp: '+5 YEARS', yearsExpDesc: '3D Printing R&D', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Layer Precision', showroomText: '[ LAB SCAN ]', productsTag: '3D PORTFOLIO', productsTitle: 'Featured Models & Modules', productsDesc: 'Custom solutions engineered with high-performance polymers.', moreInfo: 'Tech Specs →', contactTag: 'COMMUNICATION HUB', contactTitle: 'Initiate Your 3D Project', contactDesc: 'Submit your technical files or chat directly with our team via WhatsApp.', formName: 'Name / Company', formEmail: 'Contact Email', formPhone: 'Mobile / WhatsApp (Required)', formMessage: 'Project Specs', formSubmit: 'Send via WhatsApp', addressLabel: 'HQ Location:', emailLabel: 'Direct Mail:', phoneLabel: 'Support Line:', fiscalLabel: 'Fiscal ID:', rights: 'All System Rights Reserved.' },
    es: { navHome: 'Inicio', navAbout: 'Nosotros', navProducts: 'Catálogo 3D', navContact: 'Contacto', requestQuote: 'Presupuesto', badge: 'TECNOLOGÍA 3D AVANZADA', heroTitle1: 'Arquitectura 3D', heroTitle2: 'Prototipado de Alta Precisión', heroDesc: `Transformamos modelos digitales con ${siteConfig.companyName}.`, exploreProducts: 'Ver Modelos', contactUs: 'Contacto', aboutTag: 'LABORATORIO', aboutTitle: 'Precisión y Diseño 3D', aboutDesc: `${siteConfig.companyName} laboratorio de fabricación aditiva.`, yearsExp: '+5 AÑOS', yearsExpDesc: 'Experiencia 3D', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Precisión', showroomText: '[ ESCÁNER LAB ]', productsTag: 'PORTAFOLIO', productsTitle: 'Productos Destacados', productsDesc: 'Soluciones personalizadas en polímeros.', moreInfo: 'Especificaciones →', contactTag: 'CONTACTO', contactTitle: 'Inicia tu Proyecto', contactDesc: 'Chatea por WhatsApp.', formName: 'Nombre / Empresa', formEmail: 'Email', formPhone: 'Móvil / WhatsApp (Obligatorio)', formMessage: 'Proyecto', formSubmit: 'Enviar por WhatsApp', addressLabel: 'Ubicación:', emailLabel: 'Email:', phoneLabel: 'Teléfono:', fiscalLabel: 'ID Fiscal:', rights: 'Derechos reservados.' },
    fr: { navHome: 'Accueil', navAbout: 'À Propos', navProducts: 'Vitrine 3D', navContact: 'Contact', requestQuote: 'Devis Projet', badge: 'IMPRESSION 3D HAUTE PRÉCISION', heroTitle1: 'Architecture 3D', heroTitle2: 'Prototypage Avancé', heroDesc: `Création de pièces physiques de précision par ${siteConfig.companyName}.`, exploreProducts: 'Explorer', contactUs: 'Contact', aboutTag: 'LABOTECH', aboutTitle: 'Ingénierie des Formes', aboutDesc: `${siteConfig.companyName} fabrication additive.`, yearsExp: '+5 ANS', yearsExpDesc: 'R&D Impression 3D', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Précision', showroomText: '[ SCAN LABO ]', productsTag: 'PORTFOLIO', productsTitle: 'Produits Phares', productsDesc: 'Solutions sur mesure.', moreInfo: 'Détails →', contactTag: 'CONTACT', contactTitle: 'Démarrer un Projet', contactDesc: 'Discutez sur WhatsApp.', formName: 'Nom / Entreprise', formEmail: 'E-mail', formPhone: 'Téléphone / WhatsApp (Obligatoire)', formMessage: 'Message', formSubmit: 'Envoyer sur WhatsApp', addressLabel: 'Adresse :', emailLabel: 'E-mail :', phoneLabel: 'Téléphone :', fiscalLabel: 'Fiscal :', rights: 'Tous droits réservés.' },
    de: { navHome: 'Start', navAbout: 'Über uns', navProducts: '3D Katalog', navContact: 'Kontakt', requestQuote: 'Projekt Starten', badge: 'ADVANCED 3D PRINTING', heroTitle1: '3D Architektur', heroTitle2: 'Präzisions-Prototyping', heroDesc: `Digitale Geometrien in physische Objekte von ${siteConfig.companyName}.`, exploreProducts: 'Modelle', contactUs: 'Kontakt', aboutTag: 'TECH LAB', aboutTitle: 'Mikron Präzision', aboutDesc: `${siteConfig.companyName} additive Fertigung.`, yearsExp: '+5 JAHRE', yearsExpDesc: 'Erfahrung', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Auflösung', showroomText: '[ LAB SCAN ]', productsTag: 'PORTFOLIO', productsTitle: 'High-Tech Produkte', productsDesc: 'Polymere 3D-Lösungen.', moreInfo: 'Tech-Specs →', contactTag: 'KONTAKT', contactTitle: 'Projekt Starten', contactDesc: 'WhatsApp Chat.', formName: 'Name / Firma', formEmail: 'E-Mail', formPhone: 'Handy / WhatsApp (Erforderlich)', formMessage: 'Nachricht', formSubmit: 'Per WhatsApp senden', addressLabel: 'Adresse:', emailLabel: 'E-Mail:', phoneLabel: 'Telefon:', fiscalLabel: 'Steuer:', rights: 'Alle Rechte vorbehalten.' },
    ar: { navHome: 'الرئيسية', navAbout: 'من نحن', navProducts: 'معرض 3D', navContact: 'اتصل بنا', requestQuote: 'بدء المشروع', badge: 'طباعة ثلاثية الأبعاد متقدمة', heroTitle1: 'هندسة ثلاثية الأبعاد', heroTitle2: 'نماذج أولية فائقة الدقة', heroDesc: `تحويل النماذج الرقمية إلى واقع ملموس بدقة عالية بواسطة ${siteConfig.companyName}.`, exploreProducts: 'استكشف النماذج', contactUs: 'تواصل معنا', aboutTag: 'المختبر التقني', aboutTitle: 'دقة الميكرون والتصميم المتقدم', aboutDesc: `${siteConfig.companyName} يدمج بين طباعة الراتنج الخيطية عالية الجودة.`, yearsExp: '+5 سنوات', yearsExpDesc: 'بحث وتطوير 3D', craftsmanship: '0.05 MM', craftsmanshipDesc: 'دقة الطبقات', showroomText: '[ مسح المختبر ]', productsTag: 'المعرض التقني', productsTitle: 'النماذج البارزة', productsDesc: 'حلول مخصصة مصممة باستخدام بوليمرات عالية الأداء.', moreInfo: 'المواصفات التقنية ←', contactTag: 'مركز التواصل', contactTitle: 'ابدأ مشروعك 3D', contactDesc: 'تواصل معنا عبر واتساب.', formName: 'الاسم / الشركة', formEmail: 'البريد الإلكتروني', formPhone: 'الهاتف / واتساب (إلزامي)', formMessage: 'مواصفات المشروع', formSubmit: 'إرسال عبر واتساب', addressLabel: 'المقر:', emailLabel: 'البريد:', phoneLabel: 'الهاتف:', fiscalLabel: 'الرقم الضريبي:', rights: 'جميع الحقوق محفوظة.' }
  }

  const text = t[lang]
  const isRtl = lang === 'ar'

  return (
    <div className={`min-h-screen bg-[#f4f6f9] text-slate-800 font-sans selection:bg-cyan-500 selection:text-white w-full max-w-full overflow-x-hidden box-border ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-xs w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex justify-between items-center flex-wrap gap-2 relative z-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-lg sm:text-2xl font-black tracking-widest bg-gradient-to-r from-slate-900 via-indigo-950 to-cyan-600 bg-clip-text text-transparent uppercase">
              {siteConfig.companyName}
            </span>
          </Link>
          
          <nav className="hidden lg:flex gap-8 text-xs font-mono font-bold tracking-wider text-slate-600 uppercase">
            <a href="#home" className="hover:text-cyan-600 transition">{text.navHome}</a>
            <a href="#about" className="hover:text-cyan-600 transition">{text.navAbout}</a>
            <a href="#products" className="hover:text-cyan-600 transition">{text.navProducts}</a>
            <a href="#contact" className="hover:text-cyan-600 transition">{text.navContact}</a>
          </nav>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-slate-100 border border-slate-300 text-slate-700 text-[11px] sm:text-xs rounded px-2 py-1.5 font-mono font-medium focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="it">🇮🇹 IT</option>
              <option value="en">🇬🇧 EN</option>
              <option value="es">🇪🇸 ES</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="de">🇩🇪 DE</option>
              <option value="ar">🇸🇦 AR</option>
            </select>

            <Link href="/admin" className="text-[11px] sm:text-xs font-mono font-bold text-slate-700 hover:text-cyan-600 border border-slate-300 bg-white px-2.5 py-1.5 rounded transition shadow-2xs">
              ⚙️ Admin
            </Link>

            <a href="#contact" className="hidden sm:inline-block px-3 py-1.5 bg-slate-900 hover:bg-cyan-600 text-white text-xs font-mono font-bold rounded transition">
              {text.requestQuote}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-28 sm:py-36 px-4 sm:px-6 text-center overflow-hidden z-10 w-full box-border">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80" 
            alt="3D Printing Lab Background" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded-full shadow-lg mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            {text.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15] drop-shadow-md">
            {text.heroTitle1} <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-350 bg-clip-text text-transparent">
              {text.heroTitle2}
            </span>
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">{text.heroDesc}</p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap font-mono">
            <a href="#products" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold rounded-lg transition shadow-xl uppercase tracking-wider">{text.exploreProducts}</a>
            <a href="#contact" className="px-6 py-3 bg-slate-900/80 hover:bg-slate-800 text-white text-xs font-bold rounded-lg border border-slate-700 transition shadow-xl uppercase tracking-wider backdrop-blur-md">{text.contactUs}</a>
          </div>
        </div>
      </section>

      {/* Chi Siamo - Foto Enormi a Singola Colonna */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-slate-200 bg-white/70 backdrop-blur-md z-10 relative w-full box-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <span className="text-[11px] font-mono font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 border border-cyan-200/60 px-3 py-1 rounded-md">{text.aboutTag}</span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{text.aboutTitle}</h2>
            <p className="mt-3 text-slate-600 leading-relaxed text-xs sm:text-sm md:text-base">{text.aboutDesc}</p>
            
            <div className="mt-6 grid grid-cols-2 gap-3 font-mono">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{text.yearsExp}</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-1 uppercase font-semibold">{text.yearsExpDesc}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-xl sm:text-2xl font-black text-cyan-600">{text.craftsmanship}</h3>
                <p className="
