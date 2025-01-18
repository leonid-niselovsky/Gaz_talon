import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";

import { Card, Flex, notification } from "antd";
import { BasicTheme } from "../utils/const.ts";
import { useDispatch } from "react-redux";
import { setUser } from "../app/store/appSlice.ts";
import { UserVM } from "../utils/interfaces.ts";
import { useGetUsersQuery } from "../app/store/api.ts";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { data } = useGetUsersQuery();
  // const { users: data } = DB_CONST;
  const onSubmit = (user: UserVM) => {
    const findUser = data?.find(
      ({ login, password }) =>
        user.login === login && user.password === password,
    );

    if (findUser) dispatch(setUser(findUser.role));
    else notification.error({ message: "Неверный логин или пароль" });
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100vh",
        backgroundColor: BasicTheme.colorBgLayout,
      }}
    >
      <Card>
        <LoginForm onFinish={onSubmit} title="СИСТЕМА" subTitle="Авторизация">
          <ProFormText
            name="login"
            fieldProps={{ size: "large", prefix: <UserOutlined /> }}
            rules={[{ required: true }]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{ size: "large", prefix: <LockOutlined /> }}
            rules={[{ required: true }]}
          />
        </LoginForm>
      </Card>
    </Flex>
  );
};

export default LoginPage;
