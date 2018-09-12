// Header bar.
// Shows a different list of menu buttons depending on authentication status.
// Connects with the search service to send input information to filter the list of posts.

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { SearchService } from "../posts/search.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  query: string;
  searchForm: FormGroup;

  constructor(private authService: AuthService, private searchService: SearchService, private router: Router) {}

  ngOnInit() {
     // Retrieval of the uthentication status
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

      // Connects with the search service to send input information to filter the list of posts:
      this.searchService.currentQuery.subscribe(query => this.query = query);
      // Gets input:
      this.searchForm = new FormGroup({
        "search": new FormControl(""),
      });

      // Updates the input information @ the search service,
      // as soon as registers a value change in the input:
      this.searchForm.valueChanges.subscribe(value => {
        this.searchService.changeQuery(value.search);
        this.router.navigate(["/"]);
      }
      );

  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
