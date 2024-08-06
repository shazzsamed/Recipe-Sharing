import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Recipes extends BaseSchema {
  protected tableName = "recipes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.text("ingredients").notNullable();
      table.text("instructions").notNullable();
      table.integer("cooking_time").unsigned();
      table.string("image_url");
      table.integer("user_id").unsigned();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
