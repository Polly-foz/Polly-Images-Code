import {observable, action} from "mobx";
import {Uploader} from "../models";

class HistoryStore {
    @observable list = [];
    @observable isLoading = false;
    @observable hasMore = true;
    @observable page = 0;
    limit = 10;

    @action append(newList) {
        console.log('append-list',this.list)
        console.log('append-newList',newList)
        this.list = this.list.concat(newList);
    }

    @action find() {
        this.isLoading = true;
        return new Promise((resolve, reject) => {
            Uploader.find({page: this.page, limit: this.limit})
                .then(newList => {
                    this.append(newList);
                    this.page++;
                    if(newList.length < this.limit){
                        this.hasMore = false;
                        console.log('last page!')
                    }
                    resolve(newList);
                    console.log('find!')
                }).catch(error => {
                reject(error);
                console.log('error!')
            }).finally(() => {
                this.isLoading = false;
            });
        });

    }

    @action reset(){
        this.list = [];
        this.isLoading = false;
        this.hasMore = true;
        this.page = 0;
    }
}

export default new HistoryStore()
