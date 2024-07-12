import { $axios } from "@/config";

export class SearchAPI {
  static async search(query: string) {
    const res = await $axios.get('/search', {
      params: {
        query: query,
      }
    })

    return res.data
  }
}