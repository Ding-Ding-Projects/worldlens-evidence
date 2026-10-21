const inventoryUrl = new URL('./captures.json', import.meta.url);
const grid = document.querySelector('#capture-grid');
const count = document.querySelector('#result-count');
const search = document.querySelector('#search');
const regexToggle = document.querySelector('#regex-toggle');
const regexFlags = document.querySelector('#regex-flags');
const filter = document.querySelector('#filter');
const language = document.querySelector('#language');
const theme = document.querySelector('#theme');
const searchError = document.querySelector('#search-error');
const loadError = document.querySelector('#load-error');
const dialog = document.querySelector('#image-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogImage = document.querySelector('#dialog-image');
const dialogCaption = document.querySelector('#dialog-caption');
let captures = [];
let regexMode = false;

function langValue(item, key) {
  if (language.value === 'yue') return item[`${key}Yue`] || item[key];
  return item[key];
}

function label(element, enKey, yueKey) {
  if (language.value === 'both') {
    const en = element.dataset.en || '';
    const yue = element.dataset.yue || '';
    if (en && yue) element.textContent = `${en} / ${yue}`;
    return;
  }
  const value = language.value === 'yue' ? element.dataset[yueKey || 'yue'] : element.dataset[enKey || 'en'];
  if (value) element.textContent = value;
}

function localizeStatic() {
  document.documentElement.lang = language.value === 'yue' ? 'zh-Hant-HK' : 'en';
  document.querySelectorAll('[data-en]').forEach((element) => label(element));
  search.placeholder = language.value === 'yue'
    ? search.dataset.placeholderYue
    : search.dataset.placeholderEn;
  if (language.value === 'both') search.placeholder = `${search.dataset.placeholderEn} / ${search.dataset.placeholderYue}`;
  regexToggle.textContent = regexMode
    ? (language.value === 'yue' ? '規則搜尋開啟' : language.value === 'both' ? 'Regex on / 規則搜尋開啟' : 'Regex on')
    : (language.value === 'yue' ? '規則搜尋關閉' : language.value === 'both' ? 'Regex off / 規則搜尋關閉' : 'Regex off');
  regexFlags.setAttribute('aria-label', language.value === 'yue' ? '正規表示式旗標' : 'Regular expression flags');
  render();
}

function activePattern() {
  const query = search.value.trim();
  searchError.hidden = true;
  searchError.textContent = '';
  if (!query) return null;
  if (!regexMode) return { test: (value) => value.toLocaleLowerCase().includes(query.toLocaleLowerCase()) };
  try {
    return new RegExp(query, regexFlags.value);
  } catch (error) {
    searchError.textContent = `${language.value === 'yue' ? '正規表示式無效' : 'Invalid regular expression'}: ${error.message}`;
    searchError.hidden = false;
    return false;
  }
}

function groupFor(item) {
  if (item.id.startsWith('guide-')) return 'guide';
  if (item.id === 'build-version') return 'build';
  return 'worldlens';
}

function render() {
  if (!captures.length) return;
  const pattern = activePattern();
  const visible = captures.filter((item) => {
    if (filter.value !== 'all' && groupFor(item) !== filter.value) return false;
    if (pattern === false) return false;
    if (!pattern) return true;
    const haystack = [item.id, item.surface, item.surfaceYue, item.caption, item.captionYue, item.sourceRevision, item.sha256, item.theme, item.language].join(' ');
    if (pattern instanceof RegExp) { pattern.lastIndex = 0; return pattern.test(haystack); }
    return pattern.test(haystack);
  });
  grid.replaceChildren();
  for (const item of visible) grid.append(card(item));
  const countText = `${visible.length} / ${captures.length} ${language.value === 'yue' ? '張畫面' : 'captures'}`;
  count.textContent = language.value === 'both' ? `${visible.length} / ${captures.length} captures / 張畫面` : countText;
}

function card(item) {
  const article = document.createElement('article');
  article.className = 'capture-card';
  const imageButton = document.createElement('button');
  imageButton.className = 'image-button';
  imageButton.type = 'button';
  imageButton.setAttribute('aria-label', `${language.value === 'yue' ? '放大檢視：' : 'View full image: '}${langValue(item, 'surface')}`);
  const image = document.createElement('img');
  image.src = `./${item.image}`;
  image.alt = `${langValue(item, 'surface')}. ${langValue(item, 'caption')}`;
  image.loading = 'lazy';
  imageButton.append(image);
  imageButton.addEventListener('click', () => openDialog(item));

  const body = document.createElement('div');
  body.className = 'card-body';
  const title = document.createElement('h2');
  title.textContent = langValue(item, 'surface');
  const caption = document.createElement('p');
  caption.textContent = langValue(item, 'caption');
  const chips = document.createElement('div');
  chips.className = 'meta';
  for (const value of [item.language, item.theme, item.viewport, `Capture: ${item.captureTimestamp}`]) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = value;
    chips.append(chip);
  }
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = language.value === 'yue' ? '來源及驗證資料' : language.value === 'both' ? 'Source and verification / 來源及驗證資料' : 'Source and verification';
  const dl = document.createElement('dl');
  dl.className = 'details-grid';
  const fields = [
    ['Source revision', item.sourceRevision],
    ['Image SHA-256', item.sha256],
    ['Source manifest', item.sourceManifest],
    ['Capture route', item.route],
    ['Main bundle SHA-256', item.mainBundleSha256 || 'Not recorded in this manifest'],
    ['Privacy review', item.privacyReview]
  ];
  for (const [name, value] of fields) {
    const dt = document.createElement('dt'); dt.textContent = name;
    const dd = document.createElement('dd'); dd.textContent = value;
    dl.append(dt, dd);
  }
  details.append(summary, dl);
  body.append(title, caption, chips, details);
  article.append(imageButton, body);
  return article;
}

function openDialog(item) {
  dialogTitle.textContent = langValue(item, 'surface');
  dialogImage.src = `./${item.image}`;
  dialogImage.alt = `${langValue(item, 'surface')}. ${langValue(item, 'caption')}`;
  dialogCaption.textContent = langValue(item, 'caption');
  dialog.showModal();
}

document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
search.addEventListener('input', render);
filter.addEventListener('change', render);
regexToggle.addEventListener('click', () => {
  regexMode = !regexMode;
  regexToggle.setAttribute('aria-pressed', String(regexMode));
  regexFlags.disabled = !regexMode;
  localizeStatic();
});
regexFlags.addEventListener('input', render);
language.addEventListener('change', localizeStatic);
theme.addEventListener('change', () => {
  document.documentElement.dataset.theme = theme.value === 'system' ? '' : theme.value;
});

try {
  const response = await fetch(inventoryUrl);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  captures = data.captures;
  render();
} catch {
  loadError.hidden = false;
  count.textContent = language.value === 'yue' ? '畫面清單載入失敗。' : 'Capture inventory could not be loaded.';
}
