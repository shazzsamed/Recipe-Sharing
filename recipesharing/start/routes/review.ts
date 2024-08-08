import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/reviews", "ReviewsController.create");
  Route.get("/reviews/:id", "ReviewsController.getById");
  Route.get("/rating/:id", "ReviewsController.averageRating");
  Route.delete("/reviews/:id", "ReviewsController.destroy");
  Route.patch("/reviews/:id", "ReviewsController.update");
});
