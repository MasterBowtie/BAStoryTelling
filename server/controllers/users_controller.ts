import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authorization";
import { UsersRepository } from "../repositories/users_repository";
import { publicMiddleware } from "../middleware/public";
import { error } from "console";

// /users/...
export const buildUsersController = (usersRepository: UsersRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const user = await usersRepository.createUser(req.body);

    const token = jwt.sign({
      userId: user.id,
    }, process.env.ENCRYPTION_KEY as string);

    res.json({ user, token });
  });

  router.get("/me", authMiddleware, async (req, res) => {

  })


  // This is just to test getting a user from the DB
  router.get("/:id", publicMiddleware, async (req, res) => {
    const { id } = req.params;
    const user = await usersRepository.getUserById(Number(id));
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found"});
    }
  });

  router.post("/:id", async (req, res) => {
    console.log(req.body);
    // const user = await usersRepository.updateUser(req.body);
  })

  return router;
}