import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'demo-gist',
  template: `
    <iframe
      #iframe
      type="text/javascript"
      width="100%"
      height="100%"
      style="height:100%;"
      frameborder="0"
      scrolling="no"
      onload="this.contentWindow.document.documentElement.scrollHeight + 'px'"
    ></iframe>
  `,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class GistComponent implements AfterViewInit {
  @ViewChild('iframe') iframe!: ElementRef;

  @Input() gistUrl!: string;

  ngAfterViewInit() {
    this.iframe.nativeElement.id = 'gist-' + this.gistUrl;
    let doc =
      this.iframe.nativeElement.contentDocument ||
      this.iframe.nativeElement.contentElement.contentWindow;
    let content = `
        <html>
        <head>
          <base target="_parent">
        </head>
        <body onload="parent.document.getElementById('${this.iframe.nativeElement.id}')">
        <script type="text/javascript" src="${this.gistUrl}"></script>
        </body>
      </html>
    `;
    doc.open();
    doc.write(content);
    doc.close();
  }
}
