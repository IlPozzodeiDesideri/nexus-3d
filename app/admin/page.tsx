// app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type GalleryItem = {
  id: string
  image_url: string
  title: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const [savingDetails, setSavingDetails] = useState(false)
  const [savingImages, setSavingImages] = useState(false)
  const [uploadingAbout, setUploadingAbout] = useState<string | null>(null)
  const [uploadingGallery, setUploadingGallery] = useState(false)

  const [settings, setSettings] = useState({
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

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])

  useEffect(() => {
    async function loadData() {
      const { data: configData } = await supabase
        .from('site_config')
        .select('*')
        .eq('id', 'main')
        .single()

      if (configData) {
        setSettings({
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
        setGalleryItems(galleryData)
      }
    }
    loadData()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'Alessandro') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Credenziali non valide.')
    }
  }

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleAboutUpload = async (e: React.ChangeEvent<HTMLInputElement>, keyName: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingAbout(keyName)
    const fileExt = file.name.split('.').pop()
    const fileName = `about-${keyName}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file)
    if (uploadError) {
      alert('Errore caricamento: ' + uploadError.message)
      setUploadingAbout(null)
      return
    }

    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
    setSettings((prev) => ({ ...prev, [keyName]: publicUrlData.publicUrl }))
    setUploadingAbout(null)
  }

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingGallery(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileExt = file.name.split('.').pop()
      const fileName = `product-${Date.now()}-${i}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file)
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
        await supabase.from('products_gallery').insert({
          image_url: publicUrlData.publicUrl,
          title: file.name.substring(0, 20)
        })
      }
    }

    const { data: updatedGallery } = await supabase
      .from('products_gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (updatedGallery) setGalleryItems(updatedGallery)
    setUploadingGallery(false)
  }

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa foto dalla vetrina prodotti?')) return

    const { error } = await supabase.from('products_gallery').delete().eq('id', id)
    if (error) {
      alert('Errore durante l\'eliminazione: ' + error.message)
    } else {
      setGalleryItems(galleryItems.filter(item => item.id !== id))
    }
  }

  const handleSaveDetails = async () => {
    setSavingDetails(true)
    const { error } = await supabase.from('site_config').upsert({
      id: 'main',
      company_name: settings.companyName,
      address: settings.address,
      tax_id: settings.taxId,
      fiscal_code: settings.fiscalCode,
      email: settings.email,
      phone: settings.phone,
      about_image: settings.aboutImage,
      about_image2: settings.aboutImage2,
      about_image3: settings.aboutImage3,
    })
    setSavingDetails(false)
    if (error) alert('Errore salvataggio: ' + error.message)
    else alert('Dati societari salvati con successo!')
  }

  const handleSaveImages = async () => {
    setSavingImages(true)
    const { error } = await supabase.from('site_config').upsert({
      id: 'main',
      company_name: settings.companyName,
      address: settings.address,
      tax_id: settings.taxId,
      fiscal_code: settings.fiscalCode,
      email: settings.email,
      phone: settings.phone,
      about_image: settings.aboutImage,
      about_image2: settings.aboutImage2,
      about_image3: settings.aboutImage3,
    })
    setSavingImages(false)
    if (error) alert('Errore salvataggio: ' + error.message)
    else alert('Immagini della sezione Chi Siamo salvate con successo!')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 font-sans box-border w-full overflow-x-hidden">
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl relative">
          <div className="absolute top-4 right-4">
            <Link href="/" className="text-xs text-cyan-400 hover:underline">← Torna</Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Pannello Admin</h1>
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm" />
            </div>
            <button type="submit" className="w-full py-3 bg-cyan-600 text-white font-semibold rounded-lg text-sm">Accedi</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 md:p-12 font-sans w-full overflow-x-hidden box-border">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 w-full">
        
        {/* Header Admin */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-4 w-full">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Pannello Admin</h1>
            <p className="text-xs text-slate-400 mt-1">Gestione dati, Chi Siamo e Vetrina Prodotti</p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Link href="/" className="flex-1 sm:flex-initial text-center px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 text-xs sm:text-sm font-semibold rounded-lg border border-cyan-500/30 transition">
              🏠 Sito
            </Link>
            <button onClick={() => setIsAuthenticated(false)} className="flex-1 sm:flex-initial px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold rounded-lg border border-slate-800 transition">
              Esci
            </button>
          </div>
        </div>

        {/* Blocco 1: Dati Societari */}
        <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl space-y-4 sm:space-y-6 w-full box-border">
          <h2 className="text-lg sm:text-xl font-bold text-cyan-400">Dati Societari</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">Nome Azienda</label>
              <input type="text" name="companyName" value={settings.companyName} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-xs sm:text-sm" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">Indirizzo</label>
              <input type="text" name="address" value={settings.address} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-xs sm:text-sm" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">P.IVA</label>
              <input type="text" name="taxId" value={settings.taxId} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-xs sm:text-sm" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">Codice Fiscale</label>
              <input type="text" name="fiscalCode" value={settings.fiscalCode} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-xs sm:text-sm" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">Email</label>
              <input type="email" name="email" value={settings.email} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-xs sm:text-sm" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1">Telefono</label>
              <input type="text" name="phone" value={settings.phone} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-xs sm:text-sm" />
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleSaveDetails} 
            disabled={savingDetails} 
            className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition shadow-md text-xs sm:text-sm cursor-pointer disabled:opacity-50"
          >
            {savingDetails ? 'Salvataggio Dati...' : '💾 Salva dati'}
          </button>
        </div>

        {/* Blocco 2: Immagini Chi Siamo */}
        <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl space-y-4 sm:space-y-6 w-full box-border">
          <h2 className="text-lg sm:text-xl font-bold text-cyan-400">Immagini "Chi Siamo" (3 Foto)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
            {['aboutImage', 'aboutImage2', 'aboutImage3'].map((key, idx) => (
              <div key={key} className="w-full">
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">Foto {idx + 1}</label>
                <input type="file" accept="image/*" onChange={(e) => handleAboutUpload(e, key)} className="block w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 cursor-pointer" />
                {uploadingAbout === key && <p className="text-xs text-cyan-400 mt-1">Caricamento...</p>}
                {(settings as any)[key] && (
                  <div className="mt-3 h-40 w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center p-2">
                    <img src={(settings as any)[key]} alt={`About ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button 
            type="button" 
            onClick={handleSaveImages} 
            disabled={savingImages} 
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-md text-xs sm:text-sm cursor-pointer disabled:opacity-50"
          >
            {savingImages ? 'Salvataggio Immagini...' : '🖼️ Salva immagini'}
          </button>
        </div>

        {/* Blocco 3: Vetrina Prodotti Dinamica */}
        <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl space-y-4 sm:space-y-6 w-full box-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-cyan-400">Vetrina Prodotti ({galleryItems.length} foto)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Gestione galleria dinamica.</p>
            </div>
            <div className="w-full sm:w-auto">
              <label className="w-full sm:w-auto text-center px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-md inline-block">
                <span>➕ Aggiungi Foto</span>
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
              </label>
            </div>
          </div>

          {uploadingGallery && <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm rounded-lg animate-pulse">Caricamento in corso...</div>}

          {galleryItems.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs sm:text-sm border border-dashed border-slate-800 rounded-xl">
              Nessuna foto presente nella vetrina.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                  <div className="h-36 sm:h-40 w-full flex items-center justify-center overflow-hidden rounded-lg bg-slate-900/50 p-2">
                    <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-400 truncate flex-1">{item.title}</span>
                    <button 
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="px-2.5 py-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold rounded-lg border border-red-500/30 transition cursor-pointer"
                    >
                      🗑️ Elimina
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
