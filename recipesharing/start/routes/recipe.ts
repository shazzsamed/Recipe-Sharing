import Route from "@ioc:Adonis/Core/Route";

Route.post("/recipes", "RecipesController.create").middleware("auth");
Route.get("/recipes", "RecipesController.show");
Route.get("/recipes/:id", "RecipesController.getById");
Route.get("/search", "RecipesController.index");
