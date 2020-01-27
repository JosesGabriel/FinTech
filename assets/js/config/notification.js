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
        'social.user.follow'
    ]
}