export class Photo { //creates a photo
  constructor(public farm: string, public server: string, public id: string, public secret: string) { }

  getUrl() {
    return `https://farm${this.farm}.staticflickr.com/${this.server}/${this.id}_${this.secret}_q.jpg`;
  }
}