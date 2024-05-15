import { FC } from 'react'
import { Input } from '../ui/input'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex h-[60px] items-center px-3 py-2">
      <Input
        type="text"
        placeholder="Search"
        className="rounded-2xl bg-gray-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
