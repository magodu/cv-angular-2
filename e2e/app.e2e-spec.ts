import { ResumeAngular2Page } from './app.po';

describe('resume-angular2 App', function() {
  let page: ResumeAngular2Page;

  beforeEach(() => {
    page = new ResumeAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
