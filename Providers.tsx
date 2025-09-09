'use client'; // <-- questo rende il componente lato client

import { Provider } from 'react-redux';
import store from '@/store';

export default function Providers({ children }: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>;
}
