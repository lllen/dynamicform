import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BaseHttpResponseModel} from "../models/base-http-response.model";
import {ClientModel} from "../models/client.model";

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient) {}

  getClientInfo(): Observable<BaseHttpResponseModel<ClientModel>> {
    return of({
      expectedObjectKeys: ['firstName', 'lastName', 'birthplace', 'dateOfBirth', 'email', 'currentAddress', 'sex'],
      receivedObject: {
        firstName: 'Ivan',
        currentAddress: 'Chernivtsi',
        sex: 'man',
      }
    });
  }

  saveClientInfo(client: ClientModel): Observable<any> {
    return this.http.post('api/client/post', client);
  }
}
