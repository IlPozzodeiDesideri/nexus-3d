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
  const [saving, setSaving] = useState(false)
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

  // Lista dinamica delle foto vetrina prodotti (da 0 a 50+)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])

  useEffect(() => {
    async function loadData() {
      // 1. Carica configurazione generale
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

      // 2. Carica galleria prodotti
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

  // Upload immagini Chi Siamo
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

  // Upload nuove foto per la Vetrina Prodotti (Supporta aggiunta multipla o singola)
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
        
        // Salva direttamente nel database
        await supabase.from('products_gallery').insert({
          image_url: publicUrlData.publicUrl,
          title: file.name.substring(0, 20)
        })
      }
    }

    // Ricarica la galleria aggiornata
    const { data: updatedGallery } = await supabase
      .from('products_gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (updatedGallery) setGalleryItems(updatedGallery)
    setUploadingGallery(false)
  }

  // Funzione per eliminare una foto della vetrina
  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa foto dalla vetrina prodotti?')) return

    const { error } = await supabase.from('products_gallery').delete().eq('id', id)
    if (error) {
      alert('Errore durante l\'eliminazione: ' + error.message)
    } else {
      setGalleryItems(galleryItems.filter(item => item.id !== id))
    }
  }

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

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

    setSaving(false)
    if (error) {
      alert('Errore salvataggio: ' + error.message)
    } else {
      alert('Dati societari e foto Chi Siamo aggiornati con successo!')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 font-sans">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl relative">
          <div className="absolute top-4 right-4">
            <Link href="/" className="text-xs text-cyan-400 hover:underline">← Torna al sito</Link>
          </div>
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Admin Nexus-3D</h1>
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
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Pannello Admin Nexus-3D</h1>
            <p className="text-xs text-slate-400 mt-1">Gestione dati societari, Chi Siamo e Vetrina Prodotti illimitata</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/" className="px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 text-sm font-semibold rounded-lg border border-cyan-500/30 transition flex items-center gap-2">
              🏠 Visualizza Sito / Home
            </Link>
            <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-semibold rounded-lg border border-slate-800 transition">
              Esci
            </button>
          </div>
        </div>

        {/* Dati Societari & Chi Siamo */}
        <form onSubmit={handleSaveGeneral} className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-cyan-400">Dati Societari</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Nome Azienda</label>
                <input type="text" name="companyName" value={settings.companyName} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Indirizzo</label>
                <input type="text" name="address" value={settings.address} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">P.IVA</label>
                <input type="text" name="taxId" value={settings.taxId} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Codice Fiscale</label>
                <input type="text" name="fiscalCode" value={settings.fiscalCode} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input type="email" name="email" value={settings.email} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Telefono</label>
                <input type="text" name="phone" value={settings.phone} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-cyan-400">Immagini Sezione "Chi Siamo" (3 Foto)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['aboutImage', 'aboutImage2', 'aboutImage3'].map((key, idx) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Foto {idx + 1} Chi Siamo</label>
                  <input type="file" accept="image/*" onChange={(e) => handleAboutUpload(e, key)} className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 cursor-pointer" />
                  {uploadingAbout === key && <p className="text-xs text-cyan-400 mt-1">Caricamento...</p>}
                  {(settings as any)[key] && (
                    <div className="mt-3 h-40 w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center p-2">
                      <img src={(settings as any)[key]} alt={`About ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={saving} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition shadow-lg text-lg">
            {saving ? 'Salvataggio...' : 'Salva Dati Societari e Chi Siamo'}
          </button>
        </form>

        {/* Gestione Vetrina Prodotti Illimitata (Da 0 a 50+) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-cyan-400">Vetrina Prodotti (Galleria Dinamica: {galleryItems.length} foto)</h2>
              <p className="text-xs text-slate-400 mt-1">Puoi caricare quante foto desideri. Verranno mostrate tutte in automatico sulla Home.</p>
            </div>
            <div>
              <label className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-xl cursor-pointer shadow-md inline-flex items-center gap-2">
                <span>➕ Aggiungi Nuove Foto</span>
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
              </label>
            </div>
          </div>

          {uploadingGallery && <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm rounded-lg animate-pulse">Caricamento nuove foto in corso...</div>}

          {galleryItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-xl">
              Nessuna foto presente nella vetrina prodotti. Clicca su "Aggiungi Nuove Foto" per iniziare.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between group">
                  <div className="h-40 w-full flex items-center justify-center overflow-hidden rounded-lg bg-slate-900/50 p-2">
                    <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400 truncate max-w-[100px]">{item.title}</span>
                    <button 
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="px-2.5 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold rounded-lg border border-red-500/30 transition"
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
