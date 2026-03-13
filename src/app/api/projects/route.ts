import { NextRequest, NextResponse } from 'next/server'
import { DEMO_PROJECTS } from '../demo-data'

export async function GET() {
  return NextResponse.json(DEMO_PROJECTS)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newProject = {
      id: String(DEMO_PROJECTS.length + 1),
      ...data,
      createdAt: new Date().toISOString()
    }
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
