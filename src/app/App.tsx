import LoginPage from "../pages/LoginPage.tsx";
import "./App.scss";
import { useSelector } from "react-redux";
import { selectUser } from "./store/appSlice.ts";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import Header from "../components/Header.tsx";
import { Layout } from "antd";
import EditQuota from "../components/Quota/EditQuota.tsx";

const AppLayout = () => {
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

function App() {
  const isAuth = useSelector(selectUser);

  if (!isAuth)
    return (
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    );

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={"/quotas"} element={<MainPage />} />
        <Route path={"/quotas/:id"} element={<EditQuota />} />
        <Route path={"/*"} element={<Navigate to={"/quotas"} />} />
      </Route>
    </Routes>
  );
}

export default App;
