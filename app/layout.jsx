import '@styles/global.css' // Importa o CSS para a aplicação inteira

import Nav from '@components/nav'
import Provider from '@components/provider'

export const metadata = {
  title: "Promptopia",
  description: 'Descubra & Compartilhe AI Prompts'
}

const Layout = ({ children }) => {
  return (
    <html lang='pt-br'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default Layout