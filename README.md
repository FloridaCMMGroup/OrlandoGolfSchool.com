# orlandogolfschool.com

Instant Golf Improvement landing page for the two-day golf school at Omni Orlando Resort at ChampionsGate. A static one-page site on Cloudflare Pages. There's no form and no server code: every Reserve and Give button links to the SureCart product pages on instantgolfimprovement.com, where checkout happens.

## What's in this folder

| File | What it does |
| --- | --- |
| `index.html` | The page: copy, school dates, gift section, FAQ and search markup |
| `styles.css` | Styling in the IGI brand palette (navy, IGI blue, lime, off-white) with Gabarito headings |
| `app.js` | Shows the right tuition, savings message and countdown for today's date, and hides schools that have already started |
| `_headers` | Security headers |
| `robots.txt`, `sitemap.xml` | Search engine files |
| `favicon.svg` | Placeholder icon. Replace with the IGI favicon mark |
| `images/` | Add `hero.jpg`, `on-course.jpg` and `john-headshot.jpg` (see `images/README.txt`) |
| `redirects.csv` | The 19 domains that 301-redirect here, plus www to the bare domain, for Cloudflare Bulk Redirects |

## Deploy

Same as golflessonsinorlando.com: push to the GitHub repo, create a Cloudflare Pages project with no build command and output directory `/` (or this folder), then add `orlandogolfschool.com` and `www.orlandogolfschool.com` as custom domains. No environment variables are needed.

## Tuition schedule (automatic on the page)

`app.js` switches at midnight US Eastern on each date:

| Period | Price | Banner |
| --- | --- | --- |
| Until November 26, 2026 | $1,999 | Save $300 before tuition rises to $2,299 on January 1 |
| November 27 to December 24 | $1,699 | Holiday price: save $600 through December 24, with countdown |
| December 25 to 31 | $1,999 | Last chance: save $300, with countdown |
| From January 1, 2027 | $2,299 | Banner hidden; tuition schedule hidden |

**SureCart must match.** The page only displays prices. The seven school products and the gift certificate in SureCart must be changed on the same dates, or checkout will show a different price from the page.

To change a price or date, edit the `PHASES` list at the top of `app.js`. Times are in UTC: midnight Eastern in winter is `05:00:00Z`.

## School dates

Each school is a list item in `index.html` with a `data-start` date (YYYY-MM-DD) and a link to its SureCart product. Schools disappear from the page automatically on their start date. To add 2028 schools, copy a line and change the date, label and link.

## Links to confirm before launch

- Gift certificate: `https://instantgolfimprovement.com/products/igi-golf-school-gift-certificate` returned "page not found" when tested. Publish the product in SureCart (or update the link in `index.html`).
- September 9 and 10 school: the link still uses the product address `september-24-25-2027`. If the product's address changed when its dates were corrected, update the link.

## Redirects

Same process as golflessonsinorlando.com: add each domain in `redirects.csv` to Cloudflare, switch its nameservers at GoDaddy, add a proxied `AAAA @ 100::` record (and `www`), then import the CSV into Bulk Redirects and create the rule.

## Analytics

Turn on Cloudflare Web Analytics for the Pages project. The content security policy already allows it.
