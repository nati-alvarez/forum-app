exports.up = function(knex) {
    return knex.schema.createTable("Post_Vote", table=>{
        table.increments();
        table.integer("user_id").notNullable().references("id").inTable("User").onDelete("CASCADE").onUpdate("CASCADE");
        table.integer("post_id").notNullable().references("id").inTable("Post").onDelete("CASCADE").onUpdate("CASCADE");
        table.integer("status").notNullable();
        table.unique(["user_id", "post_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Post_Vote");
};
