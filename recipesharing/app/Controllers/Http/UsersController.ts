import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import UserValidator from "App/Validators/UserValidator";
import Hash from "@ioc:Adonis/Core/Hash";

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    try {
      const user = await request.validate(UserValidator);
      user.password = await Hash.make(user.password);
      const newUser = await Database.table("users").insert(user);
      response.status(201).json(newUser);
    } catch (error) {
      response.badRequest(error.code);
    }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = request.only(["email", "password"]);
      const user = await Database.from("users").where("email", email).first();

      if (!user) {
        return response.badRequest({ message: "User not found" });
      }

      const isPasswordValid = await Hash.verify(user.password, password);

      if (!isPasswordValid) {
        return response.badRequest({ message: "Invalid credentials" });
      }
      const token = await auth.use("api").generate(user, {
        expiresIn: "30 mins",
      });
      response.ok({ token: token, name: user.name });
    } catch (error) {
      response.badRequest(error.message);
    }
  }
}
