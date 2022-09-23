import { format, formatDistanceToNow } from 'date-fns';
import Parser from 'ua-parser-js';

// -------------------------------------------------------------------

export function fDate(date: Date | string | number) {
  return format(new Date(date), 'dd MMM yyyy');
}

export function fDateSuffix(date: Date | string | number) {
  return format(new Date(date), 'yyyy/MM/dd');
}

export function fDateTime(date: Date | string | number) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
// -------------------------------------------------------------------

export function fAgent(userAgent: string): string {
  const ua = Parser(userAgent);
  return ua.device.type || ua.browser.name || 'unknown';
}
