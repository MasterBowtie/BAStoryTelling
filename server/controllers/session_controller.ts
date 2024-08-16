import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// /users/...
export const buildSessionController = (db: PrismaClient) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const user_q = await db.user.findMany({
      where: {
        OR: [
          { email: req.body.email },
          { userName: req.body.email}
        ],
      }
    });
    if (user_q.length === 1) {
      const user = user_q[0]
      var hash = bcrypt.hashSync(req.body.password, user.passwordSalt);
      if (hash === user.userPassword) {
        const token = jwt.sign({
          userId: user.id, },
          process.env.ENCRYPTION_KEY as string);

        res.json({ token });
      } else {
        console.log("Invalid email or password")
        res.status(404).json({ error: "Invalid email or password"})
      }
    }
    else {
      console.log("Duplicate email")
      res.status(404).json({ error: "Duplicate email"});
    }
  });

  return router;
}

