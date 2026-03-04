import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const invoice = await db.invoice.findUnique({ where: { id }, include: { client: true, items: true } })
    if (!invoice) { return NextResponse.json({ error: 'Invoice not found' }, { status: 404 }) }
    return NextResponse.json(invoice)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 }) }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()
    if (data.items) { await db.invoiceItem.deleteMany({ where: { invoiceId: id } }) }
    const invoice = await db.invoice.update({ where: { id }, data: { status: data.status, subtotal: data.subtotal, tax: data.tax, total: data.total, dueDate: data.dueDate ? new Date(data.dueDate) : undefined, notes: data.notes, items: data.items ? { create: data.items.map((item: { description: string; quantity: number; unitPrice: number; total: number }) => ({ description: item.description, quantity: item.quantity, unitPrice: item.unitPrice, total: item.total })) } : undefined }, include: { client: true, items: true } })
    await db.activity.create({ data: { type: 'Invoice', action: 'Updated', description: `Invoice updated: ${invoice.invoiceNo}`, entityId: invoice.id, clientId: invoice.clientId } })
    return NextResponse.json(invoice)
  } catch (error) { return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 }) }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const invoice = await db.invoice.delete({ where: { id } })
    return NextResponse.json(invoice)
  } catch (error) { return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 }) }
}
