"use client"
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { createSpreadsheet } from '@/lib/createSpreadsheet'


export default function CreateNewSpreadsheet() {

  return (
    <Button onClick={()=>{createSpreadsheet()}} >New Spreadsheet</Button>
  )
}
