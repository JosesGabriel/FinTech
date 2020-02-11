export default function(context) {
  if (context.isMobileOrTablet === true) {
    return context.redirect("/mobile");
  }
}
