/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { inject, TestBed, waitForAsync } from '@angular/core/testing'

import { LocalBackupService } from './local-backup.service'
import { CookieService } from 'ngx-cookie-service'
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import * as FileSaver from 'file-saver'

describe('LocalBackupService', () => {
  let snackBar: any
  let cookieService: any

  beforeEach(() => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open'])
    snackBar.open.and.returnValue(null)

    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        CookieService,
        LocalBackupService
      ]
    })
    cookieService = TestBed.inject(CookieService)
  })

  it('should be created', inject([LocalBackupService], (service: LocalBackupService) => {
    expect(service).toBeTruthy()
  }))

  it('should save language to file', inject([LocalBackupService], (service: LocalBackupService) => {
    spyOn(FileSaver, 'saveAs').and.stub()

    cookieService.set('language', 'de')
    service.save()

    const blob = new Blob([JSON.stringify({ version: 1, language: 'de' })], { type: 'text/plain;charset=utf-8' })
    expect(FileSaver.saveAs).toHaveBeenCalledWith(blob, `owasp_juice_shop-${new Date().toISOString().split('T')[0]}.json`)
  }))

  it('should restore language from backup file', waitForAsync(inject([LocalBackupService], (service: LocalBackupService) => {
    cookieService.set('language', 'de')
    service.restore(new File(['{ "version": 1, "language": "cn" }'], 'test.json')).subscribe(() => {
      expect(cookieService.get('language')).toBe('cn')
      expect(snackBar.open).toHaveBeenCalled()
    })
  })))

  it('should not restore language from an outdated backup version', waitForAsync(inject([LocalBackupService], (service: LocalBackupService) => {
    cookieService.set('language', 'de')
    service.restore(new File(['{ "version": 0, "language": "cn" }'], 'test.json')).subscribe(() => {
      expect(cookieService.get('language')).toBe('de')
      expect(snackBar.open).toHaveBeenCalled()
    })
  })))
})
