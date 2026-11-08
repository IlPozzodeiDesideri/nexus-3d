// app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type GalleryItem = {
  id: string
  image_url: string
  title: string
  price: number
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
  const [updatingItem, setUpdatingItem] = useState<string | null>(null)

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
          title: file.name.replace(/\.[^/.]+$/, ""),
          price: 0.00
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

  // Modifica locale di titolo e prezzo nello stato
  const handleItemFieldChange = (id: string, field: 'title' | 'price', value: any) => {
    setGalleryItems(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    )
  }

  // Salvataggio titolo e prezzo su Supabase
  const handleSaveItem = async (id: string, title: string, price: number) => {
    setUpdatingItem(id)
    const { error } = await supabase
      .from('products_gallery')
      .update({ 
        title: title,
        price: parseFloat(price.toString()) || 0 
      })
      .eq('id', id)

    setUpdatingItem(null)
    if (error) {
      alert('Errore durante il salvataggio: ' + error.message)
    } else {
      alert('Dati del prodotto aggiornati con successo!')
    }
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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 w-full">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-sm shadow-xl">
          <div className="flex justify-end mb-2">
            <Link href="/" className="text-xs text-cyan-400 hover:underline">← Torna al sito</Link>
          </div>
          <h1 className="text-xl font-bold mb-4 text-white">Pannello Admin</h1>
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg text-sm transition">Accedi</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 font-sans w-full">
      <div className="max-w-xl mx-auto space-y-6 w-full pb-12">
        
        {/* Header Admin */}
        <div className="flex flex-col gap-3 pb-4 border-b border-slate-800 w-full">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-lg font-bold text-white">Pannello Admin</h1>
            <button onClick={() => setIsAuthenticated(false)} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800">
              Esci
            </button>
          </div>
          <Link href="/" className="text-center w-full py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 text-xs font-semibold rounded-lg border border-cyan-500/30">
            🏠 Visualizza Sito / Home
          </Link>
        </div>

        {/* Blocco 1: Dati Societari */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4 w-full">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Dati Societari</h2>
          <div className="space-y-3 w-full">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nome Azienda</label>
              <input type="text" name="companyName" value={settings.companyName} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Indirizzo</label>
              <input type="text" name="address" value={settings.address} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">P.IVA</label>
              <input type="text" name="taxId" value={settings.taxId} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Codice Fiscale</label>
              <input type="text" name="fiscalCode" value={settings.fiscalCode} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
              <input type="email" name="email" value={settings.email} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Telefono</label>
              <input type="text" name="phone" value={settings.phone} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleSaveDetails} 
            disabled={savingDetails} 
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
          >
            {savingDetails ? 'Salvataggio...' : '💾 Salva dati'}
          </button>
        </div>

        {/* Blocco 2: Immagini Chi Siamo */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4 w-full">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Immagini "Chi Siamo" (3 Foto)</h2>
          <div className="space-y-4 w-full">
            {['aboutImage', 'aboutImage2', 'aboutImage3'].map((key, idx) => (
              <div key={key} className="w-full bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <label className="block text-xs font-medium text-slate-300 mb-2">Foto {idx + 1}</label>
                <input type="file" accept="image/*" onChange={(e) => handleAboutUpload(e, key)} className="block w-full text-[11px] text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-cyan-600 file:text-white cursor-pointer" />
                {uploadingAbout === key && <p className="text-[11px] text-cyan-400 mt-1">Caricamento...</p>}
                {(settings as any)[key] && (
                  <div className="mt-3 h-32 w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center p-2">
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
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
          >
            {savingImages ? 'Salvataggio...' : '🖼️ Salva immagini'}
          </button>
        </div>

        {/* Blocco 3: Vetrina Prodotti con Titolo e Prezzo (€) */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4 w-full">
          <div className="flex flex-col gap-3 w-full">
            <div>
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Vetrina Prodotti ({galleryItems.length})</h2>
              <p className="text-[11px] text-slate-400">Gestisci titolo e prezzo in Euro</p>
            </div>
            <label className="w-full text-center py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-lg cursor-pointer shadow-md block">
              <span>➕ Aggiungi Nuove Foto</span>
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
            </label>
          </div>

          {uploadingGallery && <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded-lg animate-pulse">Caricamento in corso...</div>}

          {galleryItems.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs border border-dashed border-slate-800 rounded-lg">
              Nessuna foto presente.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 w-full">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col gap-3">
                  <div className="h-40 w-full flex items-center justify-center overflow-hidden rounded bg-slate-900 p-2">
                    <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  
                  {/* Nome Foto e Prezzo */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">Nome / Titolo Model 3D:</label>
                      <input 
                        type="text" 
                        value={item.title} 
                        onChange={(e) => handleItemFieldChange(item.id, 'title', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-medium mb-1">Prezzo (€):</label>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-mono text-xs">€</span>
                        <input 
                          type="number" 
                          step="0.01"
                          value={item.price || 0} 
                          onChange={(e) => handleItemFieldChange(item.id, 'price', e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                        />
                        <button 
                          onClick={() => handleSaveItem(item.id, item.title, item.price)}
                          disabled={updatingItem === item.id}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition cursor-pointer disabled:opacity-50"
                        >
                          {updatingItem === item.id ? '...' : '💾 OK'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button 
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold rounded-lg border border-red-500/30 transition cursor-pointer w-full text-center"
                    >
                      🗑️ Elimina Foto
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
