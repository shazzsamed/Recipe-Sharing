import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ReviewValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    rating: schema.number([rules.range(1, 5)]),
    comment: schema.string({}, [rules.minLength(1)]),
    user_id: schema.number(),
    recipe_id: schema.number(),
    user_name: schema.string(),
  });
  public messages: CustomMessages = {
    "rating.range": "Rating must be between 1 and 5.",
    "comment.minLength": "Comment is required.",
  };
}
