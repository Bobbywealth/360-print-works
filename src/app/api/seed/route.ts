import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Check if already seeded
    const existingClients = await db.client.count()
    if (existingClients > 0) {
      return NextResponse.json({ message: 'Database already seeded' })
    }

    // Create leads
    const leads = await Promise.all([
      db.lead.create({ data: { name: 'John Smith', email: 'john@techstartup.com', company: 'Tech Startup Inc.', phone: '(555) 111-2222', status: 'New', source: 'Website' } }),
      db.lead.create({ data: { name: 'Sarah Johnson', email: 'sarah@marketingplus.com', company: 'Marketing Plus', phone: '(555) 222-3333', status: 'Contacted', source: 'Referral' } }),
      db.lead.create({ data: { name: 'Michael Chen', email: 'mchen@designstudio.com', company: 'Design Studio Co.', phone: '(555) 333-4444', status: 'Qualified', source: 'Social Media' } }),
      db.lead.create({ data: { name: 'Emily Davis', email: 'emily@retailworld.com', company: 'Retail World', phone: '(555) 444-5555', status: 'New', source: 'Website' } }),
      db.lead.create({ data: { name: 'Robert Wilson', email: 'rwilson@construction.com', company: 'Wilson Construction', phone: '(555) 555-6666', status: 'Contacted', source: 'Cold Call' } })
    ])

    // Create clients
    const clients = await Promise.all([
      db.client.create({ data: { name: 'Jennifer Martinez', email: 'jmartinez@globaltech.com', company: 'Global Tech Solutions', phone: '(555) 101-2020', address: '123 Tech Boulevard', city: 'San Francisco', state: 'CA', zipCode: '94105', totalSpent: 15420.00, status: 'Active' } }),
      db.client.create({ data: { name: 'David Thompson', email: 'dthompson@creativeagency.com', company: 'Creative Agency LLC', phone: '(555) 202-3030', address: '456 Design Street', city: 'New York', state: 'NY', zipCode: '10001', totalSpent: 28750.00, status: 'Active' } }),
      db.client.create({ data: { name: 'Lisa Anderson', email: 'landerson@healthfirst.com', company: 'Health First Medical', phone: '(555) 303-4040', address: '789 Medical Center Drive', city: 'Boston', state: 'MA', zipCode: '02101', totalSpent: 12300.00, status: 'Active' } }),
      db.client.create({ data: { name: 'James Brown', email: 'jbrown@realestatepro.com', company: 'Real Estate Pro', phone: '(555) 404-5050', address: '321 Property Lane', city: 'Miami', state: 'FL', zipCode: '33101', totalSpent: 8500.00, status: 'Active' } }),
      db.client.create({ data: { name: 'Amanda White', email: 'awhite@fashionforward.com', company: 'Fashion Forward', phone: '(555) 505-6060', address: '555 Style Avenue', city: 'Los Angeles', state: 'CA', zipCode: '90001', totalSpent: 19200.00, status: 'Active' } }),
      db.client.create({ data: { name: 'Chris Taylor', email: 'ctaylor@educateonline.com', company: 'Educate Online', phone: '(555) 606-7070', address: '888 Learning Way', city: 'Chicago', state: 'IL', zipCode: '60601', totalSpent: 6800.00, status: 'Active' } })
    ])

    // Create projects
    const projects = await Promise.all([
      db.project.create({ data: { name: 'Corporate Business Cards', description: 'Premium business cards with spot UV finish', type: 'Business Cards', status: 'Completed', stage: 'Delivery', amount: 450.00, dueDate: new Date('2024-01-15'), clientId: clients[0].id } }),
      db.project.create({ data: { name: 'Annual Report Brochure', description: '20-page annual report with custom design', type: 'Brochures', status: 'In Progress', stage: 'Production', amount: 2800.00, dueDate: new Date('2024-02-01'), clientId: clients[1].id } }),
      db.project.create({ data: { name: 'Event Banner Set', description: '3 large format banners for trade show', type: 'Banners', status: 'In Progress', stage: 'Proof', amount: 1200.00, dueDate: new Date('2024-01-25'), clientId: clients[2].id } }),
      db.project.create({ data: { name: 'Custom T-Shirts', description: '100 branded t-shirts for team event', type: 'Merchandise', status: 'Pending', stage: 'Design', amount: 3500.00, dueDate: new Date('2024-02-10'), clientId: clients[3].id } }),
      db.project.create({ data: { name: 'Product Packaging', description: 'Custom packaging boxes for product line', type: 'Packaging', status: 'Completed', stage: 'Delivery', amount: 5200.00, dueDate: new Date('2024-01-10'), clientId: clients[4].id } }),
      db.project.create({ data: { name: 'Marketing Flyers', description: '5000 promotional flyers', type: 'Brochures', status: 'In Progress', stage: 'Production', amount: 800.00, dueDate: new Date('2024-01-20'), clientId: clients[5].id } }),
      db.project.create({ data: { name: 'Window Signage', description: 'Storefront window graphics', type: 'Signage', status: 'Pending', stage: 'Design', amount: 1500.00, dueDate: new Date('2024-02-05'), clientId: clients[0].id } }),
      db.project.create({ data: { name: 'Letterheads & Envelopes', description: 'Corporate stationery set', type: 'Stationery', status: 'Completed', stage: 'Delivery', amount: 650.00, dueDate: new Date('2024-01-08'), clientId: clients[1].id } })
    ])

    // Create invoices
    const invoices = await Promise.all([
      db.invoice.create({ data: { invoiceNo: 'INV-00001', clientId: clients[0].id, status: 'Paid', subtotal: 450.00, tax: 36.00, total: 486.00, issueDate: new Date('2024-01-01'), dueDate: new Date('2024-01-15'), items: { create: [{ description: 'Premium Business Cards (1000 pcs)', quantity: 1, unitPrice: 450.00, total: 450.00 }] } } }),
      db.invoice.create({ data: { invoiceNo: 'INV-00002', clientId: clients[1].id, status: 'Sent', subtotal: 2800.00, tax: 224.00, total: 3024.00, issueDate: new Date('2024-01-10'), dueDate: new Date('2024-01-25'), items: { create: [{ description: 'Annual Report Design & Print (20 pages)', quantity: 1, unitPrice: 2000.00, total: 2000.00 }, { description: 'Premium Paper Upgrade', quantity: 500, unitPrice: 1.60, total: 800.00 }] } } }),
      db.invoice.create({ data: { invoiceNo: 'INV-00003', clientId: clients[2].id, status: 'Sent', subtotal: 1200.00, tax: 96.00, total: 1296.00, issueDate: new Date('2024-01-12'), dueDate: new Date('2024-01-27'), items: { create: [{ description: 'Large Format Banner (3x8 ft)', quantity: 3, unitPrice: 400.00, total: 1200.00 }] } } }),
      db.invoice.create({ data: { invoiceNo: 'INV-00004', clientId: clients[4].id, status: 'Paid', subtotal: 5200.00, tax: 416.00, total: 5616.00, issueDate: new Date('2023-12-15'), dueDate: new Date('2024-01-05'), items: { create: [{ description: 'Custom Packaging Boxes', quantity: 500, unitPrice: 10.40, total: 5200.00 }] } } }),
      db.invoice.create({ data: { invoiceNo: 'INV-00005', clientId: clients[1].id, status: 'Paid', subtotal: 650.00, tax: 52.00, total: 702.00, issueDate: new Date('2023-12-20'), dueDate: new Date('2024-01-05'), items: { create: [{ description: 'Letterheads (500 pcs)', quantity: 1, unitPrice: 350.00, total: 350.00 }, { description: 'Envelopes (500 pcs)', quantity: 1, unitPrice: 300.00, total: 300.00 }] } } }),
      db.invoice.create({ data: { invoiceNo: 'INV-00006', clientId: clients[3].id, status: 'Overdue', subtotal: 3500.00, tax: 280.00, total: 3780.00, issueDate: new Date('2023-12-01'), dueDate: new Date('2024-01-01'), items: { create: [{ description: 'Custom T-Shirts', quantity: 100, unitPrice: 35.00, total: 3500.00 }] } } }),
      db.invoice.create({ data: { invoiceNo: 'INV-00007', clientId: clients[5].id, status: 'Draft', subtotal: 800.00, tax: 64.00, total: 864.00, issueDate: new Date('2024-01-15'), dueDate: new Date('2024-01-30'), items: { create: [{ description: 'Marketing Flyers (5000 pcs)', quantity: 1, unitPrice: 800.00, total: 800.00 }] } } })
    ])

    await Promise.all([
      db.marketingCampaign.create({ data: { name: 'New Year Sale 2024', type: 'Email', subject: 'Start 2024 with Great Prints!', content: 'Get 20% off all business cards this January...', status: 'Sent', recipients: 1500, sentAt: new Date('2024-01-02') } }),
      db.marketingCampaign.create({ data: { name: 'Trade Show Promo', type: 'Email', subject: 'Special Offer for Trade Show Materials', content: 'Prepare for your next trade show with our special packages...', status: 'Sent', recipients: 800, sentAt: new Date('2024-01-08') } }),
      db.marketingCampaign.create({ data: { name: 'Valentine Special', type: 'SMS', content: "Get 15% off custom cards for Valentine's Day! Reply STOP to opt out.", status: 'Scheduled', recipients: 500 } }),
      db.marketingCampaign.create({ data: { name: 'Monthly Newsletter', type: 'Email', subject: "January Newsletter - What's New at 360 Print Works", content: "This month's highlights...", status: 'Draft', recipients: 0 } })
    ])

    await Promise.all([
      db.document.create({ data: { name: 'Business Card Design v2.ai', category: 'Designs', filePath: '/uploads/business-card-v2.ai', fileSize: 2450.5, fileType: 'application/illustrator', projectId: projects[0].id } }),
      db.document.create({ data: { name: 'Annual Report Proof.pdf', category: 'Proofs', filePath: '/uploads/annual-report-proof.pdf', fileSize: 8200.0, fileType: 'application/pdf', projectId: projects[1].id } }),
      db.document.create({ data: { name: 'Client Contract - Global Tech.pdf', category: 'Contracts', filePath: '/uploads/contract-global-tech.pdf', fileSize: 350.0, fileType: 'application/pdf' } }),
      db.document.create({ data: { name: 'Banner Design Final.psd', category: 'Designs', filePath: '/uploads/banner-design.psd', fileSize: 12500.0, fileType: 'application/photoshop', projectId: projects[2].id } }),
      db.document.create({ data: { name: 'T-Shirt Mockup.png', category: 'Designs', filePath: '/uploads/tshirt-mockup.png', fileSize: 4500.0, fileType: 'image/png', projectId: projects[3].id } })
    ])

    await Promise.all([
      db.activity.create({ data: { type: 'Project', action: 'Completed', description: 'Project "Corporate Business Cards" marked as completed', entityId: projects[0].id, projectId: projects[0].id, clientId: clients[0].id } }),
      db.activity.create({ data: { type: 'Invoice', action: 'Paid', description: 'Invoice INV-00001 payment received', entityId: invoices[0].id, clientId: clients[0].id } }),
      db.activity.create({ data: { type: 'Lead', action: 'Created', description: 'New lead from website: John Smith', entityId: leads[0].id, leadId: leads[0].id } }),
      db.activity.create({ data: { type: 'Client', action: 'Created', description: 'New client registered: Global Tech Solutions', entityId: clients[0].id, clientId: clients[0].id } }),
      db.activity.create({ data: { type: 'Project', action: 'Updated', description: 'Project "Annual Report Brochure" moved to Production stage', entityId: projects[1].id, projectId: projects[1].id, clientId: clients[1].id } })
    ])

    return NextResponse.json({ message: 'Database seeded successfully', counts: { leads: leads.length, clients: clients.length, projects: projects.length, invoices: invoices.length } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}
