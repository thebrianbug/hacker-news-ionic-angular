import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StoriesService } from './stories.service';
import { Item } from 'src/app/models/item.type';

describe('StoriesService', () => {
  let service: StoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoriesService]
    });
    service = TestBed.inject(StoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should define getTopStories$', () => {
    expect(service.getTopStories$).toBeDefined();
  });

  it('should return top 1 story when called with 1', done => {
    const items = [{
      id: 11010
    } as Item];
    const n = 1;

    service.getTopStories$(n).subscribe(
      stories => {
        expect(stories).toEqual(items);
        done();
      }
    );

    const reqTopStories = httpMock.expectOne(`${service.BASE_URL}/topstories.json?orderBy="$key"&limitToFirst=${n}`);
    expect(reqTopStories.request.method).toBe("GET");
    reqTopStories.flush(items.map(i => i.id));

    const reqItemToId = httpMock.expectOne(`${service.BASE_URL}/item/${items[0].id}.json`);
    expect(reqItemToId.request.method).toBe("GET");
    reqItemToId.flush(items);
  });
});