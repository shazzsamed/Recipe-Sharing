import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.required()]),
    email: schema.string([rules.email(), rules.required()]),
    password: schema.string([rules.required()]),
  });

  public messages: CustomMessages = {};
}
