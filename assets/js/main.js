const state = {
  data: null,
  lang: "en"
};

const qs = (sel) => document.querySelector(sel);

function byPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : null), obj);
}

function highlightAuthor(text) {
  if (!text) return "";
  return text
    .replace(/Weigang Lu/g, "<strong>Weigang Lu</strong>")
    .replace(/陆维港/g, "<strong>陆维港</strong>")
    .replace(/\*/g, "<sup class=\"corresponding\">*</sup>");
}

function renderNav(navItems, title) {
  const navMenu = qs("#navMenu");
  navMenu.innerHTML = "";
  navItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${item.id}`;
    a.title = item.title[state.lang];
    a.innerHTML = `<i class=\"fas ${item.icon}\"></i>`;
    li.appendChild(a);
    navMenu.appendChild(li);
  });
  qs("#navLogo").textContent = title;
}

function renderHero(hero) {
  qs("#heroAvatar").src = hero.avatar;
  qs("#heroAvatar").alt = hero.name[state.lang];
  qs("#heroName").textContent = hero.name[state.lang];
  qs("#heroTitle").textContent = hero.title[state.lang];
  qs("#heroAffiliation").textContent = hero.affiliation[state.lang];
  qs("#heroLocation").textContent = hero.location[state.lang];
  qs("#heroTagline").textContent = hero.tagline[state.lang];

  const linkWrap = qs("#heroLinks");
  linkWrap.innerHTML = "";
  hero.links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `<i class=\"fas ${link.icon}\"></i> ${link.label[state.lang]}`;
    linkWrap.appendChild(a);
  });
}

function renderAbout(about) {
  const introWrap = qs("#aboutIntro");
  introWrap.innerHTML = "";
  about.intro[state.lang].forEach((p) => {
    const el = document.createElement("p");
    el.textContent = p;
    introWrap.appendChild(el);
  });

  const interestWrap = qs("#aboutInterests");
  interestWrap.innerHTML = "";
  about.interests[state.lang].forEach((p) => {
    const el = document.createElement("p");
    el.textContent = p;
    interestWrap.appendChild(el);
  });
}

function renderNews() {}

function renderHonors(honors) {
  const list = qs("#honorsList");
  list.innerHTML = "";
  const items = honors[state.lang] || [];
  items.forEach((entry) => {
    const item = document.createElement("div");
    item.className = "news-item honor-item";
    item.innerHTML = `
      <div class="honor-date">${entry.date}</div>
      <div class="honor-title">${entry.title}</div>
    `;
    list.appendChild(item);
  });
}

function renderPublications(pubs) {
  const published = qs("#pubPublished");

  published.innerHTML = "";
  pubs.published.forEach((pub) => {
    const wrapper = document.createElement(pub.url ? "a" : "div");
    wrapper.className = "pub-item pub-card";
    if (pub.url) {
      wrapper.href = pub.url;
      wrapper.target = "_blank";
      wrapper.rel = "noopener";
      wrapper.setAttribute("aria-label", pub.title);
    }
    wrapper.innerHTML = `
      <div class=\"pub-media\">
        <img src=\"${pub.image || "images/paper-placeholder.svg"}\" alt=\"${pub.title}\" loading=\"lazy\">
      </div>
      <div class=\"pub-body\">
        <div class=\"pub-title\">${pub.title}</div>
        <div class=\"pub-meta\">${highlightAuthor(pub.authors)}</div>
        <div class=\"pub-meta\">${pub.venue} ${pub.year}</div>
        ${pub.notes ? `<div class=\"pub-tags\"><span>${pub.notes}</span></div>` : ""}
      </div>
    `;
    published.appendChild(wrapper);
  });
}

function renderEducation(education) {
  const list = qs("#educationList");
  list.innerHTML = "";
  education.forEach((edu) => {
    const item = document.createElement("div");
    item.className = "edu-item";
    const degree = edu.degree[state.lang];
    const advisor = edu.advisor[state.lang];
    item.innerHTML = `
      <div class=\"edu-media\">
        <img src=\"${edu.image || "images/paper-placeholder.svg"}\" alt=\"${edu.school[state.lang]}\" loading=\"lazy\">
      </div>
      <div class=\"edu-body\">
        <div class=\"pub-title\">${edu.school[state.lang]}</div>
        <div class=\"pub-meta\">${edu.department[state.lang]}</div>
        <div class=\"pub-meta\">${degree}</div>
        <div class=\"pub-meta\">${edu.period}</div>
        ${advisor ? `<div class=\"pub-meta\">${advisor}</div>` : ""}
      </div>
    `;
    list.appendChild(item);
  });
}

function renderServices(services) {
  const journalList = qs("#servicesJournalList");
  const conferenceList = qs("#servicesConferenceList");
  journalList.innerHTML = "";
  conferenceList.innerHTML = "";

  services.journals[state.lang].forEach((itemText) => {
    const item = document.createElement("div");
    item.className = "service-item";
    item.textContent = itemText;
    journalList.appendChild(item);
  });

  services.conferences[state.lang].forEach((itemText) => {
    const item = document.createElement("div");
    item.className = "service-item";
    item.textContent = itemText;
    conferenceList.appendChild(item);
  });
}

function setSectionTitles(labels) {
  Object.entries(labels).forEach(([key, value]) => {
    const el = qs(`#${key}`);
    if (el) {
      el.textContent = value[state.lang];
    }
  });
}

function setupLanguageToggle() {
  const buttons = document.querySelectorAll("[data-lang]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.lang = btn.dataset.lang;
      renderAll();
    });
  });
}

function renderLanguageState() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === state.lang);
  });
}

function renderAll() {
  const data = state.data;
  document.title = data.meta.title[state.lang];
  qs("#metaDescription").setAttribute("content", data.meta.description[state.lang]);

  renderNav(data.nav, data.hero.name[state.lang]);
  renderHero(data.hero);
  renderAbout(data.about);
  renderNews();
  renderHonors(data.honors);
  renderPublications(data.publications);
  renderEducation(data.education);
  renderServices(data.services);

  setSectionTitles(data.labels);

  qs("#footerText").textContent = data.footer[state.lang];
  qs("#correspondingNote").textContent = data.labels.correspondingNote[state.lang];
  renderLanguageState();
}

function setupNavToggle() {
  const toggle = qs("#navToggle");
  const menu = qs("#navMenu");
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

function setupReveal() {
  const targets = document.querySelectorAll(".fade-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  targets.forEach((el) => observer.observe(el));
}

fetch("data/site.json")
  .then((res) => res.json())
  .then((data) => {
    state.data = data;
    state.lang = data.languageDefault || "en";
    setupLanguageToggle();
    setupNavToggle();
    renderAll();
    setupReveal();
  })
  .catch(() => {
    qs("#main-content").textContent = "Failed to load site data.";
  });
