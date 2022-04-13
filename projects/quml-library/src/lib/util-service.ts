import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';


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
        let key: any = this.getKeyValue(Object.keys(responseDeclaration));
        const selectedOptionValue = options.map(option => option.value);
        let score = responseDeclaration[key].correctResponse.outcomes.score ? responseDeclaration[key].correctResponse.outcomes.score : responseDeclaration.maxScore;
        let correctValues = responseDeclaration[key].correctResponse.value;
        let mapping = responseDeclaration[key]['mapping'];
        if (_.isEqual(correctValues, selectedOptionValue)) {
            return score;
        } else if (!_.isEqual(correctValues, selectedOptionValue)) {
            return selectedOptionValue.reduce((sum, index) => { sum += (mapping[index] ? mapping[index].outcomes.score : 0); return sum; }, 0);
        }
    }

    hasDuplicates(selectedOptions, option) {
        let duplicate = selectedOptions.find((o) => { return o.value === option.value });
        return duplicate;
    }

    getQuestionType(questions, currentIndex) {
            let index = currentIndex - 1 === -1 ? 0 : currentIndex-1;
            return questions[index]['qType'];
        
    }

    canGo(progressBarClass){
    let attemptedParams = ['correct', 'wrong', 'attempted'];
     return attemptedParams.includes(progressBarClass);
    }

    sumObjectsByKey(...objects) {
        return objects.reduce((accumulator, currentValue) => {
            for (const key in currentValue) {
                if (currentValue.hasOwnProperty(key)) {
                    accumulator[key] = (accumulator[key] || 0) + currentValue[key];
                }
            }
            return accumulator;
        }, {});
    }
}
