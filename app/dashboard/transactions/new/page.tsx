import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const NewTransActionsPage = () => {
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
        <Card className='mt-4 max-w-md'>
          <CardHeader>
            <CardTitle  className='text-gray-800 font-bold text-xl'>
              New Transaction
            </CardTitle>
          </CardHeader>
          
          <CardContent>

          </CardContent>

        </Card>
      </div>
  )
}

export default NewTransActionsPage