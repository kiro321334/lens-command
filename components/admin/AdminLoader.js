'use client';
import dynamic from 'next/dynamic';
const AdminApp = dynamic(() => import('@/components/admin/AdminApp'), { ssr: false, loading: () => <p className="p-10 text-center text-mute">Loading dashboard…</p> });
export default function AdminLoader() { return <AdminApp />; }
