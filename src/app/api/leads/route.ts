import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        client: true
      }
    })
    return NextResponse.json(leads)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const lead = await db.lead.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        status: data.status || 'New',
        source: data.source || null,
        notes: data.notes || null,
      }
    })
    
    // Create activity log
    await db.activity.create({
      data: {
        type: 'Lead',
        action: 'Created',
        description: `New lead created: ${lead.name}`,
        entityId: lead.id,
        leadId: lead.id
      }
    })
    
    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
