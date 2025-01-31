import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const parameters = await params // No Next15 é necessário que o params seja aguardado, por ser uma promise
    
    const prompts = await Prompt.find({creator: parameters.id}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 }) // 200 é status de OK
  } catch (error) {
    console.error("Erro ao buscar prompts:", error)
    return new Response("Falha ao pesquisar posts.", { status: 500 }) // 500 é erro no servidor
  }
}