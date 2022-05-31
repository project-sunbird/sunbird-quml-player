import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ApiEndPoints } from '../app.constant';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getContent(contentId: string) {
    const params: HttpParams = new HttpParams()
      // tslint:disable-next-line
      .set('fields', 'ageGroup,appIcon,artifactUrl,attributions,audience,author,badgeAssertions,board,body,channel,code,concepts,contentCredits,contentType,contributors,createdBy,createdOn,creator,creators,description,displayScore,domain,editorState,flagReasons,flaggedBy,flags,framework,gradeLevel,identifier,itemSetPreviewUrl,keywords,language,languageCode,lastUpdatedOn,license,mediaType,medium,mimeType,name,originData,osId,owner,pkgVersion,publisher,questions,resourceType,scoreDisplayConfig,status,streamingUrl,subject,template,templateId,totalQuestions,totalScore,versionKey,visibility,year,primaryCategory,additionalCategories,interceptionPoints,interceptionType')
      .set('orgdetails', 'orgName,email')
      .set('licenseDetails', 'name,description,url');
    return this.httpClient.get(`${ApiEndPoints.getContent}${contentId}`, { params }).pipe(map((res: any) => {
      if (res.result.content) {
        return res.result.content;
      }
      throwError('Invalid Response');
    }));
  }

  getQuestionSet(identifier: string) {
    const hierarchy = this.httpClient.get(`${ApiEndPoints.getQuestionSetHierarchy}${identifier}`);
    const questionSetResponse = this.httpClient.get(`${this.baseUrl}${ApiEndPoints.questionSetRead}${identifier}?fields=instructions`);
    return (
      forkJoin([hierarchy, questionSetResponse]).pipe(map((res: any) => {
        const questionSet = res[0]?.result.questionSet;
        const instructions = res[1].result.questionset.instructions;
        if (instructions && questionSet) {
          questionSet.instructions = instructions;
        }
        return questionSet;
      })
      ));
  }

  get(url: string)  {
    return this.httpClient.get(url);
  }

  post(requestParam): Observable<any> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this.httpClient.post(requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return throwError(data);
        }
        return of(data);
      }));
  }

}
