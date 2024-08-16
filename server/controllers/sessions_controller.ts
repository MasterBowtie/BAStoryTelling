import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// /users/...
export const buildSessionsController = (db: PrismaClient) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const user_q = await db.users.findMany({
      where: {
        OR: [
          { email: req.body.email },
          { userName: req.body.email}
        ],
      }
    });
    if (user_q.length === 1) {
      const user = user_q[0]
      var hash = await bcrypt.hash(req.body.password, user.passwordSalt)
      if (bcrypt.compareSync(hash, user.userPassword)) {
        const token = jwt.sign({
          userId: user.id, },
          process.env.ENCRYPTION_KEY as string);

        res.json({ token });
      } else {
        res.status(404).json({ error: "Invalid email or password"})
      }
    }
    else {
      res.status(404).json({ error: "Duplicate email"});
    }
  });

  return router;
}

