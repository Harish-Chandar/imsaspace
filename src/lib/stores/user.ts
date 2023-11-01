import { writable } from 'svelte/store';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config';

export function userStore() {

  const { subscribe, set, update } = writable({...auth.currentUser, 'loggedIn': false});

  onAuthStateChanged(auth, (user) => {
    if (user) {
      set({...user, 'loggedIn': true});
    } else {
      set({...auth.currentUser, 'loggedIn': false});
    }
  });

  return {
    subscribe,
  };
}