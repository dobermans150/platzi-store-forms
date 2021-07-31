import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchField = new FormControl();
  key = environment.giphyKey_API;
  results: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchField.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.getData(value);
    });
  }

  private getData(query) {
    this.http
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${this.key}&limit=12`
      )
      .pipe(
        map((response: any) => {
          return response.data.map((item) => item.images.downsized);
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.results = data;
      });
  }
}
