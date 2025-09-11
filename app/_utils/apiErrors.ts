/**
 * Returns a 502 Bad Gateway error response.
 * @param {string} message - The error message
 * @returns {NextResponse}
 */
export function badGateway(message: string) {
  return NextResponse.json({ error: message }, { status: 502 });
}
import { NextResponse } from 'next/server';

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function internalError(message: string) {
  return NextResponse.json({ error: message }, { status: 500 });
}
