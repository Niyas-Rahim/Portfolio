document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('button[data-filter]');
  const items = document.querySelectorAll(".item");
  const lightbox = document.querySelector(".lightbox-container");
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const closeBtn = document.querySelector(".close-lightbox");
  const container = document.querySelector(".stacked-layout");
  const toggleBtn = document.querySelector('.menu-toggle');
  const sidebar = document.getElementById('sidebar');
  let swiper;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  function getLayoutConfig() {
    const width = window.innerWidth;
    const containerWidth = container.offsetWidth;

    if (width < 768) {
      return { columns: 1, gap: 16, itemWidth: containerWidth };
    } else if (width < 1024) {
      return { columns: 2, gap: 20, itemWidth: (containerWidth - 20) / 2 };
    } else {
      return { columns: 3, gap: 20, itemWidth: (containerWidth - 40) / 3 };
    }
  }

  function applyFilteredMasonryLayout(filter) {
    const { columns: columnCount, gap: columnGap, itemWidth } = getLayoutConfig();

    if (!container) return;
    container.style.position = 'relative';

    const columnHeights = new Array(columnCount).fill(0);
    const visibleItems = Array.from(items).filter(item =>
      filter === "*" || item.dataset.category === filter
    );

    if (visibleItems.length === 0) {
      container.style.height = "0px";
      return;
    }

    let imagesLoaded = 0;

    visibleItems.forEach((item) => {
      const img = item.querySelector("img");

      const handleLoad = () => {
        imagesLoaded++;
        if (imagesLoaded === visibleItems.length) {
          layoutItems();
        }
      };

      if (img && !img.complete) {
        img.onload = handleLoad;
        img.onerror = handleLoad;
      } else {
        handleLoad();
      }
    });

    function layoutItems() {
      items.forEach(item => item.style.display = 'none');

      visibleItems.forEach(item => {
        item.style.display = 'block';
        item.style.position = 'absolute';
        item.style.width = `${itemWidth}px`;

        const minColIndex = columnHeights.indexOf(Math.min(...columnHeights));
        const top = columnHeights[minColIndex];
        const left = minColIndex * (itemWidth + columnGap);

        item.style.top = `${top}px`;
        item.style.left = `${left}px`;

        columnHeights[minColIndex] += item.offsetHeight + columnGap;
      });

      const containerHeight = Math.max(...columnHeights);
      container.style.height = `${containerHeight}px`;
    }
  }

  // Initial layout
  applyFilteredMasonryLayout("*");

  // Filter buttons
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btns .active")?.classList.remove("active");
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      if (filter === "" || filter === "all" || filter === "*") {
        applyFilteredMasonryLayout("*");
      } else {
        applyFilteredMasonryLayout(filter);
      }
    });
  });

  // Lightbox logic
  document.querySelectorAll(".open-lightbox").forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      const clickedItem = icon.closest(".item");
      let activeFilter = document.querySelector(".filter-btns .active")?.dataset.filter || "*";

      // On "All", use clicked item's category
      if (activeFilter === "*" || activeFilter === "all") {
        activeFilter = clickedItem.dataset.category;
      }

      const visibleItems = Array.from(items).filter(item =>
        item.style.display !== "none" && item.dataset.category === activeFilter
      );

      swiperWrapper.innerHTML = "";

      visibleItems.forEach((item) => {
        const imgSrc = item.querySelector("img")?.getAttribute("src");
        const title = item.querySelector("h3")?.textContent || "";
        const desc = item.querySelector("p")?.textContent || "";

        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <img src="${imgSrc}" alt="" style="max-height:70vh; object-fit:contain;" />
          <div style="color:#fff; padding-top:10px;">
            <h3 style="margin-bottom:5px;">${title}</h3>
            <p style="font-size:14px; color:#ccc;">${desc}</p>
          </div>
        `;
        swiperWrapper.appendChild(slide);
      });

      lightbox.classList.remove("hidden");

      if (swiper) swiper.destroy(true, true);
      swiper = new Swiper(".swiper", {
        loop: true,
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

      const clickedIndex = visibleItems.indexOf(clickedItem);
      swiper.slideToLoop(clickedIndex);
    });
  });

  // Close lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    if (swiper) swiper.autoplay.stop();
  });

  lightbox.addEventListener("click", function (e) {
    if (!e.target.closest(".swiper")) {
      lightbox.classList.add("hidden");
      if (swiper) swiper.autoplay.stop();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("hidden")) {
      if (e.key === "Escape") {
        closeBtn.click();
      } else if (e.key === "ArrowRight") {
        swiper.slideNext();
      } else if (e.key === "ArrowLeft") {
        swiper.slidePrev();
      }
    }
  });

  // On resize, reapply current filter layout
  window.addEventListener("resize", () => {
    const activeFilter = document.querySelector(".filter-btns .active")?.dataset.filter || "*";
    if (activeFilter === "*" || activeFilter === "all") {
      applyFilteredMasonryLayout("*");
    } else {
      applyFilteredMasonryLayout(activeFilter);
    }
  });
});
