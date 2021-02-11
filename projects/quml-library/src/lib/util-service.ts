import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() { }

    public uniqueId(length = 32) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public getTimeSpentText(pdfPlayerStartTime) {
        const duration = new Date().getTime() - pdfPlayerStartTime;
        const minutes = Math.floor(duration / 60000);
        const seconds = Number(((duration % 60000) / 1000).toFixed(0));
        return (minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
    }

    public getKeyValue(keys) {
        return new Promise((resolve, reject) => {
            keys.forEach((ele) => {
                if (ele.includes('response')) {
                    resolve(ele);
                }
            })
        })
    }

    public getMultiselectScore(options, mappings) {
        return new Promise((resolve, reject) => {
            let score = 0;
            options.forEach((option, index) => {
                mappings.forEach((mapping) => {
                    if (option.value === mapping.response) {
                        score = score + mapping.outcomes.score
                    }
                })
                if (index === options.length - 1) {
                     resolve(score);
                }
            })
        });

    }

}
