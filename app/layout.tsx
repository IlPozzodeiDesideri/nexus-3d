// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'Nexus-3D',
  description: 'Stampe 3D di Alta Qualità & Prototipazione',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="bg-slate-950 text-slate-100 antialiased w-full min-h-full overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
