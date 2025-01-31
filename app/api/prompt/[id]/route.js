import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

// Ler 1 prompt específico
export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const parameters = await params

    const prompt = await Prompt.findById(parameters.id).populate('creator')

    if(!prompt) return new Response('Prompt não encontrado', { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 }) // 200 é status de OK
  } catch (error) {
    return new Response("Falha ao pesquisar prompts.", { status: 500 }) // 500 é erro no servidor
  }
}

// Update em 1 prompt
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()
  try {
    await connectToDB()
    const parameters = await params

    const existingPrompt = await Prompt.findById(parameters.id)
    console.log(1)

    if(!existingPrompt) return new Response('Prompt não encontrado', { status: 404 })
    console.log(2)
    console.log(existingPrompt)
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    console.log(3)
    await existingPrompt.save()
    console.log(existingPrompt)

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response("Falha ao atualizar.", { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()
    const parameters = await params

    await Prompt.findByIdAndDelete(parameters.id)

    return new Response('Prompt deletado.', { status: 200 })
  } catch (error) {
    return new Response('Falha ao deletar prompt.', { status: 500 })
  }
}