import { NextRequest, NextResponse } from 'next/server'
import { DEMO_LEADS } from '../demo-data'

export async function GET() {
  return NextResponse.json(DEMO_LEADS)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newLead = {
      id: String(DEMO_LEADS.length + 1),
      ...data,
      createdAt: new Date().toISOString()
    }
    return NextResponse.json(newLead, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
