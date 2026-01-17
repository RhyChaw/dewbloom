"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, GitBranch, Users, Settings, LogOut, Sparkles, Layers, Network } from "lucide-react"
import ModulesTab from "@/components/admin/ModulesTab"
import FlowTab from "@/components/admin/FlowTab"
import SubscribersTab from "@/components/admin/SubscribersTab"
import SettingsTab from "@/components/admin/SettingsTab"
import ChaptersTab from "@/components/admin/ChaptersTab"
import RelationsTab from "@/components/admin/RelationsTab"
import { ToastContainer } from "@/components/Toast"
import { useToast } from "@/hooks/useToast"

const TABS = [
  { id: 'chapters', label: 'Chapters', icon: Layers, color: 'text-purple-600' },
  { id: 'modules', label: 'Modules', icon: BookOpen, color: 'text-purple-600' },
  { id: 'flow', label: 'Flow', icon: GitBranch, color: 'text-indigo-600' },
  { id: 'relations', label: 'Relations', icon: Network, color: 'text-blue-600' },
  { id: 'subscribers', label: 'Subscribers', icon: Users, color: 'text-emerald-600' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' },
]

export default function AdminPanel() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('modules')
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toasts, removeToast } = useToast()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/check", { credentials: "include" })
      if (response.ok) {
        setAuthenticated(true)
      } else {
        router.push("/admin/login")
      }
    } catch (err) {
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200/50 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">Content Management</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : tab.color}`} />
                <span className={`font-medium ${isActive ? 'text-white' : ''}`}>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'chapters' && <ChaptersTab />}
          {activeTab === 'modules' && <ModulesTab />}
          {activeTab === 'flow' && <FlowTab />}
          {activeTab === 'relations' && <RelationsTab />}
          {activeTab === 'subscribers' && <SubscribersTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}
