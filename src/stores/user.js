//当前用户信息
import {observable,action} from "mobx";
import {Auth} from '../models'
class UserStore{
    @observable currentUser = Auth.getCurrentUser();
    @action pullUser(){
        this.currentUser = Auth.getCurrentUser()
    }
    @action resetUser(){
        this.currentUser = null;
    }
}
export default new UserStore();
