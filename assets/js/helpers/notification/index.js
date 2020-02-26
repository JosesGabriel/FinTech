/**
 * Returns user notification alert
 * 
 * <span class="alertSender__name">Gal Gadot</span> hide for now
 *
 * @return  {string}    returns html string code
 */
export function UserNotificationAlertLayout(data) {

    let alert = '';
    let image = '';
    let post_id = '';
    let trigger = '';

    if (typeof data.stock !== "undefined") { // This is for watchlist notification
        if (data.stock.trigger === "Entry Price") {
            trigger = `your entry price for <stock_code> is hit. Buy now.`
        } else if (data.stock.trigger === "Take Profit") {
            trigger = `your take profit price for <stock_code> is hit. Sell now. `
        } else if (data.stock.trigger === "Stop Lost") {
            trigger = `your cut loss price for <stock_code> is hit. Sell now`
        }
        alert = `<a href="/watchlist" class="alertLink__a no-transform">
            <div class="container alertContainer pa-2 black--text">
                <div class="row">
                    <div class="col-sm-3 py-1">
                        <div class="alertLeft__container">
                            <span class="alertStock__id px-0 py-3 d-block font-weight-bold text-center">${data.stock.symbol}</spam>
                        </div>
                    </div>
                    <div class="col-sm-9 py-1 pl-0">
                        <div class="alertRight__container pt-1">
                            <span class="alertSender__message font-weight-bold"><span class="text-capitalize">${this.$auth.user.data.user.username}</span> ${trigger}</span><span class="caption"> Current price is now ₱${data.stock.executed_price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>`
    } else { // This is for user notification social
        if (data.user.profile_image == null) {
            image = 'default.png'
        } else {
            image = data.user.profile_image
        }

        if (typeof data.post !== "undefined") {
            post_id = `/post/` + data.post.id
        } else {
            post_id = `/profile/` + data.user.username
        }

        alert = `<a href="${post_id}" class="alertLink__a no-transform">
            <div class="container alertContainer pa-2 black--text">
                <div class="row">
                    <div class="col-sm-3 py-1">
                        <div class="alertLeft__container">
                            <img class="alertProfile__image" src="${image}">
                        </div>
                    </div>
                    <div class="col-sm-9 py-1 pl-0">
                        <div class="alertRight__container pt-1">
                            <span class="alertSender__message">${data._message}</span> 
                        </div>
                    </div>
                </div>
            </div>
        </a>`

    }

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