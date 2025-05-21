import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email já cadastrado.'],
    required: [true, 'Email é necessário.']
  },
  username: {
    type: String,
    required: [true, 'Nome de usuário é nescessário.'],
    match: [/^(?=.{6,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Nome de usuário inválido, o nome deve conter de 8 a 20 dígitos alfanuméricos e ser único.']
  },
  image: {
    type: String
  }
})

// Essa route é criada toda vez que a conexão é estabelecida
const User = models.User || model("User", UserSchema) // Olha no models.User pra ver se já tem, se não tiver, então cria um novo model

export default User