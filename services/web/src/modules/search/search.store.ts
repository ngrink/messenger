import { makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store";

export class SearchStore {
  query: string = ""
  results: any = {}
  isFetching: boolean = false

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'SearchStore',
      properties: [
        'query',
        'results',
        'isFetching'
      ],
      storage: window.localStorage
    })
  }

  get isSearching() {
    return this.query != ""
  }

  setQuery(query: string) {
    this.query = query
  }

  resetQuery() {
    this.query = ""
  }

  setResults(results: any) {
    this.results = results
  }

  resetResults() {
    this.results = {}
  }

  setIsFetching(value: boolean) {
    this.isFetching = value
  }
}