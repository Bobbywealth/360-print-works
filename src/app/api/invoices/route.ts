import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const invoices = await db.invoice.findMany({ orderBy: { createdAt: 'desc' }, include: { client: true, items: true } })
    return NextResponse.json(invoices)
  } catch (error) { return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 }) }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const count = await db.invoice.count()
    const invoiceNo = `INV-${String(count + 1).padStart(5, '0')}`
    const invoice = await db.invoice.create({ data: { invoiceNo, clientId: data.clientId, status: data.status || 'Draft', subtotal: data.subtotal || 0, tax: data.tax || 0, total: data.total || 0, dueDate: new Date(data.dueDate), notes: data.notes || null, items: { create: data.items?.map((item: { description: string; quantity: number; unitPrice: number; total: number }) => ({ description: item.description, quantity: item.quantity, unitPrice: item.unitPrice, total: item.total })) || [] } }, include: { client: true, items: true } })
    await db.activity.create({ data: { type: 'Invoice', action: 'Created', description: `New invoice created: ${invoice.invoiceNo}`, entityId: invoice.id, clientId: invoice.clientId } })
    return NextResponse.json(invoice, { status: 201 })
  } catch (error) { return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 }) }
}
