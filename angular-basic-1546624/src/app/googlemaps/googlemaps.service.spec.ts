import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { GooglemapsService } from './googlemaps.service';

describe('GooglemapsService', () => {
  let service: GooglemapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooglemapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
