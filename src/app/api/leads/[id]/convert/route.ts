import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const lead = await db.lead.findUnique({ where: { id } })
    if (!lead) { return NextResponse.json({ error: 'Lead not found' }, { status: 404 }) }
    const client = await db.client.create({ data: { name: lead.name, email: lead.email, company: lead.company, phone: lead.phone, leadId: lead.id, status: 'Active' } })
    await db.lead.update({ where: { id }, data: { status: 'Converted' } })
    await db.activity.create({ data: { type: 'Client', action: 'Created', description: `Lead converted to client: ${client.name}`, entityId: client.id, clientId: client.id, leadId: lead.id } })
    return NextResponse.json(client, { status: 201 })
  } catch (error) { return NextResponse.json({ error: 'Failed to convert lead' }, { status: 500 }) }
}
