import { NextRequest, NextResponse } from 'next/server'
import { DEMO_CLIENTS } from '../demo-data'

export async function GET() {
  return NextResponse.json(DEMO_CLIENTS)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newClient = {
      id: String(DEMO_CLIENTS.length + 1),
      ...data,
      totalSpent: 0,
      status: 'Active',
      createdAt: new Date().toISOString()
    }
    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
