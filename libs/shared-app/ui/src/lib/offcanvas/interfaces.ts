import { Observable } from "rxjs";

export interface ComponentType<T> {
  new (...args: any[]): T;
}

export interface OffCanvasConfig {

  data?: any;
    
}

export interface OffCanvasContainerRef {
  
  close: (data?: any) => void

}

export interface OffCanvasRef {
  
  close: () => void
  afterClosed: () => Observable<any>

}