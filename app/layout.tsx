// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'Nexus-3D',
  description: 'Stampe 3D di Alta Qualità & Prototipazione',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="bg-slate-950 text-slate-100 antialiased w-full min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
