// Demo data for CRM
export const DEMO_LEADS = [
  { id: '1', name: 'John Smith', email: 'john@company.com', company: 'ABC Corp', phone: '555-123-4567', status: 'New', source: 'Website', notes: 'Interested in business cards', createdAt: '2026-03-10T10:00:00Z' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@startup.io', company: 'Startup Inc', phone: '555-987-6543', status: 'Qualified', source: 'Referral', notes: 'Needs bulk printing', createdAt: '2026-03-08T14:30:00Z' },
  { id: '3', name: 'Mike Davis', email: 'mike@retail.com', company: 'Retail Plus', phone: '555-456-7890', status: 'Contacted', source: 'Social Media', notes: 'Interested in banners', createdAt: '2026-03-05T09:15:00Z' },
]

export const DEMO_CLIENTS = [
  { id: '1', name: 'Tech Solutions Inc', email: 'contact@techsolutions.com', company: 'Tech Solutions Inc', phone: '555-111-2222', address: '123 Main St', city: 'Newark', state: 'NJ', zipCode: '07102', totalSpent: 1500, status: 'Active', createdAt: '2026-01-15T10:00:00Z' },
  { id: '2', name: 'Chen Marketing Group', email: 'info@chenmarketing.com', company: 'Chen Marketing Group', phone: '555-333-4444', address: '456 Oak Ave', city: 'Jersey City', state: 'NJ', zipCode: '07302', totalSpent: 2800, status: 'Active', createdAt: '2026-02-01T11:00:00Z' },
]

export const DEMO_PROJECTS = [
  { id: '1', name: 'Business Cards Redesign', description: 'Redesign 500 business cards', type: 'Design', status: 'In Progress', stage: 'Design', amount: 500, dueDate: '2026-03-20', client: { name: 'John Smith', company: 'ABC Corp' }, createdAt: '2026-03-01T10:00:00Z' },
  { id: '2', name: 'Event Banners', description: '10 large format banners for event', type: 'Print', status: 'Completed', stage: 'Delivered', amount: 1200, dueDate: '2026-03-15', client: { name: 'Sarah Johnson', company: 'Startup Inc' }, createdAt: '2026-02-20T09:00:00Z' },
]

export const DEMO_INVOICES = [
  { id: '1', invoiceNo: 'INV-001', status: 'Paid', subtotal: 500, tax: 40, total: 540, issueDate: '2026-03-01', dueDate: '2026-03-15', client: { name: 'Tech Solutions Inc', company: 'Tech Solutions Inc' }, items: [{ description: 'Business Cards (500)', quantity: 1, unitPrice: 500, total: 500 }] },
  { id: '2', invoiceNo: 'INV-002', status: 'Pending', subtotal: 1200, tax: 96, total: 1296, issueDate: '2026-03-10', dueDate: '2026-03-25', client: { name: 'Sarah Johnson', company: 'Startup Inc' }, items: [{ description: 'Event Banners (10)', quantity: 10, unitPrice: 120, total: 1200 }] },
]

export const DEMO_DASHBOARD = {
  totalLeads: 156,
  totalClients: 42,
  totalProjects: 18,
  totalRevenue: 45680,
  leadsThisMonth: 23,
  clientsThisMonth: 5,
  projectsInProgress: 8,
  revenueThisMonth: 12450,
}
