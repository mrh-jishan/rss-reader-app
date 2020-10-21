export class Feed {

  url: string;
  title: string;
  lastBuildDate: string;

  constructor(url: string, title: string, lastBuildDate: string) {
    this.title = title;
    this.url = url;
    this.lastBuildDate = lastBuildDate;
  }
}
