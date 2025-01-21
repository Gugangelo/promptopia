import '@styles/global.css' // Importa o CSS para a aplicação inteira

export const metadata = {
  title: "Promptopia",
  description: 'Discover & Share AI Prompts'
}

const Layout = ({ children }) => {
  return (
    <html lang='pt-br'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default Layout