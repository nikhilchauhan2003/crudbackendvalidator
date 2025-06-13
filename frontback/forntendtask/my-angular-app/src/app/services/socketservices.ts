import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!:Socket ;


  constructor() { }
  connect(): void {
    this.socket = io('http://localhost:3333', {
      withCredentials: true,
    });

    this.socket.on("connect",()=>{
      console.log("connected to webSocket ( ^ _ ^ )",this.socket.id )
    })

    this.socket.on("disconnect",()=>{
      console.log("disconnected from websocket");
    })

  }


  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  
  on<T>(event: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket.on(event, (data: T) => {
        observer.next(data);
      });
    });
  }




}