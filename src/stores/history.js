import {observable, action} from "mobx";
import {Uploader} from "../models";

class HistoryStore {
    @observable list = [];
    @observable isLoading = false;
    @observable hasMore = true;
    @observable page = 0;
    limit = 10;

    @action append(newList) {
        this.list.concat(newList);
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
                    }
                    resolve(newList);
                }).catch(error => {
                reject(error);
            }).finally(() => {
                this.isLoading = false;
            });
        });

    }
}

export default new HistoryStore()
