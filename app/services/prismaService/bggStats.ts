import { PrismaClient } from "@prisma/client";

const getUserId = async (username: string): Promise<number> => {
  const res = await fetch(
    `https://boardgamegeek.com/xmlapi2/user?name=${username}`
  );
  // console.log("res", res);

  const xmlData = await res.text();
  const regex = /(id="\d*")/g;
  const matched = [...xmlData.match(regex)][0];
  const firstQuotationMark = matched.indexOf('"');
  const lastQuotationMark = matched.lastIndexOf('"');
  const id = matched.slice(firstQuotationMark + 1, lastQuotationMark);
  return parseInt(id);
};

type Args = {
  username: string;
  page: string;
};
export const addUsageData = async (args: Args) => {
  try {
    // check if user exists on bggUsers table
    let userId;
    const user = await getBggUserFromDB(args.username);
    console.log("user", user);

    if (user) {
      userId = user.id;
    }
    // if not, add user to bggUsers table
    else {
      userId = await getUserId(args.username);
      console.log("userId", userId);
      addBggUserToDB({
        username: args.username,
        userId: userId,
      });
    }
    // add usage data to bggUsage table
    addBggUsageToDB({ userId, page: args.page });
  } catch (err) {
    console.error(err);
    // process.exit(1);
  }
};

const getBggUserFromDB = async (username: string) => {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.bggUser.findUnique({
      where: {
        username: username,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    // process.exit(1);
  }
};

const addBggUserToDB = async ({
  username,
  userId,
}: {
  username: string;
  userId: number;
}) => {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.bggUser.create({
      data: {
        username,
        id: userId,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    // process.exit(1);
  }
};

const addBggUsageToDB = async ({
  userId,
  page,
}: {
  userId: number;
  page: string;
}) => {
  const prisma = new PrismaClient();

  try {
    // Check is user has used today
    const dataExists = await prisma.bggStatsUsageHistory.findFirst({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        page,
      },
    });

    if (dataExists) {
      await prisma.$disconnect();
      return;
    }

    const result = await prisma.bggStatsUsageHistory.create({
      data: {
        userId,
        page,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    // process.exit(1);
  }
};
