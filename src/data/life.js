/*
  ─────────────────────────────────────────────────────────────────────────
  EVERYTHING ELSE — the page at /life.

  Deliberately the inverse of the main site: black instead of warm paper,
  image-first instead of text-first. Same person, other half.

  Quotes carry an optional `source`. Set `attribution` to null for one you
  want to stand unattributed.

  Film fields:
    src      an .mp4 under /public/videos
    youtube  an embed URL, instead of src
    poster   only for YouTube films — an iframe can't show a frame without
             loading the whole player, so those use YouTube's own still at
             img.youtube.com/vi/<id>/maxresdefault.jpg
             A local .mp4 needs none: the tile renders a <video> that paints
             its own first frame.
    place    the big label
    note     the small label under it
  ─────────────────────────────────────────────────────────────────────────
*/

export const intro = {
  kicker: "Outside of tech",
  title: "Everything else",
  footer: "Back to work",
};

export const exchange = {
  title: "Exchange 2026",
  dates: "Dec 2025 — May 2026",
  blurb:
    "Studying abroad was a life-changing experience. Here's a glimpse of the experiences I had!",
  films: [
    {
      youtube: "https://www.youtube.com/embed/biLJelWQ-AQ",
      poster: "/images/posters/china.jpg",
      place: "China",
      note: "Vlog No. 1",
    },
    {
      youtube: "https://www.youtube.com/embed/ILVDQxZ1UBc",
      poster: "/images/posters/bali.jpg",
      place: "Bali",
      note: "Our last trip together · April 2026",
    },
    {
      src: "/videos/HaGiangLoop.mp4",
      place: "Hà Giang Loop",
      note: "Vietnam · March 2026",
    },
    {
      src: "/videos/ChiangMai.mp4",
      place: "Chiang Mai",
      note: "Thailand · March 2026",
    },
    {
      src: "/videos/Singapore.mp4",
      place: "Singapore",
      note: "January 2026",
    },
    {
      src: "/videos/CQ.mp4",
      place: "Chongqing",
      note: "China · January 2026",
    },
  ],
};

/*
  Same shape as `exchange`: a title, a range, a blurb, and the items. Quotes
  are set at a size derived from their length — a short line gets to be big,
  a long one stays readable — and they alternate alignment down the page so
  the block never settles into a column of centred text.
*/
export const quotes = {
  title: "Quotes",
  // The oldest is Wilcox in 1883, the newest a football manga. Hence the range.
  blurb:
    "Lines I keep coming back to. Read together they probably explain how I think better than the rest of this site does.",
  items: [
    {
      text: "You can't connect the dots looking forward. You can only connect them looking backwards.",
      attribution: "Steve Jobs",
      source: "Stanford commencement, 2005",
    },
    {
      text: "Laugh, and the world laughs with you; weep, and you weep alone.",
      attribution: "Ella Wheeler Wilcox",
      source: "Solitude, 1883",
    },
    {
      text: "For me, life is continuously being hungry. The meaning of life is not simply to exist, to survive, but to move ahead, to go up, to achieve, to conquer.",
      attribution: "Arnold Schwarzenegger",
      source: null,
    },
    {
      text: "What is the point of being on this Earth if you are going to be like everyone else?",
      attribution: "Arnold Schwarzenegger",
      source: null,
    },
    {
      text: "When things look dire, don't get scared. Get excited.",
      attribution: "Meguru Bachira",
      source: "Blue Lock",
    },
  ],
};
