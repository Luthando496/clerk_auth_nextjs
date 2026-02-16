import "server-only";
import { db } from "@/db";
import { categoriesTable } from "@/db/schema";

export const getCategories= async()=>{
    const categories = await db.select().from(categoriesTable);

    return categories;
}