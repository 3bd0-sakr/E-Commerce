"use client";

import { AddressContext } from "@/components/context/addrssesContext";
import { Loader } from "lucide-react";
import { useContext, useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"info" | "addresses">("info");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="flex gap-6 border-b mb-8">
        {/* personal info */}
        <Tab title="Personal Info" active={activeTab === "info"} onClick={() => setActiveTab("info")} />
        {/* addresses */}
        <Tab title="Addresses" active={activeTab === "addresses"} onClick={() => setActiveTab("addresses")} />
      </div>

      {/* Content */}
      {activeTab === "info" && <PersonalInfo />}
      {activeTab === "addresses" && <Addresses />}
    </div>
  );
}

/* ================= Tabs ================= */
function Tab({ title, active, onClick, }: {
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick}
      className={`pb-3 font-medium transition cursor-pointer ${active ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"}`}> {title}
    </button>
  );
}

/* ======= Personal Info =======data static */
function PersonalInfo() {
  return (
    <div className="max-w-md space-y-4">
      <div>
        <label className="block text-sm text-gray-500">Name</label>
        <input disabled value="User Name" className="border w-full p-2 rounded bg-gray-100" />
      </div>

      <div>
        <label className="block text-sm text-gray-500">Email</label>
        <input disabled value="user@email.com" className="border w-full p-2 rounded bg-gray-100" />
      </div>

      <div>
        <label className="block text-sm text-gray-500">Phone</label>
        <input disabled value="01000000000" className="border w-full p-2 rounded bg-gray-100" />
      </div>
    </div>
  );
}

/* ================= Addresses ================= */
function Addresses() {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { addressData, isLoading, addAddress, removeAddress, } = useContext(AddressContext)!;
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    city: "",
    phone: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addAddress(formData);
    setFormData({ name: "", details: "", city: "", phone: "" });
  }

  if (isLoading) {
    return <p><Loader className="animate-spin" /></p>;
  }

  return (
    <div className="space-y-8">
      {/* Add Address */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-2xl">
        {/*name */}
        <input placeholder="Address Name" className="border p-2 rounded" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        {/* city */}
        <input placeholder="City" className="border p-2 rounded" value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
        {/* details */}
        <input placeholder="Details" className="border p-2 rounded col-span-2" value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })} required />
        {/* phone */}
        <input placeholder="Phone" className="border p-2 rounded col-span-2" value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />

        <button className="bg-black text-white py-2 rounded col-span-2 cursor-pointer">Add Address</button>
      </form>

      {/* Address List */}
      {addressData?.data.length === 0 && (
        <p className="text-gray-500">No addresses added yet.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {addressData?.data.map((address) => (
          <div key={address._id} className="border p-4 rounded flex justify-between">
            <div>
              <h3 className="font-semibold">{address.name}</h3>
              <p>{address.details}</p>
              <p>{address.city}</p>
              <p>{address.phone}</p>
            </div>
            {/* delete button */}
            <button onClick={async () => { setDeletingId(address._id); await removeAddress(address._id); setDeletingId(null); }}
              disabled={deletingId === address._id}
              className="text-red-500 flex items-center gap-2 disabled:opacity-50 cursor-pointer" >
              {deletingId === address._id ? (
                <>
                  <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
