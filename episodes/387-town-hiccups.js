// Narrative 22: "In This Town… (short format, cats first)". In This Town titles are the channel's top format (906: 959 views at 20:06).
// Hook: the rule under 2 s; first frame shows a man mid-hiccup with a POP flash.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
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
  w.ground = k.ground('#8CC56A', 0);
  w.street = box(40, .05, 5, mat('#555B66'), [0, .03, 3]);
  w.house = group(); box(5, 4, 4, mat('#F2D9B8'), [0, 2, 0], w.house); const roof = cone(4, 2.6, mat('#B3262E'), [0, 5.3, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1.2, 2, .1, mat('#8B5A2B'), [0, 1, 2.02], w.house);
  w.p = person(k, k.scene, '#3FA34D'); w.pp = w.p.root;
  w.pop = group(); for (let i = 0; i < 8; i++) { const r = box(.12, .7, .05, mat('#FFE14A', { glow: 1 }), [0, 0, 0], w.pop); r.userData.i = i; }
  w.fridge = group(); w.fBody = box(2.4, 4.4, 2, mat('#EEF2F5'), [0, 2.2, 0], w.fridge); w.fDoor = group([1.2, 0, 1.02], w.fridge); box(2.4, 4.4, .12, mat('#DDE3E8'), [-1.2, 2.2, 0], w.fDoor); w.fLight = box(2.2, 4, .05, mat('#FFF6C8', { glow: .9 }), [0, 2.2, .95], w.fridge); w.kitchen = box(40, 16, .3, mat('#F6E7C8'), [0, 8, -4]);
  w.bed = group(); box(3, .6, 5, mat('#8B5A2B'), [0, .5, 0], w.bed); box(2.9, .4, 4.8, mat('#FFFFFF'), [0, 1, 0], w.bed); box(2.9, .3, 3, mat('#7C5CC4'), [0, 1.3, .8], w.bed); box(2.2, .4, .8, mat('#FFFFFF'), [0, 1.4, -1.9], w.bed);
  w.nb = person(k, k.scene, '#E2453C'); w.nbr = w.nb.root;
  w.bedroom = box(40, 16, .3, mat('#D8E8F0'), [0, 8, -4]);
  return w;
}

const stand = (P, x, y, z, ry, s = 1) => { P.root.position.set(x, y, z); P.root.rotation.set(0, ry, 0); P.root.scale.setScalar(s); P.head.rotation.set(0, 0, 0); P.mouth.scale.set(1, 1, 1); P.root.visible = true; };
const popAt = (w, x, y, z, t, on) => w.pop.children.forEach(r => { const i = r.userData.i, a = i / 8 * Math.PI * 2; r.position.set(x + Math.cos(a) * 1.4, y + Math.sin(a) * 1.4, z); r.rotation.z = a - Math.PI / 2; r.scale.setScalar(on ? 1 + .3 * Math.sin(t * 20) : 0.001); r.visible = on; });

export default {
  id: '387',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HICCUP TOWN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'HICCUPS TELEPORT'],
  title: 'In this town, hiccups teleport you',
  description: 'One hiccup? You are on the roof. Two? Inside the fridge. Three? In your neighbour\'s bed. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'hiccups', 'whatif', 'comedy', 'shorts'],
  sources: ['Comedy sketch: teleporting hiccups are made up. Quiz fact: a hiccup is a sudden involuntary contraction of the diaphragm; the vocal cords then snap shut, which makes the "hic" sound (Encyclopaedia Britannica, "hiccup").'],
  setup,
  scenes: [
    { say: 'In this town, hiccups teleport.', label: 'HIC!', show: ['ground', 'street', 'house', 'pp', 'pop'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.5, 3, 14], look: [0, 4.1, 0], fov: 52, to: { pos: [1.4, 3, 13.3], look: [0, 4.1, 0], fov: 50 } },
      update: (w, p, t) => { w.nb.root.visible = false; w.house.position.set(0, 0, -5); stand(w.p, 0, 0, 2.6, 0); const hic = (t % 1.2) < .25; w.p.root.position.y = hic ? .3 : 0; w.p.mouth.scale.set(1.2, hic ? 3 : 1, 1); pose(w.p, hic ? 1 : .3); popAt(w, 0, 3.3, 2.4, t, hic); } },
    { say: 'One hiccup? You are on the roof.', label: 'HIC!', show: ['ground', 'street', 'house', 'pp', 'pop'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 18], look: [0, 5.6, 0], fov: 54, to: { pos: [3, 5, 17.5], look: [0, 5.6, 0], fov: 52 } },
      update: (w, p, t) => { w.house.position.set(0, 0, -1); const up = p > .35; stand(w.p, up ? 0 : 3.6, up ? 6.6 : 0, up ? -1 : 3, -.4, .9); pose(w.p, up ? 2.4 : .3); w.p.mouth.scale.set(1.2, up ? 3 : 1, 1); popAt(w, up ? 0 : 3.6, up ? 9.4 : 3, up ? -.6 : 3, t, Math.abs(p - .37) < .08); } },
    { say: 'Two? Inside the fridge.', label: 'HIC!', show: ['kitchen', 'fridge', 'pp', 'pop'], sky: '#F6E7C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-1.2, 3, 10], look: [0, 2.4, 0], fov: 52, to: { pos: [-1.2, 3, 9.5], look: [0, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { w.fridge.position.set(0, 0, 0); w.fDoor.rotation.y = 2.4; w.fLight.visible = true; stand(w.p, 0, .2, 1.25, 0, .72); pose(w.p, .2); w.p.head.rotation.y = .4 * Math.sin(t * 2); w.p.mouth.scale.set(1.2, 2.4, 1); w.p.head.children[0].material.color.set('#BFE3F7'); popAt(w, 0, 2.6, .5, t, p < .12); } },
    { say: 'Three? In your neighbour\'s bed.', label: 'HIC!', show: ['bedroom', 'bed', 'pp', 'pop'], sky: '#D8E8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [3, 5, 9], look: [0, 1.6, 0], fov: 52, to: { pos: [3, 5, 8.5], look: [0, 1.6, 0], fov: 50 } },
      update: (w, p, t) => { w.p.head.children[0].material.color.set('#F2C9A0'); w.bed.position.set(0, 0, 0); stand(w.p, -.6, 1.2, .4, 0, .55); w.p.root.rotation.x = -1.4; w.p.mouth.scale.set(1.2, 2.4, 1); stand(w.nb, .6, 1.2, .4, 0, .55); w.nb.root.rotation.x = -1.4; w.nb.mouth.scale.set(1.2, p > .5 ? 3 : 1, 1); w.nb.eyes.forEach(e => e.scale.setScalar(p > .5 ? 1.5 : 1)); popAt(w, -.6, 2.4, 1, t, p < .12); } },
    { say: 'Hiccup town: cool, funny, or way too jumpy? Comment below.',
      quiz: { q: 'Hiccup town is…', options: ['Cool', 'Funny', 'Way too jumpy'], answer: 'Made up. A real hiccup is your diaphragm jumping, then your vocal cords snapping shut.' },
      show: ['ground', 'pp', 'pop'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 3, 8], look: [0, 2.6, 0], fov: 54, to: { pos: [-2, 3, 8], look: [0, 2.6, 0] } },
      update: (w, p, t) => { w.nb.root.visible = false; w.p.root.rotation.x = 0; stand(w.p, 0, 0, 0, 0, .8); const hic = (t % 1.4) < .25; w.p.root.position.y = hic ? .3 : 0; w.p.mouth.scale.set(1.2, hic ? 3 : 1, 1); popAt(w, 0, 2.7, -.2, t, hic); } },
  ],
};
