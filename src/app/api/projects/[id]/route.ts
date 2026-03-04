import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const project = await db.project.findUnique({ where: { id }, include: { client: true, documents: true } })
    if (!project) { return NextResponse.json({ error: 'Project not found' }, { status: 404 }) }
    return NextResponse.json(project)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 }) }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()
    const project = await db.project.update({ where: { id }, data: { name: data.name, description: data.description, type: data.type, status: data.status, stage: data.stage, amount: data.amount, dueDate: data.dueDate ? new Date(data.dueDate) : null, clientId: data.clientId }, include: { client: true } })
    await db.activity.create({ data: { type: 'Project', action: 'Updated', description: `Project updated: ${project.name}`, entityId: project.id, projectId: project.id, clientId: project.clientId } })
    return NextResponse.json(project)
  } catch (error) { return NextResponse.json({ error: 'Failed to update project' }, { status: 500 }) }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const project = await db.project.delete({ where: { id } })
    return NextResponse.json(project)
  } catch (error) { return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 }) }
}
