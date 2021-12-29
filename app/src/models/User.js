"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      const { id, psword } = await UserStorage.getUserInfo(client.id);

      if (id) {
        if (id === client.id && psword === client.psword) {
          return { success: true };
        }
        return { success: false, msg: "비밀번호 오류" };
      }
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async register() {
    const client = this.body;
    try {
      // clinet 데이터를 UserStorage에 저장하는데 시간이 오래 걸리니 await 처리를 해준다.
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = User;
