import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { fetchIdea, deleteIdea } from '#/api/ideas';



const ideaQueryOptions = (ideaId:string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdea(ideaId)
})

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({params, context: {queryClient}}) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  }
})

function IdeaDetailsPage() {
  const {ideaId} = Route.useParams();
  const {data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId));
  const navigate = useNavigate();

  const {mutateAsync: deleteMutate, isPending} = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({to: '/ideas'})
    }
  })

const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this idea?');

    if(confirmDelete) {
      await deleteMutate();
    }
}
  return (
    <div className='p-4'>
      <Link className='text-center inline-block !bg-blue-600 hover:!bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition mb-4' to='/ideas'>Back To Ideas</Link>
      <h2 className='text-2xl font-bold'>{idea.title}</h2>
      <p className='mt-2'>{idea.description}</p>
      <Link className='inline-block text-sm !bg-yellow-500 hover:!bg-yellow-600 text-white !mt-4 mr-2 px-4 py-2 rounded transition' to='/ideas/$ideaId/edit' params={{ideaId}}>Edit</Link>
      <button onClick={handleDelete} disabled={isPending} className='text-sm !bg-red-600 text-white px-4 py-2 rounded trasition hover:!bg-red-700 disabled:opacity:50 !mt-4 cursor-pointer'>
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}
