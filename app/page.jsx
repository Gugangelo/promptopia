import Feed from "@components/feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Descubra & Compartilhe
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Prompts para IA</span>
      </h1>

      <p className="desc text-center">
        Promptopia é uma ferramenta de código aberto para criação e compartilhamento de prompts para modelos de IA
      </p>

      <Feed />
    </section>
  )
}

export default Home