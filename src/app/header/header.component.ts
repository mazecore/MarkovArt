import { Component, OnInit, OnDestroy, OnChanges} from "@angular/core";
import { Subscription, observable, Subject } from "rxjs";
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

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
      this.searchService.currentQuery.subscribe(query => this.query = query);

      this.searchForm = new FormGroup({
        "search": new FormControl(""),
      });
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
