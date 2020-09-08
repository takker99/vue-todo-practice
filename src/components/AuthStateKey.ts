import { InjectionKey } from 'vue';
import { AuthStore } from '@/components/AuthState';

const AuthKey: InjectionKey<AuthStore> = Symbol('AuthStore');
export default AuthKey;
