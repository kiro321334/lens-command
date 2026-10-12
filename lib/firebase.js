// بيتحمّل في الداشبورد فقط (مش في الموقع العام)
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
export const configured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const app = getApps()[0] || initializeApp({ apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'x', authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID });
export const auth = getAuth(app);
export const db = getFirestore(app);
