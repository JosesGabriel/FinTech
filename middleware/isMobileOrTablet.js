export default function(context) {
    if (context.isMobileOrTablet === true) {
        // add here pages that will not block from mobile users
        // set page limit for mobile users
        const allowedPages = ["login", "verify", ""];
        if (allowedPages.includes(context.route.name) === true) {
            return context.redirect("/mobile");
        }
    }
}