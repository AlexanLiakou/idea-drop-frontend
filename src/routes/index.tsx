import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ 
  head: () => ({
    meta: [
      {
        title: 'IdeaHub - Browse Ideas',
      },
    ],
  }),
  component: Home
})

function Home() {
  return (
    <div>
     MY APP
    </div>
  )
}
