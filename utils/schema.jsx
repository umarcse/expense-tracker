
import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budget', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    icon:varchar('icon'),
    createBy:varchar('createdBy').notNull()

})

export const Expenses = pgTable('expense', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull().default(0),
    budgetId:integer('budgetId').references(()=>Budgets.id),
    createdAt:varchar('createdAt').notNull()

})