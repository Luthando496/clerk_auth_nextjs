"use client";
import React from "react";
import NewTransActionsPage from "./page";
import TransactionForm, {
  categoryType,
  transactionFormSchema,
} from "@/components/transaction-form";
import z from "zod";
import { createTransactions } from "./actions";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewTransactionsForm = ({
  categories,
}: {
  categories: categoryType[];
}) => {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransactions({
      amount: data.amount,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
      description: data.description,
      categoryID: data.categoryID,
    });

    if (result.error) {
      toast.error(`Error: ${result.message.toString()}`);
      return;
    }

    toast.success("Transaction Created");
    router.push(
      `/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`,
    );
  };
  return (
    <>
      <TransactionForm categories={categories} onSubmit={handleSubmit} />
    </>
  );
};

export default NewTransactionsForm;
