
import bcrypt from "bcrypt";

export default async function hashPassword(password){
    const hashPassword= await bcrypt.hash(password,10);
    return hashPassword;       

}