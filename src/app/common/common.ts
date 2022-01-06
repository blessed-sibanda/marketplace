import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function transformError(error: HttpErrorResponse | string) {
  console.log('Error ==>', error);
  let errorMessage = 'An unknown error has occurred';
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error.error) {
    errorMessage = error.error.message;
  } else if (error.error instanceof ErrorEvent) {
    errorMessage = `Error! ${error.error.message}`;
  } else if (error.status) {
    errorMessage = `Request failed with ${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  console.log('errorMessage ->', errorMessage);

  return throwError(() => new Error(errorMessage));
}

export function dataURLtoFile(dataurl: any, filename: string) {
  if (!dataurl) return null;
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
