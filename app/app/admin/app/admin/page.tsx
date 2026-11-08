// app/admin/page.tsx
'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [settings, setSettings] = useState({
    companyName: 'Nexus-3D',
    address: 'Via Roma 123, Napoli (NA)',
    taxId: 'P.IVA 01234567890',
    fiscalCode: 'C.F. RSSMRA80A01F839X',
    email: 'info@nexus-3d.it',
    phone: '+39 081 1234567',
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'Alessandro') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Credenziali non valide. Username o password errati.')
    }
  }

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Modifiche salvate con successo!')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 font-sans">
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Admin Nexus-3D
          </h1>
          <p className="text-gray-400 text-sm mb-6">Inserisci le credenziali di accesso per continuare.</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome Utente</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-lg transition shadow-lg shadow-pink-600/20 text-sm"
            >
              Accedi al Pannello
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Dashboard Amministrazione
            </h1>
            <p className="text-sm text-gray-400 mt-1">Gestisci i dati societari e le informazioni del sito.</p>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 text-sm font-semibold rounded-lg border border-gray-800 transition"
          >
            Esci
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-pink-400">Informazioni e Dati Societari</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome Azienda</label>
                <input 
                  type="text" 
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleSettingChange}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-pink-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Indirizzo</label>
                <input 
                  type="text" 
                  name="address"
                  value={settings.address}
                  onChange={handleSettingChange}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-pink-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Partita IVA</label>
                <input 
                  type="text" 
                  name="taxId"
                  value={settings.taxId}
                  onChange={handleSettingChange}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-pink-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Codice Fiscale</label>
                <input 
                  type="text" 
                  name="fiscalCode"
                  value={settings.fiscalCode}
                  onChange={handleSettingChange}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-pink-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={settings.email}
                  onChange={handleSettingChange}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-pink-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telefono</label>
                <input 
                  type="text" 
                  name="phone"
                  value={settings.phone}
                  onChange={handleSettingChange}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-pink-500 text-sm"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition shadow-lg shadow-pink-600/25 text-lg"
          >
            Salva Modifiche
          </button>
        </form>
      </div>
    </div>
  )
}
