// app/page.tsx
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
}

async function getProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Errore nel recupero prodotti:', error.message)
      return []
    }

    return (data || []) as Product[]
  } catch (err) {
    console.error('Errore inatteso durante il fetch dei prodotti:', err)
    return []
  }
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header / Navbar */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            NEXUS-3D
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-pink-400 transition">Catalogo</Link>
            <Link href="/custom" className="hover:text-pink-400 transition">Richiedi 3D</Link>
            <Link href="/community" className="hover:text-pink-400 transition">Community</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <span className="px-3 py-1 text-xs font-semibold bg-pink-500/10 text-pink-400 rounded-full border border-pink-500/20">
            Stampe 3D di Alta Qualità • Anime & Manga
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            Porta i tuoi eroi preferiti <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              nella realtà tridimensionale
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Action figure, statue dettagliate e gadget unici stampati in 3D con cura artigianale e rifiniti a mano.
          </p>
        </div>
      </section>

      {/* Vetrina Prodotti */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-pink-500 pl-4">
          Ultimi Arrivi in Catalogo
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/40 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-lg">Il catalogo è ancora vuoto o in fase di caricamento.</p>
            <p className="text-sm text-gray-500 mt-2">Aggiungi i primi prodotti direttamente dalla dashboard di Supabase!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-pink-500/50 transition group flex flex-col"
              >
                <div className="relative h-64 bg-gray-800 overflow-hidden">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-600 text-sm">
                      Anteprima non disponibile
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-xs text-pink-400 font-semibold uppercase tracking-wider mb-1">
                    {product.category || 'Stampa 3D'}
                  </span>
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                    <span className="text-xl font-extrabold text-white">
                      € {product.price ? Number(product.price).toFixed(2) : '0.00'}
                    </span>
                    <button className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold rounded-lg transition shadow-lg shadow-pink-600/20">
                      Acquista
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Nexus-3D Store. Tutti i diritti riservati.</p>
      </footer>
    </div>
  )
}
