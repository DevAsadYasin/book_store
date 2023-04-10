import { PrismaClient } from '@prisma/client';

const books = [
  {
    title: `Anna Karenina`,
    writer: `Leo Tolstoy`,
    points: 12,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
    tags: [`Fantasy`, `Romance`],
  },
  {
    title: `The Hobbit`,
    writer: `J.R.R. Tolkien`,
    points: 9,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/51U0E1X-ClL._SX345_BO1,204,203,200_.jpg`,
    tags: [`Fantasy`, `Adventure`],
  },
  {
    title: `Harry Potter and the Philosopher's Stone`,
    writer: `J.K. Rowling`,
    points: 10,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/51iU9Wq1e9L._SX324_BO1,204,203,200_.jpg`,
    tags: [`Fantasy`, `Magic`],
  },
  {
    title: `The Great Gatsby`,
    writer: `F. Scott Fitzgerald`,
    points: 8,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/51whrLzYiJL._AC_SY1000_.jpg`,
    tags: [`Classic Fiction`, `Romance`],
  },
  {
    title: `Pride and Prejudice`,
    writer: `Jane Austen`,
    points: 9,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/81fvpi7e4sL.jpg`,
    tags: [`Classic Fiction`, `Romance`],
  },
  {
    title: `Dune`,
    writer: `Frank Herbert`,
    points: 11,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/51SSGK8Ew6L._SX321_BO1,204,203,200_.jpg`,
    tags: [`Science Fiction`, `Adventure`],
  },
  {
    title: `The Catcher in the Rye`,
    writer: `J.D. Salinger`,
    points: 7,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/51MQQvFGRPL._SX329_BO1,204,203,200_.jpg`,
    tags: [`Classic Fiction`, `Coming-of-age Fiction`],
  },
  {
    title: `The Hunger Games`,
    writer: `Suzanne Collins`,
    points: 9,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/51iU9Wq1e9L._SX324_BO1,204,203,200_.jpg`,
    tags: [`Young Adult Fiction`, `Dystopian Fiction`],
  },
  {
    title: `The Lord of the Rings`,
    writer: `J.R.R. Tolkien`,
    points: 10,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/91Lo2qXpA8L.jpg`,
    tags: [`Fantasy`, `Adventure`],
  },
  {
    title: `1984`,
    writer: `George Orwell`,
    points: 8,
    coverImage: `https://images-na.ssl-images-amazon.com/images/I/51Y-McdzA5L.jpg`,
    tags: [`Dystopian Fiction`, `Science Fiction`],
  },
];

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  // const book1 = await prisma.book.upsert({
  //   where: { title: 'Prisma Adds Support for MongoDB' },
  //   update: {},
  //   create: {
  //     title: 'Prisma Adds Support for MongoDB',
  //     body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
  //     description:
  //       "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
  //     published: false,
  //   },
  // });

  await prisma.$transaction(
    books.map((book, index) =>
      prisma.book.upsert({
        where: { id: index + 1 },
        update: {},
        create: book,
      }),
    ),
  );
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
