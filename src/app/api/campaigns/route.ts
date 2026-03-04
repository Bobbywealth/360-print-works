import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const campaigns = await db.marketingCampaign.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(campaigns)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 }) }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const campaign = await db.marketingCampaign.create({ data: { name: data.name, type: data.type, subject: data.subject || null, content: data.content, status: data.status || 'Draft', recipients: data.recipients || 0 } })
    return NextResponse.json(campaign, { status: 201 })
  } catch (error) { return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 }) }
}
