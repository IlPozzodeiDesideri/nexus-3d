// app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)

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
    p1Image: '',
    p2Image: '',
    p3Image: '',
  })

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase
        .from('site_config')
        .select('*')
        .eq('id', 'main')
        .single()

      if (data) {
        setSettings({
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
    loadSettings()
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, keyName: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(keyName)
    const fileExt = file.name.split('.').pop()
    const fileName = `${keyName}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase
      .storage
      .from('images')
      .upload(fileName, file)

    if (uploadError) {
      alert('Errore caricamento immagine: ' + uploadError.message)
      setUploading(null)
      return
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('images')
      .getPublicUrl(fileName)

    setSettings((prev) => ({ ...prev, [keyName]: publicUrlData.publicUrl }))
    setUploading(null)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('site_config')
      .upsert({
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
        p1_image: settings.p1Image,
        p2_image: settings.p2Image,
        p3_image: settings.p3Image,
      })

    setSaving(false)

    if (error) {
      alert('Errore salvataggio: ' + error.message)
    } else {
      alert('Tutti i dati e le 6 immagini sono stati pubblicati sul sito!')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 font-sans">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Admin Nexus-3D</h1>
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm" />
            </div>
            <button type="submit" className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg text-sm">Accedi</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-800">
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Pannello Admin e Gestione Immagini</h1>
          <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-gray-900 text-gray-300 text-sm font-semibold rounded-lg border border-gray-800">Esci</button>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Dati Societari */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-pink-400">Dati Societari</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nome Azienda</label>
                <input type="text" name="companyName" value={settings.companyName} onChange={handleSettingChange} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Indirizzo</label>
                <input type="text" name="address" value={settings.address} onChange={handleSettingChange} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">P.IVA</label>
                <input type="text" name="taxId" value={settings.taxId} onChange={handleSettingChange} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Codice Fiscale</label>
                <input type="text" name="fiscalCode" value={settings.fiscalCode} onChange={handleSettingChange} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input type="email" name="email" value={settings.email} onChange={handleSettingChange} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Telefono</label>
                <input type="text" name="phone" value={settings.phone} onChange={handleSettingChange} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm" />
              </div>
            </div>
          </div>

          {/* Gestione Immagini Chi Siamo (3 Foto) */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-pink-400">Immagini Sezione "Chi Siamo" (3 Foto)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Foto 1 Chi Siamo</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'aboutImage')} className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-500 cursor-pointer" />
                {uploading === 'aboutImage' && <p className="text-xs text-pink-400 mt-1">Caricamento...</p>}
                {settings.aboutImage && <img src={settings.aboutImage} alt="About 1" className="mt-3 h-28 w-full rounded-lg object-cover border border-gray-800" />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Foto 2 Chi Siamo</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'aboutImage2')} className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-500 cursor-pointer" />
                {uploading === 'aboutImage2' && <p className="text-xs text-pink-400 mt-1">Caricamento...</p>}
                {settings.aboutImage2 && <img src={settings.aboutImage2} alt="About 2" className="mt-3 h-28 w-full rounded-lg object-cover border border-gray-800" />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Foto 3 Chi Siamo</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'aboutImage3')} className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-500 cursor-pointer" />
                {uploading === 'aboutImage3' && <p className="text-xs text-pink-400 mt-1">Caricamento...</p>}
                {settings.aboutImage3 && <img src={settings.aboutImage3} alt="About 3" className="mt-3 h-28 w-full rounded-lg object-cover border border-gray-800" />}
              </div>
            </div>
          </div>

          {/* Gestione Immagini Prodotti */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-pink-400">Immagini Vetrina Prodotti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prodotto 1 (Action Figure)</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'p1Image')} className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-500 cursor-pointer" />
                {uploading === 'p1Image' && <p className="text-xs text-pink-400 mt-1">Caricamento...</p>}
                {settings.p1Image && <img src={settings.p1Image} alt="P1" className="mt-3 h-28 w-full rounded-lg object-cover border border-gray-800" />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prodotto 2 (Statua)</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'p2Image')} className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-500 cursor-pointer" />
                {uploading === 'p2Image' && <p className="text-xs text-pink-400 mt-1">Caricamento...</p>}
                {settings.p2Image && <img src={settings.p2Image} alt="P2" className="mt-3 h-28 w-full rounded-lg object-cover border border-gray-800" />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prodotto 3 (Prototipo)</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'p3Image')} className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-500 cursor-pointer" />
                {uploading === 'p3Image' && <p className="text-xs text-pink-400 mt-1">Caricamento...</p>}
                {settings.p3Image && <img src={settings.p3Image} alt="P3" className="mt-3 h-28 w-full rounded-lg object-cover border border-gray-800" />}
              </div>
            </div>
          </div>

          <button type="submit" disabled={saving} className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition shadow-lg shadow-pink-600/25 text-lg disabled:opacity-50">
            {saving ? 'Salvataggio in corso...' : 'Pubblica Modifiche e Immagini'}
          </button>
        </form>
      </div>
    </div>
  )
}
