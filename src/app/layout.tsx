import './globals.css'
import type { Metadata } from 'next'
import { Karla, Open_Sans } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'

import { BsDropbox } from 'react-icons/bs'

const karla = Karla({ subsets: ['latin'] })
const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wrapt Uploader',
  description: 'App to upload files',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className='min-h-[100vh] bg-[#C9D7E2] p-24 flex flex-col' >
          <ToasterProvider />
          <div
            className="bg-neutral-100 rounded-lg px-10 pb-5 flex-grow flex flex-col"
          >
            <header className="flex justify-center w-full flex-row px-4 py-5">
              <div className="flex items-center gap-2">
                <BsDropbox color="#0061FE" size={35} />
                <span
                  className="text-2xl font-extrabold font-karla"
                >
                  WraptUploader
                </span>
              </div>
            </header>
            <div className="flex-grow">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

