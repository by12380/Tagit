import { Problem } from './../../models/problem';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WorksheetService {

    private selectedIndex;
    private problemList: Problem[]= [];
    private problemListSource = new BehaviorSubject<Problem[]>(this.problemList);
    public problemCollection = this.problemListSource.asObservable();

    constructor() { }

    public add(problem: Problem) {
        this.problemList.push(problem);
        this.problemListSource.next(this.problemList);
    }

    public delete(index) {
        this.problemList.splice(index, 1);
        this.problemListSource.next(this.problemList);
    }

    public isSelectedIndex(index) {
        return this.selectedIndex == index;
    }

    public setSelectedIndex(index) {
        this.selectedIndex = index;
    }

    moveUp() {
        if(this.selectedIndex >= 0) {
            var item = this.problemList[this.selectedIndex];
            this.problemList.splice(this.selectedIndex, 1);
            this.problemList.splice(this.selectedIndex - 1, 0, item);
            this.selectedIndex--;
            this.problemListSource.next(this.problemList);
        }
    }

    moveDown() {
        if(this.selectedIndex >= 0) {
            var item = this.problemList[this.selectedIndex];
            this.problemList.splice(this.selectedIndex, 1);
            this.problemList.splice(this.selectedIndex + 1, 0, item);
            this.selectedIndex++;
            this.problemListSource.next(this.problemList);
        }
    }

    remove() {
        if(this.selectedIndex >= 0) {
            this.problemList.splice(this.selectedIndex, 1);
            this.selectedIndex = null;
        }
    }

}

    
