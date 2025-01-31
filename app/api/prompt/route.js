import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 }) // 200 é status de OK
  } catch (error) {
    return new Response("Falha ao pesquisar.", { status: 500 }) // 500 é erro no servidor
  }
}