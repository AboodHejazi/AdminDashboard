"use client";

import { useState, useMemo } from "react";
import { Customer } from "@/app/types/customer";
import { CustomersTable } from "../components/customers/CustomersTable";
import { getColumns } from "../components/customers/columns";
import { CustomerToolbar } from "../components/customers/Toolbar";
import { AddCustomerModal } from "../components/customers/AddCustomerModal";
import { CustomerStats } from "../components/customers/CustomerStats";

export default function CustomersPage() {
  const [data, setData] = useState<Customer[]>([
    { id: "1", name: "Ahmed Salem", email: "ahmed@example.com", phone: "123456", avatar: "/avatar1.png", totalOrders: 5, totalSpent: 450, status: "Active" },
    { id: "2", name: "Sara Ali", email: "sara@example.com", phone: "987654", avatar: "/avatar2.png", totalOrders: 2, totalSpent: 120, status: "Blocked" },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // دالة الحذف
  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  // دالة طلب التعديل
  const handleEditRequest = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  // دالة الحفظ (تعديل أو إضافة)
  const handleSaveCustomer = (customer: Customer) => {
    if (editingCustomer) {
      setData((prev) => prev.map((item) => (item.id === customer.id ? customer : item)));
    } else {
      setData((prev) => [customer, ...prev]);
    }
    setEditingCustomer(null);
    setIsModalOpen(false);
  };

  // تجهيز الأعمدة مع تمرير الدوال
  const columns = useMemo(() => getColumns(handleDelete, handleEditRequest), []);

  // منطق الفلترة والبحث
  const filteredData = useMemo(() => {
    return data.filter((customer) => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchValue, statusFilter]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-black text-slate-800 mb-2">Customers</h1>
      <p className="text-slate-500 mb-6">Manage your relationships and track customer value.</p>
      
      <div className="pb-2">
        <CustomerStats />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="pb-2">
          <CustomerToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filterOptions={[
              { label: "All Customers", value: "all" },
              { label: "Active", value: "Active" },
              { label: "Blocked", value: "Blocked" },
            ]}
            onFilterChange={setStatusFilter}
            addLabel="Add Customer"
            onAddClick={() => {
              setEditingCustomer(null);
              setIsModalOpen(true);
            }}
          />
        </div>

        <CustomersTable data={filteredData} columns={columns} /> 
      </div>

      <AddCustomerModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setEditingCustomer(null);
        }}
        onAdd={handleSaveCustomer}
        initialData={editingCustomer} 
      />
    </div>
  );
}