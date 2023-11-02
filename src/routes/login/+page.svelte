<script>
	import { db, auth } from '$lib/config.ts'
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
	
	import { goto } from '$app/navigation'
	import { userStore } from '$lib/stores/user'

	const user = userStore()

	async function dealWithLogin(usr) {
		if (!usr.email.endsWith('@imsa.edu')) {
			await signOut()
			alert('You must use an IMSA email to sign in.')
		} else {
			const userRef = doc(db, 'users', usr.uid)
			const userDoc = await getDoc(userRef)

			if (userDoc.exists()) {
				console.log('User already exists')
			} else {
				console.log("attempting to make user document")

				await setDoc(userRef, {
					uid: usr.uid,
					name: usr.displayName,
					email: usr.email,
					photoURL: usr.photoURL,
					createdAt: new Date()
				})

				goto('/profile')
		}
		}
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