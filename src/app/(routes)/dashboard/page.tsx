/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import Header from "./_components/Header";
import FileList from "./_components/FileList";
import DashboardPage from "./_components/DashboardPage";
import { User } from "./_components/SideNavTopSection";

export default function Dashboard() {
  const { user, isAuthenticated} = useKindeBrowserClient();
  const convex = useConvex();
  //  const getUser = useQuery(api.user.getUser, { email: user?.email || "" });

  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, {
      email: user?.email || "",
    });
    if (!result.length) {
      createUser({
        name: user?.given_name || "",
        email: user?.email || "",
        image: user?.picture || "",
      }).then((data) => {
        console.log(data);
      });
    }
  };

  return (
    isAuthenticated && (
      <div className="p-3">
        <DashboardPage
          defaultLayout={[20, 80]}
          defaultCollapsed={false}
          navCollapsedSize={2}
          user={user}
        />
      </div>
    )
  );
}
