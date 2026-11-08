// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type Language = 'it' | 'en' | 'es' | 'fr' | 'de' | 'ar'

export default function Home() {
  const [lang, setLang] = useState<Language>('it')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Campi del form contatti
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

  // Gestione invio form con apertura WhatsApp automatica
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Per favore compila Nome, Cellulare e Specifiche Progetto.')
      return
    }

    // Numero WhatsApp aziendale (puoi sostituirlo o usare quello dinamico da siteConfig)
    const whatsappNumber = siteConfig.phone.replace(/[^0-9+]/g, '') || '393891234567'
    const textMessage = encodeURIComponent(
      `Salve ${siteConfig.companyName},\n\nNome: ${formData.name}\nEmail: ${formData.email}\nCellulare: ${formData.phone}\n\nSpecifiche Progetto:\n${formData.message}`
    )

    window.open(`https://wa.me/${whatsappNumber}?text=${textMessage}`, '_blank')
  }

  const t: Record<Language, any> = {
    it: {
      navHome: 'Home', navAbout: 'Chi Siamo', navProducts: 'Vetrina 3D', navContact: 'Contatti', adminArea: 'Pannello Controllo', requestQuote: 'Richiedi Progetto', badge: 'NEXT-GEN 3D PRINTING & ENGINEERING', heroTitle1: 'Architettura Tridimensionale', heroTitle2: 'e Prototipazione Avanzata', heroDesc: `Trasformiamo geometrie digitali in manufatti fisici ad alta precisione. Prototipi, statue da collezione e componenti tecnici stampati da ${siteConfig.companyName}.`, exploreProducts: 'Esplora Modelli', contactUs: 'Avvia Progetto', aboutTag: 'LABORATORIO TECH', aboutTitle: 'Ingegnerizzazione della Forma e Precisione Micron', aboutDesc: `${siteConfig.companyName} unisce sistemi di stampa 3D a resina e filamento ad alta risoluzione con finitura artigianale e controllo qualità rigoroso.`, yearsExp: '+5 ANNI', yearsExpDesc: 'R&D Stampa Tridimensionale', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Risoluzione Strati', showroomText: '[ SCANSIONE LAB ]', productsTag: 'PORTFOLIO 3D', productsTitle: 'Modelli & Moduli In Evidenza', productsDesc: 'Soluzioni personalizzate realizzate con polimeri ad elevate prestazioni.', p1Title: 'Anime Action Figures', p1Desc: 'Stampa resina UV ad altissima definizione con micro-dettagli rifiniti a mano.', p2Title: 'Statua da Collezione', p2Desc: 'Scultura digitale renderizzata e stampata in grande formato.', p3Title: 'Prototipazione Industriale', p3Desc: 'Componenti meccanici funzionali in PLA+, ABS e resine ingegneristiche.', moreInfo: 'Dettagli Tecnici →', contactTag: 'COMMUNICATION HUB', contactTitle: 'Inizia il tuo Progetto 3D', contactDesc: 'Invia le tue specifiche tecniche o chatta direttamente con il nostro team tramite WhatsApp.', formName: 'Nome / Azienda', formEmail: 'Email di contatto', formPhone: 'Cellulare / WhatsApp (Obbligatorio)', formMessage: 'Specifiche Progetto', formSubmit: 'Invia Richiesta su WhatsApp', addressLabel: 'HQ Location:', emailLabel: 'Direct Mail:', phoneLabel: 'Supporto Line:', fiscalLabel: 'ID Fiscale:', rights: 'All System Rights Reserved.'
    },
    en: { navHome: 'Home', navAbout: 'About Us', navProducts: '3D Showcase', navContact: 'Contact', adminArea: 'Control Panel', requestQuote: 'Start Project', badge: 'NEXT-GEN 3D PRINTING & ENGINEERING', heroTitle1: 'Three-Dimensional', heroTitle2: 'Advanced Prototyping', heroDesc: `Transforming digital geometry into high-precision physical artifacts by ${siteConfig.companyName}.`, exploreProducts: 'Explore Models', contactUs: 'Start Project', aboutTag: 'TECH LAB', aboutTitle: 'Shape Engineering & Micron Precision', aboutDesc: `${siteConfig.companyName} combines resin and filament 3D printing with strict quality control.`, yearsExp: '+5 YEARS', yearsExpDesc: '3D Printing R&D', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Layer Precision', showroomText: '[ LAB SCAN ]', productsTag: '3D PORTFOLIO', productsTitle: 'Featured Models & Modules', productsDesc: 'Custom solutions engineered with high-performance polymers.', p1Title: 'Anime Action Figures', p1Desc: 'Ultra-high definition UV resin print with hand-finished details.', p2Title: 'Collectible Statues', p2Desc: 'Large-scale digital sculpture 3D printed.', p3Title: 'Industrial Prototyping', p3Desc: 'Functional engineering components in ABS, PLA+, and tough resins.', moreInfo: 'Tech Specs →', contactTag: 'COMMUNICATION HUB', contactTitle: 'Initiate Your 3D Project', contactDesc: 'Submit your technical files or chat directly with our team via WhatsApp.', formName: 'Name / Company', formEmail: 'Contact Email', formPhone: 'Mobile / WhatsApp (Required)', formMessage: 'Project Specs', formSubmit: 'Send via WhatsApp', addressLabel: 'HQ Location:', emailLabel: 'Direct Mail:', phoneLabel: 'Support Line:', fiscalLabel: 'Fiscal ID:', rights: 'All System Rights Reserved.' },
    es: { navHome: 'Inicio', navAbout: 'Nosotros', navProducts: 'Catálogo 3D', navContact: 'Contacto', adminArea: 'Panel Admin', requestQuote: 'Presupuesto', badge: 'TECNOLOGÍA 3D AVANZADA', heroTitle1: 'Arquitectura 3D', heroTitle2: 'Prototipado de Alta Precisión', heroDesc: `Transformamos modelos digitales con ${siteConfig.companyName}.`, exploreProducts: 'Ver Modelos', contactUs: 'Contacto', aboutTag: 'LABORATORIO', aboutTitle: 'Precisión y Diseño 3D', aboutDesc: `${siteConfig.companyName} laboratorio de fabricación aditiva.`, yearsExp: '+5 AÑOS', yearsExpDesc: 'Experiencia 3D', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Precisión', showroomText: '[ ESCÁNER LAB ]', productsTag: 'PORTAFOLIO', productsTitle: 'Productos Destacados', productsDesc: 'Soluciones personalizadas en polímeros.', p1Title: 'Figuras Anime', p1Desc: 'Resina UV de alta definición.', p2Title: 'Estatuas', p2Desc: 'Escultura digital.', p3Title: 'Prototipos', p3Desc: 'Piezas funcionales.', moreInfo: 'Especificaciones →', contactTag: 'CONTACTO', contactTitle: 'Inicia tu Proyecto', contactDesc: 'Chatea por WhatsApp.', formName: 'Nombre / Empresa', formEmail: 'Email', formPhone: 'Móvil / WhatsApp (Obligatorio)', formMessage: 'Proyecto', formSubmit: 'Enviar por WhatsApp', addressLabel: 'Ubicación:', emailLabel: 'Email:', phoneLabel: 'Teléfono:', fiscalLabel: 'ID Fiscal:', rights: 'Derechos reservados.' },
    fr: { navHome: 'Accueil', navAbout: 'À Propos', navProducts: 'Vitrine 3D', navContact: 'Contact', adminArea: 'Panneau Admin', requestQuote: 'Devis Projet', badge: 'IMPRESSION 3D HAUTE PRÉCISION', heroTitle1: 'Architecture 3D', heroTitle2: 'Prototypage Avancé', heroDesc: `Création de pièces physiques de précision par ${siteConfig.companyName}.`, exploreProducts: 'Explorer', contactUs: 'Contact', aboutTag: 'LABOTECH', aboutTitle: 'Ingénierie des Formes', aboutDesc: `${siteConfig.companyName} fabrication additive.`, yearsExp: '+5 ANS', yearsExpDesc: 'R&D Impression 3D', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Précision', showroomText: '[ SCAN LABO ]', productsTag: 'PORTFOLIO', productsTitle: 'Produits Phares', productsDesc: 'Solutions sur mesure.', p1Title: 'Figurines', p1Desc: 'Résine UV haute précision.', p2Title: 'Statue', p2Desc: 'Grand format.', p3Title: 'Prototypage', p3Desc: 'Composants techniques.', moreInfo: 'Détails →', contactTag: 'CONTACT', contactTitle: 'Démarrer un Projet', contactDesc: 'Discutez sur WhatsApp.', formName: 'Nom / Entreprise', formEmail: 'E-mail', formPhone: 'Téléphone / WhatsApp (Obligatoire)', formMessage: 'Message', formSubmit: 'Envoyer sur WhatsApp', addressLabel: 'Adresse :', emailLabel: 'E-mail :', phoneLabel: 'Téléphone :', fiscalLabel: 'Fiscal :', rights: 'Tous droits réservés.' },
    de: { navHome: 'Start', navAbout: 'Über uns', navProducts: '3D Katalog', navContact: 'Kontakt', adminArea: 'Admin Control', requestQuote: 'Projekt Starten', badge: 'ADVANCED 3D PRINTING', heroTitle1: '3D Architektur', heroTitle2: 'Präzisions-Prototyping', heroDesc: `Digitale Geometrien in physische Objekte von ${siteConfig.companyName}.`, exploreProducts: 'Modelle', contactUs: 'Kontakt', aboutTag: 'TECH LAB', aboutTitle: 'Mikron Präzision', aboutDesc: `${siteConfig.companyName} additive Fertigung.`, yearsExp: '+5 JAHRE', yearsExpDesc: 'Erfahrung', craftsmanship: '0.05 MM', craftsmanshipDesc: 'Auflösung', showroomText: '[ LAB SCAN ]', productsTag: 'PORTFOLIO', productsTitle: 'High-Tech Produkte', productsDesc: 'Polymere 3D-Lösungen.', p1Title: 'Figuren', p1Desc: 'UV-Harzdruck.', p2Title: 'Statue', p2Desc: 'Digitale Skulptur.', p3Title: 'Prototypen', p3Desc: 'Funktionsbauteile.', moreInfo: 'Tech-Specs →', contactTag: 'KONTAKT', contactTitle: 'Projekt Starten', contactDesc: 'WhatsApp Chat.', formName: 'Name / Firma', formEmail: 'E-Mail', formPhone: 'Handy / WhatsApp (Erforderlich)', formMessage: 'Nachricht', formSubmit: 'Per WhatsApp senden', addressLabel: 'Adresse:', emailLabel: 'E-Mail:', phoneLabel: 'Telefon:', fiscalLabel: 'Steuer:', rights: 'Alle Rechte vorbehalten.' },
    ar: { navHome: 'الرئيسية', navAbout: 'من نحن', navProducts: 'معرض 3D', navContact: 'اتصل بنا', navAdmin: 'L-تحكم', requestQuote: 'بدء المشروع', badge: 'طباعة ثلاثية الأبعاد متقدمة', heroTitle1: 'هندسة ثلاثية الأبعاد', heroTitle2: 'نماذج أولية فائقة الدقة', heroDesc: `تحويل النماذج الرقمية إلى واقع ملموس بدقة عالية بواسطة ${siteConfig.companyName}.`, exploreProducts: 'استكشف النماذج', contactUs: 'تواصل معنا', aboutTag: 'المختبر التقني', aboutTitle: 'دقة الميكرون والتصميم المتقدم', aboutDesc: `${siteConfig.companyName} يدمج بين طباعة الراتنج الخيطية عالية الجودة.`, yearsExp: '+5 سنوات', yearsExpDesc: 'بحث وتطوير 3D', craftsmanship: '0.05 MM', craftsmanshipDesc: 'دقة الطبقات', showroomText: '[ مسح المختبر ]', productsTag: 'المعرض التقني', productsTitle: 'النماذج البارزة', productsDesc: 'حلول مخصصة مصممة باستخدام بوليمرات عالية الأداء.', p1Title: 'مجسمات انمي', p1Desc: 'طباعة راتنج UV فائقة الدقة تفاصيل يدوية.', p2Title: 'تماثيل مخصصة', p2Desc: 'نحت رقمي مطبوع بحجم كبير.', p3Title: 'نماذج صناعية', p3Desc: 'قطع ميكانيكية وظيفية من المواد المتقدمة.', moreInfo: 'المواصفات التقنية ←', contactTag: 'مركز التواصل', contactTitle: 'ابدأ مشروعك 3D', contactDesc: 'تواصل معنا عبر واتساب.', formName: 'الاسم / الشركة', formEmail: 'البريد الإلكتروني', formPhone: 'الهاتف / واتساب (إلزامي)', formMessage: 'مواصفات المشروع', formSubmit: 'إرسال عبر واتساب', addressLabel: 'المقر:', emailLabel: 'البريد:', phoneLabel: 'الهاتف:', fiscalLabel: 'الرقم الضريبي:', rights: 'جميع الحقوق محفوظة.' }
  }

  const text = t[lang]
  const isRtl = lang === 'ar'

  return (
    <div className={`min-h-screen bg-[#f4f6f9] text-slate-800 font-sans selection:bg-cyan-500 selection:text-white ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur-lg sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4 relative z-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-slate-900 via-indigo-950 to-cyan-600 bg-clip-text text-transparent uppercase">
              {siteConfig.companyName}
            </span>
          </Link>
          
          <nav className="hidden lg:flex gap-8 text-xs font-mono font-bold tracking-wider text-slate-600 uppercase">
            <a href="#home" className="hover:text-cyan-600 transition">{text.navHome}</a>
            <a href="#about" className="hover:text-cyan-600 transition">{text.navAbout}</a>
            <a href="#products" className="hover:text-cyan-600 transition">{text.navProducts}</a>
            <a href="#contact" className="hover:text-cyan-600 transition">{text.navContact}</a>
          </nav>

          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-white/90 border border-slate-300 text-slate-700 text-xs rounded-md px-3 py-2 font-mono font-medium shadow-2xs focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="it">🇮🇹 IT</option>
              <option value="en">🇬🇧 EN</option>
              <option value="es">🇪🇸 ES</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="de">🇩🇪 DE</option>
              <option value="ar">🇸🇦 AR</option>
            </select>

            <Link href="/admin" className="hidden sm:inline-block text-xs font-mono font-bold text-slate-600 hover:text-cyan-600 border border-slate-300 bg-white/80 px-3.5 py-2 rounded-md transition shadow-2xs">
              {text.adminArea}
            </Link>
            <a href="#contact" className="px-4 py-2 bg-slate-900 hover:bg-cyan-600 text-white text-xs font-mono font-bold rounded-md transition shadow-md shadow-slate-900/10">
              {text.requestQuote}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-36 px-6 text-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80" 
            alt="3D Printing Lab Background" 
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded-full shadow-lg mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            {text.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.15] drop-shadow-md">
            {text.heroTitle1} <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-350 bg-clip-text text-transparent">
              {text.heroTitle2}
            </span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">{text.heroDesc}</p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap font-mono">
            <a href="#products" className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold rounded-lg transition shadow-xl shadow-cyan-500/20 uppercase tracking-wider">{text.exploreProducts}</a>
            <a href="#contact" className="px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white text-xs font-bold rounded-lg border border-slate-700 transition shadow-xl uppercase tracking-wider backdrop-blur-md">{text.contactUs}</a>
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section id="about" className="py-24 px-6 border-t border-slate-200 bg-white/70 backdrop-blur-md z-10 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[11px] font-mono font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 border border-cyan-200/60 px-3 py-1 rounded-md">{text.aboutTag}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{text.aboutTitle}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base">{text.aboutDesc}</p>
            
            <div className="mt-8 grid grid-cols-2 gap-4 font-mono">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-2xl font-black text-slate-900">{text.yearsExp}</h3>
                <p className="text-xs text-slate-500 mt-1 uppercase font-semibold">{text.yearsExpDesc}</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-2xl font-black text-cyan-600">{text.craftsmanship}</h3>
                <p className="text-xs text-slate-500 mt-1 uppercase font-semibold">{text.craftsmanshipDesc}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => siteConfig.aboutImage && setSelectedImage(siteConfig.aboutImage)} 
              className="h-64 col-span-2 rounded-xl border border-slate-200/90 overflow-hidden bg-slate-100/80 backdrop-blur-sm cursor-pointer group relative flex items-center justify-center p-3 shadow-xs hover:border-cyan-400 transition"
            >
              {siteConfig.aboutImage ? (
                <>
                  <img src={siteConfig.aboutImage} alt="Chi Siamo 1" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-mono text-white font-bold backdrop-blur-2xs">🔍 [ FULLSCAN ]</div>
                </>
              ) : <div className="text-slate-400 font-mono text-xs">{text.showroomText} 01</div>}
            </div>

            <div 
              onClick={() => siteConfig.aboutImage2 && setSelectedImage(siteConfig.aboutImage2)} 
              className="h-44 rounded-xl border border-slate-200/90 overflow-hidden bg-slate-100/80 backdrop-blur-sm cursor-pointer group relative flex items-center justify-center p-3 shadow-xs hover:border-cyan-400 transition"
            >
              {siteConfig.aboutImage2 ? (
                <>
                  <img src={siteConfig.aboutImage2} alt="Chi Siamo 2" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-mono text-white font-bold backdrop-blur-2xs">🔍 [ FULLSCAN ]</div>
                </>
              ) : <div className="text-slate-400 font-mono text-xs">{text.showroomText} 02</div>}
            </div>

            <div 
              onClick={() => siteConfig.aboutImage3 && setSelectedImage(siteConfig.aboutImage3)} 
              className="h-44 rounded-xl border border-slate-200/90 overflow-hidden bg-slate-100/80 backdrop-blur-sm cursor-pointer group relative flex items-center justify-center p-3 shadow-xs hover:border-cyan-400 transition"
            >
              {siteConfig.aboutImage3 ? (
                <>
                  <img src={siteConfig.aboutImage3} alt="Chi Siamo 3" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-mono text-white font-bold backdrop-blur-2xs">🔍 [ FULLSCAN ]</div>
                </>
              ) : <div className="text-slate-400 font-mono text-xs">{text.showroomText} 03</div>}
            </div>
          </div>
        </div>
      </section>

      {/* Vetrina Prodotti */}
      <section id="products" className="py-24 px-6 border-t border-slate-200 bg-[#f8fafc] z-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 border border-cyan-200/60 px-3 py-1 rounded-md">{text.productsTag}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{text.productsTitle}</h2>
            <p className="mt-3 text-slate-600 text-sm">{text.productsDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col group">
              <div 
                onClick={() => siteConfig.p1Image && setSelectedImage(siteConfig.p1Image)}
                className="h-64 bg-slate-50 overflow-hidden flex items-center justify-center cursor-pointer relative p-4 border-b border-slate-100"
              >
                {siteConfig.p1Image ? (
                  <>
                    <img src={siteConfig.p1Image} alt="P1" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-mono text-white font-bold backdrop-blur-2xs">🔍 [ VIEW SPEC ]</div>
                  </>
                ) : <span className="text-slate-400 font-mono text-xs">[ {text.p1Title} ]</span>}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{text.p1Title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6 flex-grow">{text.p1Desc}</p>
                <a href="#contact" className="text-cyan-600 text-xs font-mono font-bold hover:text-cyan-700">{text.moreInfo}</a>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col group">
              <div 
                onClick={() => siteConfig.p2Image && setSelectedImage(siteConfig.p2Image)}
                className="h-64 bg-slate-50 overflow-hidden flex items-center justify-center cursor-pointer relative p-4 border-b border-slate-100"
              >
                {siteConfig.p2Image ? (
                  <>
                    <img src={siteConfig.p2Image} alt="P2" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-mono text-white font-bold backdrop-blur-2xs">🔍 [ VIEW SPEC ]</div>
                  </>
                ) : <span className="text-slate-400 font-mono text-xs">[ {text.p2Title} ]</span>}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{text.p2Title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6 flex-grow">{text.p2Desc}</p>
                <a href="#contact" className="text-cyan-600 text-xs font-mono font-bold hover:text-cyan-700">{text.moreInfo}</a>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col group">
              <div 
                onClick={() => siteConfig.p3Image && setSelectedImage(siteConfig.p3Image)}
                className="h-64 bg-slate-50 overflow-hidden flex items-center justify-center cursor-pointer relative p-4 border-b border-slate-100"
              >
                {siteConfig.p3Image ? (
                  <>
                    <img src={siteConfig.p3Image} alt="P3" className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-mono text-white font-bold backdrop-blur-2xs">🔍 [ VIEW SPEC ]</div>
                  </>
                ) : <span className="text-slate-400 font-mono text-xs">[ {text.p3Title} ]</span>}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{text.p3Title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6 flex-grow">{text.p3Desc}</p>
                <a href="#contact" className="text-cyan-600 text-xs font-mono font-bold hover:text-cyan-700">{text.moreInfo}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contatti Hub con WhatsApp integrato */}
      <section id="contact" className="py-24 px-6 border-t border-slate-200 bg-white z-10 relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[11px] font-mono font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 border border-cyan-200/60 px-3 py-1 rounded-md">{text.contactTag}</span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 tracking-tight">{text.contactTitle}</h2>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed">{text.contactDesc}</p>
            <div className="mt-8 space-y-4 text-slate-700 text-xs font-mono">
              <p className="flex items-center gap-3">📍 <strong className="text-slate-900">{text.addressLabel}</strong> {siteConfig.address}</p>
              <p className="flex items-center gap-3">📧 <strong className="text-slate-900">{text.emailLabel}</strong> {siteConfig.email}</p>
              <p className="flex items-center gap-3">📞 <strong className="text-slate-900">{text.phoneLabel}</strong> {siteConfig.phone}</p>
              <p className="flex items-center gap-3">📋 <strong className="text-slate-900">{text.fiscalLabel}</strong> {siteConfig.taxId} — {siteConfig.fiscalCode}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-2xs">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4 font-mono">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">{text.formName} *</label>
                <input 
                  type="text" 
                  required
                  placeholder={text.formName} 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-md px-4 py-3 text-slate-900 text-xs focus:outline-none focus:border-cyan-500 shadow-2xs" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">{text.formEmail}</label>
                <input 
                  type="email" 
                  placeholder={text.formEmail} 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-xs focus:outline-none focus:border-cyan-500 shadow-2xs" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">{text.formPhone} *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+39 333 1234567" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-xs focus:outline-none focus:border-cyan-500 shadow-2xs" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">{text.formMessage} *</label>
                <textarea 
                  rows={4} 
                  required
                  placeholder={text.formMessage} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-md px-4 py-3 text-slate-900 text-xs focus:outline-none focus:border-cyan-500 shadow-2xs"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-md text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>💬 {text.formSubmit}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img src={selectedImage} alt="Ingrandimento High-Tech" className="max-w-full max-h-[90vh] rounded-xl object-contain border border-slate-300 shadow-2xl bg-white p-2" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-slate-900 font-mono font-bold text-xs bg-white px-4 py-2 rounded-md border border-slate-200 shadow-md hover:bg-slate-100 transition"
            >
              ✕ [ CLOSE SCAN ]
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-6 bg-white text-center text-slate-500 text-xs font-mono space-y-2 z-10 relative">
        <p className="text-slate-700 font-semibold">{siteConfig.companyName} &bull; {siteConfig.address} &bull; {siteConfig.taxId} &bull; {siteConfig.fiscalCode}</p>
        <p className="text-[10px] text-slate-400">&copy; 2026 {siteConfig.companyName}. {text.rights}</p>
      </footer>
    </div>
  )
}
