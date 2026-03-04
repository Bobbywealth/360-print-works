import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const clients = await db.client.findMany({ orderBy: { createdAt: 'desc' }, include: { _count: { select: { projects: true, invoices: true } } } })
    return NextResponse.json(clients)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 }) }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const client = await db.client.create({ data: { name: data.name, email: data.email, company: data.company || null, phone: data.phone || null, address: data.address || null, city: data.city || null, state: data.state || null, zipCode: data.zipCode || null, status: data.status || 'Active' } })
    await db.activity.create({ data: { type: 'Client', action: 'Created', description: `New client created: ${client.name}`, entityId: client.id, clientId: client.id } })
    return NextResponse.json(client, { status: 201 })
  } catch (error) { return NextResponse.json({ error: 'Failed to create client' }, { status: 500 }) }
}
