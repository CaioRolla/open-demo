import { Observable } from "rxjs";

export interface DialogRef {
    close: () => void
    afterClosed: () => Observable<any>
}