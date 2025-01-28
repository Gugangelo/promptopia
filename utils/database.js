import mongoose from 'mongoose';

let isConnected = false

export const connectToDB = async () => {
  if (isConnected) {
    console.log('MongoDB já está conectado')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      // useNewUrlParser: true, // Na nova versão esses 2 já são elementos padrão
      // useUnifiedTopology: true
    })

    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}