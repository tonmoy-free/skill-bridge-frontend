"use client";

import * as React from "react";
import {
  MoreHorizontal,
  ShieldCheck,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  UserCog,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import AlertModal from "../manageUser/alertModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUsersFromApi } from "@/services/user.client";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Swal from "sweetalert2";
import { userdeleteById } from "@/actions/manageUser.action";

// Types based on your Prisma Schema
export type User = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  status: "ACTIVE" | "BLOCKED";
  image?: string;
  createdAt: string;
};

export default function ManageUsersPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(10); // server limit param

  const [users, setUsers] = React.useState<User[]>([]);
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [totalPagesState, setTotalPagesState] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<"STUDENT" | "TUTOR" | "ADMIN">("STUDENT");

  // Fetch users from server when page changes
  React.useEffect(() => {
    const ac = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await getUsersFromApi({ page: currentPage, limit: itemsPerPage });
        if ((result as any).error) throw new Error((result as any).error);
        setUsers(result.data || []);
        setTotalUsers(result.total || 0);
        setTotalPagesState(result.totalPages || Math.max(1, Math.ceil((result.total || 0) / itemsPerPage)));
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, [currentPage, itemsPerPage]);

  // client-side filtering within current page
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, totalPagesState || Math.ceil(totalUsers / itemsPerPage));
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const startCount = totalUsers === 0 ? 0 : indexOfFirstItem + 1;
  const endCount = totalUsers === 0 ? 0 : Math.min(indexOfFirstItem + filteredUsers.length, totalUsers);
  const currentItems = filteredUsers;

  const handleDelete = (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to remove this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true, // কনফার্ম বাটনে ক্লিক করলে লোডার দেখাবে
      preConfirm: async () => {
        // এই অংশটি 'Yes, delete' ক্লিক করার পর এবং পপআপ বন্ধ হওয়ার আগে রান হবে
        try {
          const response = await userdeleteById(id, 10);
          if (response.error) {
            throw new Error(response.error.message); // এরর থাকলে ক্যাচ ব্লকে পাঠিয়ে দেবে
          }
          return response; // সাকসেস হলে রেসপন্স রিটার্ন করবে
        } catch (error: any) {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading() // লোডিং অবস্থায় বাইরে ক্লিক করলে যেন বন্ধ না হয়
    }).then((result) => {
      if (result.isConfirmed) {
        // সাকসেস মেসেজ দেখানো
        Swal.fire(
          'Deleted!',
          'The user has been removed.',
          'success'
        ).then(() => {
          // UI স্টেট আপডেট (অটোমেটিক রিলোড ছাড়া ইউজার লিস্ট থেকে সরিয়ে দেওয়া)
          setUsers(prev => prev.filter(user => user.id !== id));
          setTotalUsers(prev => prev - 1);
        });
      }
    });
  };

  return (
    <div className="w-full p-6 space-y-6 bg-white dark:bg-slate-950 min-h-screen">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Users</h2>
          <p className="text-muted-foreground">Oversee user accounts, roles, and status.</p>
        </div>
        <Button className="w-fit">
          <UserCog className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
          className="pl-10"
        />
      </div>

      {/* Per-page selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-muted-foreground">Per page:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10) || 10;
            setItemsPerPage(v);
            setCurrentPage(1);
          }}
          className="px-2 py-1 rounded border bg-white dark:bg-slate-900 text-sm"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Manual Table Implementation */}
      <div className="rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900">
            <TableRow>
              <TableHead className="w-[300px]">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-rose-600">
                  {error}
                </TableCell>
              </TableRow>
            ) : currentItems.length > 0 ? (
              currentItems.map((user) => (
                <TableRow key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {user.name?.charAt(0) ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 leading-none">
                          {user.name}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"} className="rounded-md px-2 py-0.5">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-md px-2 py-0.5 border-none",
                        user.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                      )}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                          Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setSelectedRole(user.role);
                            setRoleDialogOpen(true);
                          }}
                        >
                          <ShieldCheck className="mr-2 h-4 w-4 text-blue-500" />
                          Update Role
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Custom Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Showing {startCount} to {endCount} of {totalUsers} users
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || totalUsers === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalUsers === 0}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Update Role Modal */}
      <AlertModal
        isOpen={roleDialogOpen}
        onOpenChange={setRoleDialogOpen}
        title="Update User Role"
        description="Select a new role for this user:"
        actionLabel="Update Role"
        cancelLabel="Cancel"
        onAction={async () => {
          if (selectedUserId) {
            // TODO: Implement update role API call
            console.log("Updating role for user:", selectedUserId, "to:", selectedRole);
            // await updateUserRoleApi(selectedUserId, selectedRole);
          }
        }}
      >
        <div className="flex items-center gap-3 mt-4">
          <label htmlFor="roleSelect" className="text-sm font-medium">
            Role:
          </label>
          <select
            id="roleSelect"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as "STUDENT" | "TUTOR" | "ADMIN")}
            className="px-3 py-2 rounded border bg-white dark:bg-slate-800 text-sm border-slate-300 dark:border-slate-600"
          >
            <option value="STUDENT">Student</option>
            <option value="TUTOR">Tutor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </AlertModal>
    </div>
  );
}

// Utility function for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
