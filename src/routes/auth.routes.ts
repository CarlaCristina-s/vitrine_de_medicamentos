import { Router } from "express";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

const authRouter = Router();

const userRepository = AppDataSource.getRepository(User);

authRouter.post("/", async (req, res) => {
  try {

    const userBody = req.body;

    if(!userBody || !userBody.email || !userBody.senha) {
      res.status(400).json("Campos obrigatórios não preenchidos.");
      return;
    }

    const user = await userRepository.findOne({ 
      where: { 
        email: userBody.email 
      }
    });

    if(!user) {
      res.status(401).json("Usuário e/ou senha incorreta..");
      return;
    }

    const valido = await bcrypt.compare(userBody.senha, user.senha);

    if(!valido) {
      const payload = {
        email: user.email,
        id: user.id
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"})

      res.status(200).json({token: token});
      return;
    } else {
      res.status(401).json("Usuário e/ou senha incorreta.");	
      return
    }


  } catch (error) {
    res.status(500).json("Não foi possível executar a solicitação.");
  }
});

export default authRouter; 