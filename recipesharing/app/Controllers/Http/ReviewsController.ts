import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import ReviewValidator from "App/Validators/ReviewValidator";

export default class ReviewsController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    try {
      const validatedData = await request.validate(ReviewValidator);
      console.log("Validated: ", validatedData);
      const newReview = await Database.table("reviews").insert(validatedData);
      response.status(201).json(newReview);
    } catch (error) {
      if (error.messages) {
        console.log("Testing 422");
        response.status(422).json({
          message: error.messages,
        });
      } else {
        console.log(error);
        console.log(request.body());
        response.status(500).json({
          message: "An internal server error occurred.",
        });
      }
    }
  }

  public async getById({ params, response }: HttpContextContract) {
    try {
      const recipeId = params.id;
      const reviews = await Database.from("reviews").where(
        "recipe_id",
        recipeId
      );
      if (reviews.length === 0) {
        return response.status(404).json({
          message: "No reviews found for this recipe.",
        });
      }
      response.status(200).json(reviews);
    } catch (error) {
      response.status(500).json({
        message: "An internal server error occurred.",
      });
    }
  }

  public async averageRating({ params, response }: HttpContextContract) {
    try {
      const recipeId = params.id;
      const reviews = await Database.from("reviews")
        .where("recipe_id", recipeId)
        .avg("rating")
        .first();
      response.status(200).json(reviews);
    } catch (error) {
      response.status(500).json({
        message: "An internal server error occurred.",
      });
    }
  }

  public async store({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
