import bcrypt from 'bcrypt';

export const EncryptPassword = async (password:string, salt: number| string = 10) => {
  const encryptedPassword = await bcrypt.hash(password, salt)
  return encryptedPassword
} 
