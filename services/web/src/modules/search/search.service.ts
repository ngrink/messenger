import { store } from "@/config";
import { SearchAPI } from "./search.api";


export class SearchService {
  static async search(query: string) {
    try {
      store.searchStore.setIsFetching(true)

      const results = await SearchAPI.search(query)

      store.searchStore.setResults(results)
      store.searchStore.setIsFetching(false)
    } catch (e) {
      store.searchStore.setIsFetching(false)
    }
  }
}