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

  const handleItemFieldChange = (id: string, field: 'title' | 'price', value: any) => {
    setGalleryItems(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    )
  }

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
      alert('Prodotto aggiornato con successo!')
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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-3 w-full box-border">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl w-full max-w-sm shadow-2xl">
          <div className="flex justify-end mb-2">
            <Link href="/" className="text-xs text-cyan-400 hover:underline">← Torna al sito</Link>
          </div>
          <h1 className="text-xl font-bold mb-3 text-white">Pannello Admin</h1>
          {error && <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg text-sm transition cursor-pointer">Accedi</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-3 sm:p-6 font-sans w-full max-w-full overflow-x-hidden box-border">
      <div className="max-w-4xl mx-auto space-y-5 w-full pb-16">
        
        {/* Header Admin */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-800 gap-3 w-full">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Pannello Admin</h1>
            <p className="text-[11px] text-slate-400">Gestione flessibile mobile & desktop</p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link href="/" className="flex-1 sm:flex-initial text-center px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 text-xs font-semibold rounded-lg border border-cyan-500/30">
              🏠 Sito
            </Link>
            <button onClick={() => setIsAuthenticated(false)} className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800">
              Esci
            </button>
          </div>
        </div>

        {/* Blocco 1: Dati Societari */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4 w-full box-border">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Dati Societari</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Nome Azienda</label>
              <input type="text" name="companyName" value={settings.companyName} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Indirizzo</label>
              <input type="text" name="address" value={settings.address} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">P.IVA</label>
              <input type="text" name="taxId" value={settings.taxId} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Codice Fiscale</label>
              <input type="text" name="fiscalCode" value={settings.fiscalCode} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Email</label>
              <input type="email" name="email" value={settings.email} onChange={handleSettingChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Telefono</label>
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
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4 w-full box-border">
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Immagini "Chi Siamo" (3 Foto)</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {['aboutImage', 'aboutImage2', 'aboutImage3'].map((key, idx) => (
              <div key={key} className="w-full bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Foto {idx + 1}</label>
                  <input type="file" accept="image/*" onChange={(e) => handleAboutUpload(e, key)} className="block w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-cyan-600 file:text-white cursor-pointer mb-2" />
                  {uploadingAbout === key && <p className="text-[10px] text-cyan-400">Caricamento...</p>}
                </div>
                {(settings as any)[key] && (
                  <div className="aspect-[4/3] w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center p-1">
                    <img src={(settings as any)[key]} alt={`About ${idx + 1}`} className="w-full h-full object-contain" />
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

        {/* Blocco 3: Vetrina Prodotti */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4 w-full box-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
            <div>
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Vetrina Prodotti ({galleryItems.length})</h2>
              <p className="text-[11px] text-slate-400">Gestisci modelli 3D e prezzi in Euro</p>
            </div>
            <label className="w-full sm:w-auto text-center px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md block">
              <span>➕ Aggiungi Nuove Foto</span>
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
            </label>
          </div>

          {uploadingGallery && <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded-lg animate-pulse">Caricamento in corso...</div>}

          {galleryItems.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              Nessuna foto presente nella vetrina.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-3 shadow-inner">
                  <div className="aspect-square w-full flex items-center justify-center overflow-hidden rounded-lg bg-slate-900 p-1.5 border border-slate-800">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="space-y-2.5 flex-grow">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-medium mb-0.5">Nome Modello:</label>
                      <input 
                        type="text" 
                        value={item.title} 
                        onChange={(e) => handleItemFieldChange(item.id, 'title', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 font-medium mb-0.5">Prezzo (€):</label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-mono text-xs">€</span>
                        <input 
                          type="number" 
                          step="0.01"
                          value={item.price || 0} 
                          onChange={(e) => handleItemFieldChange(item.id, 'price', e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
                        />
                        <button 
                          onClick={() => handleSaveItem(item.id, item.title, item.price)}
                          disabled={updatingItem === item.id}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded transition cursor-pointer disabled:opacity-50"
                        >
                          {updatingItem === item.id ? '...' : '💾 OK'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button 
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="w-full py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold rounded border border-red-500/30 transition cursor-pointer text-center"
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
