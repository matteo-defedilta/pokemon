/* eslint-disable @next/next/no-img-element */
'use client';
import { getFeaturedCards, getCards } from '@/services/pokemon-tcg';
import { useEffect, useState } from 'react';
import Pokeloader from '@/public/pokeloader/Pokeloader';

interface IPokeListProps {
	title?: string;
	pageSize?: number;
	orderBy?: string;
	q?: string;
}

const PokeList: React.FC<IPokeListProps> = ({
	title,
	pageSize = 10,
	orderBy,
	q,
}) => {
	const [featuredCards, setFeaturedCards] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	//const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFeaturedCards = async () => {
			try {
				//setLoading(true);
				const data = await getFeaturedCards(pageSize, orderBy, q);
				console.log(data);
				setFeaturedCards(data.data);
			} catch (error) {
				console.error('Error fetching featured cards:', error);
			} finally {
				//setLoading(false);
			}
		};

		fetchFeaturedCards();
	}, [pageSize, orderBy, q]);

	const handleSearch = async () => {
		try {
			setFeaturedCards([]);
			const data = await getCards({
				orderBy: '-set.releaseDate',
				q: `name:${searchTerm}*`,
			});
			if (data.data.length === 0) {
				setFeaturedCards([0]);
			} else {
				setFeaturedCards(data.data);
			}
		} catch (error) {
			console.error('Error searching cards:', error);
		}
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>{title}</h1>
			<div className='flex gap-2 pb-4'>
				<input
					type='text'
					placeholder='Search card...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='border p-2 rounded'
				/>
				<button
					onClick={handleSearch}
					className='bg-blue-500 text-white px-4 py-2 rounded'
				>
					Search
				</button>
			</div>
			{featuredCards.length === 0 ||
			(featuredCards[0] === 0 && 'No cards found') ? (
				<div>{featuredCards[0] === 0 ? 'No cards found' : <Pokeloader />}</div>
			) : (
				<div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
					{featuredCards.map((card) => (
						<div key={card.id} className='border p-4 rounded shadow'>
							<img
								src={card.images.small}
								alt={card.name}
								className='w-full h-auto'
							/>
							<h2 className='text-xl mt-2'>{card.name}</h2>
							<p>{card.supertype}</p>
							<p>{card.subtypes?.join(', ')}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PokeList;
