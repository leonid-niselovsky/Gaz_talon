import {
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Flex, Form, notification, QRCode } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { v4 } from "uuid";
import {
  useCreateQuotaMutation,
  useGetQuotasQuery,
  useUpdateQuotaMutation,
} from "../../app/store/api.ts";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import modal from "antd/es/modal/index";

import { QuotaVM } from "../../utils/interfaces.ts";

const EditQuota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();

  const { data } = useGetQuotasQuery();
  // const { quotas: data } = DB_CONST;
  const [create] = useCreateQuotaMutation();
  const [update] = useUpdateQuotaMutation();

  const isCreate = id === "new";

  useEffect(() => {
    if (isCreate) form.resetFields();
    else form.setFieldsValue(data?.find(({ id }) => id === id));
  }, [id, data]);

  const fillQuota = () => {
    modal.confirm({
      title: "Вы действительно хотите заправить машину?",
      okText: "Продолжить",
      cancelText: "Отмена",
      onOk: async () => {
        await update({
          ...data!.find(({ id }) => id === id)!,
          used: new Date(Date.now() + 18000000)
            .toISOString()
            .replace("T", " ")
            .replace("Z", ""),
        });
        notification.success({ message: "Машина заправлена" });
      },
    });
  };

  const handleSave = async (formData: QuotaVM) => {
    try {
      if (isCreate)
        await create({
          ...formData,
          id: v4(),
          used: null,
        }).unwrap();
      else
        await update({
          ...data?.find(({ id }) => id === id),
          ...formData,
        });
      notification.success({
        message: `Запись ${id !== "new" ? "обновлена" : "добавлена"}`,
      });
      navigate("/quotas");
    } catch (e) {
      notification.error({
        message: `Ошибка сохранения: ${JSON.stringify(e)}`,
      });
    }
  };

  return (
    <div style={{ padding: "16px 48px" }}>
      <Button
        type="primary"
        onClick={() => navigate("/quotas")}
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: 16 }}
      >
        Назад
      </Button>
      <ProForm
        form={form}
        onFinish={handleSave}
        submitter={{
          resetButtonProps: false,
          searchConfig: { submitText: "Сохранить" },
          render: (_, dom) => (
            <Flex justify={"flex-end"} gap={12}>
              {!isCreate && (
                <Button onClick={fillQuota}>Заправить машину</Button>
              )}
              <> {dom}</>
            </Flex>
          ),
        }}
      >
        <ProFormSelect
          name={"object"}
          label={"Объект"}
          required
          rules={[{ required: true }]}
          options={[
            { label: "СЕВЕРНОЕ", value: "СЕВЕРНОЕ" },
            { label: "Объект 2", value: "Объект 2" },
            { label: "Объект 3", value: "Объект 3" },
          ]}
        />
        <ProFormDatePicker
          name={"created"}
          label={"Дата выдачи"}
          required
          rules={[{ required: true }]}
          fieldProps={{ style: { width: "100%" } }}
        />
        <ProFormDatePicker
          name={"expired"}
          label={"Срок действия"}
          required
          rules={[{ required: true }]}
          fieldProps={{ style: { width: "100%" } }}
        />
        <ProFormSelect
          name={"gasType"}
          label={"Вид топлива"}
          required
          rules={[{ required: true }]}
          options={[
            { label: "ДТ", value: "ДТ" },
            { label: "Вид 2", value: "Вид 2" },
            { label: "Вид 3", value: "Вид 3" },
          ]}
        />
        <ProFormDigit
          name={"quantity"}
          label={"Номинал"}
          required
          rules={[{ required: true }]}
        />
        <ProFormText
          name={"series"}
          label={"Серия"}
          required
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name={"number"}
          label={"Номер"}
          required
          rules={[{ required: true }]}
        />
        {!isCreate && (
          <QRCode value={window.location.origin + location.pathname} />
        )}
      </ProForm>
    </div>
  );
};

export default EditQuota;
