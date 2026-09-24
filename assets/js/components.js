const on = (selector, event, handler) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener(event, handler);
  });
};

on("[data-dismiss-alert]", "click", (event) => {
  const alert = event.currentTarget.closest("[role='status'], [role='alert']");
  if (alert) alert.remove();
});

document.querySelectorAll("[data-tabs]").forEach((tabSet) => {
  const tabs = [...tabSet.querySelectorAll("[role='tab']")];
  const panels = [...tabSet.querySelectorAll("[role='tabpanel']")];

  const selectTab = (tab) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute("aria-controls");
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      tabs[nextIndex].focus();
      selectTab(tabs[nextIndex]);
    });
  });
});

on("[data-menu-toggle]", "click", (event) => {
  const button = event.currentTarget;
  const menu = document.getElementById(button.getAttribute("aria-controls"));
  if (!menu) return;
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  menu.hidden = expanded;
});

on("[data-submenu-toggle]", "click", (event) => {
  const button = event.currentTarget;
  const submenu = document.getElementById(button.getAttribute("aria-controls"));
  if (!submenu) return;
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  submenu.hidden = expanded;
});

document.querySelectorAll("[data-desktop-nav]").forEach((navigation) => {
  const links = [...navigation.querySelectorAll("[data-nav-tab]")];

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      links.forEach((item) => item.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "page");
    });
  });
});

on("[data-filter-toggle]", "click", (event) => {
  const button = event.currentTarget;
  const menu = document.getElementById(button.getAttribute("aria-controls"));
  if (!menu) return;
  const expanded = button.getAttribute("aria-expanded") === "true";
  document.querySelectorAll("[data-filter-menu]").forEach((item) => {
    if (item !== menu) item.hidden = true;
  });
  document.querySelectorAll("[data-filter-toggle]").forEach((item) => {
    if (item !== button) item.setAttribute("aria-expanded", "false");
  });
  button.setAttribute("aria-expanded", String(!expanded));
  menu.hidden = expanded;
});

on("[data-remove-chip]", "click", (event) => {
  event.currentTarget.closest("[data-chip]")?.remove();
});

on("[data-clear-chips]", "click", (event) => {
  const target = document.getElementById(event.currentTarget.dataset.clearChips);
  target?.querySelectorAll("[data-chip]").forEach((chip) => chip.remove());
});

on("[data-select-all]", "change", (event) => {
  const menu = event.currentTarget.closest("[data-filter-menu]");
  menu?.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.checked = event.currentTarget.checked;
  });
});

on("[data-close-filter]", "click", (event) => {
  const menu = event.currentTarget.closest("[data-filter-menu]");
  if (!menu) return;
  menu.hidden = true;
  const trigger = document.querySelector(`[aria-controls='${menu.id}']`);
  trigger?.setAttribute("aria-expanded", "false");
  trigger?.focus();
});

document.querySelectorAll("[data-pagination]").forEach((pagination) => {
  const totalItems = Number(pagination.dataset.totalItems);
  let pageSize = Number(pagination.dataset.pageSize);
  let currentPage = Number(pagination.dataset.currentPage);
  const pageList = pagination.querySelector("[data-pagination-pages]");
  const sizeSelect = pagination.querySelector("[data-pagination-size]");

  const getTotalPages = () =>
    Number(pagination.dataset.totalPages) || Math.ceil(totalItems / pageSize);

  const getVisiblePages = (totalPages) => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

    const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
    const sortedPages = [...pages]
      .filter((page) => page > 0 && page <= totalPages)
      .sort((a, b) => a - b);

    return sortedPages.flatMap((page, index) => {
      const previousPage = sortedPages[index - 1];
      return previousPage && page - previousPage > 1 ? ["ellipsis", page] : [page];
    });
  };

  const createPageButton = (page) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.className = "pagination-btn";
    button.type = "button";
    button.dataset.paginationPage = String(page);
    button.textContent = String(page);
    button.setAttribute("aria-label", `Go to page ${page}`);
    if (page === currentPage) button.setAttribute("aria-current", "page");
    item.append(button);
    return item;
  };

  const createStepButton = (step, totalPages) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const direction = step < 0 ? "Previous" : "Next";
    button.className = "pagination-btn";
    button.type = "button";
    button.dataset.paginationStep = String(step);
    button.setAttribute("aria-label", `${direction} page`);
    button.disabled = step < 0 ? currentPage === 1 : currentPage === totalPages;
    button.innerHTML = `<i class="fa-solid fa-angle-${step < 0 ? "left" : "right"}" aria-hidden="true"></i>`;
    item.append(button);
    return item;
  };

  const render = () => {
    const totalPages = getTotalPages();
    currentPage = Math.min(Math.max(currentPage, 1), totalPages);
    pagination.dataset.currentPage = String(currentPage);

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    pagination.querySelectorAll("[data-pagination-status]").forEach((status) => {
      status.textContent = `${start}-${end} of ${totalItems} items`;
    });
    pagination.querySelectorAll("[data-pagination-page-status]").forEach((status) => {
      status.textContent = `Page ${currentPage} of ${totalPages}`;
    });

    if (pageList) {
      pageList.replaceChildren(createStepButton(-1, totalPages));
      getVisiblePages(totalPages).forEach((page) => {
        if (page === "ellipsis") {
          const item = document.createElement("li");
          item.innerHTML = '<span class="inline-grid size-9 place-items-center text-muted" aria-hidden="true"><i class="fa-solid fa-ellipsis"></i></span>';
          pageList.append(item);
        } else {
          pageList.append(createPageButton(page));
        }
      });
      pageList.append(createStepButton(1, totalPages));
    } else {
      pagination.querySelectorAll("[data-pagination-step]").forEach((button) => {
        const step = Number(button.dataset.paginationStep);
        button.disabled = step < 0 ? currentPage === 1 : currentPage === totalPages;
      });
    }
  };

  pagination.addEventListener("click", (event) => {
    const pageButton = event.target.closest("[data-pagination-page]");
    const stepButton = event.target.closest("[data-pagination-step]");
    if (!pageButton && !stepButton) return;

    currentPage = pageButton
      ? Number(pageButton.dataset.paginationPage)
      : currentPage + Number(stepButton.dataset.paginationStep);
    render();
  });

  sizeSelect?.addEventListener("change", () => {
    pageSize = Number(sizeSelect.value);
    pagination.dataset.pageSize = String(pageSize);
    currentPage = 1;
    render();
  });

  render();
});
