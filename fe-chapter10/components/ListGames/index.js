const callouts = [
    {
      name: 'Sports',
      description: 'Rock Paper Scissors',
      imageSrc: 'https://img.freepik.com/free-vector/rock-paper-scissors-cartoon-banners-with-hands_107791-10979.jpg?w=740&t=st=1664968195~exp=1664968795~hmac=e44317af754bab05202d3c5dd2778e1c3facf9f6a890e89cc558f79ba8b39211',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '/rooms',
    },
    {
      name: 'Sports',
      description: 'Tic Tac Toe',
      imageSrc: 'https://img.freepik.com/free-vector/coming-soon-construction-illustration-design_1017-31446.jpg?w=740&t=st=1664968639~exp=1664969239~hmac=6f251356492bcb811758fac872f6790470c9b5fdde0fa3f8e40362f34996a642',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Sports',
      description: 'Shadow Fighter',
      imageSrc: 'https://img.freepik.com/free-vector/coming-soon-construction-illustration-design_1017-31446.jpg?w=740&t=st=1664968639~exp=1664969239~hmac=6f251356492bcb811758fac872f6790470c9b5fdde0fa3f8e40362f34996a642',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
  ]
  
  export default function ListGames () {
    return (
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32"> */}
            <h2 className="text-2xl font-bold text-gray-900">List Games 🚀</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    {/* <a href={callout.href}> */}
                      <span className="absolute inset-0" />
                      {callout.name}
                    {/* </a> */}
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                  <div className="mt-6">
                    <a href={callout.href}
                       className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >PLay Games</a>
                  </div>
                </div>
              ))}
              
            </div>

          {/* </div> */}
        </div>
      </div>
    )
  }