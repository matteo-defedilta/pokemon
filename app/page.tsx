import PokeList from '@/components/PokeList';

export default function Home() {
	return (
		<PokeList title='Ultime carte' pageSize={20} orderBy='-set.releaseDate' />
	);
}
