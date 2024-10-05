import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.sendRequest();
    // this.sendRequests();
  }

  // Guest ID generator function
  private makeguid(): string {
    const u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
    const guid = [
      u.substr(0, 8),
      u.substr(8, 4),
      '4000-8' + u.substr(13, 3),
      u.substr(16, 12),
    ].join('-');
    return guid;
  }

  // Function to send the POST request
  private sendRequest(): void {
    const url = 'https://api-test.elzatoonah.com/api/v2/accounts/user';  // Updated to use the proxy path

    // Generating guest ID
    const guestId = this.makeguid();

    // Payload to be sent in the body
    const body = {
      guestId: guestId
    };

    // Setting custom headers
    const headers = new HttpHeaders({
			"Allowencrypt": "Do@rom",
			"Content-Type": "application/json"
    });

    // Sending the POST request
    this.http.post<{ id: number; guestId: string; token: string }>(url, body, { headers })
      .subscribe(
        (response) => {
          console.log('Response:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  // Function to refresh the token
  private sendRequests(): void {
    const url = '/api/v2/accounts/user/token/refresh';  // Updated to use the proxy path

    // Generating guest ID
    const guestId = this.makeguid();

    // Payload to be sent in the body
    const body = {
      id: 123,
      guestId: guestId,
      token: 'Bearer your_token_here'
    };

    // Setting custom headers
    const headers = new HttpHeaders({
      'allowencrypt': 'Do@rom',
      'do2romlang': 'en',

    });

    // Sending the POST request
    this.http.post<{ id: number; guestId: string; token: string }>(url, body, { headers })
      .subscribe(
        (response) => {
          console.log('Response:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}
