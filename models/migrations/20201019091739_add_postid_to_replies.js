exports.up = function(knex) {
    return knex.schema.alterTable("Reply", table=>{
        table.integer("post_id").references("id").inTable("Post").onUpdate("CASCADE").onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    knex.schema.table("Reply", table=>{
        table.dropColumn("post_id");
    })
};
