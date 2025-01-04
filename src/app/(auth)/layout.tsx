import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <section className='flex min-h-screen w-screen'>
        <div className=' bg-white text-black lg:w-1/2 h-auto p-5'>
         <h1>Google Drive Clone</h1>
        </div>
        <main className='p-5 flex items-center justify-center w-full'>
            {children}
        </main>
      </section>
    </div>
  )
}

export default layout
