import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json()

  try {
    await connectToDB()
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 }) // 201 é status de "Criado"
  } catch (error) {
    return new Response("Falha ao criar novo prompt.", { status: 500 }) // 500 é erro no servidor
  }
}