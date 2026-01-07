import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll
  })
}

export const useUser = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => usersService.getUser(id),
    enabled: !!id
  })
}