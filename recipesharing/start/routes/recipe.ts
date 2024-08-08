import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/recipes", "RecipesController.create");
  Route.get("/recipes", "RecipesController.show");
  Route.get("/recipes/:id", "RecipesController.getById");
  Route.delete("/recipes/:id", "RecipesController.destroy");
  Route.patch("/recipes/:id", "RecipesController.update");
}).middleware("auth");
