// app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect, JSX } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Package, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle, 
  XCircle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  Activity,
  CreditCard,
  UserCheck,
  MessageSquare,
  Award,
  BarChart3,
  PieChart,
  Settings
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalPackages: 0,
    pendingBookings: 0,
    todayRevenue: 0,
    conversionRate: 0,
    activeUsers: 0
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SALES") {
      router.push("/dashboard");
    } else {
      fetchDashboardData();
    }
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await fetch("/api/admin/stats");
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch recent leads
      const leadsRes = await fetch("/api/admin/leads?limit=10");
      const leadsData = await leadsRes.json();
      setRecentLeads(leadsData);

      // Fetch recent bookings
      const bookingsRes = await fetch("/api/admin/bookings?limit=10");
      const bookingsData = await bookingsRes.json();
      setRecentBookings(bookingsData);

      // Fetch packages
      const packagesRes = await fetch("/api/admin/packages");
      const packagesData = await packagesRes.json();
      setPackages(packagesData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-yellow-500/20 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {session?.user?.name || session?.user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <span className="text-black font-bold">
                    {session?.user?.name?.charAt(0) || "A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Leads"
            value={stats.totalLeads}
            icon={<Users className="w-6 h-6" />}
            color="blue"
            trend="+12%"
          />
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<Calendar className="w-6 h-6" />}
            color="green"
            trend="+8%"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon={<DollarSign className="w-6 h-6" />}
            color="yellow"
            trend="+15%"
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            icon={<TrendingUp className="w-6 h-6" />}
            color="purple"
            trend="+2%"
          />
        </div>

        {/* Live Events & Today's Revenue Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Live Events */}
          <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Live Events</h2>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                24 events, 43 batches
              </span>
            </div>
            <div className="space-y-3">
              {packages.slice(0, 3).map((pkg: any) => (
                <div key={pkg.id} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{pkg.title}</p>
                    <p className="text-sm text-gray-400">Fri, 15th May • {pkg.bookedSeats || 0}/{pkg.totalSeats} booked</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">
                    {pkg.isOnSale ? "On Sale" : "Active"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Revenue & Stats */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Today's Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Today's Revenue</span>
                <span className="text-2xl font-bold text-green-400">₹{stats.todayRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Today's Refunds</span>
                <span className="text-2xl font-bold text-red-400">₹0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pending Settlement</span>
                <span className="text-2xl font-bold text-yellow-400">₹0</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <span className="text-gray-400">Live Check-ins</span>
                <span className="text-lg font-semibold text-white">0/0 booked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-yellow-500/20 mb-6">
          <nav className="flex gap-6">
            {["overview", "leads", "bookings", "packages", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Recent Leads */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Recent Leads</h2>
                  <button className="text-yellow-400 text-sm hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 text-gray-400 font-medium">Name</th>
                        <th className="text-left py-3 text-gray-400 font-medium">Contact</th>
                        <th className="text-left py-3 text-gray-400 font-medium">Destination</th>
                        <th className="text-left py-3 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLeads.map((lead: any) => (
                        <tr key={lead.id} className="border-b border-gray-700/50">
                          <td className="py-3 text-white">{lead.name}</td>
                          <td className="py-3 text-gray-300">{lead.email}<br/>{lead.phone}</td>
                          <td className="py-3 text-gray-300">{lead.destination}</td>
                          <td className="py-3">
                            <StatusBadge status={lead.status} />
                          </td>
                          <td className="py-3">
                            <button className="p-1 hover:bg-gray-700 rounded">
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
                  <button className="text-yellow-400 text-sm hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 text-gray-400 font-medium">Booking #</th>
                        <th className="text-left py-3 text-gray-400 font-medium">Customer</th>
                        <th className="text-left py-3 text-gray-400 font-medium">Package</th>
                        <th className="text-left py-3 text-gray-400 font-medium">Amount</th>
                        <th className="text-left py-3 text-gray-400 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking: any) => (
                        <tr key={booking.id} className="border-b border-gray-700/50">
                          <td className="py-3 text-white">{booking.bookingNumber}</td>
                          <td className="py-3 text-gray-300">{booking.customerName}</td>
                          <td className="py-3 text-gray-300">{booking.package?.title}</td>
                          <td className="py-3 text-white">₹{booking.totalAmount.toLocaleString()}</td>
                          <td className="py-3">
                            <BookingStatusBadge status={booking.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "leads" && <LeadsManagement />}
          {activeTab === "bookings" && <BookingsManagement />}
          {activeTab === "packages" && <PackagesManagement />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon,
  color,
  trend,
}: {
  title: string;
  value: string | number;
  icon: JSX.Element;
  color: "blue" | "green" | "yellow" | "purple";
  trend: string;
}) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-500 to-yellow-600",
    purple: "from-purple-500 to-purple-600",
  };
  
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6 hover:scale-105 transition-transform">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-green-400 text-xs mt-2">↑ {trend}</p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-r ${colors[color]} rounded-xl flex items-center justify-center`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    NEW: { color: "bg-blue-500/20 text-blue-400", label: "New" },
    CONTACTED: { color: "bg-yellow-500/20 text-yellow-400", label: "Contacted" },
    QUALIFIED: { color: "bg-purple-500/20 text-purple-400", label: "Qualified" },
    CONVERTED: { color: "bg-green-500/20 text-green-400", label: "Converted" },
    LOST: { color: "bg-red-500/20 text-red-400", label: "Lost" },
  };
  
  const config = statusConfig[status] || statusConfig.NEW;
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}

function BookingStatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    PENDING: { color: "bg-yellow-500/20 text-yellow-400", label: "Pending" },
    CONFIRMED: { color: "bg-green-500/20 text-green-400", label: "Confirmed" },
    CANCELLED: { color: "bg-red-500/20 text-red-400", label: "Cancelled" },
    COMPLETED: { color: "bg-blue-500/20 text-blue-400", label: "Completed" },
  };
  
  const config = statusConfig[status] || statusConfig.PENDING;
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}

// Leads Management Component
function LeadsManagement() {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">All Leads</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500"
            />
          </div>
          <button className="px-4 py-2 bg-gray-700/50 rounded-lg text-white hover:bg-gray-700 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-black font-medium flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 text-gray-400">Name</th>
              <th className="text-left py-3 text-gray-400">Email</th>
              <th className="text-left py-3 text-gray-400">Phone</th>
              <th className="text-left py-3 text-gray-400">Destination</th>
              <th className="text-left py-3 text-gray-400">Travelers</th>
              <th className="text-left py-3 text-gray-400">Source</th>
              <th className="text-left py-3 text-gray-400">Status</th>
              <th className="text-left py-3 text-gray-400">Date</th>
              <th className="text-left py-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Lead rows will be populated here */}
            <tr className="border-b border-gray-700/50">
              <td className="py-3 text-white">Rahul Sharma</td>
              <td className="py-3 text-gray-300">rahul@example.com</td>
              <td className="py-3 text-gray-300">9876543210</td>
              <td className="py-3 text-gray-300">Thailand</td>
              <td className="py-3 text-gray-300">4</td>
              <td className="py-3 text-gray-300">Website</td>
              <td className="py-3"><StatusBadge status="NEW" /></td>
              <td className="py-3 text-gray-300">2024-01-15</td>
              <td className="py-3 flex gap-2">
                <button className="p-1 hover:bg-gray-700 rounded"><Eye className="w-4 h-4 text-gray-400" /></button>
                <button className="p-1 hover:bg-gray-700 rounded"><Edit className="w-4 h-4 text-gray-400" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Bookings Management Component
function BookingsManagement() {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">All Bookings</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500"
            />
          </div>
          <button className="px-4 py-2 bg-gray-700/50 rounded-lg text-white hover:bg-gray-700 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 text-gray-400">Booking #</th>
              <th className="text-left py-3 text-gray-400">Customer</th>
              <th className="text-left py-3 text-gray-400">Package</th>
              <th className="text-left py-3 text-gray-400">Travel Date</th>
              <th className="text-left py-3 text-gray-400">Amount</th>
              <th className="text-left py-3 text-gray-400">Paid</th>
              <th className="text-left py-3 text-gray-400">Status</th>
              <th className="text-left py-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700/50">
              <td className="py-3 text-white">#AMB-001</td>
              <td className="py-3 text-gray-300">John Doe</td>
              <td className="py-3 text-gray-300">Thailand 3N/4D</td>
              <td className="py-3 text-gray-300">2024-02-15</td>
              <td className="py-3 text-white">₹49,999</td>
              <td className="py-3 text-white">₹25,000</td>
              <td className="py-3"><BookingStatusBadge status="CONFIRMED" /></td>
              <td className="py-3 flex gap-2">
                <button className="p-1 hover:bg-gray-700 rounded"><Eye className="w-4 h-4 text-gray-400" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Packages Management Component
function PackagesManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Tour Packages</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-black font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Package Cards */}
        <div className="bg-gray-700/30 rounded-xl overflow-hidden border border-gray-600">
          <div className="relative h-48 bg-gradient-to-r from-yellow-400/20 to-orange-400/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-16 h-16 text-yellow-400/50" />
            </div>
            {true && (
              <span className="absolute top-4 right-4 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                On Sale
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2">THAILAND 3N/4D (WITH FLIGHT)</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              <span>3 Nights / 4 Days</span>
              <MapPin className="w-4 h-4 ml-2" />
              <span>Thailand</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className="text-2xl font-bold text-yellow-400">₹49,999</span>
                <span className="text-gray-400 text-sm ml-2 line-through">₹59,999</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500">
                  <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500">
                  <Edit className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-600 flex justify-between">
              <span className="text-gray-400 text-sm">Total Seats: 40</span>
              <span className="text-gray-400 text-sm">Booked: 0</span>
              <button className="text-yellow-400 text-sm hover:underline">
                Generate Payment Link
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700/30 rounded-xl overflow-hidden border border-gray-600">
          <div className="relative h-48 bg-gradient-to-r from-green-400/20 to-teal-400/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-16 h-16 text-green-400/50" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2">PHU QUOC PARADISE ESCAPE 2026</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              <span>4 Nights / 5 Days</span>
              <MapPin className="w-4 h-4 ml-2" />
              <span>Vietnam</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className="text-2xl font-bold text-yellow-400">₹59,999</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500">
                  <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500">
                  <Edit className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics Dashboard Component
function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">Revenue chart will appear here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Lead Conversion</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">Conversion chart will appear here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
          <h3 className="text-lg font-bold text-white mb-3">Top Destinations</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Thailand</span>
              <span className="text-yellow-400">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Vietnam</span>
              <span className="text-yellow-400">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Kashmir</span>
              <span className="text-yellow-400">20%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
          <h3 className="text-lg font-bold text-white mb-3">Lead Sources</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Website</span>
              <span className="text-yellow-400">60%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Social Media</span>
              <span className="text-yellow-400">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Referrals</span>
              <span className="text-yellow-400">15%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
          <h3 className="text-lg font-bold text-white mb-3">Booking Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Confirmed</span>
              <span className="text-green-400">42%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Pending</span>
              <span className="text-yellow-400">35%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Completed</span>
              <span className="text-blue-400">23%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}