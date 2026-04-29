export type Language = "en" | "my";

export type EventIcon = "calendar" | "clock" | "mapPin" | "phone";

export interface WeddingContent {
  couple: {
    bride: string;
    groom: string;
    display: string;
  };
  intro: {
    label: string;
    text: string;
    hint: string;
    revealHint: string;
    welcomeEyebrow: string;
    welcomeTitle: string;
    dayText: string;
    dateText: string;
    envelopeClosedImage: string;
    envelopeOpenedBackImage: string;
    envelopeOpenedFrontImage: string;
    letterImage: string;
    ribbonImage: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    separator: string;
    description: string;
    badgeLabel: string;
    dateText: string;
    countdownDate: string;
    image: string;
  };
  venue: {
    eyebrow: string;
    title: string;
    description: string;
    mapUrl: string;
    photos: string[];
  };
  stories: Array<{
    title: string;
    text: string;
    image: string;
  }>;
  event: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      icon: EventIcon;
      label: string;
      value: string;
    }>;
    mapUrl: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    photos: Array<{
      src: string;
      label: string;
    }>;
  };
  rsvp: {
    eyebrow: string;
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    attendingLabel: string;
    acceptText: string;
    declineText: string;
    guestsLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitText: string;
    successTitle: string;
    successText: string;
    validationMessage: string;
    toastDescription: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    people: Array<{
      name: string;
      role: string;
      phone: string;
    }>;
    ctaText: string;
    buttonText: string;
    footerDate: string;
    footerCredit: string;
  };
  ui: {
    languageToggleLabel: string;
    switchToEnglish: string;
    switchToMyanmar: string;
    viewDetails: string;
    rsvpShort: string;
    rsvpNow: string;
    openInMaps: string;
    viewLocation: string;
    venueAlt: string;
    venueDetailAlt: string;
    countdown: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
    galleryDialogLabel: string;
    close: string;
    previous: string;
    next: string;
    openGalleryItem: string;
    chapterOne: string;
    chapterTwo: string;
    finalChapter: string;
    rsvpHelper: string;
    kindlyReply: string;
    kindlyReplyText: string;
    optional: string;
    sending: string;
    submissionFailed: string;
    submissionFailedDescription: string;
    muteMusic: string;
    unmuteMusic: string;
  };
}

export const weddingContent = {
  en: {
    couple: {
      bride: "Myo Myat Khine",
      groom: "Than Htay Hlaing",
      display: "Myo Myat Khine & Than Htay Hlaing",
    },

    intro: {
      label: "Wedding Invitation",
      text: "Together with our families, we invite you to celebrate our wedding and the beginning of our forever.",
      hint: "Tap to Open",
      revealHint: "Tap to Open Invitation",
      welcomeEyebrow: "Welcome to our celebration",
      welcomeTitle: "Step into our story",
      dayText: "Friday",
      dateText: "29 January 2027",
      envelopeClosedImage: "/Envelope Closed.png",
      envelopeOpenedBackImage: "/Envelope Opened.png",
      envelopeOpenedFrontImage: "/Envelope Opened Cutted.png",
      letterImage: "/Envelope Letter.png",
      ribbonImage: "/ribbon.png",
    },

    hero: {
      eyebrow: "Together with their families",
      titleLine1: "Myo Myat Khine",
      titleLine2: "Than Htay Hlaing",
      separator: "&",
      description: "A celebration of love, devotion, and the beautiful beginning of forever.",
      badgeLabel: "Wedding Celebration",
      dateText: "29 January 2027",
      countdownDate: "2027-01-29T10:00:00",
      image: "/hero-couple.jpg",
    },

    venue: {
      eyebrow: "The Venue",
      title: "Arian, Sittwe",
      description:
        "A beautiful setting where our celebration will take place, surrounded by elegance, warmth, and the people we love most.",
      mapUrl:
        "https://www.google.com/maps/place/Arian/@20.1360752,92.8967701,17z/data=!3m1!4b1!4m6!3m5!1s0x30b04f9e4236f609:0x475ee836395f588e!8m2!3d20.1360702!4d92.899345!16s%2Fg%2F1tg37jls?entry=ttu&g_ep=EgoyMDI2MDQyMS4wIKXMDSoASAFQAw%3D%3D",
      photos: ["/venue-1.jpg", "/venue-2.jpg", "/venue-3.jpg"],
    },

    stories: [
      {
        title: "The Beginning",
        text: "From a simple hello, everything changed. A moment that quietly started a lifetime together.",
        image: "/story-1.jpg",
      },
      {
        title: "Our Journey",
        text: "Through every laugh, every challenge, and every dream - we chose each other, again and again.",
        image: "/story-2.jpg",
      },
      {
        title: "Forever Starts Here",
        text: "Now, we begin the most beautiful chapter of our lives - and we invite you to be part of it.",
        image: "/story-3.jpg",
      },
    ],

    event: {
      eyebrow: "Join Us",
      title: "Wedding Details",
      description:
        "We would be honored to celebrate this unforgettable day with the people who mean the most to us.",
      items: [
        {
          icon: "calendar",
          label: "The Date",
          value: "Friday, 29 January 2027",
        },
        {
          icon: "clock",
          label: "The Time",
          value: "Signing Ceremony - 10:00 AM\nWedding Celebration - 12:00 PM",
        },
        {
          icon: "mapPin",
          label: "The Venue",
          value: "Arian\nShuKhinTha St, Sittwe, Myanmar",
        },
        {
          icon: "phone",
          label: "Contact",
          value: "+95 9517001",
        },
      ],
      mapUrl:
        "https://www.google.com/maps/place/Arian/@20.1360881,92.8991252,16.5z/data=!4m6!3m5!1s0x30b04f9e4236f609:0x475ee836395f588e!8m2!3d20.1360702!4d92.899345!16s%2Fg%2F1tg37jls?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D",
    },

    gallery: {
      eyebrow: "Our Moments",
      title: "Gallery",
      photos: [
        { src: "/gallery-1.jpg", label: "A Beautiful Beginning" },
        { src: "/gallery-2.jpg", label: "Moments We Treasure" },
        { src: "/gallery-3.jpg", label: "A Love That Grew" },
        { src: "/gallery-4.jpg", label: "Side by Side" },
        { src: "/gallery-5.jpg", label: "Captured with Love" },
        { src: "/gallery-6.jpg", label: "Forever Starts Here" },
      ],
    },

    rsvp: {
      eyebrow: "Be Our Guest",
      title: "RSVP",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your full name",
      attendingLabel: "Will you be joining us?",
      acceptText: "Joyfully Accept",
      declineText: "Respectfully Decline",
      guestsLabel: "Number of Guests",
      messageLabel: "A message for us",
      messagePlaceholder: "Leave your wishes for the couple...",
      submitText: "Send Response",
      successTitle: "Thank You",
      successText:
        "Your presence means everything to us. We look forward to celebrating together.",
      validationMessage: "Please enter your name",
      toastDescription: "Your response has been received with love.",
    },

    contact: {
      eyebrow: "Reach Out",
      title: "With Love, Contact Us",
      description:
        "For kind wishes, warm words, or any details regarding the celebration, you may reach us directly.",
      people: [
        {
          name: "Myo Myat Khine",
          role: "The Bride",
          phone: "959517001",
        },
        {
          name: "Than Htay Hlaing",
          role: "The Groom",
          phone: "6289876543210",
        },
      ],
      ctaText: "Tap to send your wishes and blessings through WhatsApp.",
      buttonText: "Message on WhatsApp",
      footerDate: "29 January 2027",
      footerCredit: "JackNex Studio",
    },

    ui: {
      languageToggleLabel: "Language",
      switchToEnglish: "Switch to English",
      switchToMyanmar: "Switch to Myanmar",
      viewDetails: "View Details",
      rsvpShort: "RSVP",
      rsvpNow: "RSVP Now",
      openInMaps: "Open in Google Maps",
      viewLocation: "View Location",
      venueAlt: "Wedding venue",
      venueDetailAlt: "Wedding venue detail",
      countdown: {
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
      },
      galleryDialogLabel: "Gallery image preview",
      close: "Close",
      previous: "Previous",
      next: "Next",
      openGalleryItem: "Open",
      chapterOne: "Chapter One",
      chapterTwo: "Chapter Two",
      finalChapter: "Final Chapter",
      rsvpHelper:
        "Let us know if you'll be joining us for this beautiful celebration.",
      kindlyReply: "Kindly Reply",
      kindlyReplyText:
        "Your response helps us prepare a beautiful celebration for everyone joining us.",
      optional: "optional",
      sending: "Sending...",
      submissionFailed: "Submission failed",
      submissionFailedDescription: "Please try again in a moment.",
      muteMusic: "Mute music",
      unmuteMusic: "Unmute music",
    },
  },

  my: {
    couple: {
      bride: "မျိုးမြတ်ခိုင်",
      groom: "သန်းဌေးလှိုင်",
      display: "မျိုးမြတ်ခိုင် နှင့် သန်းဌေးလှိုင်",
    },

    intro: {
      label: "မင်္ဂလာဆောင် ဖိတ်ကြားလွှာ",
      text: "ကျွန်ုပ်တို့မိသားစုများနှင့်အတူ မင်္ဂလာပွဲနှင့် ထာဝရဘဝအစကို လာရောက်ဆင်နွှဲပေးပါရန် လေးစားစွာ ဖိတ်ကြားအပ်ပါသည်။",
      hint: "ဖွင့်ရန် နှိပ်ပါ",
      revealHint: "ဖိတ်ကြားလွှာ ဖွင့်ရန် နှိပ်ပါ",
      welcomeEyebrow: "ကျွန်ုပ်တို့၏ မင်္ဂလာအခမ်းအနားမှ ကြိုဆိုပါတယ်",
      welcomeTitle: "ချစ်ခြင်းမေတ္တာ ဇာတ်လမ်းထဲသို့ ဝင်ရောက်ပါ",
      dayText: "သောကြာနေ့",
      dateText: "၂၀၂၇ ခုနှစ် ဇန်နဝါရီလ ၂၉ ရက်",
      envelopeClosedImage: "/Envelope Closed.png",
      envelopeOpenedBackImage: "/Envelope Opened.png",
      envelopeOpenedFrontImage: "/Envelope Opened Cutted.png",
      letterImage: "/Envelope Letter.png",
      ribbonImage: "/ribbon.png",
    },

    hero: {
      eyebrow: "မိသားစုများနှင့်အတူ",
      titleLine1: "မျိုးမြတ်ခိုင်",
      titleLine2: "သန်းဌေးလှိုင်",
      separator: "နှင့်",
      description: "ချစ်ခြင်း၊ သစ္စာရှိခြင်းနှင့် ထာဝရအနာဂတ်၏ လှပသောအစကို အတူတကွ ဂုဏ်ပြုဆင်နွှဲကြပါစို့။",
      badgeLabel: "မင်္ဂလာပွဲ အခမ်းအနား",
      dateText: "၂၀၂၇ ခုနှစ် ဇန်နဝါရီလ ၂၉ ရက်",
      countdownDate: "2027-01-29T10:00:00",
      image: "/hero-couple.jpg",
    },

    venue: {
      eyebrow: "ကျင်းပမည့်နေရာ",
      title: "Arian, စစ်တွေ",
      description:
        "ချစ်ရသောသူများနှင့်အတူ နွေးထွေးလှပစွာ ဆင်နွှဲမည့် အမှတ်တရနေရာ ဖြစ်ပါသည်။",
      mapUrl:
        "https://www.google.com/maps/place/Arian/@20.1360752,92.8967701,17z/data=!3m1!4b1!4m6!3m5!1s0x30b04f9e4236f609:0x475ee836395f588e!8m2!3d20.1360702!4d92.899345!16s%2Fg%2F1tg37jls?entry=ttu&g_ep=EgoyMDI2MDQyMS4wIKXMDSoASAFQAw%3D%3D",
      photos: ["/venue-1.jpg", "/venue-2.jpg", "/venue-3.jpg"],
    },

    stories: [
      {
        title: "အစပျိုးခဲ့သော နေ့ရက်",
        text: "ရိုးရှင်းသော နှုတ်ဆက်စကားလေးတစ်ခွန်းမှ အရာအားလုံး ပြောင်းလဲခဲ့သည်။ ထိုအခိုက်အတန့်လေးက ဘဝတစ်လျှောက်အတူရှိမည့် လမ်းခရီးကို တိတ်တဆိတ် စတင်စေခဲ့သည်။",
        image: "/story-1.jpg",
      },
      {
        title: "ကျွန်ုပ်တို့၏ ခရီးလမ်း",
        text: "ရယ်မောမှုများ၊ စိန်ခေါ်မှုများနှင့် အိပ်မက်တိုင်းထဲတွင် ကျွန်ုပ်တို့သည် တစ်ယောက်ကိုတစ်ယောက် ထပ်ခါထပ်ခါ ရွေးချယ်ခဲ့ကြသည်။",
        image: "/story-2.jpg",
      },
      {
        title: "ထာဝရအစ ဒီနေရာမှ",
        text: "ယခုအခါ ကျွန်ုပ်တို့၏ဘဝတွင် အလှဆုံးအခန်းကို စတင်မည်ဖြစ်ပြီး ထိုနေ့ရက်တွင် ပါဝင်ပေးရန် ဖိတ်ကြားအပ်ပါသည်။",
        image: "/story-3.jpg",
      },
    ],

    event: {
      eyebrow: "လာရောက်ဆင်နွှဲပေးပါရန်",
      title: "မင်္ဂလာပွဲ အသေးစိတ်",
      description:
        "ကျွန်ုပ်တို့အတွက် အရေးကြီးသောသူများနှင့်အတူ ဤအမှတ်တရနေ့ရက်ကို ဆင်နွှဲနိုင်ခြင်းသည် ဂုဏ်ယူဝမ်းမြောက်ဖွယ် ဖြစ်ပါသည်။",
      items: [
        {
          icon: "calendar",
          label: "နေ့ရက်",
          value: "သောကြာနေ့၊ ၂၀၂၇ ခုနှစ် ဇန်နဝါရီလ ၂၉ ရက်",
        },
        {
          icon: "clock",
          label: "အချိန်",
          value: "လက်မှတ်ရေးထိုးပွဲ - နံနက် ၁၀:၀၀\nမင်္ဂလာဧည့်ခံပွဲ - နေ့လယ် ၁၂:၀၀",
        },
        {
          icon: "mapPin",
          label: "နေရာ",
          value: "Arian\nShuKhinTha St, စစ်တွေ၊ မြန်မာ",
        },
        {
          icon: "phone",
          label: "ဆက်သွယ်ရန်",
          value: "+95 9517001",
        },
      ],
      mapUrl:
        "https://www.google.com/maps/place/Arian/@20.1360881,92.8991252,16.5z/data=!4m6!3m5!1s0x30b04f9e4236f609:0x475ee836395f588e!8m2!3d20.1360702!4d92.899345!16s%2Fg%2F1tg37jls?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D",
    },

    gallery: {
      eyebrow: "ကျွန်ုပ်တို့၏ အမှတ်တရများ",
      title: "ဓာတ်ပုံများ",
      photos: [
        { src: "/gallery-1.jpg", label: "လှပသောအစပျိုးခြင်း" },
        { src: "/gallery-2.jpg", label: "တန်ဖိုးထားရသော အခိုက်အတန့်များ" },
        { src: "/gallery-3.jpg", label: "ကြီးထွားလာသော ချစ်ခြင်း" },
        { src: "/gallery-4.jpg", label: "အတူတကွ လျှောက်လှမ်းခြင်း" },
        { src: "/gallery-5.jpg", label: "ချစ်ခြင်းဖြင့် မှတ်တမ်းတင်ထားသည်" },
        { src: "/gallery-6.jpg", label: "ထာဝရအစ ဒီနေရာမှ" },
      ],
    },

    rsvp: {
      eyebrow: "ဧည့်သည်တော်အဖြစ် ကြွရောက်ပါရန်",
      title: "တက်ရောက်မှု အကြောင်းပြန်ရန်",
      nameLabel: "အမည်",
      namePlaceholder: "အမည်အပြည့်အစုံ ရိုက်ထည့်ပါ",
      attendingLabel: "တက်ရောက်မည်လား။",
      acceptText: "ဝမ်းမြောက်စွာ တက်ရောက်ပါမည်",
      declineText: "လေးစားစွာ မတက်ရောက်နိုင်ပါ",
      guestsLabel: "ဧည့်သည်အရေအတွက်",
      messageLabel: "ဆုမွန်စကား",
      messagePlaceholder: "မင်္ဂလာမောင်နှံအတွက် ဆုမွန်စကား ရေးပါ...",
      submitText: "အကြောင်းပြန်ရန်",
      successTitle: "ကျေးဇူးတင်ပါတယ်",
      successText:
        "သင်၏တက်ရောက်မှုသည် ကျွန်ုပ်တို့အတွက် အလွန်တန်ဖိုးရှိပါသည်။ အတူတကွ ဆင်နွှဲရမည့်နေ့ကို စောင့်မျှော်နေပါသည်။",
      validationMessage: "ကျေးဇူးပြု၍ အမည်ထည့်ပါ",
      toastDescription: "သင်၏အကြောင်းပြန်ချက်ကို ချစ်ခြင်းမေတ္တာဖြင့် လက်ခံရရှိပါပြီ။",
    },

    contact: {
      eyebrow: "ဆက်သွယ်ရန်",
      title: "ချစ်ခြင်းမေတ္တာဖြင့် ဆက်သွယ်ပါ",
      description:
        "ဆုမွန်ကောင်းများ၊ နွေးထွေးသောစကားများ သို့မဟုတ် အခမ်းအနားဆိုင်ရာ အသေးစိတ်များအတွက် တိုက်ရိုက်ဆက်သွယ်နိုင်ပါသည်။",
      people: [
        {
          name: "မျိုးမြတ်ခိုင်",
          role: "သတို့သမီး",
          phone: "959517001",
        },
        {
          name: "သန်းဌေးလှိုင်",
          role: "သတို့သား",
          phone: "6289876543210",
        },
      ],
      ctaText: "WhatsApp မှတစ်ဆင့် ဆုမွန်ကောင်းများနှင့် မေတ္တာစကားများ ပေးပို့နိုင်ပါသည်။",
      buttonText: "WhatsApp မှ စာပို့ရန်",
      footerDate: "၂၀၂၇ ခုနှစ် ဇန်နဝါရီလ ၂၉ ရက်",
      footerCredit: "JackNex Studio",
    },

    ui: {
      languageToggleLabel: "ဘာသာစကား",
      switchToEnglish: "အင်္ဂလိပ်ဘာသာသို့ ပြောင်းရန်",
      switchToMyanmar: "မြန်မာဘာသာသို့ ပြောင်းရန်",
      viewDetails: "အသေးစိတ် ကြည့်ရန်",
      rsvpShort: "အကြောင်းပြန်ရန်",
      rsvpNow: "ယခု အကြောင်းပြန်ရန်",
      openInMaps: "Google Maps တွင် ဖွင့်ရန်",
      viewLocation: "နေရာကြည့်ရန်",
      venueAlt: "မင်္ဂလာပွဲ ကျင်းပမည့်နေရာ",
      venueDetailAlt: "ကျင်းပမည့်နေရာ အသေးစိတ်ပုံ",
      countdown: {
        days: "ရက်",
        hours: "နာရီ",
        minutes: "မိနစ်",
        seconds: "စက္ကန့်",
      },
      galleryDialogLabel: "ဓာတ်ပုံကြည့်ရန်",
      close: "ပိတ်ရန်",
      previous: "ယခင်ပုံ",
      next: "နောက်ပုံ",
      openGalleryItem: "ဖွင့်ရန်",
      chapterOne: "ပထမအခန်း",
      chapterTwo: "ဒုတိယအခန်း",
      finalChapter: "နောက်ဆုံးအခန်း",
      rsvpHelper: "ဤလှပသောအခမ်းအနားသို့ တက်ရောက်မည်ဖြစ်ကြောင်း အသိပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။",
      kindlyReply: "ကျေးဇူးပြု၍ အကြောင်းပြန်ပါ",
      kindlyReplyText:
        "သင်၏အကြောင်းပြန်ချက်က တက်ရောက်မည့်ဧည့်သည်အားလုံးအတွက် လှပသောအခမ်းအနား ပြင်ဆင်ရာတွင် အထောက်အကူဖြစ်ပါသည်။",
      optional: "မဖြစ်မနေ မလိုပါ",
      sending: "ပေးပို့နေပါသည်...",
      submissionFailed: "ပေးပို့မှု မအောင်မြင်ပါ",
      submissionFailedDescription: "ခဏအကြာတွင် ထပ်မံကြိုးစားပါ။",
      muteMusic: "တေးဂီတပိတ်ရန်",
      unmuteMusic: "တေးဂီတဖွင့်ရန်",
    },
  },
} satisfies Record<Language, WeddingContent>;

export const weddingData = weddingContent.en;
