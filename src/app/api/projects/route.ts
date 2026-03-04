import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const projects = await db.project.findMany({ orderBy: { createdAt: 'desc' }, include: { client: true, _count: { select: { documents: true } } } })
    return NextResponse.json(projects)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 }) }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const project = await db.project.create({ data: { name: data.name, description: data.description || null, type: data.type, status: data.status || 'Pending', stage: data.stage || 'Design', amount: data.amount || 0, dueDate: data.dueDate ? new Date(data.dueDate) : null, clientId: data.clientId }, include: { client: true } })
    await db.activity.create({ data: { type: 'Project', action: 'Created', description: `New project created: ${project.name}`, entityId: project.id, projectId: project.id, clientId: project.clientId } })
    return NextResponse.json(project, { status: 201 })
  } catch (error) { return NextResponse.json({ error: 'Failed to create project' }, { status: 500 }) }
}
