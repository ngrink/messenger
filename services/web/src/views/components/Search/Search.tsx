import { Input } from '../ui/input'

export const Search = () => {
  return (
    <div className="flex h-[60px] items-center px-3 py-2">
      <Input
        type="text"
        placeholder="Search"
        className="rounded-2xl bg-gray-100"
      />
    </div>
  )
}
