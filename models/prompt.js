import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  prompt: {
    type: String,
    required: [true, 'Prompt é nescessário.'],
  },
  tag: {
    type: String,
    required: [true, 'Uma tag é necessária.']
  }
})

// Essa route é criada toda vez que a conexão é estabelecida
const Prompt = models.Prompt || model("Prompt", PromptSchema) // Olha no models.User pra ver se já tem, se não tiver, então cria um novo model

export default Prompt