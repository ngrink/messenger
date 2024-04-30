import { Chat } from '@/components/Chat'
import { ChatDetails } from '@/components/ChatDetails'
import { ChatList } from '@/components/ChatList'
import { Search } from '@/components/Search'

export const ChatScreen = () => {
  const items = getItems()

  return (
    <div className="grid h-screen grid-cols-[500px_1fr_400px] overflow-hidden">
      <div className="h-screen">
        <Search />
        <ChatList items={items} />
      </div>
      <div className="h-screen">
        <Chat />
      </div>

      <ChatDetails />
    </div>
  )
}

function getItems() {
  let items = [
    {
      chatId: 1,
      name: 'Nikolay Grinko',
      avatar:
        'https://sun9-61.userapi.com/s/v1/ig2/P-wFiz_hQ6zaKFB22cdQ27sz_h1SWyMOyfDel3kdd0HrK46c1RAkHhibfSOqoSYedQfcmLtLKGqyi4XpTDCkFNZX.jpg?size=200x200&quality=95&crop=612,204,580,580&ava=1',
      lastMessageText: 'Hello world',
      lastMessageAt: '14:52',
      unreadMessagesCount: 3,
      active: true,
    },
    {
      chatId: 2,
      name: 'Руслан Колыванов',
      lastMessageText: 'Hello world',
      lastMessageAt: '11:04',
      unreadMessagesCount: 1,
      active: false,
    },
    {
      chatId: 3,
      name: 'Programming',
      avatar:
        'https://sun9-53.userapi.com/g8OJcVnli9U2gxmPUBXHqL2NUdbF_9Tnc6XOdQ/s5ojYmQG90w.jpg?ava=1',
      lastMessageText: 'Some text',
      lastMessageAt: '25 апр',
      unreadMessagesCount: 0,
      active: false,
    },
    {
      chatId: 5,
      name: 'Максим Гринько',
      avatar:
        'https://sun9-1.userapi.com/s/v1/ig2/W0P_QprhkFOXqjDlquIuSS33xR1AIrX1spaWvVAbcqut9-vzeMfbFtwzBQwzRPKDvVmLxcWvyQLB16RgjcrXtZWA.jpg?size=50x50&quality=95&crop=496,43,1068,1068&ava=1',
      lastMessageText: 'Окей',
      lastMessageAt: '5 фев',
      unreadMessagesCount: 0,
      active: false,
    },
    {
      chatId: 6,
      name: 'Gigabot Dev',
      avatar:
        'https://sun9-19.userapi.com/s/v1/ig2/ol23fGKPEmprhYjCqEPsXyuYpvlmvnynD8J4DI80pRsE5eRxFZQWekTE_J-58Bbk8Hs5k2JYtv2d60Xs3bXLOuGs.jpg?size=50x50&quality=95&crop=1,0,1478,1478&ava=1',
      lastMessageText:
        'Очень мега мега длинное сообщение которое не помещается на экране в одну строку',
      lastMessageAt: '8 ноя 2023',
      unreadMessagesCount: 5,
      active: false,
    },
    {
      chatId: 8,
      name: 'Test',
      lastMessageText: 'Test message',
      lastMessageAt: '25 окт 2023',
      unreadMessagesCount: 0,
      active: false,
    },
    {
      chatId: 9,
      name: 'Machine Learning',
      lastMessageText:
        'LLM Datasets: High-quality datasets, tools, and concepts for LLM fine-tuning.',
      lastMessageAt: '13:12',
      unreadMessagesCount: 0,
      active: false,
    },
  ]
  const newitems = [
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
  ].map((item) => {
    const newitem = { ...item }
    newitem.active = false
    newitem.unreadMessagesCount = 0
    return newitem
  })

  newitems[0].active = true
  newitems[0].unreadMessagesCount = 14
  newitems[1].unreadMessagesCount = 7
  newitems[2].unreadMessagesCount = 2

  console.log(newitems)

  return newitems
}
