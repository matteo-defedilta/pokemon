'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeCard } from '@/services/myCardsSlice';

export default function MyCardsPage() {
	const myCards = useSelector((state: RootState) => state.myCards.value);
	const dispatch = useDispatch();

	if (myCards.length === 0) {
		return <p className='p-4 text-lg'>Nessuna carta aggiunta.</p>;
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Le mie carte</h1>

			<div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
				{myCards.map((card) => (
					<div key={card.id} className='border p-4 rounded shadow'>
						<img
							src={card.images.small}
							alt={card.name}
							className='w-full h-auto'
						/>
						<h2 className='text-xl mt-2'>{card.name}</h2>
						<p>{card.supertype}</p>
						<p>{card.subtypes?.join(', ')}</p>
						<button
							onClick={() => dispatch(removeCard(card.id))}
							className='bg-red-500 text-white px-2 py-1 mt-2 rounded'
						>
							Rimuovi
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
