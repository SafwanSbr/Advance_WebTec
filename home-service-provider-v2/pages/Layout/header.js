import Link from "next/link"
import { useRouter } from "next/router"

export default function Header({ status }) {
  const router = useRouter()
  if (status === "admin") {
    return (
      <>
        <nav className="flex items-center bg-slate-300 justify-between bg-neutral p-4">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
            <span className="text-xl">Home Service Provider</span>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => router.push('/showAdminList')} className="px-4 py-2 bg-blue-500 text-white rounded">Admin List</button>
            <button onClick={() => router.push('/showManagerList?status=admin')} className="px-4 py-2 bg-blue-500 text-white rounded">Manager List</button>
            <button onClick={() => router.push('/showUserList?status=admin')} className="px-4 py-2 bg-blue-500 text-white rounded">User List</button>
            <button onClick={() => router.push('/signin')} className="px-4 py-2 bg-blue-500 text-white rounded">Logout</button>
          </div>
        </nav>
      </>
    )
  }
  if (status === "manager") {
    return (
      <>
        <nav className="flex items-center bg-slate-300 justify-between bg-neutral p-4">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
            <span className="text-xl">Home Service Provider</span>
          </div>
          <div className="flex space-x-4">
            {/* <button onClick={() => router.push('/showAdminList')} className="px-4 py-2 bg-blue-500 text-white rounded">Admin List</button> */}
            <button onClick={() => router.push('/showManagerList?status=manager')} className="px-4 py-2 bg-blue-500 text-white rounded">Manager List</button>
            <button onClick={() => router.push('/postService')} className="px-4 py-2 bg-blue-500 text-white rounded">Create Service</button>
            <button onClick={() => router.push('/showServices')} className="px-4 py-2 bg-blue-500 text-white rounded">All Services</button>
            <button onClick={() => router.push('/signinManager')} className="px-4 py-2 bg-blue-500 text-white rounded">Log Out</button>
          </div>
        </nav>
      </>
    )
  }
  if (status === "user") {
    return (
      <>
        <nav className="flex items-center bg-slate-300 justify-between bg-neutral p-4">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
            <span className="text-xl">Home Service Provider</span>
          </div>
          <div className="flex space-x-4">
            {/* <button onClick={() => router.push('/showAdminList')} className="px-4 py-2 bg-blue-500 text-white rounded">Admin List</button> */}
            {/* <button onClick={() => router.push('/showManagerList?status=manager')} className="px-4 py-2 bg-blue-500 text-white rounded">Manager List</button> */}
            {/* <button onClick={() => router.push('/postService')} className="px-4 py-2 bg-blue-500 text-white rounded">Create Service</button> */}
            <button onClick={() => router.push('/showServiceList')} className="px-4 py-2 bg-blue-500 text-white rounded">All Services</button>
            <button onClick={() => router.push('/showBookingList')} className="px-4 py-2 bg-blue-500 text-white rounded">Booking List</button>
            <button onClick={() => router.push('/showPaymentList')} className="px-4 py-2 bg-blue-500 text-white rounded">Payment List</button>
            <button onClick={() => router.push('/signinUser')} className="px-4 py-2 bg-blue-500 text-white rounded">Log Out</button>
          </div>
        </nav>
      </>
    )
  }
}