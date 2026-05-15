import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import { fetchIdea, updateIdea } from '#/api/ideas'

const ideaQueryOptions = (id: string) => 
  queryOptions({
    queryKey: ['idea', id],
    queryFn: () => fetchIdea(id)
  })

export const Route = createFileRoute('/ideas/$ideaId/edit')({
  component: IdeaEditPage,
  loader: async ({params, context:{queryClient}}) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId)
    )
  }
})

function IdeaEditPage() {
  const {ideaId} = Route.useParams();
  const navigate = useNavigate();
  const {data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId));
  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  const [tagsInput, setTagsInput] = useState(idea.tags.join(', '));

  const {mutateAsync, isPending} = useMutation({
    mutationFn: () => updateIdea(ideaId, {
      title,
      summary,
      description,
      tags: tagsInput.split(',').map((tag)=> tag.trim()).filter(Boolean)
    }),
    onSuccess: () => {
      navigate({to: '/ideas/$ideaId', params: {ideaId}})
    }
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync();
  }

  return (
        <div className='space-y-4'>
          <div className='flex justify-between items-center mb-2'>
            <h1 className='text-2xl font-bold'>Edit Idea</h1>
            <Link className='text-center inline-block !bg-blue-600 hover:!bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition mb-4' to='/ideas/$ideaId' params={{ideaId}}>Back To Idea</Link>
          </div>
      <form onSubmit={handleUpdate} className='space-y-2'>
          <div>
            <label
              htmlFor='title'
              className='block text-gray-700 font-medium mb-1'
            >
              Title*
            </label>
            <input
              required
              id='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter idea title'
            />
          </div>

          <div>
            <label
              htmlFor='summary'
              className='block text-gray-700 font-medium mb-1'
            >
              Summary*
            </label>
            <input
              required
              id='summary'
              type='text'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter idea summary'
            />
          </div>

          <div>
            <label
              htmlFor='body'
              className='block text-gray-700 font-medium mb-1'
            >
              Description*
            </label>
            <textarea
              required
              id='body'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Write out the description of your idea'
            />
          </div>

          <div>
            <label
              htmlFor='tags'
              className='block text-gray-700 font-medium mb-1'
            >
              Tags
            </label>
            <input
              id='tags'
              type='text'
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='optional tags, comma separated'
            />
          </div>
          {/* {
            formError && formError.length > 0 && (
              <div className='mt-5'>
                <p className='text-red-600 font-bold'>{formError}</p>
              </div>
            )
          } */}
          <div className='mt-5'>
            <button
            disabled={isPending}
              type='submit'
              className='block w-full !bg-blue-600 hover:!bg-blue-700 cursor-pointer text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isPending ? 'Updating...' : 'Update Idea'}
            </button>
          </div>
        </form>
    </div>
  )
}
