import api from '../api/axios';
import type { Idea } from '#/types/Idea';

//Fetch All Ideas
export const fetchIdeas = async (limit?:number) : Promise<Idea[]> => {
  const res = await api.get(`ideas/`, {
    params: limit ? {_limit: limit} : {},
  });
  return res.data;
}

//Fetch Single idea
export const fetchIdea = async (ideaId:string) : Promise<Idea> => {
  const res = await api.get(`ideas/${ideaId}`);
  return res.data;
}

//Add New Idea
export const createIdea = async (newIdea:{
  title: string;
  summary: string;
  description: string;
  tags: string[];
}) : Promise<Idea> => {
  const res = await api.post('/ideas',{
    ...newIdea,
    createdAt: new Date().toISOString()
  })
  return res.data
}

//Delete Idea
export const deleteIdea = async (ideaId: string): Promise<void> => {
  await api.delete(`/ideas/${ideaId}`);
}

//Update Idea
export const updateIdea = async (ideaId: string, updatedData:{
  title:string,
  summary: string,
  description: string,
  tags: string []
}): Promise<Idea> => {
  const res = await api.put(`/ideas/${ideaId}`, updatedData);
  return res.data;
}