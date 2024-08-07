import Route from "@ioc:Adonis/Core/Route";

Route.post("/recipes", "RecipesController.create");
Route.get("/recipes", "RecipesController.show");
Route.get("/recipes/:id", "RecipesController.getById");
Route.get("/search", "RecipesController.index");
Route.delete("/:id", "RecipesController.destroy");
Route.patch("/:id", "RecipesController.update");
