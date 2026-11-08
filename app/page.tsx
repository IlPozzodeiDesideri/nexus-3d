// app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-pink-500 selection:text-white">
      {/* Navbar */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            NEXUS-3D
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <a href="#home" className="hover:text-pink-400 transition">Home</a>
            <a href="#about" className="hover:text-pink-400 transition">Chi Siamo</a>
            <a href="#products" className="hover:text-pink-400 transition">Servizi & Prodotti</a>
            <a href="#contact" className="hover:text-pink-400 transition">Contatti</a>
          </nav>
          <a 
            href="#contact" 
            className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold rounded-lg transition shadow-lg shadow-pink-600/20"
          >
            Richiedi Info
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-28 px-6 text-center bg-gradient-to-b from-purple-900/20 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto">
          <span className="px-3 py-1 text-xs font-semibold bg-pink-500/10 text-pink-400 rounded-full border border-pink-500/20">
            Stampe 3D di Alta Qualità • Design & Artigianato
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Porta le tue idee <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              nella realtà tridimensionale
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Realizziamo prototipi, action figure, statue dettagliate e oggetti di design unici stampati in 3D con cura artigianale e rifiniti a mano.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="#products" className="px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-xl transition shadow-lg shadow-pink-600/25">
              Esplora i Servizi
            </a>
            <a href="#contact" className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white font-semibold rounded-xl border border-gray-800 transition">
              Contattaci
            </a>
          </div>
        </div>
      </section>

      {/* Sezione Chi Siamo */}
      <section id="about" className="py-24 px-6 border-t border-gray-900 bg-gray-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest">Chi Siamo</span>
            <h2 className="mt-2 text-3xl font-bold">Innovazione e passione per il dettaglio</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Nexus-3D nasce dalla passione per la tecnologia di stampa tridimensionale e la modellazione avanzata. 
              Aiutiamo creativi, aziende e appassionati a trasformare progetti digitali in oggetti reali, curando ogni fase della produzione con standard qualitativi elevatissimi.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-bold text-pink-400">+5 Anni</h3>
                <p className="text-sm text-gray-400 mt-1">Nel settore della stampa 3D</p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-bold text-purple-400">100%</h3>
                <p className="text-sm text-gray-400 mt-1">Finitura artigianale</p>
              </div>
            </div>
          </div>
          <div className="h-80 bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl border border-gray-800 flex items-center justify-center text-gray-500">
            [ Spazio Immagine / Showroom ]
          </div>
        </div>
      </section>

      {/* Sezione Prodotti / Servizi */}
      <section id="products" className="py-24 px-6 border-t border-gray-900 bg-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest">Cosa Facciamo</span>
            <h2 className="mt-2 text-3xl font-bold">I Nostri Servizi e Categorie</h2>
            <p className="mt-2 text-gray-400">Soluzioni su misura per ogni tipo di esigenza creativa e professionale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-pink-500/50 transition group">
              <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400 font-bold mb-6 group-hover:scale-110 transition">
                01
              </div>
              <h3 className="text-xl font-bold mb-3">Stampa 3D su Misura</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Invianci il tuo file STL o le tue specifiche: realizzeremo il tuo progetto con materiali di prima scelta (PLA, ABS, Resin).
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-pink-500/50 transition group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 font-bold mb-6 group-hover:scale-110 transition">
                02
              </div>
              <h3 className="text-xl font-bold mb-3">Action Figure & Statue</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Collezionabili di alta qualità ispirati al mondo degli anime, dei manga e dei videogiochi, rifiniti e dipinti a mano.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-pink-500/50 transition group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 font-bold mb-6 group-hover:scale-110 transition">
                03
              </div>
              <h3 className="text-xl font-bold mb-3">Prototipazione Rapida</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Supporto completo per startup e professionisti che necessitano di prototipi funzionali in tempi brevi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Contatti */}
      <section id="contact" className="py-24 px-6 border-t border-gray-900 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest">Contattaci</span>
          <h2 className="mt-2 text-3xl font-bold">Hai un progetto in mente?</h2>
          <p className="mt-2 text-gray-400">Raccontaci la tua idea o richiedi un preventivo gratuito senza impegno.</p>

          <div className="mt-12 bg-gray-900 p-8 rounded-2xl border border-gray-800 text-left max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Il tuo Nome</label>
                <input 
                  type="text" 
                  placeholder="Mario Rossi" 
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Indirizzo Email</label>
                <input 
                  type="email" 
                  placeholder="mario@example.com" 
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Messaggio / Dettagli Progetto</label>
                <textarea 
                  rows={4} 
                  placeholder="Descrivi cosa vorresti realizzare..." 
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-lg transition shadow-lg shadow-pink-600/20"
              >
                Invia Messaggio
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-8 text-center text-gray-500 text-sm bg-gray-950">
        <p>&copy; 2026 Nexus-3D. Tutti i diritti riservati.</p>
      </footer>
    </div>
  )
}
