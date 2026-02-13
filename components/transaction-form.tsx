"use client";
import React from "react";
import { z } from "zod";
import { addDays } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";

const transactionFormSchema = z.object({
  transactionType: z.enum(["expense", "income"]),
  categoryID: z.coerce.number().positive("Please Select A Category"),
  transactionDate: z.coerce
    .date()
    .max(addDays(new Date(), 1), "Transaction Date Cannot Be in the future"),
  amount: z.coerce.number().positive("Amount should be greater than 0"),
  description: z
    .string()
    .min(3, "Must contain at least 3 characters")
    .max(300, "Maximum contain at maximum 300 characters"),
});

const TransactionForm = () => {

   const form = useForm({
  resolver: zodResolver(transactionFormSchema),
  defaultValues: {
    amount: 0,
    description: "",
    categoryID:0,
    transactionDate:new Date(),
    transactionType:"income"
  },
});

const handleSubmit = async(data:z.infer<typeof transactionFormSchema>)=>{

}
  return( <>
    <Form {...form} >
        <form onSubmit={form.handleSubmit(handleSubmit)}>

        </form>
    </Form>
  </>);
};

export default TransactionForm;
