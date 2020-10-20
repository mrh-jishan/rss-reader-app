import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import xml2js from "xml2js";

@Injectable({
  providedIn: 'root'
})
export class FeedServiceService {

  constructor(private http: HttpClient) {
  }

  getLocalFeedList() {
    return  JSON.parse(localStorage.getItem("feeds"));
  }

  getLocalFeedItems(url: string) {
    return JSON.parse(localStorage.getItem(url)) || [];
  }

  removeLocalFeedItems(url: any) {
    localStorage.removeItem(url);
  }

  saveLocalFeedItems(url: string, feedItemsList) {
    localStorage.setItem(url, JSON.stringify(feedItemsList));
  }

  removeFeed(feed) {
      localStorage.removeItem(feed.url);
  }

  addLocalFeed(feed: any) {
    const feedList = this.getLocalFeedList();
    if (feedList.length) {
      feedList.push({title: feed.title, url: feed.url});
      localStorage.setItem("feeds", JSON.stringify(feedList));
    }
  }

  getFeedList(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'text'})
      .pipe(
        map(this.extractFeedList),
        catchError(this.handlerError)
      )
  }

  handlerError(error: Response | any) {
    let errorMsg: string = "";
    if (error instanceof Response) {
      const err = error || '';
      errorMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMsg = error.message ? error.message : error.toString();
    }
    console.log(errorMsg);
    return throwError(errorMsg);
  }

  extractFeedList(xml: any) {
    var res;
    const parser = new xml2js.Parser({explicitArray : false});
     parser.parseString(xml, (err, result) => {
      console.log(result)
      res = result;
    });
     return res;
  }
}
