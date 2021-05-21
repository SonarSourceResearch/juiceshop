/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

import { environment } from 'src/environments/environment'
import { Injectable, NgZone } from '@angular/core'
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  public io = io
  private _socket: any

  constructor (private readonly ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      if (environment.hostServer === '.') {
        this._socket = this.io.connect(window.location.origin, {
          path: (window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/') + 'socket.io'
        })
      } else {
        this._socket = this.io.connect(environment.hostServer)
      }
    })
  }

  socket () {
    return this._socket
  }
}
