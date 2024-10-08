import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RecipesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const searchQuery = request.input("q");
      const recipes = await Database.from("recipes")
        .leftJoin("reviews", "recipes.id", "reviews.recipe_id")
        .select("recipes.*")
        .select(
          Database.raw("COALESCE(AVG(reviews.rating), 0) as average_rating")
        )
        .if(searchQuery, (query) => {
          query
            .where("title", "ILIKE", `%${searchQuery}%`)
            .orWhere("description", "ILIKE", `%${searchQuery}%`);
        })
        .groupBy("recipes.id")
        .orderBy("created_at", "desc");

      response.status(200).json(recipes);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const recipe = request.body();
      console.log("recipe", recipe);
      const newRecipe = await Database.table("recipes").insert(recipe);
      response.status(201).json(newRecipe);
    } catch (error) {
      console.log(error);
      response.status(404).json(error);
    }
  }

  public async getById({ request, response }: HttpContextContract) {
    try {
      const recipeId = request.param("id");

      const recipes = await Database.from("recipes")
        .where("id", recipeId)
        .firstOrFail();

      response.status(200).json(recipes);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async getByUserId({ request, response }: HttpContextContract) {
    try {
      const userId = request.param("uid");

      const recipes = await Database.from("recipes")
        .where("recipes.user_id", userId)
        .leftJoin("reviews", "recipes.id", "reviews.recipe_id")
        .select("recipes.*")
        .select(
          Database.raw("COALESCE(AVG(reviews.rating), 0) as average_rating")
        )
        .groupBy("recipes.id");

      response.status(200).json(recipes);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const {
        sortBy = "id",
        order = "asc",
        page = 1,
        perPage = 10,
      } = request.qs();

      const recipes = await Database.from("recipes")
        .leftJoin("reviews", "recipes.id", "reviews.recipe_id")
        .select("recipes.*")
        .select(
          Database.raw("COALESCE(AVG(reviews.rating), 0) as average_rating")
        )
        .groupBy("recipes.id")
        .orderBy(sortBy, order)
        .paginate(page, perPage);

      response.status(200).json(recipes);
      console.log(response.getBody());
    } catch (error) {
      response.badRequest(error.message);
    }
  }

  public async update({
    params,
    request,
    response,
    auth,
  }: HttpContextContract) {
    try {
      const user = auth.user;
      const recipe = await Database.from("recipes")
        .where("id", params.id)
        .first();

      if (!recipe) {
        return response.notFound({ message: "Recipe not found" });
      }

      if (recipe.user_id !== user?.id) {
        return response.unauthorized({
          message: "You are not allowed to update this recipe",
        });
      }

      const updatedData = request.only([
        "title",
        "description",
        "ingredients",
        "instructions",
        "cooking_time",
      ]);
      await Database.from("recipes").where("id", params.id).update(updatedData);

      return response.ok({ message: "Recipe updated successfully" });
    } catch (error) {
      return response.badRequest({ message: error.message });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const recipeId = params.id;
      const result = await Database.from("recipes")
        .where("id", recipeId)
        .delete();
      if (result === 0) {
        return response
          .status(404)
          .json({ error: "Recipe not found or failed to delete" });
      }
      response.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      response
        .status(500)
        .json({ error: "An error occurred while deleting the recipe" });
    }
  }
}
