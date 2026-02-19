"use client"

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";


const Filters = ({year,month,yearRange}:{year:number;month:number;yearRange:number[]}) => {
    const [selectedMonth,setSelectedMonth] = useState(month)
    const [selectedYear,setSelectedYear] = useState(year)
  return (
    <div className="flex gap-5">
      <Select value={selectedMonth.toString()} onValueChange={(newValue)=> setSelectedMonth(+newValue)}>
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
         {Array.from({length:12}).map((_,index)=>(
            <SelectItem value={`${index + 1}`} key={index}>
              {format(new Date(selectedYear,index,1),"MMM")}
            </SelectItem>
         ))}
        </SelectContent>
      </Select>
      {/* // Years yearRange */}
      <Select value={selectedYear.toString()} onValueChange={(newValue)=> setSelectedYear(+newValue)}>
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
         {yearRange.map((year)=>(
            <SelectItem value={`${year}`} key={year}>
              {year}
            </SelectItem>
         ))}
        </SelectContent>
      </Select>

      <Button asChild>
        <Link href={`/dashboard/transactions/?year=${selectedYear}&month=${selectedMonth}`}>Search</Link>
      </Button>

    </div>
  )
}

export default Filters
