/**
 * Returns user notification alert
 * 
 * <span class="alertSender__name">Gal Gadot</span> hide for now
 *
 * @return  {string}    returns html string code
 */
export function UserNotificationAlertLayout(image, message, post_id) {

    if (image == null) {
        image = 'default.png'
    } else {
        image = image
    }
    const alert =
        `<a href="/post/${post_id}" class="alertLink__a no-transform">
        <div class="container alertContainer pa-2 black--text">
            <div class="row">
                <div class="col-sm-3 py-1">
                    <div class="alertLeft__container">
                        <img class="alertProfile__image" src="${image}">
                    </div>
                </div>
                <div class="col-sm-9 py-1 pl-0">
                    <div class="alertRight__container pt-1">
                        <span class="alertSender__message">${message}</span> 
                    </div>
                </div>
            </div>
        </div>
    </a>`

    return alert
}
/**
 * Returns announcement notification alert
 * 
 * <span class="alertSender__name">Gal Gadot</span> hide for now
 *
 * @return  {string}    returns html string code
 */
export function AllNotificationAlertLayout() {

    const alert =
        `<a href="/post/" class="alertLink__a no-transform">
        <div class="container alertContainer pa-2 black--text">
            <div class="row">
                <div class="col-sm-3 py-1">
                    <div class="alertLeft__container">
                        <img class="alertProfile__image" src>
                    </div>
                </div>
                <div class="col-sm-9 py-1 pl-0">
                    <div class="alertRight__container pt-1">
                        <span class="alertSender__message"></span> 
                    </div>
                </div>
            </div>
        </div>
    </a>`

    return alert
}