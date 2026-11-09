/* Oldman Club — демо. Все данные сайта — в объекте DATA, чтобы потом перенести в админку. */
(function () {
  'use strict';

  var DATA = {
    phone: '+79293612000',
    open: 17, close: [2, 2, 2, 2, 2, 4, 4],   // до скольки работаем: вс, пн … сб (ночь после этого дня), по Омску
    events: [
      { date: '2026-10-29', time: '19:00', title: 'Сигарная школа спортивного покера', img: 'img/ev-poker.jpg',
        text: 'River Room × Dr. Watson × Oldman Club: сигарная культура встретилась со спортивным покером в камерной атмосфере закрытого клуба.',
        inc: ['Дегустация сигары', 'Спортивный покер', 'Хорошая компания'] },
      { date: '2026-09-18', time: '19:00', title: 'Октоберфест в сигарном формате', img: 'img/ev-oct.jpg',
        text: 'Открыли сезон Октоберфеста не кружкой пива, а сигарой — сезонной, с плотным, тёплым и немного праздничным характером.',
        inc: ['Сезонная сигара', 'Специальное пиво к празднику', 'Немецкий брецель'],
        price: '4 000 ₽', seats: '10 мест' },
      { date: '2026-07-31', time: '19:00', title: 'Первый сигарный вечер', img: 'img/ev-first.jpg',
        text: 'Не просто дегустация, а вечер вкуса, разговоров и атмосферы закрытого английского клуба. Первые гости — ещё в техническом режиме.',
        inc: ['Дегустация сигар', 'Разговоры', 'Тёплые кадры'] }
    ],
    moods: [                         // карусель клуба (пост 17.08)
      { name: 'Хвойное', hint: 'хвоя, травы, прохлада', img: 'img/mood1.jpg' },
      { name: 'Тропическое', hint: 'кокос, маракуйя, ананас', img: 'img/mood2.jpg' },
      { name: 'Фруктовое', hint: 'спелое, сочное', img: 'img/mood3.jpg' },
      { name: 'Кислое и свежее', hint: 'цитрусы, мята, лёд', img: 'img/mood4.jpg' },
      { name: 'Игристое', hint: 'шампанское, просекко, пшеничное пиво', img: 'img/mood5.jpg' },
      { name: 'Десертное', hint: 'ягоды, сливки, сладость', img: 'img/mood6.jpg' }
    ],
    cocktails: [                     // барная карта клуба, цены из меню
      ['Cigar Noir', 'ром, херес, Cointreau, вишнёвый ликёр, Tabasco', '950'],
      ['Old Fashioned', 'виски Gentleman Jack, Angostura, тростниковый сахар', '900'],
      ['Penicillin', 'виски, Ardbeg 10, мёд и имбирь, лимон', '1 200'],
      ['Negroni', 'джин, Martini Rosso, Campari', '1 250'],
      ['Black Sabbath', 'Ardbeg 10, Fernet Branca, абсент, Angostura', '1 700'],
      ['Espresso Martini', 'водка, Kahlua, ваниль, кофе', '600']
    ],
    reviews: [                       // Яндекс Карты, дословно (raw/ym/reviews.json)
      ['Георгий М.', 'август 2026', 'Атмосфера и обстановка классического сигарного клуба. Элитный алкоголь, коктейли, кальяны оставят у Вас приятное впечатление. Место для приятного отдыха и разговоров.'],
      ['yas', 'август 2026', 'в Августе были , место отличное , приятно удивил интерьер очень круто запах чистого дерева . Напитки на уровне , еда вкусная.  Супер  рекомендую ТОП места'],
      ['Denis Balyatin', 'август 2026', 'Рад открытию нового заведения на старом месте, не просто сохранили интерьер, но и обещают много нового. Отличный выбор напитков, прекрасные кальяны'],
      ['Антон Т.', 'август 2026', 'Был в заведении, курил сигары . Все очень круто. Рекомендую к посещению'],
      ['Mikhail K.', 'август 2026', 'в прошлые выходные собирались с друзьями. очень понравилось обслуживание. душевное место, кальян ТОП'],
      ['Алексей С.', 'август 2026', 'Атмосфера, обслуживание, кальяны и напитки на высоте. Отличное заведение'],
      ['Михаил Иванов', 'август 2026', 'Уютно и стильно , все на высоте - спасиб ребята 🤝']
    ],
    gallery: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(function (n) { return 'img/gal/' + n + '.jpg'; })
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* 18+ */
  var age = $('#age');
  if (store.get('oldman18') !== '1') {
    age.hidden = false; document.documentElement.style.overflow = 'hidden';
    $('#ageYes').addEventListener('click', function () {
      store.set('oldman18', '1'); age.hidden = true; document.documentElement.style.overflow = '';
    });
  }

  /* шапка и кнопка звонка */
  var top = $('#top'), fab = $('.fab');
  function onScroll() {
    var y = window.scrollY;
    top.classList.toggle('is-solid', y > 40 || nav.classList.contains('is-open'));
    fab.classList.toggle('is-on', y > window.innerHeight * 0.7);
  }

  /* меню */
  var nav = $('#nav'), burger = $('#burger');
  burger.addEventListener('click', function () {
    var open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    onScroll();
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && nav.classList.contains('is-open')) burger.click();
  });

  /* время по Омску */
  function omskNow() {
    var d = new Date();
    return new Date(d.getTime() + d.getTimezoneOffset() * 60000 + 6 * 3600000);
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* открыто / закрыто */
  var st = $('#status');
  function status() {
    var n = omskNow(), h = n.getHours(), d = n.getDay(), y = (d + 6) % 7, t, open, till;
    if (h < DATA.close[y]) { open = true; till = DATA.close[y]; }          // ночь после вчерашнего дня
    else if (h >= DATA.open) { open = true; till = DATA.close[d]; }
    else { open = false; till = DATA.close[d]; }
    if (open) t = 'Сейчас открыто · до ' + pad(till) + ':00';
    else t = 'Сегодня откроемся в ' + DATA.open + ':00 · до ' + pad(till) + ':00';
    st.classList.toggle('is-open', open);
    st.querySelector('span').textContent = t;
  }
  status(); setInterval(status, 60000);

  /* сигарные вечера */
  var MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var today = omskNow(); today.setHours(0, 0, 0, 0);
  var evs = DATA.events.map(function (e) {
    var d = e.date ? new Date(e.date + 'T00:00:00') : null;
    return { e: e, d: d, past: e.past || (d && d < today) };
  }).sort(function (a, b) {
    if (a.past !== b.past) return a.past ? 1 : -1;
    return (a.past ? -1 : 1) * ((a.d ? a.d : 0) - (b.d ? b.d : 0));
  });
  var hasUpcoming = evs.some(function (x) { return !x.past; });
  var html = '';
  if (!hasUpcoming) {
    html += '<article class="ev ev--soon reveal"><div class="ev__date"><b>Скоро</b><span class="ev__flag">Готовим</span></div>' +
      '<div class="ev__body"><h3>Следующий сигарный вечер</h3><p>Новую сигару, напиток в пару и дату объявим в группе ВКонтакте. Мест, как всегда, будет немного.</p>' +
      '<a class="link" href="https://vk.com/club239764791" target="_blank" rel="noopener">Следить за анонсами</a></div></article>';
  }
  evs.forEach(function (x) {
    var e = x.e, big = x.d ? x.d.getDate() : e.label, small = x.d ? MONTHS[x.d.getMonth()] : e.sub;
    html += '<article class="ev reveal' + (x.past ? ' is-past' : '') + '">' +
      (e.img ? '<img class="ev__img" src="' + esc(e.img) + '" alt="' + esc(e.title) + '" loading="lazy">' : '') +
      '<div class="ev__date"><b>' + esc(big) + '</b><span>' + esc(small) + (e.time ? ' · ' + esc(e.time) : '') + '</span>' +
      '<span class="ev__flag">' + (x.past ? 'Прошёл' : 'Скоро') + '</span></div>' +
      '<div class="ev__body"><h3>' + esc(e.title) + '</h3><p>' + esc(e.text) + '</p>' +
      '<ul class="ev__inc">' + e.inc.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
      ((e.price || e.seats) ? '<div class="ev__meta">' + (e.price ? '<span>Билет ' + esc(e.price) + '</span>' : '') + (e.seats ? '<span>' + esc(e.seats) + '</span>' : '') + '</div>' : '') +
      '</div></article>';
  });
  $('#evlist').innerHTML = html;

  /* кальян по настроению */
  var moods = $('#moods'), out = $('#moodOut');
  moods.innerHTML = DATA.moods.map(function (m, i) {
    return '<button class="mood" role="tab" type="button" aria-selected="false" data-i="' + i + '">' +
      '<img src="' + esc(m.img) + '" alt="" loading="lazy"><span class="mood__t"><b>' + esc(m.name) + '</b><small>' + esc(m.hint) + '</small></span></button>';
  }).join('');
  $('#cocktails').innerHTML = DATA.cocktails.map(function (c) {
    return '<li><span class="ck__n">' + esc(c[0]) + '</span><span class="ck__d">' + esc(c[1]) + '</span><span class="ck__p">' + esc(c[2]) + ' ₽</span></li>';
  }).join('');
  function pick(i) {
    var m = DATA.moods[i];
    [].forEach.call(moods.children, function (b, j) { b.setAttribute('aria-selected', j === i); });
    out.innerHTML = '<p>«Хочу ' + esc(m.name.toLowerCase()) + '»</p>' +
      '<span>Скажите это мастеру — он подберёт табак и крепость под вас. Не понравится вкус — поменяем.</span>';
  }
  moods.addEventListener('click', function (e) {
    var b = e.target.closest('.mood'); if (b) pick(+b.dataset.i);
  });
  out.innerHTML = '<p>Выберите настроение вечера</p><span>Мы не требуем быть экспертом — достаточно сказать, что вы любите.</span>';

  /* отзывы */
  $('#rv').innerHTML = DATA.reviews.map(function (r) {
    return '<figure class="rv__c reveal"><div class="rv__stars" aria-label="5 из 5">★★★★★</div><blockquote>' + esc(r[2]) + '</blockquote>' +
      '<figcaption><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + ' · Яндекс Карты</span></figcaption></figure>';
  }).join('');

  /* галерея (появится, когда будут фото) */
  if (DATA.gallery.length) {
    $('#gal').innerHTML = DATA.gallery.map(function (src) {
      return '<img src="' + esc(src) + '" alt="Oldman Club" loading="lazy">';
    }).join('');
    $('#gallery').hidden = false;
  }

  /* копировать адрес */
  var ca = $('#copyAddr');
  ca.addEventListener('click', function () {
    var t = 'Омск, ул. Гагарина, 14, 5 этаж';
    var done = function () { ca.textContent = 'Адрес скопирован'; setTimeout(function () { ca.textContent = 'Скопировать адрес'; }, 2200); };
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, done); else done();
  });
  $('#year').textContent = omskNow().getFullYear();

  /* появление блоков */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  [].forEach.call(document.querySelectorAll('.reveal, .cigdiv'), function (el) { io ? io.observe(el) : el.classList.add('is-in'); });

  /* тлеющий круг в «Сигарных вечерах»: растёт от прокрутки (только transform) */
  var cig = $('#cigars'), orb = $('.cigars__orb'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, ticking = false;
  function orbFrame() {
    ticking = false;
    var r = cig.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.95)));
    orb.style.setProperty('--orb', (0.08 + p * 0.92).toFixed(3));
  }
  window.addEventListener('scroll', function () {
    onScroll();
    if (!reduce && !ticking) { ticking = true; requestAnimationFrame(orbFrame); }
  }, { passive: true });
  onScroll(); if (!reduce) orbFrame();

  /* первый экран: когда ролик пошёл — прячем запасное фото под ним (иначе просвечивает в растворе) */
  var hv = document.querySelector('.hero__promo');
  if (hv) {
    var onPlay = function () { if (hv.currentTime > 0) document.getElementById('hero').classList.add('is-video'); };
    hv.addEventListener('playing', onPlay); hv.addEventListener('timeupdate', onPlay);
  }

  /* видео не крутим за экраном — бережём батарею телефона */
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause();
      });
    });
    [].forEach.call(document.querySelectorAll('video'), function (v) { vio.observe(v); });
  }
})();
