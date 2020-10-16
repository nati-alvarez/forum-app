exports.up = function(knex) {
    return knex.schema.createTable("View", table=>{
        table.integer("user_id").notNullable().references("id").inTable("User").onDelete("CASCADE").onUpdate("CASCADE");
        table.integer("post_id").notNullable().references("id").inTable("Post").onDelete("CASCADE").onUpdate("CASCADE");
        table.primary(["user_id", "post_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("View");
};
