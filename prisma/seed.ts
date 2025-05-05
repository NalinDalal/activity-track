const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  const usersData = [
    {
      email: "alice@example.com",
      password,
      urls: [
        {
          url: "https://google.com",
          trackedUrl: {
            url: "https://google.com/track",
          },
          events: [
            {
              url: "https://google.com",
              referrer: "https://some-referrer.com",
            },
          ],
        },
        {
          url: "https://youtube.com",
          trackedUrl: {
            url: "https://youtube.com/track",
          },
          events: [
            {
              url: "https://youtube.com",
              referrer: "https://another-referrer.com",
            },
          ],
        },
      ],
    },
    {
      email: "bob@example.com",
      password,
      urls: [
        {
          url: "https://facebook.com",
          trackedUrl: {
            url: "https://facebook.com/track",
          },
          events: [
            {
              url: "https://facebook.com",
              referrer: "https://social-referrer.com",
            },
          ],
        },
      ],
    },
    {
      email: "charlie@example.com",
      password,
      urls: [],
    },
  ];

  for (const user of usersData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: user.password,
        urls: {
          create: user.urls.map((url) => ({
            url: url.url,
            trackedUrl: {
              create: url.trackedUrl, // Creating associated TrackedUrl
            },
            events: {
              create: url.events, // Creating associated Event entries
            },
          })),
        },
      },
    });
  }

  console.log("✅ Seeded users with URLs, tracked URLs, and events");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
