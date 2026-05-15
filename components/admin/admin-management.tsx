"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Trash2, UserPlus, ShieldAlert, Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { addAdmin, deleteUser, updateRole } from "@/app/actions/auth"

export function AdminManagement({ users, currentUserId, currentUserRole }: { users: any[], currentUserId: string, currentUserRole: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "ADMIN" as "ADMIN" | "USER" })

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading("adding")
    try {
      const result = await addAdmin(formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("User added successfully")
        setShowAddForm(false)
        setFormData({ name: "", email: "", password: "", role: "ADMIN" })
      }
    } catch (error) {
      toast.error("Failed to add user")
    } finally {
      setLoading(null)
    }
  }

  const handleRoleChange = async (userId: string, currentRole: string) => {
    if (currentUserRole !== "MASTER") {
      toast.error("Only Master Admin can manage roles")
      return
    }

    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN"
    setLoading(userId)
    try {
      const result = await updateRole(userId, newRole)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`Role updated to ${newRole}`)
      }
    } catch (error) {
      toast.error("Failed to update role")
    } finally {
      setLoading(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (currentUserRole !== "MASTER") {
      toast.error("Only Master Admin can delete users")
      return
    }

    if (!confirm("Are you sure you want to delete this user?")) return

    setLoading(userId)
    try {
      const result = await deleteUser(userId)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("User deleted successfully")
      }
    } catch (error) {
      toast.error("Failed to delete user")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between bg-card p-6 border border-border rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">RBAC Management</h1>
            <p className="text-sm text-gray-400">Manage admins and access levels</p>
          </div>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add New User
        </Button>
      </div>

      {/* Add User Form Modal-style */}
      {showAddForm && (
        <div className="p-6 bg-white/5 border border-primary/20 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Add Administrative User</h3>
            <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              placeholder="Full Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="bg-white/5 border-white/10"
            />
            <Input 
              type="email"
              placeholder="Email Address" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="bg-white/5 border-white/10"
            />
            <Input 
              type="password"
              placeholder="Temporary Password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              className="bg-white/5 border-white/10"
            />
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value as any})}
              className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
            <div className="md:col-span-2">
              <Button type="submit" disabled={loading === "adding"} className="w-full bg-primary text-primary-foreground">
                {loading === "adding" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Create User"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* User Table */}
      <div className="overflow-hidden bg-card border border-border rounded-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-white/5">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {user.name?.[0] || user.email?.[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ${
                    user.role === "MASTER" ? "bg-red-500/20 text-red-500" :
                    user.role === "ADMIN" ? "bg-primary/20 text-primary" :
                    "bg-gray-500/20 text-gray-500"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {currentUserRole === "MASTER" && user.id !== currentUserId && (
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleRoleChange(user.id, user.role)}
                        disabled={loading === user.id}
                      >
                        <Shield className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-red-500/60 hover:text-red-500"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={loading === user.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
