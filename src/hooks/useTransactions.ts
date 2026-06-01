import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useTransactions(orgId: string, month?: number, year?: number, type?: string) {
  const query = new URLSearchParams()
  if (orgId) query.append('orgId', orgId)
  if (month) query.append('month', month.toString())
  if (year) query.append('year', year.toString())
  if (type) query.append('type', type)

  const { data, error, mutate } = useSWR(`/api/transactions?${query.toString()}`, fetcher)

  return {
    transactions: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}
