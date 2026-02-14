"use client";
import React from "react";
import { z } from "zod";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "./ui/input";

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
      categoryID: 0,
      transactionDate: new Date(),
      transactionType: "income",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof transactionFormSchema>,
  ) => {};
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset className="grid grid-cols-2 gap-y-3 gap-x-2">
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Transaction Type</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          {" "}
                          <SelectValue />{" "}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="categoryID"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          {" "}
                          <SelectValue />{" "}
                        </SelectTrigger>
                        <SelectContent>{/*  */}</SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Transaction Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!field.value}
                            className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value as Date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value as Date | undefined}
                            // This ensures that if a user clicks the same date, it stays selected
                            // rather than becoming undefined.
                            onSelect={(date) => {
                              if (date) field.onChange(date);
                            }}
                            // Prevents users from selecting dates in the future (optional)
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01" // Allows for decimals/cents
                      placeholder="0.00"
                      {...field}
                      // Crucial: convert the string from the input back to a number
                      // so React Hook Form state stays in sync with your Zod schema.
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 0)
                      }
                      value={field.value as number}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="mt-5 flex flex-col gap-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} type="string" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit">
                Submit
            </Button>
          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default TransactionForm;
