function downloadVideoByURL(event) {
        event.preventDefault();
        let videoUrl = document.getElementById("videoURL").value;
        fetch("https://api.vidssave.com/api/contentsite_api/media/parse", {
          headers: {
            accept: "*/*",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
          referrer: "https://vidssave.com/",
          body: `auth=20250901majwlqo&domain=api-ak.vidssave.com&origin=source&link=${videoUrl}`,
          method: "POST",
          mode: "cors",
          credentials: "omit",
        })
          .then((res) => res.json())
          .then((resp) => {
            document.getElementById("videoThumbanil").src = resp.data.thumbnail;
            document.getElementById("videoTitle").innerText = resp.data.title;
            document.getElementById("videoDuration").innerText =
              resp.data.duration;
            let allVideos = resp.data.resources;
            console.log(allVideos);
            let btns = "";
            for (let i = 0; i < allVideos.length; i++) {
              if (allVideos[i].download_url != "") {
                btns += `<a href='${allVideos[i].download_url}' target="_blank" title='${resp.data.title}'>
                <button>
                    Download ${allVideos[i].format} | ${allVideos[i].quality}</button>
                </a>`;
              }
            }
            document.getElementById("downloadBtns").innerHTML = btns;
          });
      }