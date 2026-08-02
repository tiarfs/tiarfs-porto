// ===== Language toggle =====
const langButtons = document.querySelectorAll('.lang-btn');
const placeholderFields = document.querySelectorAll('[data-ph-en]');

function applyLang(lang){
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  langButtons.forEach(b => b.classList.toggle('active', b.dataset.setLang === lang));

  // Toggle the actual `hidden` attribute — CSS alone can't override it
  document.querySelectorAll('.lang-en').forEach(el => { el.hidden = (lang !== 'en'); });
  document.querySelectorAll('.lang-id').forEach(el => { el.hidden = (lang !== 'id'); });

  placeholderFields.forEach(el => {
    el.setAttribute('placeholder', lang === 'id' ? el.dataset.phId : el.dataset.phEn);
  });
  localStorage.setItem('tfs-lang', lang);
}

langButtons.forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.setLang));
});

// Restore saved preference (defaults to English if none saved)
const savedLang = localStorage.getItem('tfs-lang');
applyLang(savedLang === 'id' ? 'id' : 'en');

// ===== Contact form (submits directly to inbox via Formspree) =====
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrenwvee';
const contactForm = document.getElementById('contactForm');
if (contactForm){
  const sendBtn = document.getElementById('sendBtn');
  const formNote = document.getElementById('formNote');
  const sendBtnDefaultHTML = sendBtn.innerHTML;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !message){
      alert(lang === 'id'
        ? 'Mohon isi nama, email, dan pesan sebelum mengirim.'
        : 'Please fill in your name, email, and message before sending.');
      return;
    }

    sendBtn.disabled = true;
    sendBtn.innerHTML = lang === 'id' ? 'Mengirim...' : 'Sending...';

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          _subject: subject || (lang === 'id' ? 'Pesan dari portofolio' : 'Message from portfolio site'),
          message
        })
      });

      if (res.ok){
        contactForm.reset();
        sendBtn.innerHTML = lang === 'id' ? '✓ Terkirim!' : '✓ Sent!';
        if (formNote){
          formNote.querySelector('.lang-en').textContent = 'Thanks! Your message has been sent — I\'ll get back to you soon.';
          formNote.querySelector('.lang-id').textContent = 'Terima kasih! Pesan Anda sudah terkirim — saya akan segera membalas.';
        }
      } else {
        throw new Error('Formspree responded with an error');
      }
    } catch (err) {
      sendBtn.innerHTML = sendBtnDefaultHTML;
      alert(lang === 'id'
        ? 'Maaf, pesan gagal terkirim. Coba lagi atau kirim langsung ke tiarfirmansss@gmail.com.'
        : 'Sorry, the message failed to send. Please try again or email tiarfirmansss@gmail.com directly.');
    } finally {
      sendBtn.disabled = false;
      if (sendBtn.innerHTML.indexOf('Sending') !== -1 || sendBtn.innerHTML.indexOf('Mengirim') !== -1){
        sendBtn.innerHTML = sendBtnDefaultHTML;
      }
    }
  });
}

// ===== Mobile nav toggle =====
const burger = document.getElementById('burger');
const navlinks = document.getElementById('navlinks');
burger.addEventListener('click', () => navlinks.classList.toggle('open'));
navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

// ===== Live clock (WIB) =====
function updateClock(){
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset()*60000;
  const wib = new Date(utc + 7*3600000);
  const hh = String(wib.getHours()).padStart(2,'0');
  const mm = String(wib.getMinutes()).padStart(2,'0');
  const ss = String(wib.getSeconds()).padStart(2,'0');
  document.getElementById('clock').textContent = `${hh}:${mm}:${ss} WIB`;
}
updateClock();
setInterval(updateClock, 1000);

// ===== Portfolio filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const pfItems = document.querySelectorAll('.pf-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    pfItems.forEach(item => {
      item.style.display = (f === 'all' || item.dataset.cat === f) ? '' : 'none';
    });
  });
});

// ===== MTTR classification demo (rule-based, mirrors KPI thresholds from the study) =====
document.getElementById('classifyBtn').addEventListener('click', () => {
  const dur = parseFloat(document.getElementById('duration').value);
  const causeSelect = document.getElementById('cause');
  const cause = causeSelect.options[causeSelect.selectedIndex].text;
  const resultBox = document.getElementById('demoResult');
  const badge = document.getElementById('resultBadge');
  const note = document.getElementById('resultNote');
  const lang = document.documentElement.getAttribute('data-lang') || 'en';

  if (isNaN(dur) || dur <= 0){
    resultBox.classList.add('show');
    badge.className = 'badge';
    badge.textContent = lang === 'id' ? 'Input tidak valid' : 'Invalid input';
    note.textContent = lang === 'id'
      ? 'Masukkan durasi insiden dalam menit (lebih dari 0).'
      : 'Enter the incident duration in minutes (greater than 0).';
    return;
  }
  let label, cls;
  if (dur < 360){ label = 'FAST'; cls = 'badge-fast'; }
  else if (dur <= 480){ label = 'NORMAL'; cls = 'badge-normal'; }
  else { label = 'SLOW'; cls = 'badge-slow'; }
  badge.className = 'badge ' + cls;
  badge.textContent = label;
  note.textContent = lang === 'id'
    ? `Penyebab: ${cause} · Durasi: ${dur} menit → diklasifikasikan sebagai "${label}" berdasarkan ambang KPI perusahaan.`
    : `Cause: ${cause} · Duration: ${dur} minutes → classified as "${label}" based on the company's KPI thresholds.`;
  resultBox.classList.add('show');
});

// ===== F1-score comparison chart (data from the study, scenario 1 / 2 / 3) =====
const chartData = [
  { name:'LSTM', s1:0.9826, s2:0.9004, s3:0.9766 },
  { name:'RF',   s1:0.9991, s2:0.9942, s3:1.0000 },
  { name:'CNN',  s1:0.9080, s2:0.3862, s3:0.4443 },
  { name:'ANN',  s1:0.9801, s2:0.3822, s3:0.9604 },
];
const scenarios = [
  { key:'s1', color:'#8492ac' },
  { key:'s2', color:'#f2a93b' },
  { key:'s3', color:'#34d6c4' },
];
const chartEl = document.getElementById('chart');
chartData.forEach(row => {
  scenarios.forEach(sc => {
    const val = row[sc.key];
    const pct = (val*100).toFixed(1);
    const div = document.createElement('div');
    div.className = 'bar-row';
    div.innerHTML = `<span class="name">${row.name}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${pct}%; background:${sc.color};"></span></span>
      <span class="val">${val.toFixed(4)}</span>`;
    chartEl.appendChild(div);
  });
});