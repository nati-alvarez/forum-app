exports.up = function(knex) {
    return knex.schema.createTable("Community", table=>{
        table.increments().primary();
        table.integer("owner_id").notNullable().references("id").inTable("User").onDelete("CASCADE").onUpdate("CASCADE");
        table.string("name").notNullable().unique();
        table.string("description").notNullable();
        table.string("banner");
        table.string("icon");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Community");
};
