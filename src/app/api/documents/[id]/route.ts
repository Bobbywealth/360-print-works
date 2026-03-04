import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const document = await db.document.delete({ where: { id } })
    return NextResponse.json(document)
  } catch (error) { return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 }) }
}
