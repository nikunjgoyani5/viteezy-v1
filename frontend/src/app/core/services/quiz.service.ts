import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuizService {
  constructor(private http: HttpClient) { }
  
  public getQuestionAnswers(quizExternalReference: string, questionType: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/quiz/${quizExternalReference}/answer/${questionType}`);
  }

  public getCategoryAnswerById(questionType: string, id: number): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/category/${questionType}/${id}`);
  }

  public getByBlendExternalReference(blendExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/quiz/blend/${blendExternalReference}`);
  }

}

angular.module('core.quiz', [])
  .factory('quiz', downgradeInjectable(QuizService));