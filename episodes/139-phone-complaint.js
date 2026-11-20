// Narrative 8: "Objects With Opinions". A made-up comedy sketch: phones do not talk; the drops are gentle bounces.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the phone with a face.

function phone(k, parent) {
  const { mat, box, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  box(2.2, 4.4, .3, mat('#1E2227', { rough: .3 }), [0, 2.2, 0], p.body);
  p.screen = box(1.95, 4.0, .05, mat('#5DA9F5', { glow: .7 }), [0, 2.2, .16], p.body);
  for (const x of [-.45, .45]) { ball(.26, mat('#FFFFFF'), [x, 3.0, .2], p.body); ball(.13, mat('#111111'), [x, 3.0, .4], p.body); }
  p.mouth = box(.6, .08, .05, mat('#5A1E1E'), [0, 2.0, .2], p.body);
  return p;
}
function talk(p, t, on = true) { p.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#C9B79C', 0);
  w.room = group();
  box(40, 20, .5, mat('#E9D8F2'), [0, 10, -4], w.room);
  w.p = phone(k, k.scene); w.ph = w.p.root;
  w.apps = group();
  const cols = ['#E2453C', '#22C55E', '#FFD21F', '#8B5CF6', '#F97316', '#06B6D4', '#EC4899', '#3B82F6'];
  for (let i = 0; i < 16; i++) { const a = box(.55, .55, .15, mat(cols[i % 8], { glow: .4 }), [0, 0, 0], w.apps); a.userData.i = i; a.castShadow = false; }
  w.batt = group();
  box(2.2, .9, .1, mat('#FFFFFF'), [0, 0, 0], w.batt); box(1.9, .6, .12, mat('#1E2227'), [0, 0, .02], w.batt);
  box(.2, .4, .1, mat('#FFFFFF'), [1.2, 0, 0], w.batt); w.fill = box(.2, .5, .14, mat('#E2453C', { glow: 1.5 }), [-.8, 0, .04], w.batt);
  w.hearts = group();
  for (let i = 0; i < 6; i++) { const h = ball(.2, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  w.people = group();
  [['#2F6FD6', -3.2], ['#D6452F', 3.2], ['#22A06B', -2.4]].forEach(([c, x], i) => { const g = group([x, 0, i === 2 ? 2 : .6], w.people); cyl(.75, .8, 2.4, mat(c), [0, 1.2, 0], g, 14); ball(.75, mat('#F2C9A0'), [0, 3.1, 0], g); g.rotation.y = x < 0 ? .9 : -.9; });
  return w;
}

const stand = (w) => { w.ph.position.set(0, 0, 0); w.ph.rotation.set(0, -.2, 0); w.p.body.rotation.set(0, 0, 0); w.p.body.position.set(0, 0, 0); };

export default {
  id: '139',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PHONE WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS PHONE', 'HAS A COMPLAINT.'],
  title: 'This phone has a complaint',
  description: 'Dropped on his face daily. Fifty apps open. Ignored, until one percent battery. (A made-up talking phone.)',
  tags: ['objectswithopinions', 'funny', 'phone', 'battery', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking phones are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This phone has a complaint.',
      show: ['ground', 'room', 'ph'], sky: '#E9D8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, 1.6, 8], look: [0, 3.6, 0], fov: 46, to: { pos: [.7, 1.6, 7.2], look: [0, 3.5, 0], fov: 44 } },
      update: (w, p, t) => { stand(w); talk(w.p, t, t > .2); },
    },
    {
      say: 'People drop him on his face. Every single day.',
      show: ['ground', 'room', 'ph'], sky: '#E9D8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [8, 5, 9], look: [0, 1.2, .8], fov: 50, to: { pos: [7.4, 4.8, 8.4], look: [0, 1.1, .8], fov: 48 } },
      update: (w, p, t) => {
        stand(w); const c = t % 1.6; const fall = Math.min(1, (c / .5) ** 2); const b = c > .5 && c < .8 ? Math.sin((c - .5) / .3 * Math.PI) * .12 : 0;
        w.p.body.rotation.x = fall * (Math.PI / 2 - b); talk(w.p, t, c > .8);
      },
    },
    {
      say: 'Then they open fifty apps and never close them.',
      show: ['ground', 'room', 'ph', 'apps'], sky: '#E9D8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, 2.4, 9.5], look: [0, 3.4, 0], fov: 48, to: { pos: [.7, 2.4, 8.6], look: [0, 3.4, 0], fov: 46 } },
      update: (w, p, t) => {
        stand(w); talk(w.p, t);
        w.apps.children.forEach(a => { const i = a.userData.i; a.visible = i < t * 6; const ang = i * 2.4; const r = 1.8 + (i % 3) * .5; a.position.set(Math.cos(ang) * r, 2.6 + Math.sin(ang) * r * .9 + .1 * Math.sin(t * 3 + i), .6); a.rotation.z = .2 * Math.sin(t * 2 + i); });
      },
    },
    {
      say: 'But at one percent battery? Suddenly, everyone loves him.',
      show: ['ground', 'room', 'ph', 'batt', 'hearts', 'people'], sky: '#FFE0EA', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [.8, 3, 11], look: [0, 3.5, 0], fov: 48, to: { pos: [.7, 3, 10], look: [0, 3.5, 0], fov: 46 } },
      update: (w, p, t) => {
        stand(w); talk(w.p, t);
        w.batt.position.set(0, 6.0, 0); w.fill.visible = Math.floor(t * 3) % 2 === 0;
        w.people.visible = t > 1.3; w.people.children.forEach((g, i) => { g.position.x = (i === 1 ? 3.2 : i === 0 ? -3.2 : -2.4) * (1 - Math.min(.35, (t - 1.3) * .3)); });
        w.hearts.visible = t > 1.5; w.hearts.children.forEach(h => { const q = (t * .7 + h.userData.i / 6) % 1; h.position.set((h.userData.i - 2.5) * .6, 4.6 + q * 2.2, .5); h.scale.setScalar(1 - q * .5); });
      },
    },
    {
      say: 'Phones: calls, games, or a flashlight? Comment below.',
      quiz: { q: 'What do you use your phone for most?', options: ['Calls', 'Games', 'Flashlight'], answer: 'This phone is made up. Please charge him.' },
      show: ['ground', 'room', 'ph'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, .6, 8], look: [0, 5.4, 0], fov: 46, to: { pos: [-.8, .6, 8], look: [0, 5.4, 0] } },
      update: (w, p, t) => { stand(w); talk(w.p, t, false); },
    },
  ],
};
