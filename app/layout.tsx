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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased w-full min-h-screen overflow-x-hidden m-0 p-0 box-border">
        {children}
      </body>
    </html>
  )
}
