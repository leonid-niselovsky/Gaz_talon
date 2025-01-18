import { Dropdown, Flex, Layout, Typography } from "antd";
import { BasicTheme } from "../utils/const.ts";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { clearUser } from "../app/store/appSlice.ts";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <Layout.Header
      style={{ backgroundColor: BasicTheme.colorBgLayout, height: "48px" }}
    >
      <Flex justify="flex-end" align={"center"} style={{ height: "48px" }}>
        <Dropdown
          menu={{
            items: [
              {
                key: "logout",
                label: (
                  <Typography.Text style={{ fontSize: 18 }}>
                    Выйти
                  </Typography.Text>
                ),
                icon: <LogoutOutlined style={{ fontSize: 16 }} />,
                onClick: () => dispatch(clearUser()),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MenuOutlined style={{ fontSize: "24px", color: "white" }} />
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
};

export default Header;
