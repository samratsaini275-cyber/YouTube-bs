// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people cannot change colour. Hook: the premise as a question under 2 s; first frame shows a person changing colour.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.skin = mat('#F2C9A0');
  p.body = cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, p.skin, [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, .2, .64], p.head); ball(.07, mat('#111111'), [x, .2, .76], p.head); }
  p.mouth = k.box(.3, .06, .05, mat('#5A1E1E'), [0, -.25, .72], p.head);
  return p;
}
const tint = (p, c, body = false) => { p.skin.color.set(c); if (body) p.body.material.color.set(c); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9CCB7A', 0);
  w.room = group(); box(40, 20, .5, mat('#FFE6B8'), [0, 10, -4], w.room);
  w.wall = group(); const wp = box(40, 20, .5, mat('#7FB8E8'), [0, 10, -2], w.wall); for (let i = 0; i < 12; i++) ball(.5, mat('#FFFFFF'), [-8 + (i % 6) * 3.2, 1.5 + Math.floor(i / 6) * 3.4, -1.7], w.wall);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.p2 = person(k, k.scene, '#E2453C'); w.pp2 = w.p2.root;
  w.table = group(); box(5, .2, 2.4, mat('#2E8B4A'), [0, 2, 0], w.table); for (const x of [-2.2, 2.2]) box(.2, 2, .2, mat('#6B4B2E'), [x, 1, 0], w.table);
  w.cards = group(); for (let i = 0; i < 3; i++) { const c = box(.5, .02, .7, mat('#FFFFFF'), [-.6 + i * .6, 2.12, .6], w.cards); c.rotation.y = (i - 1) * .2; }
  w.cham = group(); const cb = ball(1.2, mat('#3FBF5F'), [0, 1.4, 0], w.cham); cb.scale.set(1.6, .9, .9); ball(.7, mat('#3FBF5F'), [1.8, 1.7, 0], w.cham); for (const z of [-.45, .45]) { ball(.25, mat('#FFFFFF'), [2.1, 2, z], w.cham); ball(.11, mat('#111111'), [2.3, 2, z * 1.1], w.cham); } const tl = k.torus(.6, .15, mat('#3FBF5F'), [-2, 1.2, 0], w.cham); tl.rotation.set(0, 0, 0); w.chamSkin = cb.material;
  return w;
}

const stand = (w, P, pp, x, z, ry) => { pp.position.set(x, 0, z); pp.rotation.set(0, ry, 0); P.head.rotation.set(0, 0, 0); };

export default {
  id: '246',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HUMAN CHAMELEON',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'CHANGED COLOUR?'],
  title: 'What would happen if humans could change colour?',
  description: 'Blushing is a disaster. Hide and seek is impossible. Poker is over. And the chameleons are furious. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'chameleon', 'colour', 'comedy', 'shorts'],
  sources: ['Comedy sketch: colour-changing people are made up.'],
  setup,
  scenes: [
    { say: 'What if humans changed colour?', show: ['ground', 'room', 'pp'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, 2.6, 9.5], look: [0, 3.95, 0], fov: 48, to: { pos: [.7, 2.6, 8.8], look: [0, 3.95, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, .25); tint(w.p, new w.p.skin.color.constructor().setHSL((t * .4) % 1, .7, .6)); } },
    { say: 'Blushing? You go bright red. Everyone can tell.', show: ['ground', 'room', 'pp', 'pp2'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 3.4, 11], look: [0, 3.2, 0], fov: 48, to: { pos: [0, 3.4, 10.2], look: [0, 3.2, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, -1.5, 0, .5); stand(w, w.p2, w.pp2, 1.5, 0, -.5); tint(w.p2, '#F2C9A0'); const r = Math.min(1, Math.max(0, t - .5)); tint(w.p, new w.p.skin.color.constructor('#F2C9A0').lerp(new w.p.skin.color.constructor('#FF2A2A'), r)); } },
    { say: 'Hide and seek? You vanish into the wallpaper.', show: ['ground', 'wall', 'pp', 'pp2'], sky: '#7FB8E8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, 3, 10], look: [0, 3, -1], fov: 48, to: { pos: [.4, 3, 9.3], look: [0, 3, -1], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, -1.2, -1, 0); stand(w, w.p2, w.pp2, 1.8, .8, -.7); tint(w.p2, '#F2C9A0'); const r = Math.min(1, t / 1.4); tint(w.p, new w.p.skin.color.constructor('#F2C9A0').lerp(new w.p.skin.color.constructor('#7FB8E8'), r), true); w.p.body.material.color.lerpColors(new w.p.skin.color.constructor('#2F6FD6'), new w.p.skin.color.constructor('#7FB8E8'), r); } },
    { say: 'Poker? Over. You turn green every time you bluff.', show: ['ground', 'room', 'pp', 'pp2', 'table', 'cards'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [3, 4.4, 9], look: [0, 3, 0], fov: 50, to: { pos: [2.7, 4.4, 8.4], look: [0, 3, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, -1.4, -1.4, .3); stand(w, w.p2, w.pp2, 1.4, -1.4, -.3); w.p.body.material.color.set('#2F6FD6'); tint(w.p2, '#F2C9A0'); tint(w.p, p > .4 ? '#4CD964' : '#F2C9A0'); w.p2.head.rotation.y = p > .5 ? -.5 : 0; } },
    { say: 'And chameleons? Finally, some competition.', show: ['ground', 'room', 'pp', 'cham'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [-.4, 3, 13], look: [-.4, 2.2, 0], fov: 52, to: { pos: [-.4, 3, 12], look: [-.4, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 1.4, -.4, -.6); w.cham.position.set(-2, 0, 0); w.cham.rotation.y = 0; const c = new w.p.skin.color.constructor().setHSL((t * .5) % 1, .7, .55); tint(w.p, c); w.chamSkin.color.setHSL((t * .5 + .5) % 1, .7, .5); } },
    { say: 'Changing colour: useful, awesome, or embarrassing? Comment below.',
      quiz: { q: 'Would you want to change colour?', options: ['Useful', 'Awesome', 'Embarrassing'], answer: 'Colour-changing people are made up. Chameleons keep the trick.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-.8, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, .25); w.p.body.material.color.set('#2F6FD6'); tint(w.p, new w.p.skin.color.constructor().setHSL((t * .3) % 1, .7, .6)); } },
  ],
};
