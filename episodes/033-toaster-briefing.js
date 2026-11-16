// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: no such toaster exists.
const SINK = [300, 0, 0];

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.counter = k.ground('#E8D9C0', 0);
  w.tiles = group();
  for (let i = 0; i < 8; i++) for (let j = 0; j < 6; j++) box(4.8, 4.8, .2, mat((i + j) % 2 ? '#7FC8C2' : '#F4F1EA'), [-17.5 + i * 5, 2.5 + j * 5, -10], w.tiles).castShadow = false;
  // the toaster
  w.toaster = group([0, 0, 0]);
  const chrome = mat('#E2453C', { metal: .25, rough: .3 });
  box(10, 7, 6, chrome, [0, 3.7, 0], w.toaster);
  box(10.2, .4, 6.2, mat('#2A2D33'), [0, .2, 0], w.toaster);
  w.slots = [];
  for (const z of [-1.2, 1.2]) { const s = box(7, .2, .9, mat('#111111'), [0, 7.25, z], w.toaster); w.slots.push(s); }
  w.lever = box(.6, 1.2, .8, mat('#222222'), [5.3, 5.5, 0], w.toaster);
  // face: two eyes and a little captain's hat
  for (const x of [-1.6, 1.6]) { ball(.55, mat('#FFFFFF'), [x, 4.6, 3.05], w.toaster); ball(.25, mat('#111111'), [x, 4.6, 3.5], w.toaster); }
  w.mouth = box(1.6, .22, .1, mat('#111111'), [0, 3.2, 3.05], w.toaster);
  w.hat = group([0, 7.5, -2.2], w.toaster);
  cyl(1.6, 1.6, .9, mat('#1D2B4F'), [0, .45, 0], w.hat, 24); box(3.4, .15, 1.4, mat('#111827'), [0, .05, 1.2], w.hat); box(1, .3, .1, mat('#D4AF37', { metal: .7 }), [0, .55, 1.62], w.hat);
  // bread
  w.bread = [];
  for (const z of [-1.2, 1.2]) { const b = box(5.6, 5, .7, mat('#E9C27A', { rough: .9 }), [0, 6.2, z], k.scene); w.bread.push(b); }
  // exit arrows over the slots
  w.arrows = group([0, 10.5, 0]);
  for (const z of [-1.2, 1.2]) { const a = cone(.7, 1.4, mat('#22E06B', { glow: 1.6 }), [0, 0, z], w.arrows, 3); a.rotation.z = Math.PI; a.castShadow = false; }
  // crumb tray that drops from above, like an oxygen mask
  w.tray = group([0, 18, 4]);
  box(4, .25, 2.4, mat('#FFB020', { glow: .3 }), [0, 0, 0], w.tray); for (const x of [-1.6, 1.6]) { const st = cyl(.04, .04, 6, mat('#FFFFFF'), [x, 3, 0], w.tray, 6); st.castShadow = false; }
  w.crumbs = group([0, 0, 4]);
  for (let i = 0; i < 16; i++) { const c = box(.25, .18, .2, mat('#C9934A'), [((i * 37) % 9) / 3 - 1.5, 0, ((i * 13) % 5) / 3 - .8], w.crumbs); c.userData.h = 6 + (i % 5); }
  // the sink, for the flotation-device line
  w.sink = group(SINK);
  box(30, 8, 20, mat('#C9CED6', { metal: .7, rough: .25 }), [0, 0, 0], w.sink);
  box(26, .2, 16, mat('#4FA9E0', { opacity: .85, rough: .05 }), [0, 4.15, 0], w.sink);
  w.raft = box(5.6, .7, 5, mat('#E9C27A', { rough: .9 }), [0, 4.5, 0], w.sink);
  w.duck = group([6, 4, 3], w.sink); ball(1.1, mat('#FFD21F'), [0, .9, 0], w.duck); ball(.7, mat('#FFD21F'), [.7, 2, 0], w.duck); cone(.3, .7, mat('#FF7A1F'), [1.4, 2, 0], w.duck).rotation.z = -Math.PI / 2;
  // stale-bread cobweb
  w.web = group([0, 9.2, 0]);
  for (let i = 0; i < 6; i++) { const s = cyl(.03, .03, 5, mat('#FFFFFF', { opacity: .7 }), [0, 0, 0], w.web, 4); s.rotation.z = i * Math.PI / 6; s.castShadow = false; }
  return w;
}

function talk(w, t, on = true) { w.mouth.scale.y = on ? 1 + 3 * Math.abs(Math.sin(t * 11)) : 1; }
function bread(w, y = 6.2, stale = 0) {
  const c = new (w.bread[0].material.color.constructor)('#E9C27A').lerp(new (w.bread[0].material.color.constructor)('#8C9A6A'), stale);
  w.bread.forEach(b => { b.position.y = y; b.material.color.copy(c); });
}
const KITCHEN = ['counter', 'tiles', 'toaster'];

export default {
  id: '033',
  style: '3d',
  voice: 'v3',
  case: 'THE TOASTER BRIEFING',
  year: 'ENGINEERING NONSENSE',
  hook: ['THIS TOASTER', 'HAS RULES.'],
  title: 'This toaster gives a safety briefing before every slice',
  description: 'Please return your bread to the upright position. (A made-up toaster. Do not try to buy one.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'toaster', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the talking toaster, its safety briefing and every timing in it are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Before this toaster makes toast, it gives a full safety briefing.',
      show: KITCHEN, sky: '#F4F1EA', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [16, 14, 38], look: [0, 6, 0], fov: 42, to: { pos: [9, 11, 30], look: [0, 6, 0], fov: 40 } },
      update: (w, p, t) => { bread(w, 7.6); talk(w, t); w.arrows.visible = w.tray.visible = w.crumbs.visible = w.web.visible = false; },
    },
    {
      say: 'Please locate your nearest exit. There are two. They are both at the top.',
      show: [...KITCHEN, 'arrows'], sky: '#1D2B4F', lightAt: [0, 6, 0], lightDist: 25,
      cam: { pos: [-12, 22, 26], look: [0, 7, 0], fov: 42, to: { pos: [-9, 19, 22], look: [0, 7.5, 0], fov: 40 } },
      update: (w, p, t) => { bread(w, 6.2); talk(w, t); w.arrows.visible = true; w.arrows.position.y = 10.5 + .4 * Math.sin(t * 6); w.lever.position.y = 3.5; },
    },
    {
      say: 'If a crumb falls, a crumb tray will drop from above. Secure your own tray before helping other bread.',
      show: [...KITCHEN, 'tray', 'crumbs'], sky: '#2B3E66', lightAt: [0, 6, 4], lightDist: 25,
      cam: { pos: [14, 14, 34], look: [0, 8, 2], fov: 44, to: { pos: [10, 12, 28], look: [0, 8, 2], fov: 42 } },
      update: (w, p, t, k) => { bread(w, 6.2); talk(w, t); w.tray.visible = true; w.tray.position.y = 18 - 9 * k.h.ease(k.h.win(t, .4, 1.2)) + .3 * Math.sin(t * 4) * (t > 1.2); w.crumbs.visible = true; w.crumbs.children.forEach(c => { c.position.y = Math.max(9.1, c.userData.h + 6 - t * 4); }); },
    },
    {
      say: 'In an emergency, your bread may be used as a flotation device.',
      show: ['sink'], sky: '#BFE3F5', lightAt: [300, 4, 0], lightDist: 25,
      cam: { pos: [318, 20, 32], look: [300, 3, 0], fov: 44, to: { pos: [312, 16, 26], look: [300, 3, 0], fov: 42 } },
      update: (w, p, t) => { w.raft.position.y = 4.5 + .25 * Math.sin(t * 2.4); w.raft.rotation.z = .06 * Math.sin(t * 1.7); w.duck.position.x = 6 - t * .6; w.duck.position.y = 4.3 + .2 * Math.sin(t * 2.4 + 1); },
    },
    {
      say: 'The briefing takes nine minutes. The toast takes two.',
      show: KITCHEN, sky: '#F4F1EA', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [0, 9, 32], look: [0, 5.5, 0], fov: 40, to: { pos: [0, 8, 25], look: [0, 5.5, 0], fov: 38 } },
      update: (w, p, t) => { bread(w, 6.2); talk(w, t); w.tray.visible = w.crumbs.visible = w.arrows.visible = false; },
    },
    {
      say: 'By the time it is finished, the bread has gone stale. Thank you for toasting with us.',
      show: [...KITCHEN, 'web'], sky: '#9AA0A6', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [-16, 15, 34], look: [0, 7, 0], fov: 42, to: { pos: [-11, 13, 28], look: [0, 7.5, 0], fov: 40 } },
      update: (w, p, t, k) => { bread(w, 6.2 + 1.6 * k.h.win(t, 2.6, 3.2), Math.min(1, t / 2)); talk(w, t, t > 2.4); w.web.visible = true; w.lever.position.y = 3.5 + 2 * k.h.win(t, 2.6, 3.2); },
    },
    {
      say: 'Quick question. What should this toaster add next? Option A, a seatbelt sign. Option B, a snack trolley. Or option C, just make the toast. Comment your answer.',
      quiz: { q: 'What should this toaster add next?', options: ['A seatbelt sign', 'A snack trolley', 'Just make the toast'], answer: 'There is no real answer; the toaster is made up. (We vote C.)' },
      show: KITCHEN, sky: '#274B73', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [12, 22, 26], look: [0, -4, 0], fov: 46, to: { pos: [-12, 22, 26], look: [0, -4, 0] } },
      update: (w, p, t) => { bread(w, 7.6); talk(w, t, false); w.web.visible = false; },
    },
  ],
};
