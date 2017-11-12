/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorksheetService } from './worksheet.service';

describe('Service: Worksheet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorksheetService]
    });
  });

  it('should ...', inject([WorksheetService], (service: WorksheetService) => {
    expect(service).toBeTruthy();
  }));
});