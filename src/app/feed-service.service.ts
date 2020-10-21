import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import xml2js from "xml2js";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FeedServiceService {

  constructor(private http: HttpClient) {
  }

  getLocalFeedItems(): object[] {
    return JSON.parse(localStorage.getItem('feeds')) || [];
  }

  saveLocalFeedItems(obj: object) {
    const feedItem = this.getLocalFeedItems();
    feedItem.push(obj);
   const uniq = feedItem.filter((item, index, self) =>{
     const _item = JSON.stringify(item);
     return index === feedItem.findIndex(obj => {
       return JSON.stringify(obj) === _item;
     });
   });

    localStorage.setItem('feeds', JSON.stringify(uniq));
  }

  removeFeedItem(url) {
    const feedItem = this.getLocalFeedItems();
    const index = feedItem.indexOf(url);
    if (index > -1) {
      feedItem.splice(index, 1);
    }
    localStorage.setItem('feeds', JSON.stringify(feedItem));
  }

  getFeedList(url: string): Observable<any> {
    return this.http.get(environment.feeder_url + url, {responseType: 'text'})
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
    const parser = new xml2js.Parser({explicitArray: false});
    parser.parseString(xml, (err, result) => {
      res = result;
    });
    return res;
  }

  updateFeeder(url: string) {
    this.getFeedList(url).subscribe(res => {
      console.log(res);
      const obj = {
        url: url,
        title: res.rss.channel.title,
        lastBuildDate: res.rss.channel.lastBuildDate,
      }
      this.saveLocalFeedItems(obj);
      console.log('feed updated: ', res)
    });
  }

  reloadFeed(feed: any) {

  }
}
