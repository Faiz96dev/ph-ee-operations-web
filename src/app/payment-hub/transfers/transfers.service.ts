import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SettingsService } from 'app/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  apiPrefix: string = environment.backend.operations;

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }

  getTransfers(page: number, size: number): Observable<any> {
    return this.getTransfersByFilter({ page, size });
  }

  /**
   * Aligns with swagger.json /api/v1/transfers endpoint. All filters are optional.
   */
  getTransfersByFilter(filters: {
    page?: number;
    size?: number;
    payerPartyId?: string;
    payerDfspId?: string;
    payeePartyId?: string;
    payeeDfspId?: string;
    transactionId?: string;
    status?: string;
    amount?: number | string;
    currency?: string;
    startFrom?: string;
    startTo?: string;
    direction?: string;
    sortedBy?: string;
    partyId?: string;
    partyIdType?: string;
    clientCorrelationId?: string;
    sortedOrder?: string; // default DESC per swagger
  } = {}): Observable<any> {
    let httpParams = new HttpParams();
    const setIfPresent = (key: string, value: any) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    };

    setIfPresent('page', filters.page);
    setIfPresent('size', filters.size);
    setIfPresent('payerPartyId', filters.payerPartyId);
    setIfPresent('payerDfspId', filters.payerDfspId);
    setIfPresent('payeePartyId', filters.payeePartyId);
    setIfPresent('payeeDfspId', filters.payeeDfspId);
    setIfPresent('transactionId', filters.transactionId);
    setIfPresent('status', filters.status);
    setIfPresent('amount', filters.amount);
    setIfPresent('currency', filters.currency);
    setIfPresent('startFrom', filters.startFrom);
    setIfPresent('startTo', filters.startTo);
    setIfPresent('direction', filters.direction);
    setIfPresent('sortedBy', filters.sortedBy);
    setIfPresent('partyId', filters.partyId);
    setIfPresent('partyIdType', filters.partyIdType);
    setIfPresent('clientCorrelationId', filters.clientCorrelationId);
    // Default sortedOrder to DESC if not provided, as per swagger
    setIfPresent('sortedOrder', filters.sortedOrder ?? 'DESC');

    const headers = new HttpHeaders().set('Platform-TenantId', environment.tenant);
    console.log('environment', environment);
    console.log('SettingsService', SettingsService)
    console.log('headers', headers);
    return this.http.get(this.apiPrefix + '/transfers', { params: httpParams, headers });
  }

  getSubBatchSumaryDetail(batchId: string, subBatchId: string): Observable<any> {
    return this.http.get(this.apiPrefix + '/batches/' + batchId + '/subBatches/' + subBatchId);
  }

}
