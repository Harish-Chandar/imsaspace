<script>
    import { db, auth } from '$lib/config.ts'
    import { GoogleAuthProvider, OAuthCredential, signInWithPopup } from 'firebase/auth'
    import { DocumentSnapshot, doc, getDoc, setDoc, collection } from 'firebase/firestore'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { userStore } from '$lib/stores/user'

	const user = userStore()
	

	async function dealWithLogin(user) {
		
	}

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);

                const user = result.user;

				await dealWithLogin(user);
            }).catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
            })
    }

    async function signOut() {
        await auth.signOut()
    }
</script>

<div>
	<h1>{$user.loggedIn}</h1>
	<h1>Sign In</h1>
	<button on:click={loginWithGoogle}>Sign In With Google</button> <br>
	<button on:click={signOut}>Sign Out</button>
</div>