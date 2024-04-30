import { Message, MessageProps } from '../Message'

export const ChatContent = () => {
  const messages: MessageProps[] = [
    {
      author: {
        name: 'Nikolay',
        avatar:
          'https://sun9-61.userapi.com/s/v1/ig2/P-wFiz_hQ6zaKFB22cdQ27sz_h1SWyMOyfDel3kdd0HrK46c1RAkHhibfSOqoSYedQfcmLtLKGqyi4XpTDCkFNZX.jpg?size=200x200&quality=95&crop=612,204,580,580&ava=1',
      },
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem assumenda quidem alias in blanditiis? Inventore, earum! Facere perspiciatis iste esse nam magnam amet consequatur cupiditate sint rerum, mollitia delectus? Tempora.',
      createdAt: '14:52',
    },
    {
      author: {
        name: 'Nikolay',
        avatar:
          'https://sun9-61.userapi.com/s/v1/ig2/P-wFiz_hQ6zaKFB22cdQ27sz_h1SWyMOyfDel3kdd0HrK46c1RAkHhibfSOqoSYedQfcmLtLKGqyi4XpTDCkFNZX.jpg?size=200x200&quality=95&crop=612,204,580,580&ava=1',
      },
      text: 'Hello world',
      createdAt: '14:55',
    },
    {
      author: {
        name: 'Nikolay',
        avatar:
          'https://sun9-61.userapi.com/s/v1/ig2/P-wFiz_hQ6zaKFB22cdQ27sz_h1SWyMOyfDel3kdd0HrK46c1RAkHhibfSOqoSYedQfcmLtLKGqyi4XpTDCkFNZX.jpg?size=200x200&quality=95&crop=612,204,580,580&ava=1',
      },
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus cum deleniti saepe ratione! Sequi autem beatae rerum aspernatur, placeat praesentium nam minima repellat eligendi eaque dolores, ipsam distinctio nihil! Perspiciatis. Ut maxime facilis est. Sapiente iusto nobis architecto non, totam adipisci est corrupti animi! Commodi porro aspernatur omnis quod temporibus, nesciunt, inventore mollitia, saepe esse totam incidunt consequuntur neque laboriosam?',
      createdAt: '15:52',
    },
    {
      author: {
        name: 'Nikolay',
        avatar:
          'https://sun9-61.userapi.com/s/v1/ig2/P-wFiz_hQ6zaKFB22cdQ27sz_h1SWyMOyfDel3kdd0HrK46c1RAkHhibfSOqoSYedQfcmLtLKGqyi4XpTDCkFNZX.jpg?size=200x200&quality=95&crop=612,204,580,580&ava=1',
      },
      text: `Следующий розыгрыш через месяц. Правила такие: 
      - разыгрывается столько подписок PRO какой уровень достигнут благодаря бустам
      - первая подписка разыгрывается среди тех кто бустил хотя бы раз
      - вторая и последующие среди тех кто бустил более одного раза (т.е. 2-ая подписка тем кто бустил миниумм 2 раза, 3-я подписка тем кто бустил минимум 3 раза и т.д.)`,
      createdAt: '17:52',
    },
    {
      author: {
        name: 'Nikolay',
        avatar:
          'https://sun9-61.userapi.com/s/v1/ig2/P-wFiz_hQ6zaKFB22cdQ27sz_h1SWyMOyfDel3kdd0HrK46c1RAkHhibfSOqoSYedQfcmLtLKGqyi4XpTDCkFNZX.jpg?size=200x200&quality=95&crop=612,204,580,580&ava=1',
      },
      text: `Запустите свой ИИ-город в 1 клик.

      Очень интересный проект с использованием искусственного интеллекта, где множество ИИ- агентов взаимодействуют друг с другом .
      
      Агенты введут социальную жизнь, коммуницируют между собой и запоминают свои действия. 
      
      Вы можете запустить свой город на базе llama3 (https://github.com/a16z-infra/ai-town/pull/219)🎉 или поиграть оналйн (https://www.convex.dev/ai-town).`,
      createdAt: '17:52',
    },
  ]

  return (
    <div className="overflow-y-auto bg-slate-100 px-4 py-4">
      <div className="flex max-w-[450px] flex-col gap-6">
        {messages.map((message) => (
          <Message {...message} />
        ))}
      </div>
    </div>
  )
}
