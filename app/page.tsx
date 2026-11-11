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
      `Salve ${siteConfig.companyName},\n\nNome: ${formData.name}\nEmail:${formData.email}\nCellulare: ${formData.phone}\n\nSpecifiche Progetto:\n${formData.message}`
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
    <div className={`min-h-screen bg-[#f4f6f9] text-
