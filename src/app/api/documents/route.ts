import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const documents = await db.document.findMany({ orderBy: { createdAt: 'desc' }, include: { project: true } })
    return NextResponse.json(documents)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 }) }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const document = await db.document.create({ data: { name: data.name, category: data.category, filePath: data.filePath, fileSize: data.fileSize || 0, fileType: data.fileType, projectId: data.projectId || null } })
    return NextResponse.json(document, { status: 201 })
  } catch (error) { return NextResponse.json({ error: 'Failed to create document' }, { status: 500 }) }
}
