import { reactive } from 'vue';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';

export default function useAuth() {
    const state = reactive({
        userInfo: {} as User,
    });

    const signIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        state.userInfo = result.user ? result.user : ({} as User);
        return result;
    };
    const signOut = () =>
        firebase
            .auth()
            .signOut()
            .catch(error => console.error(error))
            .then(() => {
                state.userInfo = {} as User;
            });
    return { state, signIn, signOut };
}

export type AuthStore = ReturnType<typeof useAuth>;
