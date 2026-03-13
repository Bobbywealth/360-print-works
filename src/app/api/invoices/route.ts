import { NextRequest, NextResponse } from 'next/server'
import { DEMO_INVOICES } from '../demo-data'

export async function GET() {
  return NextResponse.json(DEMO_INVOICES)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newInvoice = {
      id: String(DEMO_INVOICES.length + 1),
      ...data,
      createdAt: new Date().toISOString()
    }
    return NextResponse.json(newInvoice, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 })
  }
}
