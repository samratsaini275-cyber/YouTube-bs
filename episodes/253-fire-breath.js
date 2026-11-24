// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people cannot breathe fire. Hook: the premise as a question under 2 s; first frame shows a person breathing fire.

function person(k, parent, shirt) {
  const { mat, cyl, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, .2, .64], p.head); ball(.07, mat('#111111'), [x, .2, .76], p.head); }
  p.mouth = k.box(.3, .1, .05, mat('#5A1E1E'), [0, -.25, .72], p.head);
  p.fire = group([0, -.25, .8], p.head); for (let i = 0; i < 3; i++) { const f = cone(.25 + i * .12, 1.4 + i * .5, mat(['#FFE21F', '#FF8A1F', '#E2453C'][i], { glow: 1, opacity: .85 - i * .15 }), [0, 0, .7 + i * .25], p.fire, 12); f.rotation.x = -Math.PI / 2; f.castShadow = false; }
  return p;
}
const blow = (p, on, t, s = 1) => { p.fire.visible = on; p.mouth.scale.y = on ? 3 : 1; p.fire.scale.set(s * (1 + .15 * Math.sin(t * 30)), s * (1 + .15 * Math.sin(t * 27)), s * (1 + .2 * Math.sin(t * 23))); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9CCB7A', 0);
  w.room = group(); box(40, 20, .5, mat('#FFE6B8'), [0, 10, -4], w.room);
  w.night = group(); for (let i = 0; i < 6; i++) { const t = group([-8 + i * 3.2, 0, -5 - (i % 2) * 2], w.night); cyl(.3, .4, 2.4, mat('#5A3A22'), [0, 1.2, 0], t, 8); cone(1.6, 4, mat('#24502E'), [0, 4, 0], t, 8); }
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.cake = group(); cyl(1, 1, .8, mat('#F7C6D9'), [0, .4, 0], w.cake, 24); w.cakeTop = cyl(1, 1, .1, mat('#FFFFFF'), [0, .85, 0], w.cake, 24); for (let i = 0; i < 5; i++) { const a = i / 5 * 6.28; cyl(.05, .05, .4, mat('#3B82F6'), [Math.cos(a) * .5, 1.1, Math.sin(a) * .5], w.cake, 6); }
  w.table = group(); box(3, .2, 2, mat('#8B5A2B'), [0, 1.9, 0], w.table); for (const x of [-1.3, 1.3]) box(.15, 1.9, .15, mat('#6B4B2E'), [x, .95, 0], w.table);
  w.toast = group(); box(.9, .9, .15, mat('#E8C48A'), [0, 0, 0], w.toast);
  w.camp = group(); for (let i = 0; i < 4; i++) { const st = box(.15, .15, 1.6, mat('#6B4428'), [0, .1, 0], w.camp); st.rotation.y = i * .8; } w.campFire = cone(.5, 1.2, mat('#FF8A1F', { glow: 1 }), [0, .7, 0], w.camp, 10);
  w.dragon = group(); const dg = mat('#9B3FD6', { rough: .6 }); const db = ball(1.8, dg, [0, 3, 0], w.dragon); db.scale.set(1.4, 1, 1); const dh = group([2.6, 5, 0], w.dragon); ball(1, dg, [0, 0, 0], dh); box(1.2, .7, .9, dg, [.9, -.2, 0], dh); for (const z of [-.4, .4]) { ball(.22, mat('#FFE21F'), [.6, .4, z], dh); ball(.1, mat('#111111'), [.75, .45, z], dh); } for (const z of [-1, 1]) { const wg = box(2.4, .1, 2, mat('#7A2FB0'), [-.4, 4.6, z * 1.6], w.dragon); wg.rotation.x = z * .5; } for (const z of [-.9, .9]) cyl(.4, .4, 1.8, dg, [0, .9, z], w.dragon, 10);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '253',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FIRE BREATH',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'BREATHED FIRE?'],
  title: 'What would happen if humans could breathe fire?',
  description: 'Birthday candles are a problem. Toast takes one second. Camping is easy. And dragons are finally impressed. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'dragon', 'fire', 'comedy', 'shorts'],
  sources: ['Comedy sketch: fire-breathing humans are made up. Do not try this at home.'],
  setup,
  scenes: [
    { say: 'What if humans breathed fire?', show: ['ground', 'room', 'pp'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [3, 2.6, 9], look: [.4, 3.95, 0], fov: 48, to: { pos: [2.8, 2.6, 8.3], look: [.4, 3.95, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, -.6, 0, 1.1); blow(w.p, t > .4, t); } },
    { say: 'Birthday candles? You burn the whole cake.', show: ['ground', 'room', 'pp', 'table', 'cake'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [3.4, 3.6, 8], look: [.6, 2.8, 0], fov: 48, to: { pos: [3.1, 3.6, 7.4], look: [.6, 2.8, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, -1.6, 0, Math.PI / 2); w.p.head.rotation.x = .25; w.table.position.set(1, 0, 0); w.cake.position.set(1, 2, 0); const on = t > .9 && t < 1.8; blow(w.p, on, t, .8); const burnt = Math.min(1, Math.max(0, t - .9)); w.cake.children[0].material.color.lerpColors(new w.cakeTop.material.color.constructor('#F7C6D9'), new w.cakeTop.material.color.constructor('#2A1A12'), burnt); w.cakeTop.material.color.lerpColors(new w.cakeTop.material.color.constructor('#FFFFFF'), new w.cakeTop.material.color.constructor('#1A0E0A'), burnt); } },
    { say: 'Toast? Ready in one second.', show: ['ground', 'room', 'pp', 'toast'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [3, 3.6, 7], look: [.6, 3.3, 0], fov: 46, to: { pos: [2.8, 3.6, 6.4], look: [.6, 3.3, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, -1.2, 0, Math.PI / 2); w.toast.position.set(1.4, 3.1, 0); w.toast.rotation.y = Math.PI / 2; const on = t > .5 && t < 1.1; blow(w.p, on, t, .6); const c = Math.min(1, Math.max(0, t - .5) * 1.6); w.toast.children[0].material.color.lerpColors(new w.toast.children[0].material.color.constructor('#E8C48A'), new w.toast.children[0].material.color.constructor('#8A5A2E'), c); } },
    { say: 'Camping? Who needs matches.', show: ['ground', 'night', 'pp', 'camp'], sky: '#16224A', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [3, 2.6, 9], look: [.4, 2, 0], fov: 48, to: { pos: [2.8, 2.6, 8.3], look: [.4, 2, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, -1.6, 0, Math.PI / 2); w.p.head.rotation.x = .5; w.camp.position.set(1.4, 0, 0); const on = t > .4 && t < 1; blow(w.p, on, t, .7); w.campFire.visible = t > .8; w.campFire.scale.setScalar(Math.min(1, (t - .8) * 2) * (1 + .1 * Math.sin(t * 20))); } },
    { say: 'And dragons? Finally impressed.', show: ['ground', 'night', 'pp', 'dragon'], sky: '#16224A', lightAt: [0, 5, 4], lightDist: 16,
      cam: { pos: [-.6, 4, 18], look: [-.6, 3, 0], fov: 52, to: { pos: [-.6, 4, 17], look: [-.6, 3, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 3, 1, -1.6); blow(w.p, true, t, .8); w.dragon.position.set(-3.4, 0, -1); w.dragon.rotation.y = -.6; } },
    { say: 'Fire breath: useful, awesome, or too spicy? Comment below.',
      quiz: { q: 'Would you want to breathe fire?', options: ['Useful', 'Awesome', 'Too spicy'], answer: 'Fire-breathing people are made up. Please do not try it.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [3, 1, 8], look: [.4, 4.4, 0], fov: 48, to: { pos: [0, 1, 8], look: [.4, 4.4, 0] } },
      update: (w, p, t) => { stand(w, -.6, 0, 1.1); blow(w.p, Math.sin(t * 2) > 0, t); } },
  ],
};
