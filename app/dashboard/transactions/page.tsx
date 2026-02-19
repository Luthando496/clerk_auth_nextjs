import { Breadcrumb,BreadcrumbPage,BreadcrumbLink,BreadcrumbList,BreadcrumbItem,BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import getTransactionsByMonth from "@/data/getTransactionsByMonth"
import { format } from "date-fns"
import { Edit2Icon, EditIcon } from "lucide-react"
import Link from "next/link"
import z from "zod"
import numeral from "numeral"
import { Badge } from "@/components/ui/badge"
import Filters from "./filters"
import { getTransactionsYearsRange } from "@/data/getTransactionsYearsRange"

const today = new Date();

const searchSchema = z.object({
  year:z.coerce.number().min(today.getFullYear() - 100).max(today.getFullYear() + 1).catch(today.getFullYear()),
  month:z.coerce.number().min(1).max(12).catch(today.getMonth() +1)
})

const TransactionsPage = async({searchParams}:{searchParams:Promise<{year?:string;month?:string}>}) => {
  const searchValues = await searchParams;
  const {year,month} = await searchSchema.parse(searchValues);

  const selectedDate = new Date(year,month - 1,1);

  const transactions = await getTransactionsByMonth({year,month})

  const yearsRange = await getTransactionsYearsRange();

  return (
    <div className="max-w-7xl mx-auto py-10">
       <Breadcrumb >
          <BreadcrumbList>
            <BreadcrumbItem >
            <BreadcrumbLink asChild >
              <Link className='text-xl font-bold' href={'/dashboard'}>Dashboard</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
            
            

            <BreadcrumbSeparator />
            <BreadcrumbItem >
            <BreadcrumbLink asChild >
              <BreadcrumbPage >New Transaction</BreadcrumbPage>
            </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />


          </BreadcrumbList>
        </Breadcrumb>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex justify-between">
                     <span className=""> {format(selectedDate,"MMM yyyy")} Transactions</span>
                     <div className=""><Filters  year={year} month={month} yearRange={yearsRange || []} /></div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Button asChild>
              <Link href={'/dashboard/transactions/new'} className="">New Transactions</Link>
            </Button>

            {!transactions?.length && (
              <p className="text-center py-11 text-2xl font-bold text-muted-foreground">No transactions for that month.</p>
            )}

             {transactions?.length && (
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Date
                    </TableHead>
                    <TableHead>
                      Description
                    </TableHead>
                    <TableHead>
                      Type
                    </TableHead>
                    <TableHead>
                      Category
                    </TableHead>
                    <TableHead>
                      Amount
                    </TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
               

               <TableBody>
                {transactions.map(trans=>(
                  <TableRow key={trans.id} >
                    <TableCell>{format(trans.transactionDate,"do MMM yyyy")}</TableCell>
                    <TableCell>{trans.description}</TableCell>
                    <TableCell className={`capitalize`}>
                      <Badge className={`p-1 text-white text-base font-semibold ${trans.type === "income" ? "bg-blue-600" : "bg-red-600"}`}>{trans.type}</Badge>
                    </TableCell>
                    <TableCell>{trans.category}</TableCell>
                    <TableCell>R {numeral(trans.amount).format("0,0[.]100")}</TableCell>
                    <TableCell className="text-right">

                    <Button aria-label="Edit transaction" className="my-2" size={"icon-sm"} asChild>
                      <Link href={`/dashboard/transactions/${trans.id}`}><EditIcon /></Link>
                    </Button>
                    </TableCell>

                  </TableRow>
                ))}
               </TableBody>
              </Table>
             )}
          </CardContent>

        </Card>
    </div>
  )
}

export default TransactionsPage
