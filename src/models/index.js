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
    getCurrentUser() {
        return User.current();
    }

};

const Uploader = {
    add(file, filename) {
        const item = new AV.Object('Image');
        const avFile = new AV.File(filename, file);//有问题
        item.set('filename', filename);
        item.set('owner', AV.User.current());
        item.set('url', avFile);
        return new Promise((resolve, reject) => {
            item.save().then(serverFile => {
                    // console.log('保存成功');
                    resolve(serverFile);
                },
                error => {
                    // console.log('保存失败');
                    reject(error);
                });
        });


    }
};

export {Auth,Uploader};
