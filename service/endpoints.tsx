export const BASE_WS_HOST = 'api2.cooldreamy.com'
export const TEST_WS_HOST = 'admin.soultri.site'
export const BASE_DOMAIN = `https://api2.cooldreamy.com/`;
export const TEST_DOMAIN = `http://admin.soultri.site/`;
export const API_PATH = `${BASE_DOMAIN}api/`;

const endpoints = {
    //auth
    register: `${API_PATH}register`,
    login: `${API_PATH}token`,
    logout: `${API_PATH}logout`,
    verifyEmail: `${API_PATH}verify`,
    checkMail: `${API_PATH}check/email`,
    sendVerifyEmail: `${API_PATH}send/verification`,
    authAfterVerify: `${API_PATH}verification`,

    //reset pass
    getResetCode: `${API_PATH}reset/password`,
    sendResetCode: `${API_PATH}send/code/password`,
    changePassword: `${API_PATH}send/password/change`,

    //users
    search: `${API_PATH}users/search`,
    getPromptTargets: `${API_PATH}get_prompt_targets_table`,
    getPromptFinanceState: `${API_PATH}get_prompt_finance_states_table`,
    
    getCountries: `${API_PATH}get_countries`,
    getStates: `${API_PATH}get_states`,

    getCountriesMod: `${API_PATH}get_countries_validate_user`,
    getStatesMod: `${API_PATH}get_states_validate_user`,


    //feed
    feeds: `${API_PATH}feeds`,
    setLike: `${API_PATH}feed/set_like`,
    setSkip: `${API_PATH}feed/set_skipe`,


    //wink
    sendWink: `${API_PATH}wink/send_wink`,    


    getStickers: `${API_PATH}get_stickers`,
    getGifts: `${API_PATH}get_gifts`,


    //chat

    sendMessage_text: `${API_PATH}chats/send_chat_text_message`,
    sendMessage_sticker: `${API_PATH}chats/send_chat_sticker_message`,
    sendMessage_gift: `${API_PATH}chats/send_chat_gift_message`,
    sendMessage_image: `${API_PATH}chats/send_chat_image_message`,

    // chatSearch: `${API_PATH}`
    getChat: `${API_PATH}chats/get_current_chat`,
    createChat: `${API_PATH}chats/get_chat_with_user`,
    getChatList: `${API_PATH}chats/get_my_chat_list`,
    getChatListFavorite: `${API_PATH}chats/get_my_favorite_chat_list`,
    readMessage: `${API_PATH}chats/set_chat_message_is_read`,



    //mail
    sendMail_text: `${API_PATH}letters/send_letter_text_message`,
    sendMail_sticker: `${API_PATH}letters/send_letter_sticker_message`,
    sendMail_gift: `${API_PATH}letters/send_letter_gift_message`,

    getMail: `${API_PATH}letters/get_current_letter`,
    createMail: `${API_PATH}letters/get_letter_with_user`,
    getMailList: `${API_PATH}letters/get_my_letter_list`,
    readMail: `${API_PATH}letters/set_letter_message_is_read`,

    mailOpenPay: `${API_PATH}letters/pay_for_letter_text_message`,
    mailImagePay: `${API_PATH}letters/pay_for_letter_image`,
    

    //profile
    getMyProfile: `${API_PATH}profile/get_my_profile`,
    getProfile: `${API_PATH}profile/get_profile`,
    updateMyProfile: `${API_PATH}profile/update_my_profile`,
    addProfileImage: `${API_PATH}image_store`,

    getAllPrompts: `${API_PATH}get_all_prompts`,



    // activity
    getActivityViews: `${API_PATH}activities/get_my_watchers`,
    getActivityFavs: `${API_PATH}activities/get_my_favorite`,
    getActivityInFavs: `${API_PATH}activities/get_favorited_me`,
    getActivityMutualFavs: `${API_PATH}activities/get_mutual_favorite`,

    getActivityLikes: `${API_PATH}activities/get_my_likes`,
    getActivityInLikes: `${API_PATH}activities/get_liked_me`,
    getActivityMutualLikes: `${API_PATH}activities/get_mutual_likes`,

    addUserToFav: `${API_PATH}activities/add_favorite`,
    deleteUserFromFav: `${API_PATH}activities/disable_from_favorite`,

    getActionPricing: `${API_PATH}profile/get_services_cost`,



    // ТЕСТ
    setCredits: `${API_PATH}profile/set_my_credits`,


    //EX
    subscribe: `${API_PATH}subscriptions/subscribe`,
    deleteChat: `${API_PATH}chats/delete_chat/`,
    signupEnd: `${API_PATH}ace/add`,



    getChatMedia: `${API_PATH}chats/media/`,



    //credits
    pay: `${API_PATH}payments/pay`,
    payS: `${API_PATH}payments/subscribe`,
    getPayPlans: `${API_PATH}payments/credits/list`,
    getPaySubs: `${API_PATH}payments/subscription/list`,
    getPayPrems: `${API_PATH}payments/premium/list`,
    getSub: `${API_PATH}payments/subscription`,
    getPrem: `${API_PATH}payments/premium`,

    getLocation: `${API_PATH}location`,


    setExUserData: `${API_PATH}user/set/info`,
    
    checkPhotoAi: `${API_PATH}check-image`,

    getUnreadCount: `${API_PATH}chats/unread`,

    getCredits: `${API_PATH}profile/get_my_credits`,


    getArticle: `${API_PATH}pages`,


    getPromo: `${API_PATH}payments/promotions/list`,

    activatePay: `${API_PATH}payments/promotions/activate`,

    getChatFilterCount: `${API_PATH}chats/statistics`,


    getFeedFilterCount: `${API_PATH}feeds/statistic`,

    readProfile: `${API_PATH}feeds/read`,

    getPremiumStatus: `${API_PATH}payments/premium`,
    getCurrentVip: `${API_PATH}payments/premium`,

    deleteProfileImage: `${API_PATH}store/image/delete`,

    setPwa: `${API_PATH}set/pwa`
}

export default endpoints;