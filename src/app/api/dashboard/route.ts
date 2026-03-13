import { NextResponse } from 'next/server'
import { DEMO_DASHBOARD, DEMO_LEADS, DEMO_CLIENTS, DEMO_PROJECTS, DEMO_INVOICES } from '../demo-data'

export async function GET() {
  // Return demo data
  return NextResponse.json({
    counts: {
      clients: DEMO_DASHBOARD.totalClients,
      leads: DEMO_DASHBOARD.totalLeads,
      projects: DEMO_DASHBOARD.totalProjects,
      invoices: DEMO_INVOICES.length,
      activeProjects: DEMO_PROJECTS.filter(p => p.status === 'In Progress').length,
      pendingInvoices: DEMO_INVOICES.filter(i => i.status === 'Pending').length
    },
    revenue: {
      monthly: DEMO_DASHBOARD.revenueThisMonth,
      total: DEMO_DASHBOARD.totalRevenue
    },
    monthlyData: [
      { month: 'Oct', revenue: 12000 },
      { month: 'Nov', revenue: 15000 },
      { month: 'Dec', revenue: 18000 },
      { month: 'Jan', revenue: 14000 },
      { month: 'Feb', revenue: 16000 },
      { month: 'Mar', revenue: DEMO_DASHBOARD.revenueThisMonth },
    ],
    projectStatuses: [
      { status: 'In Progress', _count: 8 },
      { status: 'Completed', _count: 10 },
    ],
    invoiceStatuses: [
      { status: 'Paid', _count: 15 },
      { status: 'Pending', _count: 5 },
    ],
    recentActivities: [
      { id: '1', type: 'Lead', action: 'Created', description: 'New lead: John Smith', createdAt: '2026-03-12T10:00:00Z' },
      { id: '2', type: 'Project', action: 'Completed', description: 'Event Banners delivered', createdAt: '2026-03-11T15:00:00Z' },
      { id: '3', type: 'Invoice', action: 'Created', description: 'INV-002 sent to Sarah Johnson', createdAt: '2026-03-10T09:00:00Z' },
    ]
  })
}
