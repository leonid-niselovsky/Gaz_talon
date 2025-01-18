import { Layout } from "antd";
import Quotas from "../components/Quota/Quotas.tsx";

const MainPage = () => {
  return (
    <Layout
      style={{
        height: "calc(100dvh - 48px)",
        width: "100%",
        backgroundColor: "white",
        padding: "16px 32px",
      }}
    >
      <Quotas />
    </Layout>
  );
};

export default MainPage;
