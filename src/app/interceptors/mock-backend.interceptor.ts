import { HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import mockConfigs from '../../assets/mock-configs.json';

export function mockBackendInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  // Simule GET /api/configs
  if (req.url.endsWith('/api/configs') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: mockConfigs }));
  }

  // Simule POST /api/configs/:id/submit
  if (req.url.match(/\/api\/configs\/[^\/]+\/submit$/) && req.method === 'POST') {
    console.log('Mock submit reçu:', req.body);
    return of(new HttpResponse({ status: 200, body: { message: 'Config sauvegardée avec succès !' } }));
  }

  // Sinon, passer au vrai backend
  return next(req);
}
