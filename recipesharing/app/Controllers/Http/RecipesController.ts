import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Recipe from "App/Models/Recipe";

export default class RecipesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const searchQuery = request.input("q");
      const recipes = await Database.from("recipes")
        .select("*")
        .if(searchQuery, (query) => {
          query
            .where("title", "ILIKE", `%${searchQuery}%`)
            .orWhere("description", "ILIKE", `%${searchQuery}%`);
        })
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

      const candidates = await Database.from("recipes")
        .where("id", recipeId)
        .firstOrFail();

      response.status(200).json(candidates);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const { sortBy = "id", order = "asc" } = request.qs();

      const recipes = await Database.from("recipes").orderBy(sortBy, order);

      response.status(200).json(recipes);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const recipe = await Recipe.findOrFail(params.id);
      const data = request.only([
        "title",
        "description",
        "ingredients",
        "instructions",
        "cookingTime",
        "imageUrl",
      ]);
      recipe.merge(data);
      await recipe.save();
      return response.status(200).json(recipe);
    } catch (error) {
      return response
        .status(404)
        .json({ error: "Recipe not found or failed to update" });
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
