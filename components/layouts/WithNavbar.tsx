import Navbar from '@/components/Navbar'
import type { ReactElement } from 'react'


function WithNavbar({ children }: { children: ReactElement }) {
  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden bg-white">
        <main className="pt-5">{children}</main>
      </div>
    </>
  )
}


export default WithNavbar
