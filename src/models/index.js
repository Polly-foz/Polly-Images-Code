import AV, {Query, User} from 'leancloud-storage';

console.log(AV);

AV.init({
    appId: "5rNBCHoC93QGdT46Wto1Ouqk-gzGzoHsz",
    appKey: "6ToblRTyjDWoIOvJLEREfjLM",
    serverURL: "https://5rnbchoc.lc-cn-n1-shared.com"
});

const Auth = {
    register(username, password) {
        const user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return new Promise((resolve, reject) => {
            user.signUp().then(loginedUser => resolve(loginedUser), error => reject(error));
        });
    },
    login(username, password) {
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(function (loginedUser) {
                // 登录成功，跳转到商品 list 页面
                resolve(loginedUser);
            }, function (error) {
                reject(error);
                // alert(JSON.stringify(error));
            });
        });
    },
    logout() {
        User.logOut();
    },
    getCurrentUser(){
        return User.current()
    }

};

/*console.log('start sign up .......');
// LeanCloud - 注册
// https://leancloud.cn/docs/leanstorage_guide-js.html#注册
const username = "polly1";
const password = "pollyyyy";
var user = new AV.User();
user.setUsername(username);
user.setPassword(password);
user.signUp().then(function (loginedUser) {
    // 注册成功，跳转到商品 list 页面
    console.log("sign up successfully!!!");
}, (function (error) {
    alert(JSON.stringify(error));
}));*/

export {Auth};
