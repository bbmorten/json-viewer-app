import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClipboardService } from 'ngx-clipboard';
import { MyDataService } from '../my-data.service';



@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css'],
})
export class JsonViewerComponent implements OnInit {
  groupTitleFilter: string = 'BEIN SPORTS'; // Default filter
  descriptionFilter: string = '';
  records: any[] = [];
  filteredRecords: any[] = [];

  constructor(
    private http: HttpClient,
    private clipboardService: ClipboardService,
    private myDataService: MyDataService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  // ngOnInit(): void {
  //   this.http.get<any[]>('/assets/data.json').subscribe((data) => {
  //     this.records = data;
  //     this.applyFilters();
  //   });
  // }


  ngOnInit(): void {
    this.myDataService.getData().subscribe((data) => {
      this.records = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredRecords = this.records.filter(
      (record) =>
        record.stream_group_title
          .toLowerCase()
          .includes(this.groupTitleFilter.toLowerCase()) &&
        record.stream_description
          .toLowerCase()
          .includes(this.descriptionFilter.toLowerCase())
    );
  }

  openWithVLC(url: string): string {
    // Replace this URL with your actual VLC executable path
    const vlcExecutable = '/Applications/VLC.app/Contents/MacOS/VLC';
    const command = `${vlcExecutable} "${url}"`;

    return command;
  }

  copyToClipboard(command: string): void {
    this.clipboardService.copyFromContent(command);
    alert('Command copied to clipboard!');
  }
}
