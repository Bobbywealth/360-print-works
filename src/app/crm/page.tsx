'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { 
  LayoutDashboard, Users, UserPlus, FolderKanban, FileText, Mail, MessageSquare, Upload, Settings,
  ChevronDown, Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Send, Download, ArrowRight,
  DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle, FileCheck, Printer, BarChart3,
  Home, Bell, LogOut, Building, Phone, Mail as MailIcon, Calendar, Tag, Paperclip
} from "lucide-react"

interface Lead { id: string; name: string; email: string; company: string | null; phone: string | null; status: string; source: string | null; notes: string | null; createdAt: string }
interface Client { id: string; name: string; email: string; company: string | null; phone: string | null; address: string | null; city: string | null; state: string | null; zipCode: string | null; totalSpent: number; status: string; createdAt: string }
interface Project { id: string; name: string; description: string | null; type: string; status: string; stage: string; amount: number; dueDate: string | null; createdAt: string; client: { name: string; company: string | null } }
interface Invoice { id: string; invoiceNo: string; status: string; subtotal: number; tax: number; total: number; issueDate: string; dueDate: string; client: { name: string; company: string | null }; items: { description: string; quantity: number; unitPrice: number; total: number }[] }
interface Campaign { id: string; name: string; type: string; status: string; subject: string | null; content: string; recipients: number; sentAt: string | null }
interface Document { id: string; name: string; category: string; fileSize: number; fileType: string; createdAt: string; project: { name: string } | null }
interface DashboardData { counts: { clients: number; leads: number; projects: number; invoices: number; activeProjects: number; pendingInvoices: number }; revenue: { monthly: number; total: number }; activities: { id: string; type: string; action: string; description: string; createdAt: string }[]; monthlyData: { month: string; revenue: number }[] }

function Sidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: UserPlus },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'marketing', label: 'Marketing', icon: Mail },
    { id: 'documents', label: 'Documents', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <a href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">360</div>
          <div><div className="font-bold">Print Works</div><div className="text-xs text-slate-400">CRM Dashboard</div></div>
        </a>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <Icon className="h-5 w-5" />{item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800" asChild>
          <a href="/"><Home className="h-4 w-4" />Back to Website</a>
        </Button>
      </div>
    </aside>
  )
}

function CRMHeader({ user, onLogout }: { user: { name: string; email: string; role: string } | null; onLogout: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><Input placeholder="Search..." className="pl-10 w-80" /></div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative"><Bell className="h-5 w-5" /><span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span></Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3">
              <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">{user?.name?.charAt(0) || 'A'}</div>
              <div className="text-left hidden sm:block"><div className="font-medium text-sm">{user?.name || 'Admin User'}</div><div className="text-gray-500 text-xs">{user?.role || 'Administrator'}</div></div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild><a href="/" className="flex items-center gap-2"><Home className="h-4 w-4" />Back to Website</a></DropdownMenuItem>
            <DropdownMenuItem><Settings className="h-4 w-4 mr-2" />Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout} className="text-red-600"><LogOut className="h-4 w-4 mr-2" />Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function DashboardPanel({ data }: { data: DashboardData | null }) {
  if (!data) return <div className="p-8">Loading...</div>
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Total Clients</p><p className="text-3xl font-bold">{data.counts.clients}</p></div><div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center"><Users className="h-6 w-6 text-blue-600" /></div></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Active Projects</p><p className="text-3xl font-bold">{data.counts.activeProjects}</p></div><div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center"><FolderKanban className="h-6 w-6 text-green-600" /></div></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Pending Invoices</p><p className="text-3xl font-bold">{data.counts.pendingInvoices}</p></div><div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center"><FileText className="h-6 w-6 text-orange-600" /></div></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-500">Monthly Revenue</p><p className="text-3xl font-bold">${data.revenue.monthly.toLocaleString()}</p></div><div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center"><DollarSign className="h-6 w-6 text-purple-600" /></div></div></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Revenue Overview</CardTitle><CardDescription>Monthly revenue for the last 6 months</CardDescription></CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {data.monthlyData.map((item, i) => {
                const maxRevenue = Math.max(...data.monthlyData.map(d => d.revenue), 1)
                const height = (item.revenue / maxRevenue) * 100
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-blue-100 rounded-t relative" style={{ height: `${Math.max(height, 5)}%` }}>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs font-medium">${item.revenue.toLocaleString()}</div>
                      <div className="w-full h-full bg-blue-600 rounded-t opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-gray-500">{item.month}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent Activity</CardTitle><CardDescription>Latest actions in your CRM</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${activity.type === 'Project' ? 'bg-green-100 text-green-600' : activity.type === 'Invoice' ? 'bg-blue-100 text-blue-600' : activity.type === 'Lead' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}>
                    {activity.type === 'Project' && <FolderKanban className="h-4 w-4" />}
                    {activity.type === 'Invoice' && <FileText className="h-4 w-4" />}
                    {activity.type === 'Lead' && <UserPlus className="h-4 w-4" />}
                    {activity.type === 'Client' && <Users className="h-4 w-4" />}
                  </div>
                  <div className="flex-1"><p className="text-sm">{activity.description}</p><p className="text-xs text-gray-500">{new Date(activity.createdAt).toLocaleDateString()}</p></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2"><UserPlus className="h-5 w-5" />Add Lead</Button>
            <Button variant="outline" className="h-20 flex-col gap-2"><Users className="h-5 w-5" />Add Client</Button>
            <Button variant="outline" className="h-20 flex-col gap-2"><FolderKanban className="h-5 w-5" />New Project</Button>
            <Button variant="outline" className="h-20 flex-col gap-2"><FileText className="h-5 w-5" />Create Invoice</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LeadsPanel({ leads, refresh }: { leads: Lead[]; refresh: () => void }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', status: 'New', source: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const handleAdd = async () => { setSaving(true); try { const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }); if (res.ok) { toast({ title: 'Lead added successfully' }); setIsAddOpen(false); setFormData({ name: '', email: '', company: '', phone: '', status: 'New', source: '', notes: '' }); refresh() } } finally { setSaving(false) } }
  const handleConvert = async (id: string) => { try { const res = await fetch(`/api/leads/${id}/convert`, { method: 'POST' }); if (res.ok) { toast({ title: 'Lead converted to client' }); refresh() } } catch (e) { toast({ title: 'Error converting lead', variant: 'destructive' }) } }
  const handleDelete = async (id: string) => { if (!confirm('Delete this lead?')) return; try { const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' }); if (res.ok) { toast({ title: 'Lead deleted' }); refresh() } } catch (e) { toast({ title: 'Error deleting lead', variant: 'destructive' }) } }
  const getStatusColor = (status: string) => { switch (status) { case 'New': return 'bg-blue-100 text-blue-700'; case 'Contacted': return 'bg-yellow-100 text-yellow-700'; case 'Qualified': return 'bg-green-100 text-green-700'; case 'Converted': return 'bg-purple-100 text-purple-700'; default: return 'bg-gray-100 text-gray-700' } }
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Leads Management</h1><p className="text-gray-500">Track and manage your potential customers</p></div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild><Button className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Add Lead</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Add New Lead</DialogTitle><DialogDescription>Enter the details for the new lead</DialogDescription></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4"><div><Label>Name *</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div><div><Label>Email *</Label><Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div></div>
              <div className="grid grid-cols-2 gap-4"><div><Label>Company</Label><Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} /></div><div><Label>Phone</Label><Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Status</Label><Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="New">New</SelectItem><SelectItem value="Contacted">Contacted</SelectItem><SelectItem value="Qualified">Qualified</SelectItem></SelectContent></Select></div>
                <div><Label>Source</Label><Select value={formData.source} onValueChange={v => setFormData({...formData, source: v})}><SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger><SelectContent><SelectItem value="Website">Website</SelectItem><SelectItem value="Referral">Referral</SelectItem><SelectItem value="Social Media">Social Media</SelectItem><SelectItem value="Cold Call">Cold Call</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></div>
              </div>
              <div><Label>Notes</Label><Textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} /></div>
            </div>
            <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleAdd} disabled={saving || !formData.name || !formData.email}>{saving ? 'Saving...' : 'Add Lead'}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Company</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Status</TableHead><TableHead>Source</TableHead><TableHead>Created</TableHead><TableHead className="w-[100px]">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{leads.map((lead) => (<TableRow key={lead.id}><TableCell className="font-medium">{lead.name}</TableCell><TableCell>{lead.company || '-'}</TableCell><TableCell>{lead.email}</TableCell><TableCell>{lead.phone || '-'}</TableCell><TableCell><Badge className={getStatusColor(lead.status)}>{lead.status}</Badge></TableCell><TableCell>{lead.source || '-'}</TableCell><TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell><TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem onClick={() => handleConvert(lead.id)}><ArrowRight className="h-4 w-4 mr-2" /> Convert to Client</DropdownMenuItem><DropdownMenuItem className="text-red-600" onClick={() => handleDelete(lead.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
    </div>
  )
}

function ClientsPanel({ clients, refresh }: { clients: Client[]; refresh: () => void }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', address: '', city: '', state: '', zipCode: '' })
  const [saving, setSaving] = useState(false)
  const handleAdd = async () => { setSaving(true); try { const res = await fetch('/api/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }); if (res.ok) { toast({ title: 'Client added successfully' }); setIsAddOpen(false); setFormData({ name: '', email: '', company: '', phone: '', address: '', city: '', state: '', zipCode: '' }); refresh() } } finally { setSaving(false) } }
  const handleDelete = async (id: string) => { if (!confirm('Delete this client?')) return; try { const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' }); if (res.ok) { toast({ title: 'Client deleted' }); refresh() } } catch (e) { toast({ title: 'Error deleting client', variant: 'destructive' }) } }
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Clients Management</h1><p className="text-gray-500">Manage your customer relationships</p></div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild><Button className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Add Client</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Add New Client</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4"><div><Label>Name *</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div><div><Label>Email *</Label><Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div></div>
              <div className="grid grid-cols-2 gap-4"><div><Label>Company</Label><Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} /></div><div><Label>Phone</Label><Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div></div>
              <div><Label>Address</Label><Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} /></div>
              <div className="grid grid-cols-3 gap-4"><div><Label>City</Label><Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} /></div><div><Label>State</Label><Input value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} /></div><div><Label>ZIP</Label><Input value={formData.zipCode} onChange={e => setFormData({...formData, zipCode: e.target.value})} /></div></div>
            </div>
            <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleAdd} disabled={saving || !formData.name || !formData.email}>{saving ? 'Saving...' : 'Add Client'}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{clients.map((client) => (<Card key={client.id} className="hover:shadow-lg transition-shadow"><CardContent className="p-6"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">{client.name.charAt(0)}</div><div><h3 className="font-semibold">{client.name}</h3><p className="text-sm text-gray-500">{client.company || 'No company'}</p></div></div><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Details</DropdownMenuItem><DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem><DropdownMenuItem className="text-red-600" onClick={() => handleDelete(client.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div><div className="mt-4 space-y-2 text-sm"><div className="flex items-center gap-2 text-gray-600"><MailIcon className="h-4 w-4" /> {client.email}</div>{client.phone && (<div className="flex items-center gap-2 text-gray-600"><Phone className="h-4 w-4" /> {client.phone}</div>)}</div><div className="mt-4 pt-4 border-t flex justify-between items-center"><div><p className="text-sm text-gray-500">Total Spent</p><p className="font-bold text-lg">${client.totalSpent.toLocaleString()}</p></div><Badge variant={client.status === 'Active' ? 'default' : 'secondary'} className={client.status === 'Active' ? 'bg-green-100 text-green-700' : ''}>{client.status}</Badge></div></CardContent></Card>))}</div>
    </div>
  )
}

function ProjectsPanel({ projects, clients, refresh }: { projects: Project[]; clients: Client[]; refresh: () => void }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '', type: '', clientId: '', amount: '0', dueDate: '', status: 'Pending', stage: 'Design' })
  const [saving, setSaving] = useState(false)
  const projectTypes = ['Business Cards', 'Brochures', 'Banners', 'Signage', 'Merchandise', 'Packaging', 'Stationery', 'Large Format', 'Promotional Items']
  const stages = ['Design', 'Proof', 'Production', 'Delivery']
  const handleAdd = async () => { setSaving(true); try { const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, amount: parseFloat(formData.amount) || 0, dueDate: formData.dueDate || null }) }); if (res.ok) { toast({ title: 'Project created successfully' }); setIsAddOpen(false); setFormData({ name: '', description: '', type: '', clientId: '', amount: '0', dueDate: '', status: 'Pending', stage: 'Design' }); refresh() } } finally { setSaving(false) } }
  const getStatusColor = (status: string) => { switch (status) { case 'Pending': return 'bg-yellow-100 text-yellow-700'; case 'In Progress': return 'bg-blue-100 text-blue-700'; case 'Completed': return 'bg-green-100 text-green-700'; case 'Cancelled': return 'bg-red-100 text-red-700'; default: return 'bg-gray-100 text-gray-700' } }
  const getStageColor = (stage: string) => { switch (stage) { case 'Design': return 'bg-purple-100 text-purple-700'; case 'Proof': return 'bg-orange-100 text-orange-700'; case 'Production': return 'bg-blue-100 text-blue-700'; case 'Delivery': return 'bg-green-100 text-green-700'; default: return 'bg-gray-100 text-gray-700' } }
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Projects Management</h1><p className="text-gray-500">Track all your printing projects</p></div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild><Button className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />New Project</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Project Name *</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              <div><Label>Description</Label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Type *</Label><Select value={formData.type} onValueChange={v => setFormData({...formData, type: v})}><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{projectTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent></Select></div>
                <div><Label>Client *</Label><Select value={formData.clientId} onValueChange={v => setFormData({...formData, clientId: v})}><SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger><SelectContent>{clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
              </div>
              <div className="grid grid-cols-2 gap-4"><div><Label>Amount ($)</Label><Input type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} /></div><div><Label>Due Date</Label><Input type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} /></div></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Status</Label><Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Pending">Pending</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Completed">Completed</SelectItem></SelectContent></Select></div>
                <div><Label>Stage</Label><Select value={formData.stage} onValueChange={v => setFormData({...formData, stage: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{stages.map(stage => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}</SelectContent></Select></div>
              </div>
            </div>
            <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleAdd} disabled={saving || !formData.name || !formData.type || !formData.clientId}>{saving ? 'Creating...' : 'Create Project'}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Client</TableHead><TableHead>Type</TableHead><TableHead>Stage</TableHead><TableHead>Status</TableHead><TableHead>Amount</TableHead><TableHead>Due Date</TableHead><TableHead className="w-[80px]">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{projects.map((project) => (<TableRow key={project.id}><TableCell><div><p className="font-medium">{project.name}</p><p className="text-sm text-gray-500 truncate max-w-[200px]">{project.description}</p></div></TableCell><TableCell>{project.client.name}</TableCell><TableCell>{project.type}</TableCell><TableCell><Badge className={getStageColor(project.stage)}>{project.stage}</Badge></TableCell><TableCell><Badge className={getStatusColor(project.status)}>{project.status}</Badge></TableCell><TableCell className="font-medium">${project.amount.toLocaleString()}</TableCell><TableCell>{project.dueDate ? new Date(project.dueDate).toLocaleDateString() : '-'}</TableCell><TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View</DropdownMenuItem><DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem><DropdownMenuItem><Paperclip className="h-4 w-4 mr-2" /> Attach File</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
    </div>
  )
}

function InvoicesPanel({ invoices, clients, refresh }: { invoices: Invoice[]; clients: Client[]; refresh: () => void }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({ clientId: '', items: [{ description: '', quantity: '1', unitPrice: '0' }], dueDate: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const addItem = () => { setFormData({...formData, items: [...formData.items, { description: '', quantity: '1', unitPrice: '0' }]}) }
  const updateItem = (index: number, field: string, value: string) => { const newItems = [...formData.items]; newItems[index] = {...newItems[index], [field]: value}; setFormData({...formData, items: newItems}) }
  const removeItem = (index: number) => { if (formData.items.length > 1) { setFormData({...formData, items: formData.items.filter((_, i) => i !== index)}) } }
  const calculateTotals = () => { const subtotal = formData.items.reduce((sum, item) => sum + (parseInt(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0), 0); const tax = subtotal * 0.08; return { subtotal, tax, total: subtotal + tax } }
  const handleCreate = async () => { setSaving(true); try { const totals = calculateTotals(); const res = await fetch('/api/invoices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ clientId: formData.clientId, items: formData.items.map(item => ({ description: item.description, quantity: parseInt(item.quantity) || 1, unitPrice: parseFloat(item.unitPrice) || 0, total: (parseInt(item.quantity) || 1) * (parseFloat(item.unitPrice) || 0) })), ...totals, dueDate: formData.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], notes: formData.notes }) }); if (res.ok) { toast({ title: 'Invoice created successfully' }); setIsAddOpen(false); setFormData({ clientId: '', items: [{ description: '', quantity: '1', unitPrice: '0' }], dueDate: '', notes: '' }); refresh() } } finally { setSaving(false) } }
  const handleMarkPaid = async (id: string) => { try { const res = await fetch(`/api/invoices/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Paid' }) }); if (res.ok) { toast({ title: 'Invoice marked as paid' }); refresh() } } catch (e) { toast({ title: 'Error updating invoice', variant: 'destructive' }) } }
  const getStatusColor = (status: string) => { switch (status) { case 'Draft': return 'bg-gray-100 text-gray-700'; case 'Sent': return 'bg-blue-100 text-blue-700'; case 'Paid': return 'bg-green-100 text-green-700'; case 'Overdue': return 'bg-red-100 text-red-700'; default: return 'bg-gray-100 text-gray-700' } }
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Invoices & Billing</h1><p className="text-gray-500">Manage your invoices and track payments</p></div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild><Button className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Create Invoice</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create New Invoice</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4"><div><Label>Client *</Label><Select value={formData.clientId} onValueChange={v => setFormData({...formData, clientId: v})}><SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger><SelectContent>{clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name} ({c.company || 'No company'})</SelectItem>)}</SelectContent></Select></div><div><Label>Due Date</Label><Input type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} /></div></div>
              <div><div className="flex justify-between items-center mb-2"><Label>Line Items</Label><Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="h-4 w-4 mr-1" /> Add Item</Button></div><div className="space-y-2">{formData.items.map((item, index) => (<div key={index} className="grid grid-cols-12 gap-2 items-center"><Input className="col-span-5" placeholder="Description" value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} /><Input className="col-span-2" type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(index, 'quantity', e.target.value)} /><Input className="col-span-3" type="number" placeholder="Unit Price" value={item.unitPrice} onChange={e => updateItem(index, 'unitPrice', e.target.value)} /><Button type="button" variant="ghost" size="icon" className="col-span-2" onClick={() => removeItem(index)} disabled={formData.items.length <= 1}><Trash2 className="h-4 w-4" /></Button></div>))}</div></div>
              <div className="bg-gray-50 rounded-lg p-4"><div className="flex justify-between text-sm mb-1"><span>Subtotal:</span><span>${calculateTotals().subtotal.toFixed(2)}</span></div><div className="flex justify-between text-sm mb-1"><span>Tax (8%):</span><span>${calculateTotals().tax.toFixed(2)}</span></div><div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total:</span><span>${calculateTotals().total.toFixed(2)}</span></div></div>
              <div><Label>Notes</Label><Textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Payment terms, thank you message, etc." /></div>
            </div>
            <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleCreate} disabled={saving || !formData.clientId}>{saving ? 'Creating...' : 'Create Invoice'}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Invoice #</TableHead><TableHead>Client</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead>Issue Date</TableHead><TableHead>Due Date</TableHead><TableHead className="w-[100px]">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{invoices.map((invoice) => (<TableRow key={invoice.id}><TableCell className="font-medium">{invoice.invoiceNo}</TableCell><TableCell>{invoice.client.name}</TableCell><TableCell className="font-medium">${invoice.total.toLocaleString()}</TableCell><TableCell><Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge></TableCell><TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell><TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell><TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View</DropdownMenuItem><DropdownMenuItem><Download className="h-4 w-4 mr-2" /> Download PDF</DropdownMenuItem>{invoice.status !== 'Paid' && (<DropdownMenuItem onClick={() => handleMarkPaid(invoice.id)}><CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Paid</DropdownMenuItem>)}<DropdownMenuItem><Send className="h-4 w-4 mr-2" /> Send to Client</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
    </div>
  )
}

function MarketingPanel({ campaigns, refresh }: { campaigns: Campaign[]; refresh: () => void }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', type: 'Email', subject: '', content: '', recipients: '0' })
  const [saving, setSaving] = useState(false)
  const handleCreate = async () => { setSaving(true); try { const res = await fetch('/api/campaigns', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, recipients: parseInt(formData.recipients) || 0 }) }); if (res.ok) { toast({ title: 'Campaign created successfully' }); setIsAddOpen(false); setFormData({ name: '', type: 'Email', subject: '', content: '', recipients: '0' }); refresh() } } finally { setSaving(false) } }
  const getStatusColor = (status: string) => { switch (status) { case 'Draft': return 'bg-gray-100 text-gray-700'; case 'Scheduled': return 'bg-blue-100 text-blue-700'; case 'Sent': return 'bg-green-100 text-green-700'; case 'Cancelled': return 'bg-red-100 text-red-700'; default: return 'bg-gray-100 text-gray-700' } }
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Marketing Campaigns</h1><p className="text-gray-500">Manage your email and SMS marketing campaigns</p></div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild><Button className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />New Campaign</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Create Marketing Campaign</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Campaign Name *</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              <div><Label>Type</Label><Select value={formData.type} onValueChange={v => setFormData({...formData, type: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Email">Email</SelectItem><SelectItem value="SMS">SMS</SelectItem></SelectContent></Select></div>
              {formData.type === 'Email' && (<div><Label>Subject Line</Label><Input value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} /></div>)}
              <div><Label>Content</Label><Textarea rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} /></div>
              <div><Label>Estimated Recipients</Label><Input type="number" value={formData.recipients} onChange={e => setFormData({...formData, recipients: e.target.value})} /></div>
            </div>
            <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={handleCreate} disabled={saving || !formData.name}>{saving ? 'Creating...' : 'Create Campaign'}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{campaigns.map((campaign) => (<Card key={campaign.id} className="hover:shadow-lg transition-shadow"><CardContent className="p-6"><div className="flex items-start justify-between mb-4"><div className="flex items-center gap-2">{campaign.type === 'Email' ? (<div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center"><Mail className="h-5 w-5 text-blue-600" /></div>) : (<div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center"><MessageSquare className="h-5 w-5 text-green-600" /></div>)}<div><h3 className="font-semibold">{campaign.name}</h3><p className="text-xs text-gray-500">{campaign.type}</p></div></div><Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge></div>{campaign.subject && (<p className="text-sm text-gray-600 mb-2 font-medium">"{campaign.subject}"</p>)}<p className="text-sm text-gray-500 line-clamp-2 mb-4">{campaign.content}</p><div className="flex justify-between items-center pt-4 border-t"><div className="text-sm"><span className="text-gray-500">Recipients:</span>{' '}<span className="font-medium">{campaign.recipients.toLocaleString()}</span></div>{campaign.sentAt && (<div className="text-xs text-gray-400">Sent: {new Date(campaign.sentAt).toLocaleDateString()}</div>)}</div></CardContent></Card>))}</div>
    </div>
  )
}

function DocumentsPanel({ documents, projects, refresh }: { documents: Document[]; projects: Project[]; refresh: () => void }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', category: 'Designs', projectId: '' })
  const [saving, setSaving] = useState(false)
  const categories = ['Designs', 'Proofs', 'Contracts', 'Invoices', 'Other']
  const getCategoryColor = (category: string) => { switch (category) { case 'Designs': return 'bg-purple-100 text-purple-700'; case 'Proofs': return 'bg-orange-100 text-orange-700'; case 'Contracts': return 'bg-blue-100 text-blue-700'; case 'Invoices': return 'bg-green-100 text-green-700'; default: return 'bg-gray-100 text-gray-700' } }
  const formatFileSize = (kb: number) => { if (kb < 1024) return `${kb.toFixed(0)} KB`; return `${(kb / 1024).toFixed(1)} MB` }
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Document Management</h1><p className="text-gray-500">Upload and manage project files and documents</p></div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild><Button className="bg-blue-600 hover:bg-blue-700"><Upload className="h-4 w-4 mr-2" />Upload Document</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Upload Document</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"><Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" /><p className="text-gray-600 mb-2">Drag & drop your file here</p><p className="text-sm text-gray-400">or click to browse</p></div>
              <div><Label>Document Name *</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              <div><Label>Category</Label><Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Related Project (Optional)</Label><Select value={formData.projectId} onValueChange={v => setFormData({...formData, projectId: v})}><SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger><SelectContent>{projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button onClick={() => { toast({ title: 'Demo: Document upload simulated' }); setIsAddOpen(false) }} disabled={saving || !formData.name}>Upload</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Document Name</TableHead><TableHead>Category</TableHead><TableHead>Size</TableHead><TableHead>Related Project</TableHead><TableHead>Uploaded</TableHead><TableHead className="w-[80px]">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{documents.map((doc) => (<TableRow key={doc.id}><TableCell><div className="flex items-center gap-3"><div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center"><FileCheck className="h-5 w-5 text-gray-500" /></div><span className="font-medium">{doc.name}</span></div></TableCell><TableCell><Badge className={getCategoryColor(doc.category)}>{doc.category}</Badge></TableCell><TableCell>{formatFileSize(doc.fileSize)}</TableCell><TableCell>{doc.project?.name || '-'}</TableCell><TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell><TableCell><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> Preview</DropdownMenuItem><DropdownMenuItem><Download className="h-4 w-4 mr-2" /> Download</DropdownMenuItem><DropdownMenuItem className="text-red-600"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
    </div>
  )
}

function SettingsPanel() {
  return (
    <div className="p-6 space-y-6">
      <div><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-500">Configure your CRM preferences</p></div>
      <div className="grid gap-6">
        <Card><CardHeader><CardTitle>Company Profile</CardTitle><CardDescription>Your business information</CardDescription></CardHeader><CardContent className="space-y-4"><div className="grid md:grid-cols-2 gap-4"><div><Label>Company Name</Label><Input defaultValue="360 Print Works" /></div><div><Label>Email</Label><Input defaultValue="info@360printworks.com" /></div></div><div className="grid md:grid-cols-2 gap-4"><div><Label>Phone</Label><Input defaultValue="(555) 123-4567" /></div><div><Label>Website</Label><Input defaultValue="www.360printworks.com" /></div></div><div><Label>Address</Label><Input defaultValue="123 Print Street, Design City, DC 12345" /></div><Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button></CardContent></Card>
        <Card><CardHeader><CardTitle>Invoice Settings</CardTitle><CardDescription>Customize your invoice appearance</CardDescription></CardHeader><CardContent className="space-y-4"><div className="grid md:grid-cols-2 gap-4"><div><Label>Invoice Prefix</Label><Input defaultValue="INV-" /></div><div><Label>Next Invoice Number</Label><Input defaultValue="00008" /></div></div><div className="grid md:grid-cols-2 gap-4"><div><Label>Default Tax Rate (%)</Label><Input defaultValue="8" /></div><div><Label>Payment Terms (Days)</Label><Input defaultValue="30" /></div></div><div><Label>Invoice Footer Notes</Label><Textarea defaultValue="Thank you for your business! Payment is due within 30 days." /></div><Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button></CardContent></Card>
        <Card><CardHeader><CardTitle>Email Settings</CardTitle><CardDescription>Configure email notifications and SMTP</CardDescription></CardHeader><CardContent className="space-y-4"><div className="grid md:grid-cols-2 gap-4"><div><Label>SMTP Server</Label><Input placeholder="smtp.example.com" /></div><div><Label>SMTP Port</Label><Input placeholder="587" /></div></div><div className="grid md:grid-cols-2 gap-4"><div><Label>Username</Label><Input placeholder="your-email@example.com" /></div><div><Label>Password</Label><Input type="password" placeholder="••••••••" /></div></div><Button className="bg-blue-600 hover:bg-blue-700">Save Settings</Button></CardContent></Card>
      </div>
    </div>
  )
}

export default function CRMPage() {
  const { user, logout, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  const handleLogout = () => { logout(); router.push('/login') }

  useEffect(() => { if (!authLoading && !user) { router.push('/login') } }, [user, authLoading, router])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [dash, leadsRes, clientsRes, projectsRes, invoicesRes, campaignsRes, docsRes] = await Promise.all([
        fetch('/api/dashboard').then(r => r.json()),
        fetch('/api/leads').then(r => r.json()),
        fetch('/api/clients').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/invoices').then(r => r.json()),
        fetch('/api/campaigns').then(r => r.json()),
        fetch('/api/documents').then(r => r.json())
      ])
      setDashboardData(dash); setLeads(leadsRes); setClients(clientsRes); setProjects(projectsRes); setInvoices(invoicesRes); setCampaigns(campaignsRes); setDocuments(docsRes)
    } finally { setLoading(false) }
  }

  useEffect(() => { if (user) { fetchAll() } }, [user])

  if (authLoading || !user) { return (<div className="flex h-screen items-center justify-center"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div><p className="text-gray-600">Loading...</p></div></div>) }

  const renderContent = () => {
    if (loading) { return (<div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>) }
    switch (activeTab) {
      case 'dashboard': return <DashboardPanel data={dashboardData} />
      case 'leads': return <LeadsPanel leads={leads} refresh={fetchAll} />
      case 'clients': return <ClientsPanel clients={clients} refresh={fetchAll} />
      case 'projects': return <ProjectsPanel projects={projects} clients={clients} refresh={fetchAll} />
      case 'invoices': return <InvoicesPanel invoices={invoices} clients={clients} refresh={fetchAll} />
      case 'marketing': return <MarketingPanel campaigns={campaigns} refresh={fetchAll} />
      case 'documents': return <DocumentsPanel documents={documents} projects={projects} refresh={fetchAll} />
      case 'settings': return <SettingsPanel />
      default: return <DashboardPanel data={dashboardData} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CRMHeader user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
