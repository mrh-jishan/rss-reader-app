import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safeHtmlPipe'
})
export class SafeHtmlPipePipe implements PipeTransform {

  transform(content: string) {
    return this._satinized.bypassSecurityTrustHtml(content);
  }

  constructor(private _satinized: DomSanitizer) {
  }


}
