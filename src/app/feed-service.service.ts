import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import xml2js from "xml2js";
import {environment} from "../environments/environment";
import {Feed, Item, lStorage} from "./model/feed";

@Injectable({
  providedIn: 'root'
})
export class FeedServiceService {

  constructor(private http: HttpClient) {
  }

  getLocalFeedItems(): lStorage[] {
    return JSON.parse(localStorage.getItem('feeds')) || [];
  }

  saveLocalFeedItems(obj: lStorage) {
    const feedItem = this.getLocalFeedItems();
    feedItem.push(obj);
    const uniq = feedItem.filter((item, index, self) => {
      const _item = JSON.stringify(item);
      return index === feedItem.findIndex(obj => {
        return JSON.stringify(obj) === _item;
      });
    });
    localStorage.setItem('feeds', JSON.stringify(uniq));
    return uniq;
  }

  removeFeedItem(feed: lStorage) {
    const feedItem = this.getLocalFeedItems();
    const index = feedItem.findIndex(i => i.link === feed.link);
    if (index > -1) {
      feedItem.splice(index, 1);
    }
    localStorage.setItem('feeds', JSON.stringify(feedItem));
  }

  getFeedListByUrl(url: string): Observable<any> {
    return this.http.get(environment.feeder_url + url, {responseType: 'text'})
      .pipe(
        map(this.extractFeedList),
        catchError(this.handlerError)
      )
  }

  loadFeedList(): Observable<any> {
    const feedList = this.getLocalFeedItems();
    const obsList = feedList.map(feed => this.http.get(environment.feeder_url + feed.link,
      {responseType: 'text'})
      .pipe(map(this.extractFeedList),
        catchError(this.handlerError)));
    return forkJoin([...obsList]);
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

  extractFeedList(xml: any): Feed {
    let res: Feed;
    const parser = new xml2js.Parser({explicitArray: false});
    parser.parseString(xml, (err, result) => {
      const channel = result.rss.channel;
      const items: Item[] = channel.item.map(item => new Item(item.title, item.description, item.pubDate, item.link));
      res = new Feed(channel.link, channel.title, channel.lastBuildDate, channel.description, items);
    });
    return res;
  }
}
