import axios from "axios"
import cheerio from "cheerio"


export default async function desidime() {


   const url =
				"https://www-desidime-com.translate.goog/new?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp";

   const res = await axios.get(url);
   const $ = cheerio.load(res.data);

   const deals = [];
   $(".deal-box").each((i, el) => {
      const title = $(el).find(".deal-title").text();
      const link = $(el).find(".deal-title").attr("href");
      const price = $(el).find(".deal-price").text();
      const discount = $(el).find(".deal-discount").text();
      const image = $(el).find(".deal-image").attr("src");
      deals.push({ title, link, price, discount, image });
   });

   


}
