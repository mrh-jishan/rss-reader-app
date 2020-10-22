import {TestBed} from '@angular/core/testing';

import {FeedServiceService} from './feed-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('FeedServiceService', () => {
  let service: FeedServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedServiceService]
    });
    service = TestBed.inject(FeedServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', (done: DoneFn) => {
    expect(service).toBeTruthy();
    done();
  });
});
