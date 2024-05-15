import { SearchAPI } from "./search.api";


export class SearchService {
  static async search(query: string) {
    const results = await SearchAPI.search(query)

    return results
  }
}