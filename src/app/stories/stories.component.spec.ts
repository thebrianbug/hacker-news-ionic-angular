import { TestBed } from '@angular/core/testing';
import { MockBuilder, MockProvider, MockRender } from 'ng-mocks';
import { EMPTY, of, Subject } from 'rxjs';
import { Item } from '../models/item.type';

import { StoriesService } from '../services/stories/stories.service';

import { StoriesComponent } from './stories.component';
import { StoriesComponentModule } from './stories.module';

describe('StoriesComponent', () => {
  let topStories$: Subject<Array<Item>>;

  beforeEach(() => {
    topStories$ = new Subject();

    return MockBuilder(StoriesComponent, StoriesComponentModule)
      .mock(StoriesService, {
        getTopStories$: () => topStories$,
      })
  });

  it('should create', () => {
    const component = MockRender(StoriesComponent).point.componentInstance;
    expect(component).toBeTruthy();
  });

  /*
  it('should call storiesService.getTopStories$ once on init', () => {
    const service = TestBed.inject(StoriesService);
    const spy = spyOn(service, 'getTopStories$');
    const fixture = MockRender(StoriesComponent);

    topStories$.next([]);

    expect(spy).toHaveBeenCalledTimes(1);
  });
  */

  it('should set stories returned from storiesService.getTopStories$', () => {
    const items = [{ id: 1 } as Item];
    const fixture = MockRender(StoriesComponent);
    const component = fixture.point.componentInstance;

    topStories$.next(items);

    expect(component.stories).toEqual(items);
  });
});
