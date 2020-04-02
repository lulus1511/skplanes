import {Component, ViewChild} from '@angular/core';
import {FlightsService} from '../../core/services/flights.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlightFormComponent} from '../flight-form/flight-form.component';
import {tap} from 'rxjs/operators';
import {Flight} from '../../models/flight.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss']
})
export class EditFlightComponent {
  @ViewChild('flightForm') flightForm: FlightFormComponent;

  flight: Flight;
  constructor(
    private route: ActivatedRoute,
    private toast: MatSnackBar,
    private router: Router,
    private flightService: FlightsService,
  ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.loadFlight();
  }

  removeFlight() {
    this.flightService.removeFlight(this.flight.key)
      .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this));
  }

  editFlight() {
    this.flightService.editFlight(this.flight.key, this.flightForm.form.value)
      .then(this.onEditSuccess.bind(this), this.onFailure.bind(this));
  }

  private onEditSuccess() {
    this.router.navigate(['/dashboard']);
    this.toast.open('Flight has been successfully save', '', {panelClass: 'toast-success'});
  }

  private onRemoveSuccess() {
    this.router.navigate(['/dashboard']);
    this.toast.open('Flight has been successfully remove', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

  private loadFlight() {
    const key = this.route.snapshot.params.key;
    this.flightService.getFlight(key).pipe(
      tap(flight => this.flightForm.setFlight(flight))
    ).subscribe(flight => this.flight = flight);
  }

}
