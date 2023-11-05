import endpoints from "./endpoints";
import { IToken } from "@/models/IToken";
import checkAuth from "./checkAuth";
import { API_PATH } from "./endpoints";



export const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'X-Localization': 'ru'
}

//'Authorization': `Bearer ${token}`

class ApiService {


    register = async (
        body: any
    ) => {
        try {
            let res = await fetch(endpoints.register, {
                method: 'POST',
                body: JSON.stringify(body),
                headers
            })

            return await res?.json()
        } catch(err) {
            return;
        }
    }

    login = async (body: {
        email: string,
        password: string
    }) => {

        try {
            let res = await fetch(endpoints.login, {
                method: 'POST',
                body: JSON.stringify(body),
                headers
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    logout = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.logout, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    checkMail = async (body: {email: string}) => {
        try {
            let res = await fetch(endpoints.checkMail, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })
            return await res.status
        } catch(err) {
            return;
        }
    }
    
    authAfterVerify = async (body: {
        token:any,
        user_id:any
    }) => {
        try {
            let res = await fetch(endpoints.authAfterVerify, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    sendVerifyEmail = async (token:any) => {
        try {
            let res = await fetch(endpoints.sendVerifyEmail, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.status
        } catch(err) {
            return;
        }
    }

    getResetCode = async ({
        body
    }: {
        body: {
            email: string
        }
    }) => {
        try {
            let res = await fetch(endpoints.getResetCode, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })
            return await res?.status
        } catch(err) {return}
    }

    sendReestCode = async ({
        body
    }: {
        body: {
            email:string,
            code:string
        }
    }) => {
        try {
            let res = await fetch(endpoints.sendResetCode, {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })
            return await checkAuth(res)
        } catch(err) {return}
    }

    changePassword = async ({
        token,
        body
    }: {
        token:any,
        body: {
            password:string,
            password_confirmation:string
        }
    }) => {
        try {
            let res = await fetch(endpoints.changePassword, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await checkAuth(res)
        } catch(err) {return}
    }

    search = async (
        body: {
        page: number,
        // isNew: 1 | 0,
        // isOnline: 1 | 0,
        // isNear: 1 | 0,
        filter_type?: 'nearby' | 'new' | 'online'
        state?: string,
        country?: string,
        age_range_start?: number,
        age_range_end?: number,
        prompt_targets?: any,
        prompt_finance_states?: any,
        per_page?: number
    }, token: IToken
        
    ) => {
        try {
            let res = await fetch(endpoints.search, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            return await res?.json()
        } catch(err) {
            return;
        }
    }

    verifyEmail = async (token: IToken, verify_token: string) => {
        try {
            let res = await fetch(endpoints.verifyEmail + `?token=${verify_token}`, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.status
        } catch(err) {
            return;
        }
    }


    getPromptTargets = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPromptTargets, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }


    getPromptFinanceState = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPromptFinanceState, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getCountries = async () => {
        try {
            let res = await fetch(endpoints.getCountries, {
                method: 'GET',
                headers: {
                    ...headers,
                    // 'Authorization': `Bearer ${token}`
                },
            })

            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getStates = async (country_id: number) => {
        try {
            let res = await fetch(endpoints.getStates + `?country_id=${country_id}`, {
                method: 'GET',
                headers,
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getCountriesMod = async ({gender}: {gender: 'male' | 'female'}) => {
        try {
            let res = await fetch(endpoints.getCountriesMod + `?gender=${gender}`, {
                headers
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getStatesMod = async ({country_id, gender}: {country_id: number, gender: 'male' | 'female'}) => {
        try {
            let res = await fetch(endpoints.getStatesMod + `?country_id=${country_id}&gender=${gender}`, {
                headers
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getFeed = async ({
        page
    }: {
        page?: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.feeds + `?page=${page}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            }) 
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    feedItemLike = async ({
        id
    }: {
        id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.setLike, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({id})
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }


    feedItemSkip = async ({
        id
    }: {
        id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.setSkip, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({id})
            }) 
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    //открытие чата
    
    createChat = async ({user_id}: {
        user_id?: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.createChat + `?user_id=${user_id}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getChatList = async ({page, per_page = 10, filter, search}: 
        {
            page?: number, 
            per_page?: number,
            filter?: string,
            search?: string
        }, token: IToken) => {
        try {
            let res = await fetch(endpoints.getChatList + `?page=${page}&per_page=${per_page}&filter=${filter}${search ? `&search=${search}` : ''}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getLocation = async () => {
        try {
            let res = await fetch(endpoints.getLocation, {
                method: "GET",
                headers,
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getChatListFavorite = async ({page, per_page = 10}: {
        page?: number,
        per_page?: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.getChatListFavorite  + `?page=${page}&per_page=${per_page}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }

    sendMessage_text = async (body: {
        chat_id: number,
        text: string
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_text, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            return await res?.json()
        } catch(err) {
            return;
        }
    }

    sendMessage_sticker = async (body: {
        chat_id: number,
        sticker_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_sticker, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }) 
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    sendMessage_gift = async (body: {
        chat_id?: string,
        gifts: any[], //string: [1,2,3]
        user_id?: any
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_gift, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    sendMessage_image = async (body: {
        chat_id: number | string,
        thumbnail_url: string,
        image_url: string
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_image, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }

    getChat = async ({id, page, per_page = 10}: 
        {
            id: number,
            page: number,
            per_page?: number
        }, token: IToken) => {
        try {
            let res = await fetch(endpoints.getChat + `?page=${page}&chat_id=${id}&per_page=${per_page}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            }) 
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getStickers = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getStickers, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getGifts = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getGifts, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    readMessage = async (body: {
        chat_message_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.readMessage, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }



    //mail
    createMail = async ({user_id}:{user_id: number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.createMail + `?user_id=${user_id}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getMailList = async ({per_page, page, filter}:{page?: number, per_page?: number, filter?: string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.getMailList + `?per_page=${per_page}&page=${page}&filter=${filter}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }


    sendMail_text = async (body: {
        letter_id: number | string,
        text?: string,
        images?: string
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMail_text, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            return await res?.json()
        } catch(err) {
            return;
        }
    }

    sendMail_sticker = async (body: {
        letter_id: number,
        sticker_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMail_sticker, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }) 
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    sendMail_gift = async (body: {
        letter_id: string,
        gifts: string //string: [1,2,3]
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMail_gift, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }



    getMail = async ({id, page, per_page}:{id: number, page?: number, per_page?: number | string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.getMail + `?letter_id=${id}&page=${page}&per_page=${per_page}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            }) 
            return await res?.json()
        } catch(err) {
            return;
        }
    }


    readMail = async (body: {
        letter_message_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.readMail, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    mailOpenPay = async (body: {letter_text_message_id: number | string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.mailOpenPay, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }

    mailImagePay = async (image_in_letter_id: number | string, token: IToken) => {
        try {
            let res = await fetch(endpoints.mailImagePay + `?image_in_letter_id=${image_in_letter_id}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }
    

    sendWink = async ({user_id}:{user_id: number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendWink, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({user_id})
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }



    getMyProfile = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getMyProfile, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }

    getProfile = async ({user_id, uuid}: {user_id:number, uuid?: string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.getProfile + `?user_id=${user_id}&uuid=${uuid}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }
    
    // updateMyProfile = async (token: IToken) => {
    //     try {
    //         let res = await fetch(endpoints.updateMyProfile, {
    //             method: 'PUT',
    //         })
    //     }
    // }


    getAllPrompts = async (token: IToken, locale?: string) => {
        try {
            let res = await fetch(endpoints.getAllPrompts, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                    // 'Accept-Language': locale ? locale : 'ru',
                    'X-localization': locale ? locale : 'ru'
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }


    addProfileImage = async (data: FormData, token: IToken) => {
        try {
            let res = await fetch(endpoints.addProfileImage, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }


    updateMyProfile = async (body: any, token: IToken) => {
        try {
            let res = await fetch(endpoints.updateMyProfile, {
                method:'PUT',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }


    //activity
    getActivityViews = async (token: IToken, {page, per_page = 4}: {page: number, per_page?: number}) => {
        try {
            let res = await fetch(endpoints.getActivityViews + `?page=${page}&per_page=${per_page}`, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }

    getActivityLikes = async (token: IToken, {page, per_page = 4}: {page: number, per_page?: number}) => {
        try {
            let res = await fetch(endpoints.getActivityLikes + `?page=${page}&per_page=${per_page}`, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }

    getActivityInLikes = async (token: IToken, {page, per_page = 4}: {page: number, per_page?: number}) => {
        try {
            let res = await fetch(endpoints.getActivityInLikes + `?page=${page}&per_page=${per_page}`, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }

    getActivityMutualLikes = async (token: IToken, {page, per_page = 4}: {page: number, per_page?: number}) => {
        try {
            let res = await fetch(endpoints.getActivityMutualLikes + `?page=${page}&per_page=${per_page}`, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }

    addUserToFav = async (body: {user_id: number | string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.addUserToFav, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res
        } catch(err) {
            return;
        }
    }

    deleteUserFromFav = async (body: {user_id: number | string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.deleteUserFromFav, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res
        } catch(err) {
            return;
        }
    }

    getActionPricing = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getActionPricing, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    // TEST
    setCredits = async (token: IToken, body: {credits: number}) => {
        try {
            let res = await fetch(endpoints.setCredits, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            return await res?.json()
        } catch(err) {
            return;
        }
    }

    subscribe = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.subscribe, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    deleteChat = async (token: IToken, id: number) => {
        try {
            let res = await fetch(endpoints.deleteChat + id, {
                method: 'DELETE',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })

            return await res?.json()
        } catch(err) {
            return;
        }
    }

    signupEnd = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.signupEnd, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getChatMedia = async (token: IToken, id?: number | string) => {
        try {
            let res = await fetch(endpoints.getChatMedia + id, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }


    //pay

    pay = async (token: IToken, body: {
        list_type?: string,
        list_id?: string | number
    }) => {
        try {
            let res = await fetch(endpoints.pay, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    payS = async (token: IToken, body: {
        list_type: string,
        list_id: string | number
    }) => {
        try {
            let res = await fetch(endpoints.payS, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }


    getPayPlans = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPayPlans, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }


    getPaySubs = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPaySubs, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    


    getPayPrems = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPayPrems, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }


    setExUserData = async (token: IToken, body: {
        language?: string,
        country?: string,
        state?: string
    }) => {
        try {
            let res = await fetch(endpoints.setExUserData, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }


    checkPhotoAi = async (token: IToken, body: FormData) => {
        try {
            let res = await fetch(endpoints.checkPhotoAi, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body
            })
            return await res?.status
        } catch(err) {
            return;
        }
    }

    chatIgnore = async (token: IToken, {id}: {id: string | number}) => {
        try {
            let res = await fetch(`${API_PATH}chats/${id}/ignore`, {
                method: "PATCH",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    chatReport = async (token: IToken, id: string | number, body: {
        text: string
    }) => {
        try {
            let res = await fetch(`${API_PATH}chats/${id}/report`, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getUnreadCount = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getUnreadCount, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json() 
        } catch(err) {
            return;
        }
    }

    getCredits = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getCredits, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    chatImagePay = async (token: IToken, message_id?: number | string) => {
        try {
            let res = await fetch(`${API_PATH}images/${message_id}/pay`, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }


    getArticle = async (token: any, url: string) => {
        try {
            let res = await fetch(endpoints.getArticle + `?url=${url}`, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getPromo = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPromo, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    activatePay = async (token: IToken, body: {user_promotion_id?: string | number}) => {
        try {
            let res = await fetch(endpoints.activatePay, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            return;
        }
    }

    getChatFilterCount = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getChatFilterCount, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return;
        }
    }


    getFeedFilterCount = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getFeedFilterCount, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return
        }
    }


    readProfile = async (token: IToken, type: 'WATCH' | 'LIKE') => {
        try {
            let res = await fetch(endpoints.readProfile, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({type})
            })
            return await checkAuth(res)
        } catch(err) {
            return
        }
    }

    getPremiumStatus = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPremiumStatus, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await checkAuth(res)
        } catch(err) {
            return
        }
    }

    getCurrentSub = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getSub, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return
        }
    }

    getCurrentVip = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getCurrentVip, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            return
        }
    }
   
    deleteProfileImage = async ({token, body}: {
        token: IToken,
        body: {
            image_id: number | string,
            user_id: number | string
        }
    }) => {
        try {
            let res = await fetch(endpoints.deleteProfileImage, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.status
        } catch(err) {
            return
        }
    }

    setPwa = async (token:any) => {
        try {
            let res = await fetch(endpoints.setPwa, {
                method: "POST",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch(err) {
            return;
        }
    }
}


export default ApiService;