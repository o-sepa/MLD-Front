import type { HttpInterceptorFn } from '@angular/common/http';
import { map } from 'rxjs';

// Regex para detectar strings ISO 8601
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/;

function convertDates(obj: any): any {
  if (obj == null) return obj;

  if (typeof obj === 'string' && ISO_DATE_REGEX.test(obj)) {
    return new Date(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(convertDates);
  }

  if (typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      obj[key] = convertDates(obj[key]);
    }
  }

  return obj;
}

// Interceptor funcional para Angular 16+
export const dateInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    // Solo intercepta las respuestas
    map(event => {
      if ('body' in event && event.body) {
        const modifiedBody = convertDates(event.body);
        return event.clone({ body: modifiedBody });
      }
      return event;
    })
  );
