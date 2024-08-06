import Route from "@ioc:Adonis/Core/Route";

Route.post("/users", "UsersController.create");
Route.post("/users/login", "UsersController.login");
