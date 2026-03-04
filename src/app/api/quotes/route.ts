import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const quotes = await db.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(quotes)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 }) }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const quote = await db.quoteRequest.create({ data: { name: data.name, email: data.email, phone: data.phone || null, company: data.company || null, serviceType: data.serviceType || null, description: data.description || null } })
    return NextResponse.json(quote, { status: 201 })
  } catch (error) { return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 }) }
}
