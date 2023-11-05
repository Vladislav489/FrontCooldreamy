import { ILocale } from "@/models/ILocale";

const en: ILocale = {
  global: {
      prompts: {
          targets: {
              communication: "communication",
              serious_relationship: "serious relationship",
              flirt: "flirt",
              join_trip: "join trip",
              real_meetings: "real meetings"
          },
          interests: {
              sport: "sport",
              art: "art",
              it: "IT",
              finance: "finance and investments",
              science: "science",
              travel: "travel",
              restaurants: "restaurants and bars",
              extreme: "extreme",
              nature: "nature",
              film: "films",
              music: "music",
              literature: "literature",
              shopping: "shopping",
              dance: "dance",
              cars: "cars",
              cooking: "cooking"
          },
          finance: {
              abundance: "abundance",
              search_sponsor: "search sponsor",
              im_sponsor: "I can be a sponsor"
          },
          source: {
              tiktok: "TikTok",
              youtube: "YouTube",
              google: "Google",
              friends: "Friends",
              ads: "Advertisements",
              other: "Others"
          },
          kids: {
              no_kids: "No kids",
              dont_want_kids: "Don't want kids",
              want_kids: "Want kids",
              has_kids: "Has kids"
          },
          relationship: {
              lonely: "Lonely",
              looking: "Looking",
              widow: "Widow",
              have_a_boyfriend: "Have a boyfriend",
              have_a_girlfriend: "Have a girlfriend"
          },
          career: {
              work: "Employed",
              study: "Studying",
              unemployed: "Unemployed"
          }
      },
      user_card: {
          send_message: "Write"
      },
      header: {
          login_btn: "Log in",
          join_btn: "Register",
          logout_btn: "Log out"
      },
      footer: {
          menu: {
              part_1: {
                  title: "SUPPORT",
                  list: {
                      item_1: "About",
                      item_2: "Help"
                  }
              },
              part_2: {
                  title: "FAQ",
                  list: {
                      item_1: "Payment Rules",
                      item_2: "Security"
                  }
              },
              part_3: {
                  title: "DOCUMENTS",
                  list: {
                      item_1: "Privacy Policy",
                      item_2: "License Agreement",
                      item_3: "Site Rules"
                  }
              }
          }
      },
      menu: {
          get_premium: "Become Premium",
          search: "Search",
          chats: "My Chats",
          feed: "Dating",
          sympathy: "Sympathy",
          logout: "Log out",
          buy_credits: 'Buy credits'
      },
      my_card: {
          balance: {
              label: "credits",
              title: "Balance"
          }
      },
      notifications: {
          success_image_upload: "Photo added!",
          success_edit_profile: "Settings saved!",
          error_default: "An error occurred",
          success_delete_chat: "Chat deleted!",
          success_report: 'Complaint sent!',
          error_wink: 'You have already winked at this user',
          success_add_chat_to_fav: 'Chat has been added to favorites',
          success_socket: 'Connected!',
          error_socket: 'Disconnected!',
          error_email_verify: 'E-mail not verified',
          success_email_verify: 'E-mail verified',

          add_to_fav: "You've added to favorites",
        already_added_to_fav: "You've already added this user to your favorites.",

        liked: "You've given a like.",
        already_liked: "You've already liked this user before.",
        already_wink: "You've already winked at this user before.",

          get_gift: 'You received a gift!',
          get_pic: 'Photo',
          get_sticker: 'You received a sticker!',
          get_wink: 'You got a wink!'
      },    
      placeholders: {
          chat_empty: {
              title: "No Chats",
              text: "Select a profile to communicate in the chat",
              btn: "Go to Profiles"
          },
          nd: "Not specified"
      },
      select_gender: {
          male: "I am a Man",
          female: "I am a Woman"
      },
      start_gift: {
          title: "Start the conversation with a gift!",
          btn: "Give a gift"
      },
      back_btn: "Back",
      back_to_site_btn: 'Back to site',
      user_action: {
          like: "LIKE",
          wink: "WINK",
          fav: "FAVORITES",
          open_profile_btn: "Go to profile"
      },
      yes:'Yes',
      no: 'No',
      push: {
        settings: {
            success: 'Настройки сохранены',
            error: 'Не удалось сохранить настройки'
        },
        socket: {
            success: 'Соединение установлено',
            error: 'Соединение прервано'
        },
        profile_photo: {
            success: 'Фотография добавлена',
            error: 'Не удалось загрузить фотографию'
        }
    },
    unavailable: 'The website is temporarily unavailable. Technical maintenance is being conducted.'
  },
  popups: {
      select_upload_image_type: {
          title: "Select the category of the uploaded image",
          list: {
              avatar: "Avatar",
              public: "Public Image"
          }
      },
      edit_image: {
          title: "The selected area will be shown on your page",
          save_btn: "Save",
          cancel_btn: "Cancel",
          upload_btn: "Upload"
      },
      login: {
          title: "Login",
          fields: {
              password: "Password"
          },
          links: {
              register: "Join us",
              forgot_password: "Forgot password?"
          },
          login_btn: "Login"
      },
      logout: {
        title: 'Are you sure you want to leave?'
      },
      nocredit_chat_message: {
        title: "You don't have enough credits...",
        text_part_1: 'Unfortunately, the message to ',
        text_part_2: ' was not delivered. Please recharge your balance. Cost of the action:'
      },
      nocredit_chat_picture: {
        title: "You don't have enough credits...",
        text_part_1: 'Unfortunately, the picture to ',
        text_part_2: ' was not delivered. Please recharge your balance. Cost of the action:'
      },
      nocredit_mail_message: {
        title: "You don't have enough credits...",
        text_part_1: 'Unfortunately, the letter to ',
        text_part_2: ' was not delivered. Please recharge your balance. Cost of the action:'
      },
      nocredit_sticker_message: {
        title: "You don't have enough credits...",
        text_part_1: 'Unfortunately, the sticker to ',
        text_part_2: ' was not delivered. Please recharge your balance. Cost of the action:'
      },
      nocredit_gift: {
        title: "You don't have enough credits...",
        text_part_1: "Unfortunately, the gift to ",
        text_part_2: " was not delivered. Please recharge your balance. Cost of the action:"
      },
      nocredit_global_chat: 'Your credits are depleted, my friend! To continue chatting, you need to recharge them.',
      profile_modal: {
        open_btn: 'Open profile'
      },
      promo: {
        credits: 'credits',
        benefit: 'Benefit',
        buy: 'Buy',
        title: 'Special offer for you!',
        open_market: 'Store'
      }
  },
  startPage: {
      start_hero_title: "Your love story starts here!",
      start_hero_subtitle: "If you are looking for serious relationships, then our website is perfect for you. Check it out yourself!",
      start_hero_steps: "Just 3 simple steps",
      start_hero_adv: '<ul><li>Quick and easy registration</li><li>Verified users</li><li>Large user database</li></ul>',
      start_steps_1: "Register",
      start_steps_2: "Browse Profiles",
      start_steps_3: "Communicate",
      start_steps_btn: "Go to Dating",
      start_what_title: "What is Dating service?",
      start_what_text: "<p>It is one of the most popular and advanced services for modern men and women who are looking for love online.</p>\n <p>\n This site can help you quickly and efficiently find your soulmate thanks to modern technologies and years of experience in the dating industry!\n </p>",
      start_what_ex: "Meet new people today!",
      start_adv_1: {
          title: "Smart Filter",
          text: "Special algorithm allows you to quickly find a suitable match"
      },
      start_adv_2: {
          title: "Security",
          text: "You can be confident in the privacy of your data on the service"
      },
      start_adv_3: {
          title: "Verification",
          text: "Users are real and interested in relationships"
      },
      start_meet_title: "Start Communicating",
      start_meet_text: "In our time, dating apps have become an integral part of our lives. They allow you to check the profile of singles living near you, chat with them, get to know them, and maybe fall in love.",
      start_meet_btn: "Fill out the Profile",
      start_meet_message_1: "Join to build happy relationships",
      start_meet_message_2: "Finding your soulmate is now easier than ever!",
      start_faq_title: "Frequently Asked Questions",
      start_faq_list: {
          start_faq_item_1: {
              title: "What sets our dating site apart from others?",
              text: "We stand out with our huge community of real users who are seeking serious relationships. Our team actively works on profile verification and ensuring safety, so you can enjoy a comfortable and pleasant dating experience."
          },
          start_faq_item_2: {
              title: "What is the success rate of our site's users?",
              text: "Thanks to our dating site, over 560,000 users have already found their perfect match. We are proud of these success stories and strive to help you find your own happy story."
          },
          start_faq_item_3: {
              title: "How can you guarantee that the users are real?",
              text: "We place great importance on profile verification and combating fake accounts. Our team carefully checks each profile to ensure the authenticity of users and create a trustworthy environment for dating."
          }
      }
  },
  searchPage: {
      filter: {
          found: "Found",
          list: {
              filter_country: {
                  label: "Country",
                  placeholder: "Country"
              },
              filter_state: {
                  label: "Region",
                  placeholder: "Region"
              },
              filter_target: {
                  label: "Dating Goal"
              },
              filter_finance: {
                  label: "Financial Goals"
              },
              filter_age: {
                  label: "Age"
              }
          },
          action: {
              show: "Show All Filters",
              hide: "Hide",
              search_btn: "Search",
              mobile_filter_btn: "Filter",
              clear: 'Clear filter'
          },
          tabs: {
              all: "All",
              near: "Nearby",
              new: "New",
              online: "Online"
          },
          title: 'Filter'
      }
  },
  chatPage: {
      type_tabs: {
          chat: "Chat",
          mail: "Mail"
      },
      filter_tabs: {
          all: "All",
          notread: "Unread",
          favs: "Favourites",
          ignored: "Ignored"
      },
      search: "Search",
      premium: {
          label: "Exchange Contacts!",
          btn: "Go Premium"
      },
      pricing: {
          title: "Chat Action Prices",
          list: {
              item_1: "Send Message",
              item_2: "Send Mail"
          }
      },
      action: {
          placeholder: "Type a message"
      },
      smiles_and_stickers: {
          smile: "Smiles",
          sticker: "Stickers"
      },
      gifts: {
          buy_btn: {
              first_part: "Buy",
              last_part: {
                  single: "gift",
                  plural: "gifts"
              }
          },
          gift_action: {
              select_btn: "Add",
              remove_btn: "Added"
          }
      },
      menu: {
        wink: 'Wink',
        fav: 'Favorite',
        ignore: 'Ignore',
        report: 'Report'
      }
  },
  sympathyPage: {
      tabs: {
          views: "Views",
          matches: "Matches",
          you_like: "You Like",
          likes_you: "Likes You"
      },
      description: {
          views: "Still awaiting your first profile admirer!",
          matches: "Matchmaker's on break – no mutual likes yet.",
          you_like: "The ladies are yet to discover your charm – no likes so far.",
          likes_you: "Dive in! You haven't yet shown interest in any female profiles."
      }
  },
  profilePage: {
      info: {
          name: "Name",
          about: "About",
          country: "Country/Region",
          target: "Dating Goals",
          finance: "Financial Preferences",
          career: "Career",
          relationship: "Relationship Status",
          kids: "Children"
      },
      images: {
          add_btn: "Add Photo",
          verify_btn: "Verify Photo"
      },
      action: {
        message_btn: 'Message'
      }
  },
  signupPage: {
      main: {
          title: "Registration",
          next_btn: "Next",
          end_btn: "Finish"
      },
      steps: {
          step_1: {
              name: "Name",
              password: "Password",
              birthday: "Birthday",
              privacy: {
                  label: "By continuing, you accept",
                  link: "the terms of service and privacy policy"
              }
          },
          step_2: {
              title: "Please share your dating goals"
          },
          step_3: {
              title: "Tell us about your interests"
          },
          step_4: {
              title: "Financial status"
          },
          step_5: {
              title: "How did you hear about us?"
          },
          step_6: {
              title: "Kids"
          },
          step_7: {
              title: "Marital status"
          },
          step_8: {
              title: "Occupation"
          },
          step_9: {
              title: "Add photo",
              text: "Upload your best photo - it will attract more attention to your profile"
          },
          step_10: {
              title: "Tell us about yourself",
              text: "A few sentences about yourself will attract the attention of users",
              ex: "According to the website rules, it is prohibited to provide contact information",
              placeholder: "Not less than 6 characters..."
          },
          upload_avatar: {
              title: "Add Photo",
              text: "Upload your best photo - it will attract more attention to your profile"
          },
          about_self: {
              title: "Tell About Yourself",
              text: "A few phrases about yourself will attract users' attention",
              placeholder: "Minimum 20 characters...",
              ex: "According to the site rules, it is prohibited to provide contact information"
          }
      }
  },
  depositPage: {
    main: {
        title: 'Balance Recharge',
        my_balance: 'Your Balance:',
    },
    card: {
        price: 'price',
        credits: 'credits',
        discount: 'discount',
        popular: 'popular',
        spec_offer: 'SPECIAL OFFER'
    },
    select_btn: 'Buy ',
    form: {
        title: 'Payment',
        subtitle: 'Enter card details',
        btn: 'Pay'
    }
  }
}

export default en;