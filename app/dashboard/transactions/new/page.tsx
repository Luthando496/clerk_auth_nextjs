import TransactionForm from '@/components/transaction-form'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCategories } from '@/data/getCategories'
import Link from 'next/link'
import React from 'react'
import NewTransactionsForm from './new-transactions-form'

const NewTransActionsPage = async() => {
  const categories = await getCategories();

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
              <Link className='text-xl font-bold' href={'/dashboard/transactions'}>Transactions</Link>
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
        <Card className='mt-4 max-w-4xl'>
          <CardHeader>
            <CardTitle  className='text-gray-800 font-bold text-xl'>
              New Transaction
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <NewTransactionsForm categories={categories} />
          </CardContent>

        </Card>
      </div>
  )
}

export default NewTransActionsPage