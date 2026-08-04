// app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect, JSX } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EditPackageForm from "./EditPackageForm";
import CreatePackageForm from "./CreatePackageForm";
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
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      setStats(prev => ({ ...prev, totalPackages: packagesData.length }));
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {session?.user?.name || session?.user?.email}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-black font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create Package
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
          {/* Live Events - Dynamic from packages */}
          <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Upcoming Tours</h2>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                {packages.length} active packages
              </span>
            </div>
            <div className="space-y-3">
              {packages.filter(p => p.isActive).slice(0, 5).map((pkg: any) => (
                <div key={pkg.id} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition">
                  <div>
                    <p className="font-medium text-white">{pkg.title}</p>
                    <p className="text-sm text-gray-400">
                      {pkg.duration} • {pkg.destination}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">
                      {pkg.isOnSale ? "On Sale" : "Active"}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {pkg.bookedSeats || 0}/{pkg.totalSeats || 40} booked
                    </p>
                  </div>
                </div>
              ))}
              {packages.filter(p => p.isActive).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No active packages. Click "Create Package" to add one.
                </div>
              )}
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
        <div className="border-b border-yellow-500/20 mb-6 overflow-x-auto">
          <nav className="flex gap-6 min-w-max">
            {["overview", "leads", "bookings", "packages", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === tab
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
                          <td className="py-3 text-gray-300">{lead.email}<br />{lead.phone}</td>
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
          {activeTab === "packages" && (
            <PackagesManagement
              packages={packages}
              onRefresh={fetchDashboardData}
            />
          )}
          {activeTab === "analytics" && <AnalyticsDashboard />}
        </div>
      </div>

      {showCreateModal && (
        <CreatePackageForm
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchDashboardData();
          }}
        />
      )}
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-white">All Leads</h2>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 sm:flex-none min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full sm:w-auto pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500"
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-white">All Bookings</h2>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 sm:flex-none min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full sm:w-auto pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500"
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

// Packages Management Component - With Edit functionality
function PackagesManagement({ packages: initialPackages, onRefresh }: { packages: any[]; onRefresh: () => void }) {
  const [packages, setPackages] = useState(initialPackages);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/packages");
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await fetch(`/api/admin/packages/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          await fetchPackages();
          onRefresh();
        } else {
          alert("Failed to delete package");
        }
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (response.ok) {
        await fetchPackages();
        onRefresh();
      }
    } catch (error) {
      console.error("Error toggling package status:", error);
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "active" && pkg.isActive) ||
                         (filterStatus === "inactive" && !pkg.isActive) ||
                         (filterStatus === "onsale" && pkg.isOnSale);
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6">
        {/* Header and search/filter controls (same as before) */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Tour Packages</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-black font-medium flex items-center gap-2 hover:from-yellow-300 hover:to-yellow-500 transition"
          >
            <Plus className="w-4 h-4" /> Create Package
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages by title or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-yellow-500"
          >
            <option value="all">All Packages</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="onsale">On Sale</option>
          </select>
          <button
            onClick={fetchPackages}
            className="px-4 py-2 bg-gray-700/50 rounded-lg text-white hover:bg-gray-700 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading packages...</div>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No packages found</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg"
            >
              Create your first package
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPackages.map((pkg: any) => (
              <div key={pkg.id} className="bg-gray-700/30 rounded-xl overflow-hidden border border-gray-600 hover:border-yellow-500/50 transition-all group">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  {pkg.images && pkg.images[0] ? (
                    <img
                      src={pkg.images[0]}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 flex items-center justify-center">
                      <Package className="w-16 h-16 text-yellow-400/50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {pkg.isOnSale && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        On Sale
                      </span>
                    )}
                    {!pkg.isActive && (
                      <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(pkg.id, pkg.isActive)}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        pkg.isActive 
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" 
                          : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                      }`}
                    >
                      {pkg.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{pkg.title}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                    <MapPin className="w-4 h-4 ml-2" />
                    <span>{pkg.destination}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{pkg.shortDesc || pkg.description?.substring(0, 100)}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="text-2xl font-bold text-yellow-400">₹{pkg.price.toLocaleString()}</span>
                      {pkg.discountPrice && (
                        <span className="text-gray-400 text-sm ml-2 line-through">₹{pkg.discountPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/packages/${pkg.slug}`}
                        target="_blank"
                        className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </a>
                      <button
                        onClick={() => setEditingPackage(pkg)}
                        className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition"
                      >
                        <Edit className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-600 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Total Seats: {pkg.totalSeats || 40}</span>
                    <span className="text-gray-400 text-sm">Booked: {pkg.bookedSeats || 0}</span>
                    <button className="text-yellow-400 text-sm hover:underline">
                      Generate Payment Link
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Package Modal */}
      {showAddModal && (
        <CreatePackageForm
          onClose={() => {
            setShowAddModal(false);
            fetchPackages();
          }}
          onSuccess={() => {
            setShowAddModal(false);
            fetchPackages();
            onRefresh();
          }}
        />
      )}

      {/* Edit Package Modal */}
      {editingPackage && (
        <EditPackageForm
          packageId={editingPackage.id}
          onClose={() => setEditingPackage(null)}
          onSuccess={() => {
            setEditingPackage(null);
            fetchPackages();
            onRefresh();
          }}
        />
      )}
    </>
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
