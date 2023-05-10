import * as request from "../../src/utils/request";

export const list = async () => {
  try {
    const res = await request.get("report/report-list");
    return res;
  } catch (error) {
    console.log("error");
  }
};

export const create = async (report_name, email, password) => {
  try {
    const res = await request.post("report/createAccount", {
      report_name: report_name,
      email: email,
      password: password,
    });
    return res;
  } catch (error) {
    console.log("error");
  }
};

export const deleteAccount = async (id) => {
  try {
    const res = await request.deleted(`report/report-delete/${id}`);
    return res;
  } catch (error) {
    throw new Error("Xóa tài khoản không thành công");
  }
};
