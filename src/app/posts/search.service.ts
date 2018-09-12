// A service that provides the input information from the header searchbar
// to the list of respective posts(images)

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()

export class SearchService {

  public querySource = new BehaviorSubject<string>("");
  currentQuery = this.querySource.asObservable();

  constructor() {}
  changeQuery(newQuery: string) {
    this.querySource.next(newQuery);
  }
}
