import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {filter, map, takeUntil} from "rxjs/operators";

@Directive({
  selector: '[rssPermanentNav]'
})
export class PermanentNavDirective implements OnInit, OnDestroy {

  @Input() canOpen = () => true;
  @Input() permanentAt: number;

  destroy$ = new Subject();

  constructor(
    private router: Router,
    private breakpoint: BreakpointObserver,
    private sidenav: MatSidenav
  ) {
  }

  ngOnInit() {
    const permanent$ = this.breakpoint
      .observe(`(min-width: ${this.permanentAt}px)`)
      .pipe(
        takeUntil(this.destroy$),
        map(({matches}) => matches)
      );

    permanent$.subscribe(permanent => {
      this.sidenav.mode = permanent ? "side" : "over";
      this.sidenav.opened = permanent && this.canOpen();
    });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.sidenav.mode === "over"),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => this.sidenav.close());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
