// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people do not grow antlers. Hook: the premise as a question under 2 s; first frame shows a person with huge antlers.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  return p;
}
function seg(k, a, b, m, parent, r) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b);
  const c = k.cyl(r, r * .8, A.distanceTo(B), m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  return c;
}
function antlers(k, head) {
  const g = k.group([0, .5, 0], head), m = k.mat('#C8A57A', { rough: .8 });
  for (const s of [-1, 1]) {
    const pts = [[s * .35, 0, 0], [s * 1.1, .9, 0], [s * 1.8, 1.9, -.1], [s * 2.2, 3, -.1]];
    for (let i = 0; i < 3; i++) seg(k, pts[i], pts[i + 1], m, g, .11 - i * .02);
    for (const [a, b] of [[1, [s * .9, 1.9, .1]], [2, [s * 1.4, 2.9, 0]], [2, [s * 2.7, 2.4, -.1]]]) seg(k, pts[a], b, m, g, .07);
  }
  return g;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FBF5A', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#F0E2D0'), [0, 10, -4], w.wall);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root; w.ant = antlers(k, w.p.head);
  w.door = group(); const dm = mat('#8B5A2B'); box(.5, 5, 1, dm, [-1.6, 2.5, 0], w.door); box(.5, 5, 1, dm, [1.6, 2.5, 0], w.door); box(3.7, .5, 1, dm, [0, 5.2, 0], w.door); box(12, 15, .6, mat('#E6D3B8'), [-8.1, 7.5, 0], w.door); box(12, 15, .6, mat('#E6D3B8'), [8.1, 7.5, 0], w.door); box(3.7, 10, .6, mat('#E6D3B8'), [0, 10.4, 0], w.door);
  w.socks = group(); for (let i = 0; i < 5; i++) { const s = box(.35, .6, .08, k.mat(['#E2453C', '#FFC21F', '#FFFFFF', '#5FBF5F', '#FF5FA2'][i]), [0, 0, 0], w.socks); s.userData.i = i; }
  w.hats = group(); for (let i = 0; i < 3; i++) { const h = group([0, 0, 0], w.hats); cyl(.5, .5, .5, mat(['#222222', '#E2453C', '#FFC21F'][i]), [0, .25, 0], h, 16); cyl(.8, .8, .06, mat(['#222222', '#E2453C', '#FFC21F'][i]), [0, 0, 0], h, 16); h.userData.i = i; }
  w.deer = group(); const dmat = mat('#A86A34'); const bd = ball(1, dmat, [0, 2.4, 0], w.deer); bd.scale.set(1.6, .9, .8); for (const [x, z] of [[-1, -.4], [-1, .4], [1, -.4], [1, .4]]) cyl(.13, .1, 1.8, dmat, [x, .9, z], w.deer, 8); const nk = cyl(.3, .35, 1.4, dmat, [1.5, 3.2, 0], w.deer, 10); nk.rotation.z = -.5; w.deerHead = group([1.9, 3.9, 0], w.deer); const hd = ball(.45, dmat, [0, 0, 0], w.deerHead); hd.scale.set(1.4, 1, 1); for (const z of [-.2, .2]) ball(.08, mat('#111111'), [.35, .15, z], w.deerHead); ball(.12, mat('#222222'), [.65, -.05, 0], w.deerHead); const da = antlers(k, w.deerHead); da.rotation.y = Math.PI / 2; da.scale.setScalar(.6); da.position.y = .3;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '261',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HUMAN ANTLERS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD ANTLERS?'],
  title: 'What would happen if humans had antlers?',
  description: 'Doors become your worst enemy. Your antlers become a washing line. Hats? Collect them all. And deer think you are family. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'antlers', 'deer', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human antlers are made up. Quiz fact: deer shed and regrow their antlers every year.'],
  setup,
  scenes: [
    { say: 'What if humans had antlers?', show: ['floor', 'wall', 'pp'], sky: '#F0E2D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 10.5], look: [0, 4.4, 0], fov: 52, to: { pos: [0, 3.6, 9.6], look: [0, 4.4, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); w.p.head.rotation.z = .08 * Math.sin(t * 3); } },
    { say: 'Doors? Every single day.', label: '*BONK*', show: ['floor', 'pp', 'door'], sky: '#F0E2D0', lightAt: [0, 6, 8], lightDist: 16, shake: (t) => (t % 1.1) < .15 ? .15 : 0,
      cam: { pos: [2.4, 4, 9], look: [0, 3.8, 0], fov: 52, to: { pos: [2.2, 4, 8.4], look: [0, 3.8, 0], fov: 50 } },
      update: (w, p, t) => { const c = t % 1.1; stand(w, 0, 1.6 - (c < .3 ? c * 2 : Math.max(0, .6 - (c - .3) * 3)), 0); w.p.head.rotation.x = c > .3 && c < .5 ? -.3 : 0; pose(w.p, .2); w.p.mouth.scale.set(1, c > .3 ? 2.4 : 1, 1); } },
    { say: 'Laundry day? Your head is the washing line.', show: ['ground', 'pp', 'socks'], sky: '#7EC8F2', lightAt: [2, 8, 6], lightDist: 16,
      cam: { pos: [0, 4.6, 11], look: [0, 4.4, 0], fov: 56, to: { pos: [0, 4.6, 10.3], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); const pts = [[-2.4, 6.4], [-1.6, 6.0], [-1.1, 5.2], [1.6, 6.0], [2.4, 6.4]]; w.socks.children.forEach(s => { const i = s.userData.i; s.position.set(pts[i][0], pts[i][1] - .35, .1); s.rotation.z = .15 * Math.sin(t * 3 + i); }); } },
    { say: 'Hats? You can wear them all at once.', show: ['floor', 'wall', 'pp', 'hats'], sky: '#F0E2D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 4.6, 11], look: [0, 4.4, 0], fov: 56, to: { pos: [0, 4.6, 10.3], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); const spots = [[-2.2, 6.75], [2.2, 6.75], [-1.4, 6.6]]; w.hats.children.forEach(h => { const i = h.userData.i, q = Math.min(1, Math.max(0, p * 3 - i * .7)); h.position.set(spots[i][0], spots[i][1] + (1 - q) * 4, -.1); h.rotation.z = (spots[i][0] > 0 ? -.4 : .4); }); } },
    { say: 'And deer? They think you are family.', show: ['ground', 'pp', 'deer'], sky: '#FFC27A', lightAt: [2, 8, 6], lightDist: 18,
      cam: { pos: [-.4, 4.4, 12.5], look: [-.4, 3.8, 0], fov: 52, to: { pos: [-.4, 4.4, 11.6], look: [-.4, 3.8, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, -2, 0, .4); pose(w.p, .2); w.deer.position.set(1.4, 0, -.6); w.deer.rotation.y = Math.PI - .2; w.deerHead.rotation.z = -.2 * Math.abs(Math.sin(t * 3)); w.p.head.rotation.z = -.15 * Math.abs(Math.sin(t * 3)); } },
    { say: 'Human antlers: useful, awesome, or a total headache? Comment below.',
      quiz: { q: 'Would you want antlers?', options: ['Useful', 'Awesome', 'Total headache'], answer: 'Made up for humans. Real deer regrow antlers every year.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 9.5], look: [0, 5.2, 0], fov: 50, to: { pos: [-1, 1, 9.5], look: [0, 5.2, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, Math.sin(t * 2.5) > 0 ? 2.6 : .2); } },
  ],
};
