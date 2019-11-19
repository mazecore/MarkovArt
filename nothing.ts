public callApi(something: string): void {
    this.ApiService.callApiObservable(something)
    .subscribe(
        (response) => this.Subject.next(response)
    );
  }
