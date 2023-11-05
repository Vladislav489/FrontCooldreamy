export interface ILocale {
    global: {
        prompts: {
            targets: {
                communication: string,
                serious_relationship: string,
                flirt: string,
                join_trip: string,
                real_meetings: string   
            },
            interests: {
                sport: string,
                art: string,
                it: string,
                finance: string,
                science: string,
                travel: string,
                restaurants: string,
                extreme: string,
                nature: string,
                film: string,
                music: string,
                literature: string,
                shopping: string,
                dance: string,
                cars: string,
                cooking: string
            },
            finance: {
                abundance: string,
                search_sponsor: string,
                im_sponsor: string,
            },
            source: {
                tiktok: string,
                youtube: string,
                google: string,
                friends: string,
                ads: string,
                other: string,
            },
            kids: {
                no_kids: string,
                dont_want_kids: string,
                want_kids: string,
                has_kids: string
            },
            relationship: {
                lonely: string,
                looking: string,
                widow: string,
                have_a_boyfriend: string,
                have_a_girlfriend: string 
            },
            career: {
                work: string,
                study: string,
                unemployed: string
            }
        },
        user_card: {
            send_message: string
        },
        header: {
            login_btn: string,
            join_btn: string,
            logout_btn: string,
        },
        footer: {
            menu: {
                part_1: {
                    title: string,
                    list: {
                        item_1: string,
                        item_2: string
                    }
                },
                part_2: {
                    title: string,
                    list: {
                        item_1: string,
                        item_2: string
                    }
                },
                part_3: {
                    title: string,
                    list: {
                        item_1: string,
                        item_2: string,
                        item_3: string
                    }
                }
            }
        },
        menu: {
            get_premium: string,
            search: string,
            chats: string,
            feed: string,
            sympathy: string,
            logout: string,
            buy_credits: string
        },
        my_card: {
            balance: {
                label: string,
                title: string
            }
        },
        notifications: {
            success_image_upload: string,
            success_edit_profile: string,
            error_default: string,
            success_delete_chat: string,
            success_report: string,
            error_wink: string,
            success_add_chat_to_fav: string,
            success_socket: string,
            error_socket: string,
            success_email_verify: string,
            error_email_verify: string,

            add_to_fav: string,
            already_added_to_fav: string,

            liked: string,
            already_liked: string

            already_wink: string

            get_gift: string,
            get_pic: string,
            get_sticker: string,
            get_wink: string,

        },
        placeholders: {
            chat_empty: {
                title: string,
                text: string,
                btn: string
            },
            nd: string
        },
        select_gender: {
            male: string,
            female: string
        },
        start_gift: {
            title: string,
            btn: string,
        },
        back_btn: string,
        back_to_site_btn: string
        user_action: {
            like: string,
            wink: string,
            fav: string,
            open_profile_btn: string
        },
        yes: string,
        no: string,
        push: {
            settings: {
                success: string,
                error: string
            },
            socket: {
                success: string,
                error: string
            },
            profile_photo: {
                success: string,
                error: string
            },

        },
        unavailable: string
    },
    popups: {
        select_upload_image_type: {
            title: string,
            list: {
                avatar: string,
                public: string
            }
        },
        edit_image: {
            title: string,
            save_btn: string,
            cancel_btn: string,
            upload_btn: string
        },
        login: {
            title: string,
            fields: {
                password: string
            },
            links: {
                register: string,
                forgot_password: string
            },
            login_btn: string
        },
        logout: {
            title: string,
        },
        nocredit_chat_message: {
            title: string,
            text_part_1: string,
            text_part_2: string
        },
        nocredit_chat_picture: {
            title: string,
            text_part_1: string,
            text_part_2: string
        },
        nocredit_mail_message: {
            title: string,
            text_part_1: string,
            text_part_2: string
        }
        nocredit_sticker_message: {
            title: string,
            text_part_1: string,
            text_part_2: string
        },
        nocredit_gift: {
            title: string,
            text_part_1:string,
            text_part_2:string
        },
        nocredit_global_chat: string,
        profile_modal: {
            open_btn: string
        },
        promo: {
            credits: string,
            benefit: string,
            buy: string,
            title: string,
            open_market: string
        },

    },
    startPage: {
        start_hero_title: string,
        start_hero_subtitle: string,
        start_hero_steps: string,

        start_hero_adv: string,

        start_steps_1: string,
        start_steps_2: string,
        start_steps_3: string,
        start_steps_btn: string,

        start_what_title: string,
        start_what_text: string,
        start_what_ex: string,

        start_adv_1: {
            title: string,
            text: string
        },
        start_adv_2: {
            title: string,
            text: string
        },
        start_adv_3: {
            title: string,
            text: string
        },


        start_meet_title: string,
        start_meet_text: string,
        start_meet_btn: string,
        start_meet_message_1: string,
        start_meet_message_2: string,

        start_faq_title: string,
        start_faq_list: {
            start_faq_item_1: {
                title: string,
                text: string
            },
            start_faq_item_2: {
                title: string,
                text: string
            },
            start_faq_item_3: {
                title: string,
                text: string
            }
        }
    },
    searchPage: {
        filter: {
            found: string,
            list: {
                filter_country: {
                    label: string,
                    placeholder: string
                },
                filter_state: {
                    label: string,
                    placeholder: string,
                },
                filter_target: {
                    label: string
                },
                filter_finance: {
                    label: string
                },
                filter_age: {
                    label: string
                }
            },
            action: {
                show: string,
                hide: string,
                search_btn: string,
                mobile_filter_btn: string,
                clear: string
            },
            tabs: {
                all: string,
                near: string,
                new: string,
                online: string,
            },
            title: string
        }
    },
    chatPage: {
        type_tabs: {
            chat: string,
            mail: string
        },
        filter_tabs: {
            all: string,
            notread: string,
            favs: string,
            ignored: string
        },
        search: string,
        premium: {
            label: string,
            btn: string
        },
        pricing: {
            title: string,
            list: {
                item_1: string,
                item_2: string
            }
        },
        action: {
            placeholder: string
        },
        smiles_and_stickers: {
            smile: string,
            sticker: string
        },
        gifts: {
            buy_btn: {
                first_part: string,
                last_part: {
                    single: string,
                    plural: string
                }
            },
            gift_action: {
                select_btn: string,
                remove_btn: string
            }
        },
        menu: {
            wink: string,
            fav: string,
            ignore: string,
            report: string
        }
    },
    sympathyPage: {
        tabs: {
            views: string,
            matches: string,
            you_like: string,
            likes_you: string
        },
        description: {
            views: string,
            matches: string,
            you_like: string,
            likes_you: string
        }
    },
    profilePage: {
        info: {
            name: string,
            about: string,
            country: string,
            target: string,
            finance: string,
            career: string,
            relationship: string,
            kids: string
        },
        images: {
            add_btn: string,
            verify_btn: string
        },
        action: {
            message_btn: string
        }
    },
    signupPage: {
        main: {
            title: string,
            next_btn: string,
            end_btn: string
        },
        steps: {
            step_1: {
                name: string,
                password: string,
                birthday: string,
                privacy: {
                    label: string,
                    link: string
                }
            },
            step_2: {
                title: string
            },
            step_3: {
                title: string
            },
            step_4: {
                title: string
            },
            step_5: {
                title: string
            },
            step_6: {
                title: string
            },
            step_7: {
                title: string
            },
            step_8: {
                title: string
            },
            step_9: {
                title: string,
                text: string
            },
            step_10: {
                title: string,
                text: string,
                placeholder: string,
                ex: string
            },
            upload_avatar: {
                title: string,
                text: string,
            },
            about_self: {
                title: string,
                text: string,
                placeholder: string,
                ex: string
            }
        }
    },
    depositPage: {
        main: {
            title: string,
            my_balance: string,
        },
        card: {
            price: string,
            credits: string,
            discount: string,
            popular: string,
            spec_offer: string
        },
        select_btn: string,
        form: {
            title: string,
            subtitle: string,
            btn: string
        }
    }
}