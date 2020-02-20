/**
 * Returns user notification event list for listener consumption.
 *
 *
 * @return  {Array}          array of string list
 */
export function UserNotificationEventsList() {
    return [
        // social event names
        'social.comment.comment',
        'social.comment.sentiment',
        'social.comment.tag:user',
        'social.post.comment',
        'social.post.sentiment',
        'social.post.tag:user',
        'social.user.follow',

        'market.watchlist.entry',
        'market.watchlist.take',
        'market.watchlist.stop'
    ]
}

/**
 * Returns all notification event list for listener consumption.
 *
 *
 * @return  {Array}          array of string list
 */
export function AllNotificationEventsList() {
    return [
        // social event names
        'social.post',
        'social.post.comment',
        'social.post.sentiment'
    ]
}