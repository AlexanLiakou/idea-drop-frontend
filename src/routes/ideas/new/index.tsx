import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
})

function NewIdeaPage() {
  return <div>New Idea</div>
}
