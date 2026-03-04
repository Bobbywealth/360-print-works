import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = await db.lead.findUnique({ where: { id }, include: { client: true } })
    if (!lead) { return NextResponse.json({ error: 'Lead not found' }, { status: 404 }) }
    return NextResponse.json(lead)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 }) }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()
    const lead = await db.lead.update({ where: { id }, data: { name: data.name, email: data.email, company: data.company, phone: data.phone, status: data.status, source: data.source, notes: data.notes } })
    await db.activity.create({ data: { type: 'Lead', action: 'Updated', description: `Lead updated: ${lead.name}`, entityId: lead.id, leadId: lead.id } })
    return NextResponse.json(lead)
  } catch (error) { return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 }) }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const lead = await db.lead.delete({ where: { id } })
    return NextResponse.json(lead)
  } catch (error) { return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 }) }
}
