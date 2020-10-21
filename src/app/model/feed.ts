export class Feed {
  link: string;
  title: string;
  lastBuildDate: string;
  description: string;
  image: string;
  item: Item[];

  constructor(link: string,
              title: string,
              lastBuildDate: string,
              description: string,
              image: string,
              item: Item[]) {
    this.link = link;
    this.title = title;
    this.lastBuildDate = lastBuildDate;
    this.description = description;
    this.image = image;
    this.item = item;
  }
}

export class Item {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  visited: boolean;

  constructor(title: string, description: string, pubDate: string, link: string) {
    this.title = title;
    this.description = description;
    this.pubDate = pubDate;
    this.link = link;
    this.visited = false;
  }
}

export class lStorage {
  link: string;
  title: string;
  image: string;

  constructor(link: string, title: string, pubDate: string, image: string) {
    this.link = link;
    this.title = title;
    this.image = image;
  }
}
