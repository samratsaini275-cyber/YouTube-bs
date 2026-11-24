// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people do not have pouches. Hook: the premise as a question under 2 s; first frame shows a person pulling a lamp out of a belly pouch.

function person(k, parent, shirt, s = 1) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.root.scale.setScalar(s);
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(sd => { const a = group([sd * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = sd; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FBF5A', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#DCEAF2'), [0, 10, -4], w.wall);
  w.p = person(k, k.scene, '#2FA36B'); w.pp = w.p.root;
  w.pouch = group([0, 1.2, .78], w.pp); const pm = mat('#E8C49A'); const pc = cyl(.62, .5, .9, pm, [0, 0, 0], w.pouch, 18); pc.scale.z = .62; cyl(.6, .6, .05, mat('#3A2A1A'), [0, .46, 0], w.pouch, 18).scale.z = .4;
  w.lamp = group(); cyl(.12, .2, .9, mat('#FFC21F'), [0, .45, 0], w.lamp, 10); cone(.45, .5, mat('#FFFFFF', { glow: .4 }), [0, 1.05, 0], w.lamp, 14);
  w.items = group(); const cols = ['#E2453C', '#FFC21F', '#3B6FD6', '#8E44AD', '#FF7F2A', '#2FA36B']; for (let i = 0; i < 6; i++) { const it = i % 3 === 0 ? ball(.3, mat(cols[i]), [0, 0, 0], w.items) : box(.5, .4, .4, mat(cols[i]), [0, 0, 0], w.items); it.userData.i = i; }
  w.bags = group(); for (let i = 0; i < 4; i++) { const b = group([0, 0, 0], w.bags); box(.6, .7, .4, mat('#C9A36B'), [0, .35, 0], b); ball(.18, mat(['#E2453C', '#5FBF5F', '#FFC21F', '#FF7F2A'][i]), [0, .75, 0], b); b.userData.i = i; }
  w.kid = person(k, k.scene, '#FF5FA2', .32);
  w.roo = group(); const rm = mat('#B9773F'); const body = ball(1.1, rm, [0, 1.9, 0], w.roo); body.scale.set(1, 1.4, .9); ball(.6, rm, [0, 3.7, .3], w.roo); for (const x of [-.25, .25]) { const e = ball(.22, rm, [x, 4.3, .2], w.roo); e.scale.set(.6, 1.6, .4); ball(.1, mat('#111111'), [x * .9, 3.85, .82], w.roo); } ball(.14, mat('#3A2A1A'), [0, 3.6, .9], w.roo); const tail = cyl(.3, .08, 2.2, rm, [0, .7, -1.3], w.roo, 10); tail.rotation.x = 1.1; for (const x of [-.5, .5]) { const f = box(.4, .2, 1.2, rm, [x, .1, .3], w.roo); } const rp = cyl(.55, .45, .7, mat('#D49A62'), [0, 1.6, .9], w.roo, 16); rp.scale.z = .4;
  w.rooHead = w.roo.children[1];
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const lerp = (a, b, q) => a + (b - a) * q;

export default {
  id: '260',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HUMAN POUCH',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD POUCHES?'],
  title: 'What would happen if humans had pouches like kangaroos?',
  description: 'No more shopping bags. Your little brother moves in. Everything you ever lost is in there. And kangaroos finally respect you. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'kangaroo', 'pouch', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human pouches are made up. Kangaroos are marsupials: their young (joeys) grow in the mother\'s pouch.'],
  setup,
  scenes: [
    { say: 'What if humans had pouches?', show: ['floor', 'wall', 'pp', 'pouch', 'lamp'], sky: '#DCEAF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.6, 3.4, 8.6], look: [0, 3.95, 0], fov: 50, to: { pos: [.6, 3.4, 7.8], look: [0, 3.95, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3, .9); const q = Math.min(1, p * 1.6); w.lamp.position.set(.25, .5 + q * .7, 1.0); w.lamp.rotation.z = -.2; w.p.eyes.forEach(e => e.scale.setScalar(1 + q * .4)); } },
    { say: 'Shopping bags? Never again.', show: ['floor', 'wall', 'pp', 'pouch', 'bags'], sky: '#DCEAF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.4, 3.4, 9], look: [.4, 2.6, 0], fov: 50, to: { pos: [1.3, 3.4, 8.4], look: [.4, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -.4, 0, .25); pose(w.p, .2); w.bags.children.forEach(b => { const i = b.userData.i, q = Math.min(1, Math.max(0, p * 2.4 - i * .35)); b.position.set(lerp(2.4, -.2, q), lerp(0, 1.4, q) + Math.sin(q * Math.PI) * 1.5, lerp(.6, .9, q)); b.scale.setScalar(q > .97 ? .001 : 1 - q * .4); }); } },
    { say: 'Your little brother? He lives in there now.', show: ['floor', 'wall', 'pp', 'pouch'], sky: '#DCEAF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.8, 2.6, 6.4], look: [0, 2.4, 0], fov: 48, to: { pos: [.7, 2.6, 5.8], look: [0, 2.4, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .15); w.p.head.rotation.x = .25; const k2 = w.kid.root; if (k2.parent !== w.pouch) w.pouch.add(k2); k2.position.set(0, -.6 + Math.min(1, p * 2) * .3, -.04); k2.rotation.set(0, 0, .1 * Math.sin(t * 3)); pose(w.kid, .6 + .3 * Math.sin(t * 8)); } },
    { say: 'Lost something? It is all in the pouch.', label: 'EVERYTHING YOU EVER LOST', show: ['floor', 'wall', 'pp', 'pouch', 'items'], sky: '#DCEAF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.6, 3.4, 9.6], look: [0, 3.4, 0], fov: 52, to: { pos: [.6, 3.4, 9], look: [0, 3.4, 0], fov: 50 } },
      update: (w, p, t) => { const k2 = w.kid.root; if (k2.parent === w.pouch) k2.removeFromParent(); stand(w, 0, 0, 0); pose(w.p, .3, .9); w.items.children.forEach(it => { const i = it.userData.i, q = ((t * .8 + i / 6) % 1); it.position.set((i % 2 ? 1 : -1) * (.9 + q * 1.8), 1.5 + Math.sin(q * Math.PI) * 3.2, 1 + q * .6); it.rotation.set(t * 3 + i, t * 2, 0); }); } },
    { say: 'And kangaroos? Finally, respect.', show: ['ground', 'pp', 'pouch', 'roo'], sky: '#FFC27A', lightAt: [2, 8, 6], lightDist: 18,
      cam: { pos: [0, 3.6, 11], look: [0, 3, 0], fov: 50, to: { pos: [0, 3.6, 10.2], look: [0, 3, 0], fov: 48 } },
      update: (w, p, t) => { const k2 = w.kid.root; if (k2.parent === w.pouch) k2.removeFromParent(); stand(w, -1.6, 0, .5); pose(w.p, .2); w.roo.position.set(1.8, .1 * Math.abs(Math.sin(t * 5)), -.4); w.roo.rotation.y = -.6; w.rooHead.position.y = 3.7 - (p > .45 ? .25 * Math.abs(Math.sin((p - .45) * 12)) : 0); } },
    { say: 'Human pouches: useful, awesome, or way too weird? Comment below.',
      quiz: { q: 'Would you want a pouch?', options: ['Useful', 'Awesome', 'Way too weird'], answer: 'Pouches are made up for humans. Kangaroos carry joeys in theirs.' },
      show: ['floor', 'pp', 'pouch'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { const k2 = w.kid.root; if (k2.parent === w.pouch) k2.removeFromParent(); stand(w, 0, 0, .2); pose(w.p, Math.sin(t * 2.5) > 0 ? 2.6 : .2); } },
  ],
};
