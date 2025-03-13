import React from "react";
import UserList from "@/components/users/list";
import Layout from "@/components/common/layout/user";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="container">
          <UserList />
        </div>
      </Layout>
    </>
  );
}
