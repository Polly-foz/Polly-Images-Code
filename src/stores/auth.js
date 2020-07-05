import {observable, action} from "mobx";
import {Auth} from "../models";
import UserStore from "./user";

//登录，注册信息
class AuthStore {
    @observable values = {
        username: 'user A',
        password: ''
    };

    @action setUsername(username) {
        this.values.username = username;
    }

    @action setPassword(password) {
        this.values.password = password;
    }

    @action login() {
        return new Promise((resolve, reject) => {
            Auth.login(this.values.username, this.values.password).then(user => {
                // window.alert("登录成功!" + this.values.username);
                UserStore.pullUser();
                resolve(user);
            }).catch(error => {
                // window.alert("登录失败!" + error);
                reject(error);
            });
        });

    }

    @action register() {
        return new Promise((resolve, reject) => {
            Auth.register(this.values.username, this.values.password).then(user => {
                // window.alert("注册成功!" + this.values.username);
                UserStore.pullUser();
                resolve(user);
            }).catch(error => {
                // window.alert("注册失败!" + error);
                UserStore.resetUser();
                reject(error);
            });
        });
    }

    @action logout() {
        Auth.logout();
        UserStore.resetUser()
        // window.alert("已注销！");
    }
}

export default new AuthStore();
