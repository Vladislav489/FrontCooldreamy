const chatMessageTypeVariants = {
    //message
    messageText: 'App\\Models\\ChatTextMessage',
    messageImage: 'App\\Models\\ChatImageMessage',
    messageGift: 'App\\Models\\ChatGiftMessage',
    messageSticker: 'App\\Models\\ChatStickerMessage',
    messageWink: 'App\\Models\\ChatWinkMessage',

    //letter
    letterText: "App\\Models\\LetterTextMessage",
    letterImage: "App\\Models\\LetterImageMessage",
    letterGift: "App\\Models\\LetterGiftMessage",
    letterSticker: "App\\Models\\LetterStickerMessage"
}

export default chatMessageTypeVariants;