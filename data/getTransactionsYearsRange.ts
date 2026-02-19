import "server-only";
import { db } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { and, asc, desc, eq, gte, lte } from "drizzle-orm";




export const getTransactionsYearsRange = async() => {
  
    const {userId} = await auth();

    if(!userId){
        return null
    }

    const [early] = await db.select().from(transactionsTable).where(eq(transactionsTable.userId,userId)).orderBy(asc(transactionsTable.transactionDate)).limit(1)

    const today = new Date();
    const currentYear = today.getFullYear();
    const earliestYear = early ? new Date(early.transactionDate).getFullYear() : currentYear;

    const years:number[] = Array.from({length:currentYear - earliestYear + 1}).map((_,i)=> currentYear - i);

    return years;
}