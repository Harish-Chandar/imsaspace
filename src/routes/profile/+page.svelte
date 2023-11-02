<script>
    import { userStore } from '$lib/stores/user'
    import { get } from 'svelte/store'
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import { db } from '$lib/config'
    import { doc, getDoc, setDoc } from 'firebase/firestore'

    const user = userStore()
    let setup = false;

    onMount(async () => {
        console.log(get(user).loggedIn)

        if (get(user).loggedIn) return goto('/login')

        const userRef = doc(db, 'users', get(user).uid)
        const userDoc = await getDoc(userRef)

        try {
            const classes = userDoc.get('classes')

            console.log(classes)
        } catch {
            setup = true;
        }
    })
</script>

{#if setup}
    <div class="hidden">
        <form>
            <input>
            <button>Add More Classes</button>
            
        </form>
    </div>
{:else}
     <div>
    <h1>Profile</h1>
        <h1>{$user.displayName}</h1>
    </div>
{/if}