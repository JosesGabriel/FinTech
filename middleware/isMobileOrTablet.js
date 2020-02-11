export default function(context) {
  if (context.isMobileOrTablet === false) {
    return context.redirect("/mobile");
  }
}
