import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};

const apiKey = env.VITE_FIREBASE_API_KEY || '';

let db: Firestore | null = null;

if (apiKey) {
  try {
    const firebaseConfig = {
      apiKey,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: env.VITE_FIREBASE_PROJECT_ID || 'ai-studio-kawinfingerstyle',
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: env.VITE_FIREBASE_APP_ID || '',
      firestoreDatabaseId: env.VITE_FIREBASE_DATABASE_ID || 'ai-studio-kawinfingerstyle-e699da0a-2da0-46dc-ae5c-4d9708c2502f',
    };

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

    db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  } catch (e) {
    console.error('Error initializing Firebase:', e);
  }
}

export { db };

