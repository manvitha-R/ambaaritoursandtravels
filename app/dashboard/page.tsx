// app/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const role = session?.user?.role;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome, {session?.user?.name || session?.user?.email}
          </h1>
          <p className="text-gray-300 mb-6">
            Role: <span className="text-yellow-400 font-semibold">{role}</span>
          </p>

          {/* Role-Based Content */}
          {role === "ADMIN" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-4">Admin Controls</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">User Management</h3>
                  <p className="text-gray-400 text-sm mt-1">View and manage all users</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">Sales Analytics</h3>
                  <p className="text-gray-400 text-sm mt-1">View sales reports</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">System Settings</h3>
                  <p className="text-gray-400 text-sm mt-1">Configure system preferences</p>
                </div>
              </div>
            </div>
          )}

          {role === "SALES" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-4">Sales Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">Lead Management</h3>
                  <p className="text-gray-400 text-sm mt-1">Track and manage customer leads</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">Booking Overview</h3>
                  <p className="text-gray-400 text-sm mt-1">View recent bookings</p>
                </div>
              </div>
            </div>
          )}

          {role === "USER" && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-4">My Account</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">My Bookings</h3>
                  <p className="text-gray-400 text-sm mt-1">View your upcoming trips</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400">Profile Settings</h3>
                  <p className="text-gray-400 text-sm mt-1">Update your information</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}