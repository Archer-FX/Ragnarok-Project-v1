import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="md:flex">
      <Sidebar user={{ name: session.user?.name, image: session.user?.image }} />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
