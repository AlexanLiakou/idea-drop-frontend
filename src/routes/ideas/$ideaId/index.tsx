import { createFileRoute, Link } from '@tanstack/react-router';
import type { Idea } from '#/types/Idea';

const fetchIdea = async (ideaId:string) : Promise<Idea> => {
  const res = await fetch(`http://localhost:8000/ideas/${ideaId}`);

    if(!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({params}) => {
    return fetchIdea(params.ideaId);
  }
})

function IdeaDetailsPage() {
  const idea = Route.useLoaderData();
  return (
    <div className='p-4'>
      <Link className='text-blue-500 underline block mb-4' to='/ideas'>Back To Ideas</Link>
      <h2 className='text-2xl font-bold'>{idea.title}</h2>
      <p className='mt-2'>{idea.description}</p>
    </div>
  )
}
