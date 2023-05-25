// LandingPage.tsx
import React, { ReactNode } from "react";
import { Layout, Space } from "antd";
import Sidebar from "./SideBar";

const { Header, Sider, Content } = Layout;

interface LandingPageProps {
  children: ReactNode;
}

function LandingPage({ children }: LandingPageProps) {
  return (
    <Layout>
      <Header className="Heading-Design">Contact and Case Management</Header>
      <Layout hasSider>
        <Sider>
          {" "}
          <Sidebar />
        </Sider>
        <Content>
          {" "}
          <div className="flex-grow bg-gray-100">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LandingPage;
