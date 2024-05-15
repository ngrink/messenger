import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useDebounce } from 'use-debounce'

import { SearchInput } from '@/components/SearchInput'
import { useStore } from '@/config'
import { SearchService } from '@/modules/search'

export const SearchInputContainer = observer(() => {
  const { searchStore } = useStore()

  const [query, setQuery] = useState<string>(searchStore.query)
  const [debouncedQuery] = useDebounce(query, 700, {
    maxWait: 2000,
  })

  useEffect(() => {
    searchStore.setQuery(query)
  }, [query])

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery) {
        searchStore.resetResults()
        return
      }

      try {
        searchStore.setIsFetching(true)

        const results = await SearchService.search(query)

        searchStore.setResults(results)
        searchStore.setIsFetching(false)
      } catch (e) {
        searchStore.setIsFetching(false)
      }
    }

    fetchSearchResults()
  }, [debouncedQuery])

  return <SearchInput value={query} onChange={setQuery} />
})
