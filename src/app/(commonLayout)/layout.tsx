import { Navbar } from "@/components/layout/Navbar";
import { userService } from "@/services/user.service";

export const dynamic = "force-dynamic";

export default async function CommonLayout({ children }: { children: React.ReactNode }) {

  const { data } = await userService.getSession();

  const session = data?.user || null;

  // console.log("from navbar",session.id)

  return (
    <div>
      <Navbar  session={session}/>
      {children}
    </div>
  );
}