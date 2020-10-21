import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';
import {SafeHtmlPipePipe} from "./safe-html-pipe.pipe";

describe('SanitiseHtmlPipe', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    let pipe = new SafeHtmlPipePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});
