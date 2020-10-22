import {TestBed} from '@angular/core/testing';

import {FeedServiceService} from './feed-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('FeedServiceService', () => {
  let service: FeedServiceService;
  let httpMock: HttpTestingController;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedServiceService]
    });
    service = TestBed.inject(FeedServiceService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new FeedServiceService(httpClientSpy as any);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current storage', () => {
    const storage = service.getLocalFeedItems();
    expect(storage.length).toEqual(0);
  })

  it('should return json from url', () => {
    const expectedHeroes = of(`<?xml version="1.0" encoding="UTF-8"?>
                        <rss xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
   <channel>
      <copyright>Copyright 2018 Fairfax Media</copyright>
      <description>The top.au</description>
      <image>
         <link>https://www.smh.com.au/rssheadlines</link>
         <title>Sydney Morning Herald - Latest News</title>
         <url>https://www.smh.com.au/icons/rss/smh.png</url>
      </image>
      <language>en-AU</language>
      <lastBuildDate>Thu, 22 Oct 2020 22:01:21 +1100</lastBuildDate>
      <link>https://www.smh.com.au/rssheadlines</link>
      <pubDate>Thu, 22 Oct 2020 22:01:21 +1100</pubDate>
      <title>Sydney Morning Herald - Latest News</title>
      <item>
         <dc:creator>Lydia Lynch</dc:creator>
         <description>Annastacia Palaszczuk.</description>
         <guid isPermaLink="false">p567pp</guid>
         <link>https://www.smh.com.au/politics/queensland/labor-</link>
         <pubDate>Thu, 22 Oct 2020 21:19:38 +1100</pubDate>
         <title>Labor, LNP stay on the fence over border reopening date</title>
      </item>
      <item>
         <dc:creator>Lydia Lynch</dc:creator>
         <description>ealth advice Labor was given.</description>
         <guid isPermaLink="false">p567pp</guid>
         <link>https://www.smh.com.au/politics/queensland</link>
         <pubDate>Thu, 22 Oct 2020 21:19:38 +1100</pubDate>
         <title>Labor, LNP stay on the fence over border reopening date</title>
      </item>
      </channel>
      </rss>
      `);

    httpClientSpy.get.and.returnValue(expectedHeroes);
    service.getFeedListByUrl('test-url').subscribe(res => {
      expect(res).not.toEqual(null);
    });

  })
});
