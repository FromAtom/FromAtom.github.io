document.addEventListener('DOMContentLoaded', function(){
    (async() => {
        const url = "https://fromatom.hatenablog.com/rss";
        try {
            const res = await fetch(url);
            const xml = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(xml, "text/xml");
            const items = doc.querySelectorAll("item");

            const content = document.querySelector('template#blog-list-template').content;
            const fragment = document.createDocumentFragment();
            [...items].slice(0, 4).forEach(element => {
                const title = element.querySelector("title").textContent;
                const link = element.querySelector("link").textContent;

                // 日付
                const date_string = element.querySelector("pubDate").textContent;
                const date = new Date(date_string);
                const locale_date_string = date.toLocaleDateString();

                // 本文
                const full_description = element.querySelector("description").textContent;
                const tmp = document.createElement("div");
                tmp.innerHTML = full_description;
                const plane_description = (tmp.textContent || tmp.innerText || "").replace(/\r?\n/g, " ");
                const max_length = 100;
                const truncated_description = plane_description.length <= max_length ? plane_description: (plane_description.substr(0, max_length) + "...");

                const clone = document.importNode(content, true);
                clone.querySelector(".blog-date").textContent = locale_date_string;
                clone.querySelector(".blog-title").textContent = title;
                clone.querySelector(".blog-text").textContent = truncated_description;
                clone.querySelector(".read-more-article").href = link;
                fragment.appendChild(clone);
            });

            document.querySelector('.blog-list').appendChild(fragment);
        } catch (e) {
            console.log(e);
        }
    })();
}, false);
