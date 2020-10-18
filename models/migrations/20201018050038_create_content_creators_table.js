exports.up = function(knex) {
    return knex.schema.createTable("Content_Creator", table=>{
        table.integer("user_id").notNullable().references("id").inTable("User").onDelete("CASCADE").onUpdate("CASCADE");
        table.integer("community_id").notNullable().references("id").inTable("Community").onDelete("CASCADE").onUpdate("CASCADE");
        table.primary(["user_id", "community_id"]);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Content_Creator");
};
