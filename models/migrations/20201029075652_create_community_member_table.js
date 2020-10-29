exports.up = function(knex) {
    return knex.schema.createTable("Community_Member", table=>{
        table.integer("user_id").notNullable().references("id").inTable("User").onUpdate("CASCADE").onDelete("CASCADE");
        table.integer("community_id").notNullable().references("id").inTable("Community").onUpdate("CASCADE").onDelete("CASCADE");
        table.primary(["user_id", "community_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Community_Member");
};
