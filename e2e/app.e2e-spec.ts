import { FlickrPhotoAppPage } from './app.po';

describe('flickr-photo-app App', function() {
  let page: FlickrPhotoAppPage;

  beforeEach(() => {
    page = new FlickrPhotoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
