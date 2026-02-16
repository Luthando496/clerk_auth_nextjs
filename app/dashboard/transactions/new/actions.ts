"use server"

import { db } from "@/db"
import { transactionsTable } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { addDays, subYears } from "date-fns"
import z from "zod"


const transactionSchema = z.object({
    amount:z.number().positive("Amount should be bigger than 0"),
    description: z
        .string()
        .min(3, "Must contain at least 3 characters")
        .max(300, "Maximum contain at maximum 300 characters"),
    categoryID:z.number().positive("CategoryID Should be a Number Greater Than 0"),
    transactionDate:z.coerce.date().min(subYears(new Date(),10)).max(addDays(new Date(),1))
})

export const createTransactions = async (data:{
    amount:number,
    transactionDate:string,
    description:string,
    categoryID:number
}) =>{
    const {userId} = await auth();
    if(!userId){
        return {
            error:true,
            message:"Unauthorized"
        }
    }

    const validation = transactionSchema.safeParse(data);

    if(!validation.success){
        return{
            error:true,
            message:validation.error.issues[0].message
        }
    }

    const [transaction] = await db.insert(transactionsTable).values({
        userId,
        amount:data.amount.toString(),
        transactionDate:data.transactionDate,
        categoryId:data.categoryID,
        description:data.description
    }).returning()

    return {id:transaction.id}

}