import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Get counts
    const [clientsCount, leadsCount, projectsCount, invoicesCount] = await Promise.all([
      db.client.count(),
      db.lead.count(),
      db.project.count(),
      db.invoice.count()
    ])
    
    // Get active projects
    const activeProjects = await db.project.count({
      where: { status: 'In Progress' }
    })
    
    // Get pending invoices
    const pendingInvoices = await db.invoice.count({
      where: { status: { in: ['Sent', 'Overdue'] } }
    })
    
    // Calculate monthly revenue (paid invoices)
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    
    const paidInvoices = await db.invoice.findMany({
      where: {
        status: 'Paid',
        updatedAt: { gte: startOfMonth }
      },
      select: { total: true }
    })
    
    const monthlyRevenue = paidInvoices.reduce((sum, inv) => sum + inv.total, 0)
    
    // Get total revenue
    const allPaidInvoices = await db.invoice.findMany({
      where: { status: 'Paid' },
      select: { total: true }
    })
    const totalRevenue = allPaidInvoices.reduce((sum, inv) => sum + inv.total, 0)
    
    // Get recent activities
    const activities = await db.activity.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        lead: true,
        client: true,
        project: true
      }
    })
    
    // Get project status breakdown
    const projectStatuses = await db.project.groupBy({
      by: ['status'],
      _count: true
    })
    
    // Get invoice status breakdown
    const invoiceStatuses = await db.invoice.groupBy({
      by: ['status'],
      _count: true,
      _sum: { total: true }
    })
    
    // Get monthly revenue for chart (last 6 months)
    const monthlyData = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59)
      
      const monthInvoices = await db.invoice.findMany({
        where: {
          status: 'Paid',
          updatedAt: {
            gte: monthStart,
            lte: monthEnd
          }
        },
        select: { total: true }
      })
      
      const monthRevenue = monthInvoices.reduce((sum, inv) => sum + inv.total, 0)
      monthlyData.push({
        month: date.toLocaleString('default', { month: 'short' }),
        revenue: monthRevenue
      })
    }
    
    return NextResponse.json({
      counts: {
        clients: clientsCount,
        leads: leadsCount,
        projects: projectsCount,
        invoices: invoicesCount,
        activeProjects,
        pendingInvoices
      },
      revenue: {
        monthly: monthlyRevenue,
        total: totalRevenue
      },
      activities,
      projectStatuses,
      invoiceStatuses,
      monthlyData
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
