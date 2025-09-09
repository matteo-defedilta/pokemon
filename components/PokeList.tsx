'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFeaturedCards } from '@/services/featuredCardsSlice';
import { addCard } from '@/services/myCardsSlice';
import { RootState } from '@/store';
import { getFeaturedCards, getCards } from '@/services/pokemon-tcg';
import Pokeloader from '@/public/pokeloader/Pokeloader';

interface IPokeListProps {
	title?: string;
	pageSize?: number;
	orderBy?: string;
	q?: string;
}

interface Card {
	id: string;
	name: string;
	images: {
		small: string;
		large: string;
	};
	supertype?: string;
	subtypes?: string[];
}

const PokeList: React.FC<IPokeListProps> = ({
	title,
	pageSize = 10,
	orderBy,
	q,
}) => {
	const dispatch = useDispatch();
	const featuredCards = useSelector(
		(state: RootState) => state.featuredCards.value
	);
	const myCards = useSelector((state: RootState) => state.myCards.value);

	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);
	const [noResults, setNoResults] = useState(false);

	// 🔹 Solo se non ci sono carte in Redux, chiamiamo l’API
	useEffect(() => {
		const fetchFeaturedCards = async () => {
			try {
				setLoading(true);
				const data = await getFeaturedCards(pageSize, orderBy, q);
				dispatch(setFeaturedCards(data.data));
				setNoResults(data.data.length === 0);
			} catch (error) {
				console.error('Error fetching featured cards:', error);
				setNoResults(true);
			} finally {
				setLoading(false);
			}
		};

		if (featuredCards.length === 0) {
			fetchFeaturedCards();
		} else {
			setLoading(false);
		}
	}, [pageSize, orderBy, q, dispatch, featuredCards.length]);

	// 🔹 Ricerca carte (aggiorna Redux)
	const handleSearch = async () => {
		try {
			setLoading(true);
			setNoResults(false);
			const data = await getCards({
				orderBy: '-set.releaseDate',
				q: `name:${searchTerm}*`,
			});
			if (data.data.length === 0) {
				setNoResults(true);
				dispatch(setFeaturedCards([]));
			} else {
				dispatch(setFeaturedCards(data.data));
			}
		} catch (error) {
			console.error('Error searching cards:', error);
			setNoResults(true);
		} finally {
			setLoading(false);
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

			{loading && <Pokeloader />}
			{noResults && <div>No cards found</div>}

			{!loading && !noResults && (
				<div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
					{featuredCards.map((card) => {
						const isAdded = myCards.some((c) => c.id === card.id);
						return (
							<div key={card.id} className='border p-4 rounded shadow'>
								<img
									src={card.images.small}
									alt={card.name}
									className='w-full h-auto'
									loading='lazy'
								/>
								<h2 className='text-xl mt-2'>{card.name}</h2>
								<p>{card.supertype}</p>
								<p>{card.subtypes?.join(', ')}</p>
								<button
									onClick={() => !isAdded && dispatch(addCard(card))}
									disabled={isAdded}
									className={`px-2 py-1 mt-2 rounded ${
										isAdded
											? 'bg-gray-400 text-white'
											: 'bg-green-500 text-white'
									}`}
								>
									{isAdded ? 'Carta aggiunta!' : 'Aggiungi carta'}
								</button>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default PokeList;
