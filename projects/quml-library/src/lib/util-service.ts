import { Injectable } from '@angular/core';
import  * as _ from 'lodash';


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
        let key = keys.find((k) => {
           return k.includes('response');
        })
        return key;
    }

    public getMultiselectScore(options, responseDeclaration) {
        console.log(options , responseDeclaration);
        let key: any = this.getKeyValue(Object.keys(responseDeclaration));
        const selectedOptionValue = options.map(option => option.value);
        let score = responseDeclaration[key].correct_response.outcomes.score ? responseDeclaration[key].correct_response.outcomes.score : responseDeclaration.maxScore;
        let correctValues = responseDeclaration[key].correct_response.value;
        let mapping = responseDeclaration[key]['mapping'];
        if (_.isEqual(correctValues , selectedOptionValue)) {
            return score;
        } else if( !_.isEqual(correctValues , selectedOptionValue)){
        return selectedOptionValue.reduce((sum, index) => { sum += (mapping[index] ? mapping[index].outcomes.score : 0); return sum;  }, 0);
        }
    }

    hasDuplicates(selectedOptions, option) {
        let duplicate = selectedOptions.find((o) => { return o.value === option.value });
        return duplicate;
    }

}
