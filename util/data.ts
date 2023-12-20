export const queryData = [
  {
    id: 1,
    user_id: 1,
    occurred_on: "2014-02-15 10:45:00", // YYYY-MM-DD HH:MM:SS
    content: "This is a sample query to the Falcon 40B LLM",
    type: "query",
  },
  {
    id: 2,
    user_id: 1,
    occurred_on: "2014-02-16 10:45:00", // YYYY-MM-DD HH:MM:SS
    content: "This is a follow-up query to a GPT-J 6B LLM",
    type: "query",
  },
];

export const responseData = [
  {
    id: 1,
    query_id: 1,
    user_id: 1,
    occurred_on: "2014-02-15 10:45:00", // YYYY-MM-DD HH:MM:SS
    content:
      "3M™ VHB™ Tape 4905 is an optically clear, double-sided tape with an acrylic adhesive that will strengthen the bond on curved glass to aluminum in a high vibration environment. It offers high bond strength, good environmental resistance, and the ability to bond to a wide range of materials.",
    type: "response",
  },
];

export const enhancedResults = [
  //   {
  //     id: 1,
  //     title:
  //       "3M™ Scotch-Weld™ Neoprene High Performance Rubber and Gasket Adhesive EC-1300",
  //     description:
  //       "High immediate strength when bonding to a variety of materials \nFast drying and great for processes with a 10-20 minute open time, objects may be handled immediately reducing down time \nAdheres neoprene, styrene-butadiene rubber (SBR), butyl and other types of rubbers to other various substrates",
  //     link: "https://www.3m.com/3M/en_US/p/d/b40071875/",
  //     imageURL: "./neoprene.png",
  //   },
  {
    id: 0,
    title: "3M 9205+ Aura Particulate N95 Respirator",
    description:
      "NIOSH approved for at least 95 percent filtration efficiency against certain non-oil based particles\nDesigned to direct exhaled air away from the nose panel, helping reduce eyewear fogging\nCurved low profile design conforms well to nose and eye contours, allowing more room for eyewear",
    link: "https://www.amazon.com/3M-Aura-Particulate-Respirator-9205/dp/B095FJ36H2/",
    imageURL: "./respirator.png",
  },
  {
    id: 1,
    title: "3M™ VHB™ Tape 4905",
    description: `Transperent, 0.5 mm, general purpose acrylic adhesive and firm acrylic foam core\nClear construction allowing joining of transparent material and virtually invisible bondline\nStrong and durable bonds to a wide variety of high to medium surface energy substrates like paints, metals and glass, acryl glass (PMMA), polycarbonate`,
    link: "https://www.3m.com/3M/en_LB/p/d/b40065643/",
    imageURL: "./vhbtape.png",
  },
];
