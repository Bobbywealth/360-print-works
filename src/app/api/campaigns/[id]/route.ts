import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const campaign = await db.marketingCampaign.findUnique({ where: { id } })
    if (!campaign) { return NextResponse.json({ error: 'Campaign not found' }, { status: 404 }) }
    return NextResponse.json(campaign)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 }) }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()
    const campaign = await db.marketingCampaign.update({ where: { id }, data: { name: data.name, type: data.type, subject: data.subject, content: data.content, status: data.status, recipients: data.recipients, sentAt: data.sentAt ? new Date(data.sentAt) : null } })
    return NextResponse.json(campaign)
  } catch (error) { return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 }) }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const campaign = await db.marketingCampaign.delete({ where: { id } })
    return NextResponse.json(campaign)
  } catch (error) { return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 }) }
}
