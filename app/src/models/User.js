"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }
  /*fs를 UserStorage에서 처리 가져오기때문에 가져올때 동안
  기다려야한다, 그러므로 await을 써줘야하는데
  await은 async안에서 처리되기 때문에 메서드 login을 async 해주었다.*/
  async login() {
    const client = this.body;
    const { id, psword } = await UserStorage.getUserInfo(client.id);

    if (id) {
      if (id === client.id && psword === client.psword) {
        return { success: true };
      }
      return { success: false, msg: "비밀번호 오류" };
    }
    return { success: false, msg: "존재하지 않는 아이디입니다." };
  }

  register() {
    const client = this.body;
    const response = UserStorage.save(client);
    return response;
  }
}

module.exports = User;
