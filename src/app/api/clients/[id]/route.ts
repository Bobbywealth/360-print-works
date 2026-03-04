import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const client = await db.client.findUnique({ where: { id }, include: { projects: { orderBy: { createdAt: 'desc' } }, invoices: { orderBy: { createdAt: 'desc' } } } })
    if (!client) { return NextResponse.json({ error: 'Client not found' }, { status: 404 }) }
    return NextResponse.json(client)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 }) }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()
    const client = await db.client.update({ where: { id }, data: { name: data.name, email: data.email, company: data.company, phone: data.phone, address: data.address, city: data.city, state: data.state, zipCode: data.zipCode, status: data.status, totalSpent: data.totalSpent } })
    await db.activity.create({ data: { type: 'Client', action: 'Updated', description: `Client updated: ${client.name}`, entityId: client.id, clientId: client.id } })
    return NextResponse.json(client)
  } catch (error) { return NextResponse.json({ error: 'Failed to update client' }, { status: 500 }) }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const client = await db.client.delete({ where: { id } })
    return NextResponse.json(client)
  } catch (error) { return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 }) }
}
